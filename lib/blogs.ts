import { unstable_cache } from "next/cache";
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

async function fetchPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await getInsforge().database
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("published_at", { ascending: false });

    if (error || !data) {
      console.warn("Could not load blogs from database:", error?.message);
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

async function fetchPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await getInsforge().database
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const blog = data as BlogPost;
    return {
      ...blog,
      cover_image: blog.cover_image || "/seo/ascii-magic-21.png",
    };
  } catch (err) {
    console.error("Error fetching blog by slug from InsForge:", err);
    return null;
  }
}

export const getBlogPosts = unstable_cache(fetchPublishedBlogPosts, ["published-blog-posts"], {
  revalidate: 60,
  tags: ["blog-posts"],
});

export const getBlogPostBySlug = unstable_cache(fetchPublishedBlogPostBySlug, ["published-blog-post-slug"], {
  revalidate: 60,
  tags: ["blog-posts"],
});

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
