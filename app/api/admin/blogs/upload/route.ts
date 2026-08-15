import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import { getInsforge } from "@/lib/insforge";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxFileSize = 2 * 1024 * 1024; // 2MB max
    if (file.size > maxFileSize) {
      return NextResponse.json({ error: "File size exceeds 2 MB limit. Please upload an image under 2 MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const mimeType = file.type || "image/jpeg";

    // 1. First attempt: Upload to database-backed blog_assets table for 100% reliable serverless delivery
    const base64Data = buffer.toString("base64");
    const { data: assetData, error: dbError } = await getInsforge()
      .database.from("blog_assets")
      .insert([
        {
          name: safeName,
          mime_type: mimeType,
          size: file.size,
          data: base64Data,
        },
      ])
      .select()
      .single();

    if (!dbError && assetData?.id) {
      const publicUrl = `/api/blogs/assets/${assetData.id}`;
      return NextResponse.json({
        url: publicUrl,
        fileName: safeName,
        size: file.size,
        type: mimeType,
      });
    }

    // 2. Fallback attempt: Upload to InsForge Storage bucket
    try {
      const { data: storageData, error: storageError } = await getInsforge()
        .storage.from("blog-assets")
        .uploadAuto(file);

      if (!storageError && storageData?.url) {
        return NextResponse.json({
          url: storageData.url,
          fileName: safeName,
          size: file.size,
          type: mimeType,
        });
      }
    } catch (storageErr) {
      console.warn("InsForge storage fallback error:", storageErr);
    }

    if (dbError) {
      throw new Error(dbError.message || "Failed to save file to database storage.");
    }

    throw new Error("Failed to store image.");
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload file" }, { status: 500 });
  }
}

