import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../Footer";
import { createPageMetadata, siteConfig } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Software Products & Intelligent Systems | SNAB Innovations",
    description:
      "Explore proprietary software platforms and developer tools engineered by SNAB Innovations in Nashik, including InterviewXpert, NotaryXpert, Hire Excellence, Termy, FileZenith, and FeeKit.",
    path: "/work",
  }),
  keywords: [
    "SNAB Innovations products",
    "SNAB Innovations work",
    "SNAB software systems",
    "InterviewXpert SNAB",
    "NotaryXpert SNAB",
    "Hire Excellence SNAB",
    "Termy SNAB",
    "FileZenith SNAB",
    "FeeKit SNAB",
    "software engineering studio Nashik",
    "production AI systems",
    "workflow automation platforms India",
    "developer tools India",
  ],
};

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/work#collection`,
        url: `${siteConfig.url}/work`,
        name: "Software Products & Intelligent Systems | SNAB Innovations",
        description:
          "Proprietary software platforms and developer tools engineered by SNAB Innovations, including InterviewXpert, NotaryXpert, Hire Excellence, Termy, FileZenith, and FeeKit.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.url}/#website`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
        about: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: PRODUCTS.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            description: item.summary,
            url: `${siteConfig.url}/work/${item.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/work#breadcrumb`,
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
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Schema.org CollectionPage & ItemList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section aria-labelledby="work-hero-title">
        <ContainerWrapper>
          <div className="border-b border-dotted border-edge p-6 sm:p-10 md:p-14">
            <span className="font-mono text-caption text-muted-foreground uppercase tracking-widest">
              PORTFOLIO // SELECTED SYSTEMS
            </span>
            <h1
              id="work-hero-title"
              className="mt-3 text-display font-normal"
            >
              Built for real-world operations<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted-foreground">
              A collection of AI products, enterprise automation platforms, and software systems engineered for high-impact professional workflows.
            </p>
          </div>
        </ContainerWrapper>
      </section>

      {/* Main Work Showcase List */}
      <section aria-labelledby="selected-work-title">
        <ContainerWrapper>
          <HeaderTitle title="Products & Systems Built by Snab Innovations" id="selected-work-title" />

          <div className="divide-y divide-dotted border-b border-dotted border-edge divide-edge">
            {PRODUCTS.map((item) => (
              <div
                key={item.number}
                className="group p-4 sm:p-6 md:p-8 md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center"
              >
                {/* Information Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Index & Status */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-caption text-muted-foreground">
                        {item.number}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                        <span className="font-mono text-caption text-muted-foreground">
                          {item.status}
                        </span>
                      </span>
                    </div>

                    {/* Title with link to dedicated deep-dive page */}
                    <h2 className="mt-2 work-card-title tracking-tight">
                      <Link
                        href={`/work/${item.slug}`}
                        className="hover:text-teal transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h2>

                    {/* Category Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-sm border border-dotted border-edge px-2 py-0.5 font-mono text-caption text-muted-foreground"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-4 max-w-xl text-body leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Capabilities list */}
                    <div className="mt-4 border-t border-dotted border-edge pt-2.5">
                      <span className="block font-mono text-[11px] leading-relaxed text-muted-foreground/60">
                        {item.capabilities.join(" • ")}
                      </span>
                    </div>
                  </div>

                  {/* Action Links: Dedicated Page + Optional Live URL */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-button font-medium text-foreground transition-colors hover:text-teal"
                    >
                      <span>View system details</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-caption uppercase text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span>Visit live site</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Visual Preview Column */}
                <div className="mt-6 md:mt-0 flex justify-center">
                  <Link
                    href={`/work/${item.slug}`}
                    aria-label={`View ${item.name} details`}
                    className="relative h-[220px] w-full max-w-[280px] sm:max-w-[320px] md:h-[240px] md:w-[240px] overflow-hidden rounded-[10px] border border-dotted border-edge p-2 bg-accent/20 transition-all group-hover:border-teal/50 hover:border-teal/50"
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 10px)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-[6px]">
                      <Image
                        className={`h-full w-full ${item.contain ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-105 ${item.imageDark ? "block dark:hidden" : ""} ${item.imagePadding ?? ""}`}
                        src={item.image}
                        alt={item.imageAlt}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                      {item.imageDark ? (
                        <Image
                          className={`h-full w-full ${item.contain ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-105 hidden dark:block ${item.imagePadding ?? ""}`}
                          src={item.imageDark}
                          alt={item.imageAlt}
                          width={400}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 240px"
                        />
                      ) : null}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}
