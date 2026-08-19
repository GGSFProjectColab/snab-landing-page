import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import { getInsforge } from "@/lib/insforge";

async function authorized() {
  const cookieStore = await cookies();
  return isAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value);
}

function serverSecret() {
  const secret = process.env.INSFORGE_ADMIN_SECRET;
  if (!secret) throw new Error("Missing admin configuration.");
  return secret;
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const secret = serverSecret();
  const [applicationsResult, jobsResult] = await Promise.all([
    getInsforge().database.rpc("career_admin_list_applications", { p_secret: secret }),
    getInsforge().database.rpc("career_admin_list_jobs", { p_secret: secret }),
  ]);

  if (applicationsResult.error || jobsResult.error) {
    return NextResponse.json({ error: applicationsResult.error?.message || jobsResult.error?.message || "Could not load careers data." }, { status: 500 });
  }

  return NextResponse.json({ applications: applicationsResult.data ?? [], jobs: jobsResult.data ?? [] });
}

export async function POST(request: NextRequest) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const secret = serverSecret();

  if (body.action === "update_application_status") {
    const { data, error } = await getInsforge().database.rpc("career_admin_update_application_status", {
      p_secret: secret,
      p_application_id: body.applicationId,
      p_status: body.status,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ application: data });
  }

  if (body.action === "save_job") {
    const { data, error } = await getInsforge().database.rpc("career_admin_save_job", { p_secret: secret, p_job: body.job });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    revalidatePath("/careers");
    return NextResponse.json({ job: data });
  }

  if (body.action === "delete_job") {
    const { data, error } = await getInsforge().database.rpc("career_admin_delete_job", {
      p_secret: secret,
      p_job_id: body.jobId,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    revalidatePath("/careers");
    return NextResponse.json({ job: data });
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
