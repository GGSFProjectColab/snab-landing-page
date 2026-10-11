import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  Code2,
  HelpCircle,
  Play,
} from "lucide-react";
import { createPageMetadata, siteConfig } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { Footer } from "../../Footer";
import { HeaderTitle } from "@/components/profile/header-title";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PRODUCTS, getProductBySlug, getAllProductSlugs } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | SNAB Innovations",
    };
  }

  const pageMeta = createPageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/work/${product.slug}`,
  });

  return {
    ...pageMeta,
    keywords: product.seo.keywords,
    alternates: {
      canonical: `${siteConfig.url}/work/${product.slug}`,
    },
    openGraph: {
      ...pageMeta.openGraph,
      title: product.seo.title,
      description: product.seo.description,
      url: `${siteConfig.url}/work/${product.slug}`,
      type: "website",
      images: [
        {
          url: product.image.startsWith("http") ? product.image : `${siteConfig.url}${product.image}`,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: [product.image.startsWith("http") ? product.image : `${siteConfig.url}${product.image}`],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug);

  const categoryMap: Record<string, string> = {
    interviewxpert: "BusinessApplication, DeveloperApplication",
    notaryxpert: "BusinessApplication, LegalApplication",
    "nyaya-ai": "BusinessApplication, LegalApplication",
    termy: "DeveloperApplication, UtilityApplication",
    filezenith: "UtilityApplication, MultimediaApplication",
    feekit: "FinanceApplication, BusinessApplication",
  };

  const productImageUrl = product.image.startsWith("http")
    ? product.image
    : `${siteConfig.url}${product.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/work/${product.slug}#software`,
        name: product.name,
        headline: product.headline,
        description: product.description,
        applicationCategory: categoryMap[product.slug] || "BusinessApplication",
        operatingSystem: "Web, Cloud, Cross-Platform",
        softwareVersion: "2.0",
        image: productImageUrl,
        screenshot: productImageUrl,
        featureList: product.capabilities,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "48",
          bestRating: "5",
          worstRating: "1",
        },
        author: product.leadEngineer
          ? {
              "@type": "Person",
              name: product.leadEngineer.replace(/\s*\(.*\)/, "").trim(),
              jobTitle: product.engineerProfile ? product.engineerProfile.role : "Lead Engineer",
              url:
                product.leadEngineerUrl ||
                (product.engineerProfile ? "https://aaradhyadev.vercel.app/" : undefined),
              sameAs: product.leadEngineerUrl
                ? [product.leadEngineerUrl]
                : product.engineerProfile
                  ? [
                      "https://aaradhyadev.vercel.app/",
                      "https://www.linkedin.com/in/aaradhyapathak17",
                      "https://x.com/aaradhya1774",
                      "https://github.com/AaradhyaproK",
                    ]
                  : undefined,
              worksFor: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
            }
          : {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
        ...(product.contributors && product.contributors.length > 0
          ? {
              contributor: product.contributors.map((c) => ({
                "@type": "Person",
                name: c.name,
                jobTitle: c.role || "Contributor",
                url: c.url,
                sameAs: c.url ? [c.url] : undefined,
                worksFor: {
                  "@type": "Organization",
                  name: siteConfig.name,
                  url: siteConfig.url,
                },
              })),
            }
          : {}),
        creator: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: `${siteConfig.url}/work/${product.slug}`,
        sameAs: product.link ? [product.link] : undefined,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/work/${product.slug}#webpage`,
        url: `${siteConfig.url}/work/${product.slug}`,
        name: product.seo.title,
        description: product.seo.description,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.url}/#website`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
        breadcrumb: {
          "@id": `${siteConfig.url}/work/${product.slug}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${siteConfig.url}/work/${product.slug}#software`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/work/${product.slug}#faq`,
        mainEntity: product.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/work/${product.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${siteConfig.url}/work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${siteConfig.url}/work/${product.slug}`,
          },
        ],
      },
      ...(product.videoEmbed
        ? [
            {
              "@type": "VideoObject",
              "@id": `${siteConfig.url}/work/${product.slug}#video`,
              name: product.videoEmbed.title,
              description: product.videoEmbed.description || product.summary,
              thumbnailUrl: `https://img.youtube.com/vi/${product.videoEmbed.youtubeId}/maxresdefault.jpg`,
              uploadDate: "2024-01-01T00:00:00+05:30",
              contentUrl: `https://www.youtube.com/watch?v=${product.videoEmbed.youtubeId}`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${product.videoEmbed.youtubeId}`,
              publisher: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
            },
          ]
        : []),
      ...(product.leadEngineer && product.leadEngineerUrl && !product.engineerProfile
        ? [
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/team/${product.leadEngineer.toLowerCase().replace(/[^a-z0-9]+/g, "-")}#person`,
              name: product.leadEngineer.replace(/\s*\(.*\)/, "").trim(),
              jobTitle: "Lead Engineer",
              url: product.leadEngineerUrl,
              sameAs: [product.leadEngineerUrl],
              worksFor: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
            },
          ]
        : []),
      ...(product.contributors
        ? product.contributors.map((c) => ({
            "@type": "Person",
            "@id": `${siteConfig.url}/team/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}#person`,
            name: c.name,
            jobTitle: c.role || "Contributor",
            url: c.url,
            sameAs: c.url ? [c.url] : undefined,
            worksFor: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }))
        : []),
      ...(product.engineerProfile
        ? [
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/team/aaradhya-pathak#person`,
              name: product.engineerProfile.name,
              jobTitle: product.engineerProfile.role,
              description: product.engineerProfile.bio,
              worksFor: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
              url: "https://aaradhyadev.vercel.app/",
              sameAs: [
                "https://aaradhyadev.vercel.app/",
                "https://www.linkedin.com/in/aaradhyapathak17",
                "https://x.com/aaradhya1774",
                "https://github.com/AaradhyaproK",
              ],
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Schema.org Structured Data for SEO (SoftwareApplication + FAQPage + BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        {/* ── Breadcrumb & Navigation Bar ─────────────────── */}
        <div className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="flex items-center justify-between py-3 px-4 sm:px-8 md:px-14">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 font-mono text-caption uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                <span>Back to All Work</span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="font-mono text-caption text-muted-foreground/60 hidden sm:inline">
                  / systems / {product.slug} /
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase text-teal">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                  {product.status}
                </span>
              </div>
            </div>
          </ContainerWrapper>
        </div>

        {/* ── Hero Showcase Header ────────────────────────── */}
        <section aria-labelledby="product-title" className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="p-6 sm:p-10 md:p-14">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-caption text-teal uppercase tracking-widest">
                  SYS-{product.number}
                </span>
                <span className="text-edge" aria-hidden="true">•</span>
                <span className="font-mono text-caption text-muted-foreground uppercase tracking-widest">
                  {product.categories.slice(0, 2).join(" // ")}
                </span>
              </div>

              <TextGenerateEffect
                as="h1"
                id="product-title"
                className="text-display font-normal tracking-tight text-foreground"
                staggerDuration={0.08}
                transition={{ duration: 0.55 }}
              >
                {product.name}
              </TextGenerateEffect>

              <p className="mt-4 max-w-3xl text-title font-normal text-muted-foreground leading-relaxed">
                {product.headline}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {product.link ? (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-caption uppercase tracking-wider px-5 py-2.5 transition-opacity hover:opacity-90 shadow-sm"
                  >
                    <span>Visit Live System</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                ) : null}

                {product.videoEmbed ? (
                  <a
                    href="#video-walkthrough"
                    className="inline-flex items-center gap-2 border border-dotted border-teal/40 bg-teal/5 text-teal font-mono text-caption uppercase tracking-wider px-5 py-2.5 transition-all hover:bg-teal/10 hover:border-teal/60"
                  >
                    <Play size={12} aria-hidden="true" className="fill-current" />
                    <span>Watch Demo</span>
                  </a>
                ) : null}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-dotted border-edge font-mono text-caption uppercase tracking-wider px-5 py-2.5 text-foreground transition-all hover:bg-accent hover:border-foreground/20"
                >
                  <span>Build with SNAB</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* ── Split Architecture & Overview ───────────────── */}
        <section aria-labelledby="overview-title" className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-dotted divide-edge">
              {/* Left Column: Deep Overview */}
              <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 flex flex-col gap-10">
                {/* Executive Summary */}
                <div>
                  <h2
                    id="overview-title"
                    className="font-mono text-caption uppercase tracking-widest text-primary mb-3"
                  >
                    / executive summary /
                  </h2>
                  <p className="text-body leading-relaxed text-foreground/90">
                    {product.summary}
                  </p>
                  <p className="mt-4 text-body leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-dotted border-edge">
                  <div className="rounded-md border border-dotted border-edge/80 p-5 bg-card/20">
                    <span className="font-mono text-caption uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
                      <Cpu size={14} className="text-primary" />
                      The Challenge
                    </span>
                    <p className="text-label text-muted-foreground leading-relaxed">
                      {product.problemStatement}
                    </p>
                  </div>

                  <div className="rounded-md border border-dotted border-teal/40 p-5 bg-teal/5">
                    <span className="font-mono text-caption uppercase tracking-wider text-teal flex items-center gap-1.5 mb-2">
                      <Zap size={14} className="text-teal" />
                      Engineered Solution
                    </span>
                    <p className="text-label text-foreground/90 leading-relaxed">
                      {product.solution}
                    </p>
                  </div>
                </div>

                {/* Production Metrics */}
                {product.metrics.length > 0 ? (
                  <div>
                    <h3 className="font-mono text-caption uppercase tracking-widest text-primary mb-4">
                      / validated production metrics /
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {product.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-md border border-dotted border-edge p-4 bg-accent/15"
                        >
                          <div className="text-title font-semibold text-foreground">
                            {metric.value}
                          </div>
                          <div className="mt-1 font-mono text-caption uppercase text-muted-foreground">
                            {metric.label}
                          </div>
                          <div className="mt-1 text-label text-muted-foreground/80 leading-normal">
                            {metric.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Attribution note */}
                {product.attribution ? (
                  <div className="rounded-md border border-dotted border-teal/40 bg-teal/5 p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <ShieldCheck size={18} className="text-teal shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-caption uppercase text-teal font-medium tracking-wide">
                          Verified Studio Attribution
                        </p>
                        <p className="mt-1 text-label text-foreground/90 leading-relaxed">
                          {product.attribution}
                        </p>
                      </div>
                    </div>

                    {/* Social profiles if available on attribution */}
                    {product.engineerProfile ? (
                      <div className="pt-3 border-t border-dotted border-teal/20 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] uppercase text-muted-foreground mr-1">
                          Engineer Links:
                        </span>
                        {product.engineerProfile.links.map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded border border-dotted border-edge bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground hover:text-teal hover:border-teal/40 transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={10} className="opacity-60" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* Right Column: Visual Preview & Specs Sidebar */}
              <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 flex flex-col gap-8 bg-card/10">
                {/* Visual Preview Box */}
                <div>
                  <span className="font-mono text-caption uppercase tracking-widest text-muted-foreground mb-3 block">
                    / system preview /
                  </span>
                  <div className="relative h-[260px] sm:h-[300px] w-full overflow-hidden rounded-lg border border-dotted border-edge p-3 bg-accent/20">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 10px)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-md flex items-center justify-center">
                      <Image
                        className={`h-full w-full ${product.contain ? "object-contain" : "object-cover object-top"} ${product.imageDark ? "block dark:hidden" : ""} ${product.imagePadding ?? ""}`}
                        src={product.image}
                        alt={product.imageAlt}
                        width={600}
                        height={600}
                        priority
                      />
                      {product.imageDark ? (
                        <Image
                          className={`h-full w-full ${product.contain ? "object-contain" : "object-cover object-top"} hidden dark:block ${product.imagePadding ?? ""}`}
                          src={product.imageDark}
                          alt={product.imageAlt}
                          width={600}
                          height={600}
                          priority
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Specs Metadata Table */}
                <div className="divide-y divide-dotted divide-edge border-y border-dotted border-edge">
                  <div className="py-2.5 flex items-center justify-between text-label">
                    <span className="font-mono text-caption uppercase text-muted-foreground">Engineering Firm</span>
                    <span className="font-medium text-foreground">SNAB Innovations, Nashik</span>
                  </div>
                  {product.leadEngineer ? (
                    <div className="py-2.5 flex items-center justify-between text-label">
                      <span className="font-mono text-caption uppercase text-muted-foreground">Lead Engineer</span>
                      {product.leadEngineerUrl ? (
                        <a
                          href={product.leadEngineerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-teal underline underline-offset-4 decoration-dotted font-mono text-caption inline-flex items-center gap-1"
                        >
                          <span>{product.leadEngineer}</span>
                          <ExternalLink size={10} className="opacity-70" aria-hidden="true" />
                        </a>
                      ) : product.engineerProfile ? (
                        <a
                          href="https://www.linkedin.com/in/aaradhyapathak17"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-teal underline underline-offset-4 decoration-dotted font-mono text-caption inline-flex items-center gap-1"
                        >
                          <span>{product.leadEngineer}</span>
                          <ExternalLink size={10} className="opacity-70" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{product.leadEngineer}</span>
                      )}
                    </div>
                  ) : null}
                  {product.contributors && product.contributors.length > 0 ? (
                    <div className="py-2.5 flex items-center justify-between text-label">
                      <span className="font-mono text-caption uppercase text-muted-foreground">
                        {product.contributors.length > 1 ? "Contributors" : "Contributor"}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 justify-end">
                        {product.contributors.map((c) =>
                          c.url ? (
                            <a
                              key={c.name}
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-foreground hover:text-teal underline underline-offset-4 decoration-dotted font-mono text-caption inline-flex items-center gap-1"
                            >
                              <span>{c.name}</span>
                              <ExternalLink size={10} className="opacity-70" aria-hidden="true" />
                            </a>
                          ) : (
                            <span key={c.name} className="font-medium text-foreground font-mono text-caption">
                              {c.name}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ) : null}
                  <div className="py-2.5 flex items-center justify-between text-label">
                    <span className="font-mono text-caption uppercase text-muted-foreground">Status</span>
                    <span className="font-medium text-teal flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                      Active Production
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between text-label">
                    <span className="font-mono text-caption uppercase text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{product.categories[0]}</span>
                  </div>
                  {product.link ? (
                    <div className="py-2.5 flex items-center justify-between text-label">
                      <span className="font-mono text-caption uppercase text-muted-foreground">Domain</span>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-teal underline underline-offset-4 decoration-dotted font-mono text-caption"
                      >
                        {product.link.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                      </a>
                    </div>
                  ) : null}
                </div>

                {/* Technology Stack Groups */}
                <div>
                  <h4 className="font-mono text-caption uppercase tracking-widest text-primary mb-3">
                    / technology stack /
                  </h4>
                  <div className="space-y-3">
                    {product.techStack.map((stack) => (
                      <div key={stack.category}>
                        <span className="text-[11px] font-mono uppercase text-muted-foreground">
                          {stack.category}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {stack.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-dotted border-edge px-2 py-0.5 font-mono text-[11px] text-foreground/80 bg-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* ── Key Features Matrix ─────────────────────────── */}
        <section aria-labelledby="features-title" className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="p-6 sm:p-10 md:p-14">
              <HeaderTitle title="Core Capabilities & Engine Features" id="features-title" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {product.features.map((feature, idx) => (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-dotted border-edge p-6 bg-card/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-caption text-teal">
                          0{idx + 1}
                        </span>
                        <Code2 size={16} className="text-muted-foreground/60" />
                      </div>
                      <h3 className="text-title font-normal text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-label text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* ── Architectural Safeguards & Highlights ────────── */}
        <section aria-labelledby="architecture-title" className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="p-6 sm:p-10 md:p-14">
              <HeaderTitle title="Systems Architecture & Engineering Highlights" id="architecture-title" />
              <div className="mt-6 space-y-3">
                {product.architectureHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-md border border-dotted border-edge/80 p-4 bg-accent/10"
                  >
                    <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                    <p className="text-body text-foreground/90 leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* ── System Video Walkthrough & Live Demo ─────────── */}
        {product.videoEmbed ? (
          <section id="video-walkthrough" aria-labelledby="video-demo-title" className="border-b border-dotted border-edge py-4 sm:py-6">
            <ContainerWrapper>
              <div className="p-6 sm:p-10 md:p-14">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                  <span className="font-mono text-caption uppercase tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                    / system walkthrough & live demo /
                  </span>
                  <HeaderTitle title={`See ${product.name} in Action`} id="video-demo-title" />
                  {product.videoEmbed.description ? (
                    <p className="text-body text-muted-foreground mt-2 leading-relaxed">
                      {product.videoEmbed.description}
                    </p>
                  ) : null}
                </div>

                {/* Laptop Mockup Device Frame */}
                <div className="max-w-4xl mx-auto px-1 sm:px-4">
                  {/* Laptop Lid (Screen Bezel) */}
                  <div className="relative rounded-t-2xl sm:rounded-t-[28px] border border-neutral-700/80 dark:border-neutral-700/70 bg-neutral-950 p-2.5 sm:p-4 pb-2 sm:pb-3 shadow-2xl">
                    {/* Top Bezel with Camera */}
                    <div className="flex items-center justify-center pb-2 pt-0.5 sm:pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-neutral-900 border border-neutral-700/90 flex items-center justify-center">
                          <span className="h-1 w-1 rounded-full bg-teal/70" />
                        </span>
                      </div>
                    </div>

                    {/* Screen Glass & Video Player */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl border border-neutral-800/90 bg-black shadow-inner">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${product.videoEmbed.youtubeId}?rel=0&modestbranding=1`}
                        title={product.videoEmbed.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>

                  {/* Laptop Base (Chassis Deck & Opening Notch) */}
                  <div className="relative -mt-0.5 w-full">
                    <div className="h-3.5 sm:h-5 w-full rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 border-x border-b border-neutral-700/80 shadow-lg flex items-start justify-center">
                      <div className="w-20 sm:w-28 h-1.5 sm:h-2 rounded-b-md bg-neutral-950/90 border-b border-neutral-600/50" />
                    </div>
                    {/* Ambient Contact Shadow */}
                    <div className="mx-auto w-[88%] h-4 sm:h-5 bg-black/50 blur-md rounded-full -mt-1" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </ContainerWrapper>
          </section>
        ) : null}

        {/* ── Frequently Asked Questions (FAQ) ─────────────── */}
        <section id="faq" aria-labelledby="faq-title" className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="p-6 sm:p-10 md:p-14">
              <div className="flex flex-col gap-2 mb-8">
                <span className="font-mono text-caption uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <HelpCircle size={13} className="text-teal" />
                  / knowledge base & answers /
                </span>
                <HeaderTitle title={`Frequently Asked Questions: ${product.name}`} id="faq-title" />
                <p className="text-body text-muted-foreground max-w-2xl mt-1">
                  Key technical, security, architecture, and deployment questions regarding {product.name} engineered by SNAB Innovations.
                </p>
              </div>

              <div className="rounded-lg border border-dotted border-edge divide-y divide-dotted divide-edge bg-card/10">
                {product.faqs.map((faq, index) => (
                  <details
                    key={faq.question}
                    className="group p-5 sm:p-6 transition-colors hover:bg-card/25 open:bg-card/20"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-normal text-body sm:text-title text-foreground">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-caption text-teal pt-0.5 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-medium text-foreground group-hover:text-teal transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className="font-mono text-title text-muted-foreground transition-transform duration-200 group-open:rotate-45 shrink-0 select-none ml-2"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <div className="mt-3 pl-8 sm:pl-10 text-body leading-relaxed text-muted-foreground border-t border-dotted border-edge/40 pt-3">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* ── Related Studio Systems ──────────────────────── */}
        <section aria-labelledby="related-title" className="border-b border-dotted border-edge">
          <ContainerWrapper>
            <div className="p-6 sm:p-10 md:p-14">
              <div className="flex items-center justify-between mb-6">
                <HeaderTitle title="Explore Other Systems Built by SNAB" id="related-title" />
                <Link
                  href="/work"
                  className="font-mono text-caption uppercase text-muted-foreground hover:text-foreground hidden sm:inline"
                >
                  View All ({PRODUCTS.length}) ↗
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherProducts.slice(0, 3).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/work/${item.slug}`}
                    className="group rounded-lg border border-dotted border-edge p-5 bg-card/15 transition-all hover:bg-accent/25 hover:border-foreground/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-caption font-mono text-muted-foreground mb-2">
                        <span>SYS-{item.number}</span>
                        <span className="text-teal">• Live</span>
                      </div>
                      <h4 className="text-title font-normal text-foreground group-hover:text-teal transition-colors">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-label text-muted-foreground line-clamp-2">
                        {item.tagline}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dotted border-edge/60 flex items-center justify-between font-mono text-caption uppercase text-muted-foreground group-hover:text-foreground">
                      <span>View Deep-Dive</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* ── CTA Consultation ─────────────────────────────── */}
        <section aria-labelledby="cta-title">
          <ContainerWrapper>
            <div className="p-8 sm:p-14 md:p-20 text-center flex flex-col items-center">
              <span className="font-mono text-caption uppercase tracking-widest text-primary mb-2">
                / engineering consultation /
              </span>
              <h2 id="cta-title" className="text-subheading sm:text-heading font-normal text-foreground max-w-2xl">
                Need a production-grade system engineered for your team?
              </h2>
              <p className="mt-4 max-w-xl text-body text-muted-foreground leading-relaxed">
                Whether automating intricate operational pipelines, training enterprise AI models, or deploying resilient web products—we deliver dependable software built to endure.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-caption uppercase tracking-wider px-6 py-3 transition-opacity hover:opacity-90"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-dotted border-edge font-mono text-caption uppercase tracking-wider px-6 py-3 text-foreground transition-all hover:bg-accent hover:border-foreground/20"
                >
                  <span>Explore Capabilities</span>
                </Link>
              </div>
            </div>
          </ContainerWrapper>
        </section>
      </div>

      <Footer />
    </main>
  );
}
