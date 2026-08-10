import type { Metadata } from "next";
import Image from "next/image";
import { HomeFooter } from "./HomeFooter";
import { Hero } from "@/components/ui/animated-hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import { CloudShader } from "@/components/ui/cloud-shader";
import FluidOrb from "@/components/ui/fluid-orb";
import { AIWorkflowFlow } from "@/components/ui/ai-workflow-flow";
import { homeFaqs } from "@/lib/faqs";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/site";

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
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "OpenAI",
  "LangChain",
  "Docker",
  "AWS",
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
          <ContainerWrapper crosshairs="top">
            <div className="relative min-h-[600px] overflow-hidden bg-muted/30">
              <Image
                className="absolute inset-0 h-full w-full object-cover object-bottom"
                src="/ascii-magic-6.png"
                alt=""
                fill
                priority
                sizes="100vw"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-black/40"
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
        <section aria-labelledby="services-title">
          <ContainerWrapper>
            <HeaderTitle title="Services" id="services-title" />
            <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
              {services.map((service) =>
                service.visual ? (
                  <div
                    className="border-b border-dotted border-edge last:border-b-0 md:border-r"
                    key={service.title}
                  >
                    <div className="grid md:h-full md:grid-cols-[1fr_1px_1fr]">
                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm font-medium">{service.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                      <div
                        className="border-t border-dotted border-edge md:border-l md:border-t-0"
                        aria-hidden="true"
                      />
                      {service.visual === "dithering" ? (
                        <div className="relative aspect-video w-full overflow-hidden md:aspect-auto">
                          <CloudShader />
                        </div>
                      ) : service.visual === "flow" ? (
                        <div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:h-[208px]">
                          <AIWorkflowFlow />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center border-t border-dotted border-edge bg-muted/40 p-6 md:border-l md:border-t-0">
                          <FluidOrb size={200} />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-b border-dotted border-edge p-3 last:border-b-0 sm:p-4 md:odd:border-r"
                    key={service.title}
                  >
                    <h3 className="text-sm font-medium">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Current Work */}
        <section aria-labelledby="current-work-title">
          <ContainerWrapper>
            <HeaderTitle title="Current Work" id="current-work-title" />
            <div className="divide-y divide-dotted divide-edge">
              {projects.map((project) => (
                <div className="grid gap-4 p-3 sm:p-4 md:grid-cols-[1fr_auto]" key={project.number}>
                  <div>
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
                href="/projects"
              >
                See all projects
              </a>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* About */}
        <section aria-labelledby="about-title">
          <ContainerWrapper>
            <HeaderTitle title="About" id="about-title" />
            <div className="px-3 py-4 sm:px-4 sm:py-6">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                SNAB Innovations is an AI product and software engineering studio
                based in Nashik, India. We build AI products, workflow
                automation, and custom software for teams worldwide.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Our team combines AI/ML, full-stack engineering, and product
                design to deliver systems that work in real workflows—not just
                demos.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                The result: less manual work, better decisions, and operations
                that scale with dependable, production-ready software.
              </p>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Skills */}
        <section aria-labelledby="skills-title">
          <ContainerWrapper>
            <HeaderTitle title="Skills" id="skills-title" />
            <div className="flex flex-wrap gap-2 p-3 sm:p-4">
              {skills.map((skill) => (
                <span
                  className="rounded-sm border border-l-2 border-t-2 border-edge px-3 py-1 text-xs"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </ContainerWrapper>
        </section>

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
            <div className="h-10 flex items-center justify-center border-b border-dotted border-edge">
              <a
                className="text-xs font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
                href="/contact"
              >
                Ask us directly
              </a>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Contact */}
        <section aria-labelledby="contact-title">
          <ContainerWrapper>
            <HeaderTitle title="Get in Touch" id="contact-title" />
            <div className="p-3 sm:p-4">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Have a project in mind? We&apos;d love to hear about it.
                Whether you need AI integration, workflow automation, or
                custom software, our team is ready to help.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
                  href="/contact"
                >
                  Start a project
                </a>
                <a
                  className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </ContainerWrapper>
        </section>

        <SectionSeparator />

        {/* Page Ending */}
        <section aria-label="Page ending">
          <ContainerWrapper crosshairs="bottom">
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
