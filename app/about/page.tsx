import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { MagicText } from "@/components/ui/magic-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TeamInteractiveSection } from "@/components/about/team-interactive-section";
import { Footer } from "../Footer";

export const metadata: Metadata = createPageMetadata({
  title: "About SNAB Innovations — Software Engineering Studio",
  description:
    "SNAB Innovations is an engineering firm building dependable, production-grade systems from Nashik, India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="flex-1">
      <ContainerWrapper>

        {/* ── Heading: Left-Aligned and Compact ────────────── */}
        <div className="px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-6 border-b border-dotted border-edge">
          <TextGenerateEffect
            as="h1"
            className="text-heading font-normal tracking-tight"
            staggerDuration={0.10}
            transition={{ duration: 0.55 }}
          >
            ABOUT US
          </TextGenerateEffect>
        </div>

        {/* ── Hero Image & First Paragraph Grid ───────────── */}
        <div className="px-6 pt-6 pb-6 sm:px-10 sm:pt-8 sm:pb-8 md:px-14 md:pt-10 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-center">
            {/* Left side: Image aligned under heading */}
            <div className="lg:col-span-7 flex items-center justify-start">
              <div
                className="relative w-full overflow-hidden"
                style={{ maxWidth: "720px", aspectRatio: "16 / 9" }}
              >
                <Image
                  src="/about-hero-header.jpg"
                  alt="SNAB Innovations studio"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </div>
            </div>

            {/* Right side: First Paragraph block matching image height */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-4">
              <TextGenerateEffect
                as="h2"
                className="text-title font-normal text-foreground leading-snug"
                staggerDuration={0.09}
                transition={{ duration: 0.55 }}
              >
                What's SNAB Innovations and why SNAB Innovations?
              </TextGenerateEffect>
              {/* Desktop Copy */}
              <div className="hidden lg:flex flex-col gap-4">
                <TextGenerateEffect
                  as="p"
                  className="text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  SNAB Innovations is an <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">engineering firm</mark> based in Nashik, Maharashtra, India. We partner with ambitious founders, operational leaders, and enterprise teams across North America, Europe, Southeast Asia, and India who require <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">dependable, production-grade systems</span> that don't just launch—they endure.
                </TextGenerateEffect>
                <TextGenerateEffect
                  as="p"
                  className="text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  We exist because modern software demands more than fragile AI prototypes. We combine <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">rigorous systems architecture</span>, <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">deterministic fallback mechanisms</span>, and practical engineering to build observable, maintainable platforms that earn trust and power critical business workflows long into the future.
                </TextGenerateEffect>
              </div>

              {/* Mobile Copy */}
              <div className="lg:hidden">
                <TextGenerateEffect
                  as="p"
                  className="text-[14px] leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  SNAB Innovations is an <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">engineering firm</mark> based in Nashik, India. We bridge the gap between experimental AI prototypes and <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">dependable, production-grade systems</span> engineered to endure.
                </TextGenerateEffect>
              </div>
            </div>
          </div>
        </div>

        {/* ── Services, Products, Team & Visuals (Unified Section with Top Dotted Line) ── */}
        <div className="px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16 border-t border-dotted border-edge">
          <div className="flex flex-col gap-12 sm:gap-14 md:gap-16">
            {/* Top Row: Services & Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left: Services We Provide */}
              <div className="flex flex-col gap-3">
                <TextGenerateEffect
                  as="h2"
                  className="text-title font-normal text-foreground leading-snug"
                  staggerDuration={0.09}
                  transition={{ duration: 0.55 }}
                >
                  Our Services
                </TextGenerateEffect>
                {/* Desktop */}
                <TextGenerateEffect
                  as="p"
                  className="hidden md:block text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  We deliver <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">end-to-end software engineering and applied intelligence</mark> tailored to high-growth companies and enterprise operators. Our capabilities span <Link href="/work" className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors">intelligent workflow automation ↗</Link>, custom full-stack web and mobile platforms, robust API architectures, and LLM integrations. We specialize in transforming complex manual processes into <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">observable, self-running digital pipelines</span> backed by automated evaluation harnesses, deterministic fallback systems, and enterprise data governance.
                </TextGenerateEffect>
                {/* Mobile */}
                <TextGenerateEffect
                  as="p"
                  className="md:hidden text-[14px] leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  We deliver <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">intelligent workflow systems</mark>, <Link href="/work" className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors">custom web and mobile platforms ↗</Link>, and robust software architectures tailored to eliminate operational friction and scale with your business.
                </TextGenerateEffect>
              </div>

              {/* Right: Products We Build & Offer */}
              <div className="flex flex-col gap-3">
                <TextGenerateEffect
                  as="h2"
                  className="text-title font-normal text-foreground leading-snug"
                  staggerDuration={0.09}
                  transition={{ duration: 0.55 }}
                >
                  Our Products
                </TextGenerateEffect>
                {/* Desktop */}
                <TextGenerateEffect
                  as="p"
                  className="hidden md:block text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  Alongside bespoke client development, we engineer <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">proprietary intelligent platforms</mark> designed to solve acute operational challenges. Our product ecosystem includes <Link href="https://interviewxpert.in" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors">InterviewXpert ↗</Link>, an intelligent platform that streamlines recruitment workflows and synthesizes candidate evaluation records, and <span className="text-foreground font-medium">NotaryXpert</span>, which automates document workflows, appointments, and client case tracking for legal professionals. Each product reflects our core philosophy: <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">dependable software built for daily production use</span>.
                </TextGenerateEffect>
                {/* Mobile */}
                <TextGenerateEffect
                  as="p"
                  className="md:hidden text-[14px] leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55 }}
                >
                  We build proprietary intelligent platforms like <Link href="https://interviewxpert.in" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors">InterviewXpert ↗</Link> for hiring automation and <span className="text-foreground font-medium">NotaryXpert</span> for legal workflow management, <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">engineered for daily production use</span>.
                </TextGenerateEffect>
              </div>
            </div>

            {/* Bottom Row: Interactive Core Team & Team Image with Dotted Pointers */}
            <TeamInteractiveSection />
          </div>
        </div>

        {/* ── Single dotted divider ───────────────────────── */}
        <div className="border-t border-dotted border-edge" />

        {/* ── MagicText CTA ──────────────────────────────── */}
        <div className="py-16 sm:py-20 md:py-28 px-6 sm:px-10 md:px-14">
          <MagicText text="We build systems that earn trust over time. With every decision we make we ask one question — does this hold up in the real world? Start a conversation with us. We would love to hear what you are working on." />
          <div className="mt-10 md:mt-14 flex justify-center">
            <Link
              href="/contact"
              className="font-mono text-caption uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              CONTACT US ↗
            </Link>
          </div>
        </div>

      </ContainerWrapper>

      <Footer />
    </main>
  );
}
