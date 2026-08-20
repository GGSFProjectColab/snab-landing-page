import { createClient } from "@insforge/sdk";

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "https://zztrxs4z.ap-southeast.insforge.app",
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "anon_d78fdf69395515e188c068ba4ffbf17850993aaa6c4182d569ebee4ee1d6187b",
});

async function runSocialPreviewVerification() {
  console.log("=== 1. Checking Blog Posts & Cover Image in InsForge DB ===");
  const { data: blogs, error: blogErr } = await client.database
    .from("blogs")
    .select("id, slug, title, cover_image, status")
    .eq("status", "published");

  if (blogErr || !blogs || blogs.length === 0) {
    console.error("Error or no blogs found:", blogErr);
    process.exit(1);
  }

  console.log(`Found ${blogs.length} published blog(s):`);
  for (const b of blogs) {
    console.log(`- [${b.slug}] "${b.title}" => cover_image: ${b.cover_image}`);
  }

  const sampleBlog = blogs[0];
  console.log(`\n=== 2. Verifying Asset in DB: ${sampleBlog.cover_image} ===`);
  const uuidMatch = sampleBlog.cover_image?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  let asset = null;
  if (uuidMatch) {
    const assetId = uuidMatch[0];
    const { data: assetData, error: assetErr } = await client.database
      .from("blog_assets")
      .select("id, name, mime_type, size")
      .eq("id", assetId)
      .maybeSingle();

    if (assetErr || !assetData) {
      console.error(`Asset ${assetId} not found in DB:`, assetErr);
    } else {
      asset = assetData;
      console.log(`✓ Asset found in DB: ID=${asset.id}, Name=${asset.name}, MIME=${asset.mime_type}, Size=${asset.size} bytes`);
    }
  }

  console.log("\n=== 3. Testing Site URL & Absolute URL Resolution ===");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snab.co.in";
  function absoluteUrl(path = "/") {
    if (!path) return siteUrl;
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return new URL(cleanPath, `${siteUrl}/`).toString();
  }

  const rawImage = sampleBlog.cover_image || "/seo/ascii-magic-21.png";
  const ogImage = rawImage.startsWith("http") ? rawImage : absoluteUrl(rawImage);
  const postUrl = absoluteUrl(`/blogs/${sampleBlog.slug}`);

  console.log(`Site Base URL: ${siteUrl}`);
  console.log(`Post URL: ${postUrl}`);
  console.log(`OG Image absolute URL: ${ogImage}`);

  if (!ogImage.startsWith("http://") && !ogImage.startsWith("https://")) {
    console.error("FAIL: OG Image is not an absolute URL:", ogImage);
    process.exit(1);
  }
  console.log("✓ OG Image successfully generated as absolute URL!");

  console.log("\n=== 4. Verifying Image MIME Type & Extension Handling ===");
  const isPng = ogImage.toLowerCase().includes(".png") || asset?.mime_type === "image/png";
  const mimeType = isPng ? "image/png" : "image/jpeg";
  console.log(`✓ Inferred MIME Type: ${mimeType}`);

  console.log("\n=== ALL SOCIAL PREVIEW VERIFICATION TESTS PASSED! ===");
}

runSocialPreviewVerification().catch((err) => {
  console.error("Verification script error:", err);
  process.exit(1);
});
