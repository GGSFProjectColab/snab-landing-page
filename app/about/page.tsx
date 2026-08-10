import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import { Footer } from "../Footer";

export const metadata: Metadata = createPageMetadata({
  title: "About SNAB Innovations — AI Product Engineering Studio",
  description:
    "SNAB Innovations is an AI product and software engineering studio building dependable systems from Nashik, India.",
  path: "/about",
});

const capabilities = [
  "AI product development",
  "Workflow automation",
  "Web platforms",
  "Desktop software",
  "Agents and assistants",
  "RAG systems",
];

const process = [
  { number: "01", title: "Understand", description: "We learn the domain, the users, and the constraints." },
  { number: "02", title: "Design", description: "We shape the system around the work it must support." },
  { number: "03", title: "Engineer", description: "We build with clean code, practical testing, and observability." },
  { number: "04", title: "Improve", description: "We measure, learn, and refine the system over time." },
];

const products = [
  {
    name: "Interview Expert",
    description: "AI-enabled platform for organizing interview workflows and turning information into structured records.",
    image: "/interviewxpert.png",
  },
  {
    name: "Notary Expert",
    description: "Intelligent workflow platform for managing documents, appointments, and case progress.",
    image: "/notary-expert.png",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section aria-labelledby="about-title">
        <ContainerWrapper>
          <div className="relative min-h-[500px] overflow-hidden sm:min-h-[600px]">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="/ascii-magic-11.png"
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[500px] flex-col justify-end p-6 sm:min-h-[600px] sm:p-10 md:p-14">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                About us
              </p>
              <h1
                id="about-title"
                className="max-w-3xl font-pixelify text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
              >
                We build the systems behind intelligent work.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                SNAB Innovations is an AI product and software engineering studio
                based in Nashik, India. We help teams turn complex workflows into
                dependable systems.
              </p>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Who We Are */}
      <section aria-labelledby="who-we-are-title">
        <ContainerWrapper>
          <HeaderTitle title="Who We Are" id="who-we-are-title" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                01 — Why we exist
              </p>
              <h2 className="mb-4 font-pixelify text-2xl font-bold sm:text-3xl">
                Closing the gap between AI demos and dependable products.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                AI has moved fast. Product outcomes have not always kept pace. We
                bring product thinking, engineering discipline, and domain context
                together to build systems that work in the real world.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "We start with the workflow, not the model.",
                  "We design for reliability, security, and maintainability.",
                  "We ship in useful increments and improve continuously.",
                  "We take ownership from the first decision to production.",
                ].map((principle, i) => (
                  <li
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    key={principle}
                  >
                    <span className="mt-0.5 font-mono text-xs text-foreground/60">
                      0{i + 1}
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px]">
              <Image
                className="object-cover"
                src="/ascii-magic-14.png"
                alt="SNAB Innovations workflow"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* What We Do */}
      <section aria-labelledby="what-we-do-title">
        <ContainerWrapper>
          <HeaderTitle title="What We Do" id="what-we-do-title" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="relative order-2 min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px] md:order-1">
              <Image
                className="object-cover"
                src="/ascii-magic-12.png"
                alt="SNAB capabilities"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-l md:order-2 md:p-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                02 — Capabilities
              </p>
              <h2 className="mb-4 font-pixelify text-2xl font-bold sm:text-3xl">
                What we build.
              </h2>
              <ul className="space-y-3">
                {capabilities.map((cap, i) => (
                  <li
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                    key={cap}
                  >
                    <span className="font-mono text-xs text-foreground/60">
                      0{i + 1}
                    </span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Our Approach */}
      <section aria-labelledby="approach-title">
        <ContainerWrapper>
          <HeaderTitle title="Our Approach" id="approach-title" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                03 — Process
              </p>
              <h2 className="mb-6 font-pixelify text-2xl font-bold sm:text-3xl">
                The engineering process.
              </h2>
              <div className="space-y-5">
                {process.map((step) => (
                  <div className="flex gap-4" key={step.number}>
                    <span className="font-mono text-sm text-foreground/40">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px]">
              <Image
                className="object-cover"
                src="/ascii-magic-13.png"
                alt="SNAB engineering process"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Selected Work */}
      <section aria-labelledby="work-title">
        <ContainerWrapper>
          <HeaderTitle title="Selected Work" id="work-title" />
          <div className="divide-y divide-dotted divide-edge border-b border-dotted border-edge">
            {products.map((product) => (
              <div
                className="grid gap-0 sm:grid-cols-[1fr_auto] md:grid-cols-[1fr_240px]"
                key={product.name}
              >
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                  <h3 className="font-pixelify text-xl font-bold sm:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <a
                    className="mt-4 inline-flex w-max items-center gap-1.5 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground"
                    href="/projects"
                  >
                    View project
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="flex items-center justify-center border-t border-dotted border-edge p-6 sm:border-t-0 sm:border-l sm:p-8 md:border-l">
                  <div className="relative h-40 w-40 overflow-hidden rounded border border-dotted border-edge sm:h-48 sm:w-48">
                    <Image
                      className="object-contain p-4"
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="192px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* CTA */}
      <section aria-labelledby="about-cta-title">
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
                id="about-cta-title"
                className="max-w-xl font-pixelify text-2xl font-bold sm:text-3xl"
              >
                Bring us the workflow that should work better.
              </h2>
              <a
                className="border border-white/30 bg-transparent px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-white hover:text-black"
                href="/contact"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
