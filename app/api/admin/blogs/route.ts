import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import { getInsforge } from "@/lib/insforge";
import { calculateReadTime, slugify, type BlogPost } from "@/lib/blogs";

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
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ blogs: data ?? [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Could not fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await authorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { action } = body;

    if (action === "save_blog") {
      const blogData = body.blog as Partial<BlogPost>;
      if (!blogData || !blogData.title?.trim()) {
        return NextResponse.json({ error: "Blog title is required" }, { status: 400 });
      }

      const generatedSlug = blogData.slug?.trim()
        ? slugify(blogData.slug)
        : slugify(blogData.title);

      const readTime = blogData.read_time?.trim() || calculateReadTime(blogData.content || "");
      const now = new Date().toISOString();

      const payload = {
        title: blogData.title.trim(),
        slug: generatedSlug,
        category: blogData.category?.trim() || "Engineering",
        excerpt: blogData.excerpt?.trim() || "",
        content: blogData.content || "",
        cover_image: blogData.cover_image?.trim() || "/ascii-magic-14.png",
        author_name: blogData.author_name?.trim() || "SNAB Team",
        author_image: blogData.author_image?.trim() || "",
        author_role: blogData.author_role?.trim() || "",
        read_time: readTime,
        featured: Boolean(blogData.featured),
        status: blogData.status || "published",
        updated_at: now,
      };

      // If set as featured, optionally unfeature other posts so there's a primary featured post
      if (payload.featured) {
        await getInsforge().database
          .from("blogs")
          .update({ featured: false })
          .neq("id", blogData.id || "00000000-0000-0000-0000-000000000000");
      }

      let result;
      if (blogData.id) {
        // Update existing
        result = await getInsforge().database
          .from("blogs")
          .update(payload)
          .eq("id", blogData.id)
          .select()
          .single();
      } else {
        // Create new
        result = await getInsforge().database
          .from("blogs")
          .insert([{
            ...payload,
            published_at: payload.status === "published" ? now : null,
            created_at: now,
          }])
          .select()
          .single();
      }

      if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 400 });
      }

      revalidateTag("blog-posts", "max");
      revalidatePath("/blogs");
      revalidatePath(`/blogs/${generatedSlug}`);

      return NextResponse.json({ blog: result.data });
    }

    if (action === "toggle_featured") {
      const { id, featured } = body;
      if (!id) {
        return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
      }

      if (featured) {
        // Set others to false
        await getInsforge().database
          .from("blogs")
          .update({ featured: false })
          .neq("id", id);
      }

      const { data, error } = await getInsforge().database
        .from("blogs")
        .update({ featured: Boolean(featured), updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      revalidateTag("blog-posts", "max");
      revalidatePath("/blogs");

      return NextResponse.json({ blog: data });
    }

    if (action === "delete_blog") {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
      }

      const { error } = await getInsforge().database
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      revalidateTag("blog-posts", "max");
      revalidatePath("/blogs");

      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process request" }, { status: 500 });
  }
}
