import { NextResponse } from "next/server";
import { getInsforge } from "@/lib/insforge";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function POST(_req: Request, { params }: Params) {
  const { slug } = await params;
  if (!slug || typeof slug !== "string" || slug.length > 200 || !/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const insforge = getInsforge();

    // Fetch the current view count
    const { data, error } = await insforge.database
      .from("blogs")
      .select("view_count")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const newCount = ((data as { view_count: number }).view_count ?? 0) + 1;

    const { error: updateError } = await insforge.database
      .from("blogs")
      .update({ view_count: newCount })
      .eq("slug", slug)
      .eq("status", "published");

    if (updateError) {
      console.error("View count update error:", updateError.message);
      return NextResponse.json({ error: "Could not update view count" }, { status: 500 });
    }

    return NextResponse.json({ view_count: newCount });
  } catch (err) {
    console.error("View count error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
