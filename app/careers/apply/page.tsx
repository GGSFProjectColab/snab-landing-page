import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../Footer";
import { ApplicationForm } from "../ApplicationForm";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";

import "../careers.css";

export const metadata: Metadata = createPageMetadata({
  title: "Make an Introduction — Careers",
  description: "Introduce yourself to the engineering team at SNAB Innovations.",
  path: "/careers/apply",
  noIndex: true,
});

export default function GeneralApplicationPage() {
  return (
    <main className="flex-1">
      {/* Hero Header with Career Background Image */}
      <section id="apply-hero" aria-labelledby="apply-title">
        <ContainerWrapper>
          <div className="relative py-16 md:py-24 overflow-hidden border-b border-dotted border-edge">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
              style={{ backgroundImage: "url('/careers-hero-bg.png')" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background"
              aria-hidden="true"
            />

            <div className="relative z-10 text-center px-4">
              {/* Breadcrumb */}
              <nav
                className="flex items-center justify-center gap-2 text-button text-muted-foreground mb-6"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span className="text-muted-foreground/40">›</span>
                <Link href="/careers" className="hover:text-foreground transition-colors">
                  Career
                </Link>
                <span className="text-muted-foreground/40">›</span>
                <span className="text-foreground" aria-current="page">
                  Apply
                </span>
              </nav>

              {/* Large Heading */}
              <h1
                id="apply-title"
                className="text-display font-normal tracking-tight text-foreground"
              >
                Make an introduction
              </h1>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      {/* Full-width Form Section */}
      <section id="apply-form-section" aria-label="Application form">
        <ContainerWrapper>
          <div className="p-6 sm:p-10 md:p-14 lg:p-16">
            <ApplicationForm />
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}
