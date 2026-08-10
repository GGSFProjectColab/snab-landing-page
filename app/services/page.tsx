import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata, siteConfig } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import { Footer } from "../Footer";

export const metadata: Metadata = createPageMetadata({
  title: "AI & Custom Software Development Services | SNAB Innovations",
  description:
    "Explore end-to-end AI product development, workflow automation, cloud infrastructure, tech consultancy, and custom software services.",
  path: "/services",
});

const services = [
  {
    number: "01",
    title: "Cyber Security",
    category: "SECURITY & DATA",
    description:
      "Enterprise data protection, vulnerability audits, and secure zero-trust AI workflow integrations.",
    capabilities: ["Data Security", "Vulnerability Audits", "Zero-Trust AI"],
    highlight: false,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 -10.05a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-9.665-10.826 12.083 12.083 0 01.665-6.479m9 0a12.083 12.083 0 01-9 0" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "IT Management",
    category: "AI & WORKFLOWS",
    description:
      "Intelligent automation pipelines and system management that turn manual work into self-running processes.",
    capabilities: ["Process Automation", "Document Processing", "LLM Integration"],
    highlight: true,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M15.75 3v1.5m0 15V21m-7.5-15h7.5a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 016 15.75v-7.5A2.25 2.25 0 018.25 6z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "IT Consultancy",
    category: "ADVISORY & STRATEGY",
    description:
      "Strategic software architecture reviews, feasibility studies, AI readiness, and tech stack selection.",
    capabilities: ["Architecture Planning", "AI Readiness", "Tech Stack Strategy"],
    highlight: false,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Cloud Computing",
    category: "SCALABILITY & DEVOPS",
    description:
      "Resilient cloud environments, automated deployment pipelines, serverless systems, and infrastructure.",
    capabilities: ["AWS & GCP", "Serverless Architecture", "CI/CD Pipelines"],
    highlight: false,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Software Development",
    category: "ENGINEERING",
    description:
      "Tailor-made web applications, mobile platforms, and desktop software built for performance and scale.",
    capabilities: ["Next.js & React", "Desktop Software", "Cross-Platform Mobile"],
    highlight: false,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Marketing Strategy",
    category: "GROWTH & ANALYTICS",
    description:
      "Data-driven growth engineering, product analytics, SEO optimization, and intelligent acquisition workflows.",
    capabilities: ["Product Analytics", "SEO Optimization", "Acquisition Pipelines"],
    highlight: false,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0l7.234-7.31M21 9v3.75m0-3.75h-3.75" />
      </svg>
    ),
  },
];

const processSteps = [
  { number: "01", title: "Discovery", desc: "Clarifying vision, feasibility, and project objectives." },
  { number: "02", title: "Blueprint", desc: "Mapping database schemas, API contracts, and milestones." },
  { number: "03", title: "Engineering", desc: "Writing clean code in rapid two-week demo sprints." },
  { number: "04", title: "Launch & Support", desc: "Secure cloud rollout with 24/7 logging and maintenance." },
];

export default function ServicesPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section aria-labelledby="services-hero-title">
        <ContainerWrapper>
          <div className="relative min-h-[460px] overflow-hidden sm:min-h-[540px]">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="/ascii-magic-11.png"
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[460px] flex-col justify-end p-6 sm:min-h-[540px] sm:p-10 md:p-14">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Our Services
              </p>
              <h1
                id="services-hero-title"
                className="max-w-4xl font-pixelify text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Our Mission Is To Make Your{" "}
                <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl align-middle">
                  Business
                </span>{" "}
                Better Through Technology
              </h1>
              <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                End-to-end product delivery. One accountable team to define, design, engineer, launch, and continuously scale your digital platform.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  className="bg-white px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white/90"
                  href="/contact"
                >
                  Plan your project ↗
                </a>
                <a
                  className="border border-dotted border-edge bg-transparent px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
                  href="#delivery-process"
                >
                  Explore Process ↓
                </a>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Services Grid Section (Inspired by Image's 6 Cards) */}
      <section aria-labelledby="our-services-title">
        <ContainerWrapper>
          <HeaderTitle title="Our Services" id="our-services-title" />
          <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-3">
            {services.map((service, i) => (
              <div
                className={`group flex flex-col justify-between p-5 sm:p-6 border-b border-dotted border-edge ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                  i >= 3 ? "md:border-b-0" : ""
                } ${
                  service.highlight
                    ? "bg-emerald-950/20 border-emerald-500/30"
                    : "bg-muted/10 hover:bg-muted/30 transition-colors"
                }`}
                key={service.title}
              >
                <div>
                  {/* Top row: Icon badge + Number */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dotted border-edge bg-background/80">
                      {service.icon}
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & category */}
                  <div className="mt-5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {service.category}
                    </span>
                    <h3 className="mt-1 font-pixelify text-lg font-bold sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Capabilities pills */}
                <div className="mt-6 pt-4 border-t border-dotted border-edge/60">
                  <div className="flex flex-wrap gap-1.5">
                    {service.capabilities.map((cap) => (
                      <span
                        className="rounded-sm border border-dotted border-edge px-2 py-0.5 text-[10px] text-muted-foreground"
                        key={cap}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Delivery Process */}
      <section id="delivery-process" aria-labelledby="process-title">
        <ContainerWrapper>
          <HeaderTitle title="Delivery Process" id="process-title" />
          <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <div
                className={`p-5 sm:p-6 border-b border-dotted border-edge last:border-b-0 sm:border-b-0 ${
                  idx < processSteps.length - 1 ? "md:border-r" : ""
                }`}
                key={step.number}
              >
                <span className="font-mono text-xs text-emerald-400">
                  {step.number}
                </span>
                <h3 className="mt-2 font-pixelify text-base font-bold sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* CTA Section */}
      <section aria-labelledby="services-cta-title">
        <ContainerWrapper>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="/ascii-magic-11.png"
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 p-6 sm:items-center sm:text-center sm:py-10 md:px-12">
              <h2
                id="services-cta-title"
                className="max-w-xl font-pixelify text-2xl font-bold sm:text-3xl"
              >
                Bring us the idea.<br />We&apos;ll build the path.
              </h2>
              <a
                className="bg-white px-5 py-2.5 text-xs font-medium text-black transition-all hover:bg-white/90"
                href="/contact"
              >
                Start with discovery ↗
              </a>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Footer */}
      <Footer />
    </main>
  );
}

