import type { Metadata } from "next";
import { Manrope, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import "./footer.css";
import "./skeletons.css";
import "@/components/mdx/mdx.css";
import { cn } from "@/lib/utils";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { Providers } from "@/components/site/providers";
import { SiteHeader } from "@/components/site/site-header";
import { SiteGradualBlur } from "@/components/site/site-gradual-blur";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "SNAB Innovations | AI Product & Software Engineering",
    template: "%s | SNAB Innovations",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.name,
    title: "SNAB Innovations | AI Product & Software Engineering",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/seo/ascii-magic-21.png"),
        width: 1280,
        height: 717,
        alt: "SNAB Innovations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SNAB Innovations | AI Product & Software Engineering",
    description: siteConfig.description,
    images: [absoluteUrl("/seo/ascii-magic-21.png")],
  },
  robots: {
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
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "llm.txt": "/llm.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        bodyFont.variable,
        displayFont.variable,
        geistMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <SiteGradualBlur />
        </Providers>
      </body>
    </html>
  );
}
