import { NextRequest, NextResponse } from "next/server";
import { getInsforge } from "@/lib/insforge";

export const dynamic = "force-dynamic";

function getCORSHeaders(mimeType?: string, contentLength?: number, fileName?: string) {
  const safeFileName = (fileName || "image").replace(/["\\\r\n]/g, "-");
  const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
  // Serve unknown/legacy types (e.g. SVG) as a download to prevent script
  // execution in site origin. Existing JPG/PNG behavior is unchanged.
  const safeMime = mimeType && allowed.has(mimeType) ? mimeType : "application/octet-stream";
  const disposition = safeMime === "application/octet-stream" ? "attachment" : "inline";
  return {
    "Content-Type": safeMime,
    ...(contentLength ? { "Content-Length": String(contentLength) } : {}),
    "Content-Disposition": `${disposition}; filename="${safeFileName}"`,
    "Cache-Control": "public, max-age=31536000, immutable",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Range",
    "Accept-Ranges": "bytes",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "sandbox",
  };
}

function parseAssetId(id: string): string {
  const uuidMatch = id.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return uuidMatch ? uuidMatch[0] : id.split(".")[0];
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Range",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function HEAD(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse(null, { status: 400 });
    }

    const assetId = parseAssetId(id);

    const { data: asset, error } = await getInsforge()
      .database.from("blog_assets")
      .select("id, name, mime_type, size")
      .eq("id", assetId)
      .maybeSingle();

    if (error || !asset) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(null, {
      status: 200,
      headers: getCORSHeaders(asset.mime_type, asset.size, asset.name),
    });
  } catch (err) {
    console.error("Error serving blog asset HEAD:", err);
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing asset ID" }, { status: 400 });
    }

    const assetId = parseAssetId(id);

    const { data: asset, error } = await getInsforge()
      .database.from("blog_assets")
      .select("id, name, mime_type, size, data")
      .eq("id", assetId)
      .maybeSingle();

    if (error || !asset || !asset.data) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const buffer = Buffer.from(asset.data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: getCORSHeaders(asset.mime_type, buffer.length, asset.name),
    });
  } catch (err) {
    console.error("Error serving blog asset:", err);
    return NextResponse.json({ error: "Failed to load asset" }, { status: 500 });
  }
}
