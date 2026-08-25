import type { Metadata } from "next";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }
  return "https://snab.co.in";
};

export const siteConfig = {
  name: "SNAB Innovations",
  shortName: "SNAB",
  url: getBaseUrl().replace(/\/$/, ""),
  description:
    "SNAB Innovations designs and engineers intelligent platforms, workflow orchestration, web products, and mobile apps from Nashik, India.",
  location: {
    locality: "Nashik",
    region: "Maharashtra",
    postalCode: "422005",
    country: "IN",
  },
  email: "hello@snab.co.in",
  links: {
    twitter: "https://x.com/snabInnovations",
    linkedin: "https://www.linkedin.com/company/snab-innovations/posts/?feedView=all",
    instagram: "https://instagram.com/snabinnovations",
    youtube: "https://youtube.com/@snabinnovations",
  },
} as const;

export function absoluteUrl(path = "/") {
  if (!path) return siteConfig.url;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleanPath, `${siteConfig.url}/`).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        {
          url: absoluteUrl("/seo/SEO-OG.png"),
          width: 1672,
          height: 941,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/seo/SEO-OG.png")],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          nosnippet: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
