import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeFooter } from "./HomeFooter";
import { Hero } from "@/components/ui/animated-hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import { CloudShader } from "@/components/ui/cloud-shader";
import FluidOrb from "@/components/ui/fluid-orb";
import { AIWorkflowFlow } from "@/components/ui/ai-workflow-flow";
import { Globe } from "@/components/ui/globe";
import Svg1 from "@/components/pixel-perfect/svg-1";
import Svg4 from "@/components/pixel-perfect/svg-4";
import { WeaveCanvas } from "@/components/ui/weave-canvas";
import Svg9 from "@/components/pixel-perfect/svg-9";
import { TechStackCloud } from "./TechStackCloud";
import { DottedMap } from "@/components/ui/dotted-map";
import { FeatureSteps } from "@/components/ui/feature-section";
import { homeFaqs } from "@/lib/faqs";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/site";
import { AskAiSection } from "./AskAiSection";
import { ServicesSection } from "./ServicesSection";

export const metadata: Metadata = createPageMetadata({
  title: "AI Product & Custom Software Development | SNAB Innovations",
  description:
    "Build AI products, workflow automation, web platforms, apps, and custom software with SNAB Innovations, an AI product engineering studio in Nashik, India.",
  path: "/",
});

const projects = [
  {
    number: "01",
    name: "Interview Expert",
    categories: ["INTERVIEW AUTOMATION", "AI PRODUCT", "WORKFLOW SOFTWARE"],
    description:
      "An AI-enabled platform that helps teams organize interview workflows, reduce administrative work, and turn interview information into structured, actionable records.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Summaries",
      "Evaluation Support",
    ],
    image: "/interviewxpert.png",
    imageAlt: "Interview Expert mark",
  },
  {
    number: "02",
    name: "Notary Expert",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "AI PRODUCT"],
    description:
      "An intelligent workflow platform that helps notary professionals manage documents, appointments, client communication, and case progress more efficiently.",
    capabilities: [
      "Client Intake",
      "Document Workflows",
      "Appointment Coordination",
      "Case Tracking",
    ],
    image: "/notary-expert.png",
    imageAlt: "Notary Expert seal",
  },
];

const services = [
  {
    number: "01",
    title: "AI Workflows",
    description:
      "Intelligent automation pipelines that turn manual, repetitive work into reliable, self-running processes.",
    capabilities: ["Process Automation", "Document Processing", "LLM Integration"],
    image: null,
    imageAlt: "",
    visual: "flow",
  },
  {
    number: "02",
    title: "Agentic AI",
    description:
      "Autonomous AI agents that plan, reason, and take action inside your business systems — with human oversight built in.",
    capabilities: ["AI Agents", "Orchestration", "RAG"],
    image: null,
    imageAlt: "",
    visual: "orb",
  },
  {
    number: "03",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that put your product in your customers' pockets.",
    capabilities: ["iOS", "Android", "React Native", "Flutter"],
    image: null,
    imageAlt: "",
  },
  {
    number: "04",
    title: "Desktop Apps",
    description:
      "Fast, offline-capable desktop software built for demanding professional workflows and power users.",
    capabilities: ["Windows", "macOS", "Linux", "Electron"],
    image: null,
    imageAlt: "",
  },
  {
    number: "05",
    title: "Cloud Solutions",
    description:
      "Scalable cloud architecture engineered for reliability, security, and cost efficiency from day one.",
    capabilities: ["AWS", "GCP", "Azure", "Serverless"],
    image: null,
    imageAlt: "",
    visual: "dithering",
  },
  {
    number: "06",
    title: "DevOps Solutions",
    description:
      "Delivery pipelines, infrastructure as code, and observability that keep releases fast and systems healthy.",
    capabilities: ["CI/CD", "Infrastructure as Code", "Monitoring"],
    image: null,
    imageAlt: "",
    visual: "globe",
  },
];

const aboutSnabSteps = [
  {
    step: "01",
    title: "Product Thinking",
    subtitle: "Strategy & Discovery",
    content:
      "We start with the problem, not the technology. Every project begins by understanding your users, workflows, and the outcomes that matter.",
    image: "/ascii-magic-14.png",
  },
  {
    step: "02",
    title: "AI-Native Engineering",
    subtitle: "Build & Iterate",
    content:
      "We design systems where AI is the core — not a bolt-on. From agentic workflows to retrieval pipelines, every layer is purpose-built.",
    image: "/ascii-magic-12.png",
  },
  {
    step: "03",
    title: "Production Delivery",
    subtitle: "Ship & Scale",
    content:
      "We ship what we build. Full-stack deployment, infrastructure, and handoff — so your product works from day one.",
    image: "/ascii-magic-13.png",
  },
];

