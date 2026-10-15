import type { Metadata } from "next";
import Script from "next/script";
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
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "SNAB Innovations — Software Development Company in Nashik",
    template: "%s | SNAB Innovations",
  },
  description: siteConfig.description,
  keywords: [
    "software company in nashik",
    "software development company in nashik",
    "best software company in nashik",
    "custom software development company nashik",
    "top software development company in nashik",
    "software development agency in nashik",
    "software developers in nashik",
    "it company in nashik",
    "web development company in nashik",
    "mobile app development company in nashik",
    "snab innovations",
    "snab innovation",
    "snab innovations nashik",
    "snab",
    "hire software developers in nashik",
    "custom software development company",
    "ai software development company",
    "software engineering studio nashik",
  ],
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
    title: "SNAB Innovations — Software Development Company in Nashik",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/seo/SEO-OG.png"),
        width: 1672,
        height: 941,
        alt: "SNAB Innovations — Software Development Company in Nashik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SNAB Innovations — Software Development Company in Nashik",
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
        geistMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        {/* Google Fonts for display typography (loaded via CDN with preconnect to prevent Turbopack build crashes) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;700&family=Lato:wght@400;700&display=swap"
        />

        {/* How-We-Work lotties are self-hosted: preload the first (above-the-fold
            for that section) so download starts with page load, not on scroll.
            Rest are idle-prefetched by StackingHowWeWork. */}
        <link
          rel="preload"
          href="/lottie/step-01.lottie"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link rel="prefetch" href="/lottie/step-02.lottie" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/lottie/step-03.lottie" as="fetch" crossOrigin="anonymous" />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKJ87R7J');`}
        </Script>
        {/* End Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKJ87R7J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <SiteHeader />
          {children}
          <SiteGradualBlur />
          <FpsCounter />
        </Providers>
      </body>
    </html>
  );
}
