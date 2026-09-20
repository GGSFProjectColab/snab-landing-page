import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import { getInsforge } from "@/lib/insforge";

type ResumePayload = { name: string; type: string; size: number; data: string };

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!isAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.INSFORGE_ADMIN_SECRET;
  if (!secret) return NextResponse.json({ error: "Missing admin configuration." }, { status: 500 });

  const { id } = await params;
  const { data, error } = await getInsforge().database.rpc("career_admin_get_resume", {
    p_secret: secret,
    p_application_id: id,
  });

  if (error || !data) return NextResponse.json({ error: error?.message || "Résumé not found." }, { status: 404 });
  const resume = data as ResumePayload;
  const fileName = (resume.name || "resume").replace(/["\\\r\n]/g, "-").slice(0, 120);
  const allowedResume = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);
  const safeType = allowedResume.has(resume.type) ? resume.type : "application/octet-stream";
  const buffer = Buffer.from(resume.data, "base64");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": safeType,
      "Content-Length": String(buffer.length),
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