const whyChooseUs = [
  {
    title: "AI-First Architecture",
    description: "We design every system with AI at its core, not as an afterthought.",
    image: "/ascii-magic-6.png",
    visual: "svg1",
    slug: "ai-first-architecture",
  },
  {
    title: "Workflow-Centric Design",
    description: "We start with the workflow, not the model — ensuring real-world impact.",
    image: "/ascii-magic-6.png",
    visual: "svg4",
    slug: "workflow-centric-design",
  },
  {
    title: "End-to-End Delivery",
    description: "From ideation to deployment, we own the full product lifecycle.",
    image: "/ascii-magic-6.png",
    visual: "svg9",
    slug: "end-to-end-delivery",
  },
  {
    title: "Production-Grade Systems",
    description: "Every solution is built for scale, reliability, and security from day one.",
    image: "/ascii-magic-6.png",
    visual: "dottedmap",
    slug: "production-grade-systems",
  },
  {
    title: "Cross-Platform Expertise",
    description: "Web, mobile, desktop — we build where your users need us.",
    image: "/ascii-magic-6.png",
    visual: "techstack",
    slug: "cross-platform-expertise",
  },
  {
    title: "Transparent Collaboration",
    description: "Shared milestones, demos, and decisions keep you close to the work.",
    image: "/transparent-collaboration.jpg",
    slug: "transparent-collaboration",
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        inLanguage: "en-IN",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
        },
        email: siteConfig.email,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.locality,
          addressRegion: siteConfig.location.region,
          postalCode: siteConfig.location.postalCode,
          addressCountry: siteConfig.location.country,
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "AI product development",
          "Workflow automation",
          "Custom software development",
          "Web application development",
          "AI agents",
          "Retrieval-augmented generation",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: homeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="flex-1">
        {/* Hero / Profile Header */}
        <section id="home" aria-labelledby="hero-title">
          <ContainerWrapper>
            <div className="relative min-h-[600px] overflow-hidden bg-muted/30">
              <Image
                className="absolute inset-0 h-full w-full object-cover object-center"
                src="/ascii-magic-11.png"
                alt=""
                fill
                priority
                sizes="100vw"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-black/20"
                aria-hidden="true"
              />

              <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-12">
                <Hero />
              </div>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Services */}
        <ServicesSection services={services} />

        <SectionSeparator />

        {/* Current Work */}
        <section aria-labelledby="current-work-title">
          <ContainerWrapper>
            <HeaderTitle title="Current Work" id="current-work-title" />
            <div className="divide-y divide-dotted divide-edge">
              {projects.map((project) => (
                <div className="p-3 sm:p-4 md:grid md:gap-4 md:grid-cols-[1fr_auto]" key={project.number}>
                  {/* Mobile: image + info */}
                  <div className="flex gap-4 md:hidden">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border border-dotted border-edge p-1">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 10px)",
                        }}
                        aria-hidden="true"
                      />
                      <Image
                        className="relative h-full w-full object-cover object-top rounded-t"
                        src={project.image}
                        alt={project.imageAlt}
                        width={160}
                        height={160}
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {project.number}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] text-muted-foreground">
                            Live
                          </span>
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm font-medium">
                        {project.name}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {project.categories.map((category) => (
                          <span
                            className="rounded-sm border border-dotted border-edge px-1.5 py-0.5 text-[9px] text-muted-foreground"
                            key={category}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop: full layout */}
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.number}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">
                          Live
                        </span>
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-medium md:text-base">
                      {project.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.categories.map((category) => (
                        <span
                          className="rounded-sm border border-dotted border-edge px-2 py-0.5 text-[10px] text-muted-foreground"
                          key={category}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">
                      {project.capabilities.join(" / ")}
                    </p>
                    <a
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-muted-foreground"
                      href="#"
                    >
                      View Project
                      <span
                        className="inline-block transition-transform duration-300 group-hover:rotate-0 -rotate-45"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                  <div className="hidden items-center justify-center md:flex">
                    <div className="relative h-[200px] w-[200px] overflow-hidden rounded-[10px] border border-dotted border-edge p-1">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 10px)",
                        }}
                        aria-hidden="true"
                      />
                      <Image
                        className="relative h-full w-full object-cover object-top rounded-t"
                        src={project.image}
                        alt={project.imageAlt}
                        width={320}
                        height={320}
                        sizes="200px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 flex items-center justify-center border-b border-dotted border-edge">
              <a
                className="text-xs font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
                href="/work"
              >
                See all work
              </a>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* How We Work */}
        <section aria-labelledby="how-we-work-title">
          <ContainerWrapper>
            <HeaderTitle title="How We Work" id="how-we-work-title" />
            <FeatureSteps features={aboutSnabSteps} autoPlayInterval={4000} />
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Why Choose Us */}
        <section aria-labelledby="why-choose-us-title">
          <ContainerWrapper>
            <HeaderTitle title="Why Choose Us" id="why-choose-us-title" />
            <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-3">
              {whyChooseUs.map((item, i) => {
                const isWeave = "visual" in item && item.visual === "svg4";
                return (
                <div
                  className={`group flex flex-col border-b border-dotted border-edge last:border-b-0 sm:border-b-0 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                    i < 3 ? "md:border-b" : ""
                  }`}
                  key={item.title}
                >
                  <div className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden ${isWeave ? "bg-black" : "bg-muted/30 p-6"}`}>
                    {isWeave && <WeaveCanvas />}
                    {!isWeave && "visual" in item && item.visual === "svg1" && <Svg1 />}
                    {!isWeave && "visual" in item && item.visual === "svg9" && <Svg9 />}
                    {!isWeave && "visual" in item && item.visual === "techstack" && <TechStackCloud />}
                    {!isWeave && "visual" in item && item.visual === "dottedmap" && (
                      <DottedMap
                        markers={[
                          { lat: 40.7128, lng: -74.006, size: 0.8, pulse: true },
                          { lat: 51.5074, lng: -0.1278, size: 0.8, pulse: true },
                          { lat: 19.076, lng: 72.8777, size: 0.8, pulse: true },
                          { lat: 35.6762, lng: 139.6503, size: 0.8, pulse: true },
                          { lat: -33.8688, lng: 151.2093, size: 0.8, pulse: true },
                        ]}
                        dotColor="currentColor"
                        markerColor="hsl(var(--primary))"
                        dotRadius={0.25}
                        stagger
                        pulse
                      />
                    )}
                    {!isWeave && !("visual" in item) && (
                      <Image
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="border-t border-dotted border-edge" />
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <h3 className="text-base font-medium sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link
                        className="flex h-8 w-8 items-center justify-center border border-dotted border-edge text-muted-foreground transition-colors group-hover:bg-muted"
                        href={`/why-choose-us/${item.slug}`}
                      >
                        ↗
                      </Link>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Ask Your AI */}
        <ContainerWrapper>
          <AskAiSection />
        </ContainerWrapper>

        <SectionSeparator />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title">
          <ContainerWrapper>
            <HeaderTitle title="FAQ" id="faq-title" />
            <div className="divide-y divide-dotted divide-edge">
              {homeFaqs.map((faq, index) => (
                <div className="p-3 sm:p-4" key={faq.question}>
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <details className="flex-1">
                      <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                        <span>{faq.question}</span>
                        <span
                          className="ml-2 transition-transform duration-200 details-open:rotate-45"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Contact */}
        <section aria-labelledby="contact-title">
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
              <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 py-8 px-5 sm:justify-end sm:py-10 sm:px-6 md:px-12">
                <div>
                  <h2 id="contact-title" className="font-pixelify text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
                    Get in Touch
                  </h2>
                  <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/90 sm:text-sm">
                    Have a project in mind? We&apos;d love to hear about it.
                    Whether you need AI integration, workflow automation, or
                    custom software, our team is ready to help.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    className="bg-white px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white/90 sm:py-1.5"
                    href="/contact"
                  >
                    Start a project
                  </a>
                  <a
                    className="text-xs text-white/80 underline underline-offset-4 transition-colors hover:text-white"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Tagline ending */}
        <section aria-label="Tagline">
          <ContainerWrapper>
            <div className="p-3 py-8 text-center sm:p-4">
              <p className="font-pixelify text-base text-muted-foreground sm:text-xl md:text-2xl">
                &ldquo;Build AI with production intelligence&rdquo;
              </p>
            </div>
          </ContainerWrapper>
        </section>
      </main>

      <HomeFooter />
    </>
  );
}
