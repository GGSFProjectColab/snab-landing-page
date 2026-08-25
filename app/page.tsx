import type { Metadata } from "next";
import Image from "next/image";
import { HomeFooter } from "./HomeFooter";
import Hero20 from "@/components/originkit/hero-20";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import Svg1 from "@/components/pixel-perfect/svg-1";
import Svg9 from "@/components/pixel-perfect/svg-9";
import { DitheredLogoVisual } from "@/components/ui/dithered-logo-visual";
import { TechStackCloud } from "./TechStackCloud";
import { DottedMap } from "@/components/ui/dotted-map";
import { homeFaqs } from "@/lib/faqs";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/site";
import { MagicText } from "@/components/ui/magic-text";
import { MarqueeDemo } from "@/components/ui/marquee-demo";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { LazyAskAiSection as AskAiSection } from "./LazyAskAi";
import { LazyServicesSection as ServicesSection } from "./LazyServices";
import { LazyParallaxHowWeWork as ParallaxHowWeWork } from "./LazyParallax";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";





export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering Firm | SNAB Innovations",
  description:
    "Build intelligent platforms, workflow orchestration, web products, and mobile apps with SNAB Innovations, an engineering firm in Nashik, India.",
  path: "/",
});

const projects = [
  {
    number: "01",
    name: "InterviewXpert",
    categories: ["INTERVIEW AUTOMATION", "INTELLIGENT PRODUCT", "WORKFLOW SOFTWARE"],
    description:
      "An intelligent platform that helps teams organize interview workflows, reduce administrative work, and turn interview information into structured, actionable records.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Summaries",
      "Evaluation Support",
    ],
    image: "/interviewxpert-dark.png",
    imageDark: "/interviewxpert.png",
    imageAlt: "InterviewXpert mark",
    link: "https://interviewxpert.in",
  },
  {
    number: "02",
    name: "NotaryXpert",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "INTELLIGENT PRODUCT"],
    description:
      "An intelligent workflow platform that helps notary professionals manage documents, appointments, client communication, and case progress more efficiently.",
    capabilities: [
      "Client Intake",
      "Document Workflows",
      "Appointment Coordination",
      "Case Tracking",
    ],
    image: "/notary-expert.png",
    imageAlt: "NotaryXpert seal",
  },
];

const services = [
  {
    number: "01",
    title: "Workflow Orchestration",
    description:
      "Intelligent automation pipelines that convert fragmented manual work into dependable self running processes engineered for accuracy scale and auditability.",
    capabilities: ["Process Automation", "Document Processing", "LLM Integration"],
    image: null,
    imageAlt: "",
    visual: "flow",
  },
  {
    number: "02",
    title: "Intelligent Agents",
    description:
      "Autonomous agents that plan reason and act inside your business systems with human oversight built in for safe delegation at scale.",
    capabilities: ["AI Agents", "Orchestration", "RAG"],
    image: null,
    imageAlt: "",
    visual: "orb",
  },
  {
    number: "03",
    title: "Mobile Apps",
    description:
      "Native and cross platform mobile applications that deliver fluid high performance experiences customers trust every day.",
    capabilities: ["iOS", "Android", "React Native", "Flutter"],
    image: null,
    imageAlt: "",
    visual: "mobile",
  },
  {
    number: "04",
    title: "Desktop Apps",
    description:
      "Fast offline capable desktop software engineered for demanding professional workflows and power users who need reliability.",
    capabilities: ["Windows", "macOS", "Linux", "Electron"],
    image: null,
    imageAlt: "",
    visual: "desktop",
  },
  {
    number: "05",
    title: "Cloud Architecture",
    description:
      "Scalable cloud architecture engineered for enterprise reliability security and cost efficiency from the first deployment.",
    capabilities: ["AWS", "GCP", "Azure", "Serverless"],
    image: null,
    imageAlt: "",
    visual: "dithering",
  },
  {
    number: "06",
    title: "DevOps & Reliability",
    description:
      "Delivery pipelines and infrastructure as code that keep releases fast systems healthy and operations predictable.",
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
      "We start with the problem, not the technology. Every project begins by understanding your users, your workflows, and the outcomes that actually matter to your business. We map the gaps, challenge assumptions, and define what success looks like before a single line of code is written.",
    image: "/ascii-magic-14.png",
  },
  {
    step: "02",
    title: "Intelligence-First Engineering",
    subtitle: "Build & Iterate",
    content:
      "We design systems where AI is the core, not a bolt-on feature added at the end. From agentic workflows and retrieval pipelines to fine-tuned models and intelligent automation, every layer is purpose-built for your specific context. We iterate fast, test in the open, and keep you in the loop at every step.",
    image: "/ascii-magic-12.png",
  },
  {
    step: "03",
    title: "Production Delivery",
    subtitle: "Ship & Scale",
    content:
      "We ship what we build. Full-stack deployment, cloud infrastructure, monitoring, and a complete handoff so your product works reliably from day one. We don't hand off a prototype and disappear. We stay until the system is stable, the team is confident, and the product is ready to grow.",
    image: "/ascii-magic-13.png",
  },
  {
    step: "04",
    title: "Continuous Validation",
    subtitle: "Test & Learn",
    content:
      "We validate with real users and real data. Instrumented analytics, usability checks, and performance budgets keep decisions grounded. Every release is an opportunity to learn, refine the workflow, and compound value instead of guessing.",
    image: "/ascii-magic-10.png",
  },
  {
    step: "05",
    title: "Evolve & Scale",
    subtitle: "Support & Growth",
    content:
      "We stay for the long run. Monitoring, hardening, and iterative expansion ensure your platform scales with demand. From new integrations to model upgrades, we evolve the system in step with your business so momentum never stalls.",
    image: "/ascii-magic-11.png",
  },
];



