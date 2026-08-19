import { getInsforge } from "./insforge";

export type BlogStatus = "draft" | "published" | "archived";

export type BlogPost = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  author_image?: string | null;
  author_role?: string | null;
  read_time: string;
  featured: boolean;
  status: BlogStatus;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await getInsforge().database
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("published_at", { ascending: false });

    if (error || !data) {
      console.error("Could not load blogs from database:", error?.message || "No data returned");
      return [];
    }

    return (data as BlogPost[]).map((blog) => ({
      ...blog,
      cover_image: blog.cover_image || "/seo/ascii-magic-21.png",
    }));
  } catch (err) {
    console.error("Error fetching blogs from InsForge:", err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await getInsforge().database
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) {
        console.error(`Error fetching blog by slug "${slug}" from InsForge:`, error.message);
      }
      return null;
    }

    const blog = data as BlogPost;
    return {
      ...blog,
      cover_image: blog.cover_image || "/seo/ascii-magic-21.png",
    };
  } catch (err) {
    console.error(`Error fetching blog by slug "${slug}" from InsForge:`, err);
    return null;
  }
}

export function calculateReadTime(text: string): string {
  const plainText = text.replace(/<[^>]+>/g, " ").trim();
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
