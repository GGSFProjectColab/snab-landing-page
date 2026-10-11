import type { MetadataRoute } from "next";
import { getPublishedJobs } from "@/lib/careers";
import { getBlogPosts } from "@/lib/blogs";
import { absoluteUrl } from "@/lib/site";
import { getAllProductSlugs } from "@/data/products";

const now = new Date();

const staticPages: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ...getAllProductSlugs().map((slug) => ({
    url: absoluteUrl(`/work/${slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  })),
  { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  { url: absoluteUrl("/blogs"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  { url: absoluteUrl("/careers"), lastModified: now, changeFrequency: "weekly", priority: 0.75 },
  { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [jobs, blogs] = await Promise.all([getPublishedJobs(), getBlogPosts()]);
    return [
      ...staticPages,
      ...blogs.map((blog) => ({
        url: absoluteUrl(`/blogs/${blog.slug}`),
        lastModified: blog.updated_at ? new Date(blog.updated_at) : (blog.published_at ? new Date(blog.published_at) : now),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...jobs.map((job) => ({
        url: absoluteUrl(`/careers/${job.slug}`),
        lastModified: job.updated_at ? new Date(job.updated_at) : now,
        changeFrequency: "daily" as const,
        priority: 0.75,
      })),
    ];
  } catch {
    return staticPages;
  }
}
