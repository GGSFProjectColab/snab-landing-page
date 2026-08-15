import { NextRequest, NextResponse } from "next/server";
import { getInsforge } from "@/lib/insforge";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing asset ID" }, { status: 400 });
    }

    const uuidMatch = id.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    const assetId = uuidMatch ? uuidMatch[0] : id.split(".")[0];

    const { data: asset, error } = await getInsforge()
      .database.from("blog_assets")
      .select("id, name, mime_type, size, data")
      .eq("id", assetId)
      .maybeSingle();

    if (error || !asset || !asset.data) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const buffer = Buffer.from(asset.data, "base64");
    const safeFileName = (asset.name || "image").replace(/["\\\r\n]/g, "-");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": asset.mime_type || "image/jpeg",
        "Content-Length": String(buffer.length),
        "Content-Disposition": `inline; filename="${safeFileName}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Error serving blog asset:", err);
    return NextResponse.json({ error: "Failed to load asset" }, { status: 500 });
  }
}
