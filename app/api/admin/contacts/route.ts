import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import { getInsforge } from "@/lib/insforge";

async function authorized() {
  const cookieStore = await cookies();
  return isAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await authorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await getInsforge().database
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ contacts: data ?? [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Could not fetch contacts." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await authorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { action } = body;

    const now = new Date().toISOString();

    if (action === "update_status") {
      const { id, status } = body;
      if (!id || !status) {
        return NextResponse.json(
          { error: "Missing contact ID or status." },
          { status: 400 }
        );
      }

      const { data, error } = await getInsforge().database
        .from("contacts")
        .update({ status, updated_at: now })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ contact: data });
    }

    if (action === "delete_contact") {
      const { id } = body;
      if (!id) {
        return NextResponse.json(
          { error: "Missing contact ID." },
          { status: 400 }
        );
      }

      const { error } = await getInsforge().database
        .from("contacts")
        .delete()
        .eq("id", id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, id });
    }

    if (action === "bulk_update_status") {
      const { ids, status } = body;
      if (!Array.isArray(ids) || ids.length === 0 || !status) {
        return NextResponse.json(
          { error: "Missing contact IDs or status." },
          { status: 400 }
        );
      }

      const { error } = await getInsforge().database
        .from("contacts")
        .update({ status, updated_at: now })
        .in("id", ids);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, ids, status });
    }

    if (action === "bulk_delete") {
      const { ids } = body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json(
          { error: "Missing contact IDs." },
          { status: 400 }
        );
      }

      const { error } = await getInsforge().database
        .from("contacts")
        .delete()
        .in("id", ids);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, ids });
    }

    if (action === "mark_all_read") {
      const { error } = await getInsforge().database
        .from("contacts")
        .update({ status: "read", updated_at: now })
        .eq("status", "unread");

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process request." },
      { status: 500 }
    );
  }
}
