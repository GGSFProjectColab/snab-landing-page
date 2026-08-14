import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../../Footer";
import { ApplicationForm } from "../ApplicationForm";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";

import "../careers.css";

export const metadata: Metadata = createPageMetadata({
  title: "Open Application — Careers",
  description: "Introduce yourself to the team at SNAB Innovations.",
  path: "/careers/apply",
  noIndex: true,
});

export default function GeneralApplicationPage() {
  return (
    <main className="flex-1">
      <section>
        <ContainerWrapper>
          <div className="pb-8">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 font-mono text-caption uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Back to careers
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
              {/* Context */}
              <div className="lg:pt-2">
                <p className="font-mono text-caption uppercase tracking-wider text-muted-foreground inline-flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Open application
                </p>
                <h1 className="text-display font-normal tracking-tight">
                  Make a thoughtful introduction.
                </h1>
                <p className="text-muted-foreground text-body mt-3 leading-relaxed max-w-md">
                  If you don&apos;t see the right opening, tell us where you do your best work.
                  Specific examples are more useful than a formal cover letter.
                </p>
                <div className="border border-dotted border-edge rounded-lg p-4 mt-5 bg-white/[0.015]">
                  <p className="text-body text-foreground font-medium">
                    Good to include
                  </p>
                  <p className="text-body text-muted-foreground mt-1">
                    The problems you enjoy, work you&apos;re proud of, and what you&apos;d like to learn next.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div>
                <ApplicationForm />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      <Footer />
    </main>
  );
}
