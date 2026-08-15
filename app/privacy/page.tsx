import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { Footer } from "../Footer";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for SNAB Innovations, detailing how we collect, use, and protect your information.",
  path: "/privacy",
});

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <p className="text-body leading-relaxed text-muted-foreground">
          We collect information that you provide directly to us when you fill
          out contact forms, apply for careers, or communicate with us. This may
          include:
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "Contact details (name, email address, phone number).",
            "Professional details (resume/CV, LinkedIn profile, work experience).",
            "Any other information you choose to provide.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-body text-muted-foreground">
              <span className="mt-0.5 font-mono text-caption text-foreground/40 shrink-0">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p className="text-body leading-relaxed text-muted-foreground">
          We use the information we collect to operate, maintain, and improve
          our services, including:
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "To respond to your inquiries and support requests.",
            "To process job applications and contact you regarding careers.",
            "To analyze usage patterns and improve website performance.",
            "To comply with legal obligations.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-body text-muted-foreground">
              <span className="mt-0.5 font-mono text-caption text-foreground/40 shrink-0">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "Log Files",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        SNAB Innovations follows a standard procedure of using log files. These
        files log visitors when they visit websites. The information collected
        by log files includes internet protocol (IP) addresses, browser type,
        Internet Service Provider (ISP), date and time stamp, referring/exit
        pages, and possibly the number of clicks. These are not linked to any
        information that is personally identifiable.
      </p>
    ),
  },
  {
    number: "04",
    title: "Data Retention",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        We retain your personal information only for as long as necessary to
        fulfill the purposes outlined in this policy, unless a longer retention
        period is required or permitted by law.
      </p>
    ),
  },
  {
    number: "05",
    title: "Information Security",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        We implement commercially reasonable security measures to protect your
        personal information from unauthorized access, alteration, disclosure,
        or destruction. However, please note that no method of transmission
        over the Internet is 100% secure.
      </p>
    ),
  },
  {
    number: "06",
    title: "Your Rights",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        Depending on your location, you may have rights regarding your personal
        data, including the right to access, correct, or delete the data we
        hold about you. To exercise these rights, please contact us at{" "}
        <a
          href="mailto:hello@snab.co.in"
          className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          hello@snab.co.in
        </a>
        .
      </p>
    ),
  },
  {
    number: "07",
    title: "Contact Us",
    content: (
      <div className="space-y-3">
        <p className="text-body leading-relaxed text-muted-foreground">
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to reach out.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="mailto:hello@snab.co.in"
            className="inline-flex items-center gap-2 text-body text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            <span className="font-mono text-caption text-foreground/40">→</span>
            hello@snab.co.in
          </a>
          <p className="flex items-center gap-2 text-body text-muted-foreground">
            <span className="font-mono text-caption text-foreground/40">→</span>
            Nashik, Maharashtra, 422005, India
          </p>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section aria-labelledby="privacy-title">
        <ContainerWrapper>
          <div className="relative min-h-[280px] overflow-hidden border-b border-dotted border-edge bg-card sm:min-h-[320px]">
            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 section-dot-grid opacity-40"
              aria-hidden="true"
            />
            {/* Orange radial glow */}
            <div
              className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,90,22,0.12) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6 sm:min-h-[320px] sm:p-10 md:p-14">
              <p className="mb-4 font-mono text-caption uppercase tracking-widest text-muted-foreground">
                Compliance &amp; Trust
              </p>
              <h1
                id="privacy-title"
                className="max-w-2xl text-display font-normal"
              >
                Privacy Policy
              </h1>
              <p className="mt-4 font-mono text-label text-muted-foreground">
                Last updated: July 17, 2026
              </p>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      {/* Intro */}
      <section aria-label="Introduction">
        <ContainerWrapper>
          <div className="border-b border-dotted border-edge p-6 sm:p-10 md:p-14">
            <p className="max-w-2xl text-body leading-relaxed text-muted-foreground">
              At SNAB Innovations, accessible from{" "}
              <a
                href="https://snab.co.in"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                snab.co.in
              </a>
              , one of our main priorities is the privacy of our visitors. This
              Privacy Policy document contains types of information that is
              collected and recorded by SNAB Innovations and how we use it.
            </p>
          </div>
        </ContainerWrapper>
      </section>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.number} aria-labelledby={`privacy-${section.number}`}>
          <ContainerWrapper>
            <div className="grid border-b border-dotted border-edge md:grid-cols-[14rem_1fr]">
              {/* Left: number + title */}
              <div className="flex flex-col justify-start gap-2 border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
                <span className="font-mono text-caption text-foreground/30">
                  {section.number}
                </span>
                <h2
                  id={`privacy-${section.number}`}
                  className="text-title font-normal leading-snug tracking-tight"
                >
                  {section.title}
                </h2>
              </div>
              {/* Right: content */}
              <div className="p-6 sm:p-8 md:p-10">{section.content}</div>
            </div>
          </ContainerWrapper>
        </section>
      ))}

      <Footer />
    </main>
  );
}