const whyChooseUs = [
  {
    title: "Intelligence-First Architecture",
    description: "We design every system with intelligence at its core, not as an afterthought.",
    image: "/ascii-magic-6.webp",
    visual: "svg1",
  },
  {
    title: "Workflow-Centric Design",
    description: "We start with the workflow, not the model — ensuring real-world impact.",
    image: "/ascii-magic-6.webp",
    visual: "dithered",
  },
  {
    title: "End-to-End Delivery",
    description: "From ideation to deployment, we own the full product lifecycle.",
    image: "/ascii-magic-6.webp",
    visual: "svg9",
  },
  {
    title: "Production-Grade Systems",
    description: "Every solution is built for scale, reliability, and security from day one.",
    image: "/ascii-magic-6.webp",
    visual: "dottedmap",
  },
  {
    title: "Cross-Platform Expertise",
    description: "Web, mobile, desktop — we build where your users need us.",
    image: "/ascii-magic-6.webp",
    visual: "techstack",
  },
  {
    title: "Transparent Collaboration",
    description: "Shared milestones, demos, and decisions keep you close to the work.",
    image: "/transparent-collaboration.jpg",
    imageLight: "/transparent-collaboration-light.webp",
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
          "Intelligent product development",
          "Workflow orchestration",
          "Bespoke software development",
          "Web application development",
          "Intelligent agents",
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
        {/* Hero Section */}
        <section id="home" aria-labelledby="hero-title">
          <ContainerWrapper>
            <div className="relative min-h-[580px] overflow-hidden lg:min-h-[calc(100dvh-4rem)] border-b border-dotted border-edge bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787656935/jmvt7wh7eew66m2z1loj.png')] dark:bg-[url('https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787656054/glfm0fbkq0rutv73fjyv.png')]">
              <Hero20 />
            </div>
          </ContainerWrapper>
        </section>

        {/* Tech stack marquee */}
        <MarqueeDemo />

        {/* Scroll-Driven Text */}
        <section aria-label="What we build">
          <ContainerWrapper>
            <div className="border-b border-dotted border-edge py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
              <MagicText text="We believe technology should feel like a dependable teammate. Every system we build starts with a simple question. How can we make work simpler, sharper and more human. We craft intelligent platforms that solve real problems for real people with care in every decision." />
            </div>
          </ContainerWrapper>
        </section>

        {/* Services */}
        <ServicesSection services={services} />

        

        {/* Current Work */}
        <section aria-labelledby="current-work-title">
          <ContainerWrapper>
            <HeaderTitle title="What we're building" id="current-work-title" />
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
                        className={`relative h-full w-full object-cover object-top rounded-t ${'imageDark' in project && project.imageDark ? 'block dark:hidden' : ''}`}
                        src={project.image}
                        alt={project.imageAlt}
                        width={160}
                        height={160}
                        sizes="80px"
                      />
                      {'imageDark' in project && project.imageDark && (
                        <Image
                          className="relative h-full w-full object-cover object-top rounded-t hidden dark:block"
                          src={project.imageDark as string}
                          alt={project.imageAlt}
                          width={160}
                          height={160}
                          sizes="80px"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-caption text-muted-foreground">
                          {project.number}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                          <span className="text-caption text-muted-foreground">
                            Live
                          </span>
                        </span>
                      </div>
                      <TextGenerateEffect
                        as="h3"
                        className="mt-1 text-title font-normal"
                        staggerDuration={0.05}
                      >
                        {project.name}
                      </TextGenerateEffect>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {project.categories.map((category) => (
                          <span
                            className="rounded-sm border border-dotted border-edge px-1.5 py-0.5 text-caption text-muted-foreground"
                            key={category}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <TextGenerateEffect
                        as="p"
                        className="mt-2 text-body leading-relaxed text-muted-foreground"
                        staggerDuration={0.02}
                      >
                        {project.description}
                      </TextGenerateEffect>
                    </div>
                  </div>

                  {/* Desktop: full layout */}
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-caption text-muted-foreground">
                        {project.number}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                        <span className="text-caption text-muted-foreground">
                          Live
                        </span>
                      </span>
                    </div>
                    <TextGenerateEffect
                      as="h3"
                      className="mt-2 text-title font-normal"
                      staggerDuration={0.05}
                    >
                      {project.name}
                    </TextGenerateEffect>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.categories.map((category) => (
                        <span
                          className="rounded-sm border border-dotted border-edge px-2 py-0.5 text-caption text-muted-foreground"
                          key={category}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <TextGenerateEffect
                      as="p"
                      className="mt-3 max-w-2xl text-body text-muted-foreground"
                      staggerDuration={0.02}
                    >
                      {project.description}
                    </TextGenerateEffect>
                    <p className="mt-2 font-mono text-caption text-muted-foreground">
                      {project.capabilities.join(" / ")}
                    </p>
                    {"link" in project && (project as { link?: string }).link ? (
                      <a
                        className="mt-4 inline-flex items-center gap-1 text-button font-normal transition-colors hover:text-muted-foreground"
                        href={(project as { link?: string }).link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                        <span
                          className="inline-block transition-transform duration-300 group-hover:rotate-0 -rotate-45"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    ) : null}
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
                        className={`relative h-full w-full object-cover object-top rounded-t ${'imageDark' in project && project.imageDark ? 'block dark:hidden' : ''}`}
                        src={project.image}
                        alt={project.imageAlt}
                        width={320}
                        height={320}
                        sizes="200px"
                      />
                      {'imageDark' in project && project.imageDark && (
                        <Image
                          className="relative h-full w-full object-cover object-top rounded-t hidden dark:block"
                          src={project.imageDark as string}
                          alt={project.imageAlt}
                          width={320}
                          height={320}
                          sizes="200px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 flex items-center justify-center border-b border-dotted border-edge">
              <a
                className="text-button font-normal underline underline-offset-4 transition-colors hover:text-muted-foreground"
                href="/work"
              >
                See all work
              </a>
            </div>
          </ContainerWrapper>
        </section>

        

        {/* How We Work — full-section stacking inside dotted rails */}
        <section aria-labelledby="how-we-work-title">
          <ContainerWrapper>
            <HeaderTitle title="How we work" id="how-we-work-title" />
            <ParallaxHowWeWork steps={aboutSnabSteps} />
          </ContainerWrapper>
        </section>


        

        {/* Why Choose Us */}
        <section aria-labelledby="why-choose-us-title">
          <ContainerWrapper>
            <HeaderTitle title="Why teams choose us" id="why-choose-us-title" />
            <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6">
              {whyChooseUs.map((item, i) => {
                const isDithered = "visual" in item && item.visual === "dithered";
                return (
                <div
                  className={`group flex flex-col border-b border-dotted border-edge last:border-b-0 sm:border-b-0 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                    i < 3 ? "md:border-b" : ""
                  } ${i % 6 !== 5 ? "2xl:border-r" : "2xl:border-r-0"} 2xl:border-b-0`}
                  key={item.title}
                >
                  <div className={`relative aspect-[4/3] w-full overflow-hidden p-6 ${isDithered ? "flex items-center justify-center" : "flex items-center justify-center bg-muted/30"}`}>
                    {isDithered && <DitheredLogoVisual />}
                    {!isDithered && "visual" in item && item.visual === "svg1" && <Svg1 />}
                    {!isDithered && "visual" in item && item.visual === "svg9" && <Svg9 />}
                    {!isDithered && "visual" in item && item.visual === "techstack" && <TechStackCloud />}
                    {!isDithered && "visual" in item && item.visual === "dottedmap" && (
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
                    {!isDithered && !("visual" in item) && (
                      <>
                        <Image
                          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${"imageLight" in item && item.imageLight ? "hidden dark:block" : ""}`}
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          quality={75}
                          loading="lazy"
                          decoding="async"
                        />
                        {"imageLight" in item && Boolean(item.imageLight) && (
                          <Image
                            className="object-cover transition-transform duration-500 group-hover:scale-105 block dark:hidden"
                            src={item.imageLight as string}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            quality={75}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <TextGenerateEffect
                        as="h3"
                        className="text-title font-normal"
                        staggerDuration={0.05}
                      >
                        {item.title}
                      </TextGenerateEffect>
                      <TextGenerateEffect
                        as="p"
                        className="mt-2 text-body text-muted-foreground"
                        staggerDuration={0.02}
                      >
                        {item.description}
                      </TextGenerateEffect>
                    </div>
                    </div>
                </div>
                );
              })}
            </div>
          </ContainerWrapper>
        </section>

        

        {/* Ask Your AI */}
        <ContainerWrapper>
          <AskAiSection />
        </ContainerWrapper>

        {/* Scroll Velocity Banner — controlled: original scroll-reactive but throttled (baseVelocity 5 vs 20, capped multiplier) */}
        <ContainerWrapper>
          <section aria-label="Scroll velocity banner" className="overflow-hidden py-5 sm:py-7 border-b border-dotted border-edge">
            <ScrollVelocityContainer className="font-mono">
              <ScrollVelocityRow baseVelocity={5} direction={1} className="py-1.5">
                <span className="flex items-center gap-3 pr-3 text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
                  <span>BUILD</span>
                  <span className="text-muted-foreground/35 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                  <span>SHIP</span>
                  <span className="text-muted-foreground/35 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                  <span>DESIGN</span>
                  <span className="text-muted-foreground/35 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                  <span>LAUNCH</span>
                  <span className="text-muted-foreground/35 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                </span>
              </ScrollVelocityRow>
              <ScrollVelocityRow baseVelocity={5} direction={-1} className="py-1.5">
                <span className="flex items-center gap-3 pr-3 text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl lg:text-9xl text-muted-foreground/50">
                  <span>BUILD</span>
                  <span className="text-muted-foreground/25 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                  <span>SHIP</span>
                  <span className="text-muted-foreground/25 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                  <span>DESIGN</span>
                  <span className="text-muted-foreground/25 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                  <span>LAUNCH</span>
                  <span className="text-muted-foreground/25 font-light text-3xl sm:text-4xl md:text-5xl">//</span>
                </span>
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
          </section>
        </ContainerWrapper>

        

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title">
          <ContainerWrapper>
            <HeaderTitle title="Common questions" id="faq-title" />
            <div className="">
              {homeFaqs.map((faq, index) => (
                <div className="p-3 sm:p-4" key={faq.question}>
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-caption text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <details className="flex-1">
                      <summary className="flex cursor-pointer items-center justify-between text-body font-medium">
                        <span>{faq.question}</span>
                      </summary>
                      <p className="mt-3 pl-8 text-body leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
            <div className="bottom-rail bg-edge" aria-hidden="true" />
          </ContainerWrapper>
        </section>

        

        {/* Contact */}
        <section aria-labelledby="contact-title">
          <ContainerWrapper>
            <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787656935/jmvt7wh7eew66m2z1loj.png')] dark:bg-[url('https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787656054/glfm0fbkq0rutv73fjyv.png')]">
              <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 py-8 px-5 sm:justify-end sm:py-10 sm:px-6 md:px-12">
                <div>
                  <TextGenerateEffect
                    as="h2"
                    id="contact-title"
                    className="text-subheading font-normal text-foreground dark:text-white drop-shadow-sm"
                    staggerDuration={0.05}
                  >
                    Get in Touch
                  </TextGenerateEffect>
                  <TextGenerateEffect
                    as="p"
                    className="mt-2 max-w-xl text-body leading-relaxed text-foreground/80 dark:text-white/90"
                    staggerDuration={0.02}
                  >
                    Have a project in mind? We&apos;d love to hear about it. Whether you need workflow orchestration, intelligent automation, or a new platform, our team is ready to help.
                  </TextGenerateEffect>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    className="bg-foreground px-4 py-2 text-button font-normal text-background transition-all hover:bg-foreground/90 sm:py-1.5"
                    href="/contact"
                  >
                    Start a project
                  </a>
                  <a
                    className="text-button text-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground dark:text-white/80 dark:hover:text-white"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="border-b border-dotted border-edge" aria-hidden="true" />
          </ContainerWrapper>
        </section>

        

        {/* Tagline ending */}
        <section aria-label="Tagline">
          <ContainerWrapper>
            <div className="p-3 py-8 text-center sm:p-4">
              <AnimatedShinyText className="text-title font-normal max-w-none inline-flex items-center justify-center">
                &ldquo;Build with production intelligence&rdquo;
              </AnimatedShinyText>
            </div>
          </ContainerWrapper>
        </section>
      </main>

      <HomeFooter />
    </>
  );
}
