import type { MetadataRoute } from "next";
import { getPublishedJobs } from "@/lib/careers";
import { absoluteUrl } from "@/lib/site";

const staticPages: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
  { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
  { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  { url: absoluteUrl("/careers"), changeFrequency: "weekly", priority: 0.7 },
  { url: absoluteUrl("/blogs"), changeFrequency: "monthly", priority: 0.7 },
  {
    url: absoluteUrl("/blogs/ai-product-development"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const jobs = await getPublishedJobs();
    return [
      ...staticPages,
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

