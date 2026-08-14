import { createClient } from "@insforge/sdk";

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "https://zztrxs4z.ap-southeast.insforge.app",
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "anon_d78fdf69395515e188c068ba4ffbf17850993aaa6c4182d569ebee4ee1d6187b",
});

async function runTests() {
  console.log("=== 1. Testing InsForge database fetch ===");
  const { data: allBlogs, error: fetchErr } = await client.database
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    process.exit(1);
  }
  console.log(`Fetched ${allBlogs?.length} blogs.`);

  console.log("=== 2. Testing Blog Insertion ===");
  const testBlog = {
    slug: "test-automated-blog-post",
    category: "Engineering",
    title: "Test Blog: High-Speed Inference Architecture",
    excerpt: "A test article verifying database persistence, rich highlighting, and image formatting.",
    content: `<h2>Test Header</h2><p>This is a test paragraph with <span class="blog-highlight" style="background-color: rgb(254, 240, 138); color: rgb(113, 63, 18);">highlighted text</span> and custom code.</p>`,
    cover_image: "/ascii-magic-14.png",
    author_name: "Nimay Kulkarni",
    author_role: "Founder & AI Lead",
    read_time: "3 min read",
    featured: false,
    status: "published",
  };

  const { data: inserted, error: insertErr } = await client.database
    .from("blogs")
    .insert([testBlog])
    .select()
    .single();

  if (insertErr) {
    console.error("Insert error:", insertErr);
    process.exit(1);
  }
  console.log("Successfully inserted test blog:", inserted.id, inserted.slug);

  console.log("=== 3. Testing Single Blog Fetch by Slug ===");
  const { data: fetchedSingle, error: singleErr } = await client.database
    .from("blogs")
    .select("*")
    .eq("slug", "test-automated-blog-post")
    .single();

  if (singleErr || !fetchedSingle) {
    console.error("Fetch single error:", singleErr);
    process.exit(1);
  }
  console.log("Successfully fetched single blog:", fetchedSingle.title);

  console.log("=== 4. Testing Update / Toggle Featured ===");
  const { data: updated, error: updateErr } = await client.database
    .from("blogs")
    .update({ title: "Updated Test Blog Title", featured: true })
    .eq("id", inserted.id)
    .select()
    .single();

  if (updateErr) {
    console.error("Update error:", updateErr);
    process.exit(1);
  }
  console.log("Successfully updated blog title & featured flag:", updated.title, "featured:", updated.featured);

  console.log("=== 5. Testing Delete Blog ===");
  const { error: deleteErr } = await client.database
    .from("blogs")
    .delete()
    .eq("id", inserted.id);

  if (deleteErr) {
    console.error("Delete error:", deleteErr);
    process.exit(1);
  }
  console.log("Successfully deleted test blog.");

  console.log("=== ALL BLOG DATABASE INTEGRATION TESTS PASSED! ===");
}

runTests();
