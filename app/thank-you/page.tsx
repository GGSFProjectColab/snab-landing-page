import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, Phone, ArrowRight, Home, Layers, BookOpen, ShieldCheck } from "lucide-react";
import { createPageMetadata, siteConfig } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { Footer } from "../Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const metadata: Metadata = createPageMetadata({
  title: "Thank You — Inquiry Received | SNAB Innovations",
  description:
    "Thank you for contacting SNAB Innovations. We have received your inquiry and our engineering team will get back to you shortly.",
  path: "/thank-you",
  noIndex: true,
});

const nextSteps = [
  {
    step: "01",
    title: "Inquiry Review",
    description:
      "Our core engineering and product specialists review your requirements, technical complexity, and architectural timeline.",
  },
  {
    step: "02",
    title: "Engineering Evaluation",
    description:
      "We prepare preliminary recommendations, feasibility notes, or clarifying questions tailored specifically to your project.",
  },
  {
    step: "03",
    title: "Discovery & Next Steps",
    description:
      "You will receive a direct email within 24 business hours to coordinate an in-depth technical discussion or discovery sprint.",
  },
];

export default function ThankYouPage() {
  return (
    <main className="flex-1">
      {/* ── Section 1: Hero & Status Confirmation ────────── */}
      <section aria-labelledby="thank-you-title">
        <ContainerWrapper>
          <div className="grid grid-cols-1 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,2.2fr)_minmax(0,2.8fr)] border-b border-dotted border-edge">
            {/* Visual Confirmation Panel (Echoing Contact layout) */}
            <div className="relative flex flex-col justify-between border-b border-dotted border-edge bg-gradient-to-b from-card/30 via-background to-background p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-12 xl:p-16">
              {/* Header Label */}
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-muted-foreground">
                  / submission status /
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal shadow-[0_0_24px_rgba(45,212,191,0.2)]">
                    <CheckCircle2 size={24} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-caption uppercase tracking-wider text-teal">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                      Inquiry Successfully Received
                    </span>
                  </div>
                </div>
              </div>

              {/* Status details card */}
              <div className="my-8 rounded-lg border border-dotted border-edge bg-card/40 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-foreground mb-4">
                  <ShieldCheck size={16} className="text-teal" />
                  <span className="font-mono text-caption uppercase tracking-wider text-muted-foreground">
                    Submission Details
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-caption uppercase text-muted-foreground/80">Expected Response</p>
                    <div className="mt-1 flex items-center gap-1.5 text-button font-medium text-foreground">
                      <Clock size={14} className="text-teal shrink-0" />
                      <span>Within 24 Hours</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-caption uppercase text-muted-foreground/80">Support Coverage</p>
                    <p className="mt-1 text-button font-medium text-foreground">Monday – Saturday (IST)</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-dotted border-edge/60">
                  <p className="text-label text-muted-foreground leading-relaxed">
                    A copy of your message has been logged in our secure intake queue. You will receive an email response directly from our team.
                  </p>
                </div>
              </div>

              {/* Direct Urgent Assistance */}
              <div className="space-y-3">
                <p className="font-mono text-caption uppercase tracking-widest text-muted-foreground">
                  Need immediate assistance?
                </p>
                <div className="flex flex-wrap items-center gap-4 text-button">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail size={14} className="text-primary" />
                    <span>{siteConfig.email}</span>
                  </a>
                  <span className="text-edge" aria-hidden="true">|</span>
                  <a
                    href="tel:+919175917293"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone size={14} className="text-primary" />
                    <span>+91 91759 17293</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Content & Action Half */}
            <div className="flex flex-col justify-center gap-10 p-6 sm:p-10 lg:p-12 xl:p-16">
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-primary mb-2">
                  / thank you /
                </p>
                <TextGenerateEffect
                  as="h1"
                  id="thank-you-title"
                  className="block font-normal text-foreground"
                  wordClassName="text-display"
                  staggerDuration={0.08}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  filter
                >
                  We Received Your Message
                </TextGenerateEffect>
                <TextGenerateEffect
                  as="p"
                  className="mt-4 max-w-xl text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.035}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  Thank you for reaching out to SNAB Innovations. We appreciate your interest in collaborating with our engineering studio.
                </TextGenerateEffect>
              </div>

              {/* What Happens Next Section */}
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-primary mb-3">
                  / next steps /
                </p>
                <h2 className="text-title font-normal text-foreground mb-4">
                  What happens next?
                </h2>
                <div className="flex flex-col divide-y divide-dotted divide-edge border-y border-dotted border-edge">
                  {nextSteps.map((step) => (
                    <div key={step.step} className="grid grid-cols-[auto_1fr] gap-4 py-4 sm:gap-6">
                      <span className="font-mono text-label text-teal">{step.step}</span>
                      <div>
                        <h3 className="text-button font-medium text-foreground">{step.title}</h3>
                        <p className="mt-1 text-label text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-caption uppercase tracking-wider px-5 py-2.5 transition-opacity hover:opacity-90"
                >
                  <Home size={14} aria-hidden="true" />
                  <span>Return Home</span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-dotted border-edge font-mono text-caption uppercase tracking-wider px-5 py-2.5 text-foreground transition-all hover:bg-accent hover:border-foreground/20"
                >
                  <Layers size={14} aria-hidden="true" />
                  <span>Explore Services</span>
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 border border-dotted border-edge font-mono text-caption uppercase tracking-wider px-5 py-2.5 text-foreground transition-all hover:bg-accent hover:border-foreground/20"
                >
                  <span>Featured Work</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      {/* ── Section 2: Explore Studio Highlights ─────────── */}
      <section aria-labelledby="explore-more-title">
        <ContainerWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dotted divide-edge border-b border-dotted border-edge">
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-4">
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-primary mb-1">
                  / our craft /
                </p>
                <h3 className="text-title font-normal text-foreground">
                  Production-Grade Engineering
                </h3>
                <p className="mt-2 text-body text-muted-foreground leading-relaxed">
                  Learn how we architect AI-native software, resilient cloud workflows, and bespoke digital products from the ground up.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-button text-muted-foreground transition-colors hover:text-foreground self-start font-mono text-caption uppercase tracking-wider"
              >
                <span>Read about our capabilities</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-4">
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-primary mb-1">
                  / insights /
                </p>
                <h3 className="text-title font-normal text-foreground">
                  Engineering Blog
                </h3>
                <p className="mt-2 text-body text-muted-foreground leading-relaxed">
                  Discover architectural deep-dives, generative AI patterns, and real-world system case studies published by our team.
                </p>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-button text-muted-foreground transition-colors hover:text-foreground self-start font-mono text-caption uppercase tracking-wider"
              >
                <span>Browse articles</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}
