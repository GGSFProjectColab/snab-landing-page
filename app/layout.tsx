import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Geist, Geist_Mono, Instrument_Serif, Inter_Tight, Lato } from "next/font/google";
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
import { RouteCurtainTransition } from "@/components/site/route-curtain-transition";
import { FpsCounter } from "@/components/site/fps-counter";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: true });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-tight",
  display: "swap",
  preload: false,
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  preload: false,
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
        url: absoluteUrl("/seo/SEO-OG.png"),
        width: 1672,
        height: 941,
        alt: "SNAB Innovations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SNAB Innovations | AI Product & Software Engineering",
    description: siteConfig.description,
    images: [absoluteUrl("/seo/SEO-OG.png")],
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
        instrumentSerif.variable,
        interTight.variable,
        lato.variable,
        geistMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BXK7SL583E"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BXK7SL583E');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <SiteGradualBlur />
          <RouteCurtainTransition />
          <FpsCounter />
        </Providers>
      </body>
    </html>
  );
}
