import type { Metadata } from "next";
import { Footer } from "../Footer";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { SERVICES } from "@/data/services";
import { ServicesAccordion } from "./ServicesAccordion";

export const metadata: Metadata = createPageMetadata({
  title: "Services | SNAB Innovations",
  description:
    "Explore SNAB Innovations services — AI workflow orchestration, intelligent agents, mobile & desktop apps, cloud architecture, DevOps, deployment, SEO, and training.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section aria-labelledby="services-hero-title">
        <ContainerWrapper>
          <div className="border-b border-dotted border-edge p-6 sm:p-10 md:p-14">
            <span className="font-mono text-caption text-muted-foreground uppercase tracking-widest">
              SERVICES // WHAT WE DELIVER
            </span>
            <h1
              id="services-hero-title"
              className="mt-3 text-display font-normal"
            >
              Services<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted-foreground">
              A highly collaborative engineering team shaping reliable software,
              intelligent automation, and the infrastructure that keeps it all
              running.
            </p>
          </div>
        </ContainerWrapper>
      </section>

      {/* Section 1 — Services Index */}
      <section aria-label="Services index">
        <ContainerWrapper>
          <div className="border-t border-dotted border-edge">
            <ServicesAccordion services={SERVICES} />
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}
