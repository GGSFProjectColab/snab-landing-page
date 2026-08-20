import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/blogs/assets/", "/blog-assets/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: [
          "Twitterbot",
          "facebookexternalhit",
          "LinkedInBot",
          "WhatsApp",
          "TelegramBot",
          "Slackbot-LinkExpanding",
          "Discordbot",
          "Applebot",
        ],
        allow: ["/", "/api/blogs/assets/", "/blog-assets/"],
        disallow: ["/admin/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
