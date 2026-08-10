import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../Footer";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import { SectionSeparator } from "@/components/site/separator";

export const metadata: Metadata = createPageMetadata({
  title: "Work | SNAB Innovations",
  description: "Explore selected AI products, platforms, and custom software systems built by SNAB Innovations.",
  path: "/work",
});

const workItems = [
  {
    number: "01",
    name: "Interview Expert",
    status: "Live",
    categories: ["INTERVIEW AUTOMATION", "AI PRODUCT", "WORKFLOW SOFTWARE"],
    description:
      "An AI-enabled platform that helps teams organize interview workflows, reduce administrative overhead, and convert candidate interactions into structured, actionable intelligence.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Automated Summaries",
      "Evaluation Support",
    ],
    image: "/interviewxpert.png",
    imageAlt: "Interview Expert Interface Preview",
  },
  {
    number: "02",
    name: "Notary Expert",
    status: "Live",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "AI PRODUCT"],
    description:
      "An intelligent workflow platform empowering notary professionals to manage legal document pipelines, appointments, client communication, and case tracking.",
    capabilities: [
      "Client Intake",
      "Document Workflows",
      "Appointment Coordination",
      "Case Tracking",
    ],
    image: "/notary-expert.png",
    imageAlt: "Notary Expert Platform Preview",
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section aria-labelledby="work-hero-title">
        <ContainerWrapper>
          <div className="border-b border-dotted border-edge p-6 sm:p-10 md:p-14">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              PORTFOLIO // SELECTED SYSTEMS
            </span>
            <h1
              id="work-hero-title"
              className="mt-3 font-pixelify text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              Built for real-world operations<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A collection of AI products, enterprise automation platforms, and software systems engineered for high-impact professional workflows.
            </p>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Main Work Showcase List */}
      <section aria-labelledby="selected-work-title">
        <ContainerWrapper>
          <HeaderTitle title="Selected Work" id="selected-work-title" />

          <div className="divide-y divide-dotted divide-edge">
            {workItems.map((item) => (
              <div
                key={item.number}
                className="group p-4 sm:p-6 md:p-8 md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center"
              >
                {/* Information Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Index & Status */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.number}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {item.status}
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                      {item.name}
                    </h2>

                    {/* Category Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-sm border border-dotted border-edge px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Capabilities list */}
                    <div className="mt-4 border-t border-dotted border-edge pt-3">
                      <span className="block font-mono text-[11px] text-muted-foreground/80">
                        {item.capabilities.join(" • ")}
                      </span>
                    </div>
                  </div>

                  {/* Minimal Subtle Action Link */}
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-muted-foreground"
                    >
                      <span>Explore system</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                </div>

                {/* Visual Preview Column */}
                <div className="mt-6 md:mt-0 flex justify-center">
                  <div className="relative h-[220px] w-full max-w-[280px] sm:max-w-[320px] md:h-[240px] md:w-[240px] overflow-hidden rounded-[10px] border border-dotted border-edge p-2 bg-accent/20 transition-colors group-hover:border-foreground/20">
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
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        src={item.image}
                        alt={item.imageAlt}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
