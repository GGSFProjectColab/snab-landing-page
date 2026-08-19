import type { MetadataRoute } from "next";
import { getPublishedJobs } from "@/lib/careers";
import { getBlogPosts } from "@/lib/blogs";
import { absoluteUrl } from "@/lib/site";

const staticPages: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
  { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  { url: absoluteUrl("/careers"), changeFrequency: "weekly", priority: 0.7 },
  { url: absoluteUrl("/blogs"), changeFrequency: "weekly", priority: 0.7 },
  { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [jobs, blogs] = await Promise.all([getPublishedJobs(), getBlogPosts()]);
    return [
      ...staticPages,
      ...blogs.map((blog) => ({
        url: absoluteUrl(`/blogs/${blog.slug}`),
        lastModified: blog.updated_at || blog.published_at || blog.created_at,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...jobs.map((job) => ({
        url: absoluteUrl(`/careers/${job.slug}`),
        lastModified: job.updated_at,
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    return staticPages;
  }
}

