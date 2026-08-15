import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { Footer } from "../Footer";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms & Conditions for using SNAB Innovations services and website.",
  path: "/terms",
});

const sections = [
  {
    number: "01",
    title: "Services Provided",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        SNAB Innovations provides AI product engineering, workflow automation,
        web platforms, custom application development, and consulting services.
        All services are subject to specific agreements signed between SNAB
        Innovations and its clients.
      </p>
    ),
  },
  {
    number: "02",
    title: "Intellectual Property",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        Unless otherwise stated in a separate written agreement, all materials
        on this website, including design, code, graphics, and text, are the
        intellectual property of SNAB Innovations and are protected by
        applicable copyright and trademark laws.
      </p>
    ),
  },
  {
    number: "03",
    title: "Website Use",
    content: (
      <>
        <p className="text-body leading-relaxed text-muted-foreground">
          You agree to use this website only for lawful purposes. You must not:
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "Use the website in any way that causes, or may cause, damage to the website or impairment of its availability.",
            "Attempt to gain unauthorized access to any part of the website or our server systems.",
            "Use the website to copy, store, host, transmit, send, use, publish or distribute any malicious software.",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-body text-muted-foreground"
            >
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
    number: "04",
    title: "Limitation of Liability",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        In no event shall SNAB Innovations, nor any of its officers, directors,
        and employees, be liable for anything arising out of or in any way
        connected with your use of this website, whether such liability is under
        contract, tort, or otherwise. SNAB Innovations shall not be liable for
        any indirect, consequential, or special liability arising out of or in
        any way related to your use of this website.
      </p>
    ),
  },
  {
    number: "05",
    title: "Indemnification",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        You hereby indemnify to the fullest extent SNAB Innovations from and
        against any and/or all liabilities, costs, demands, causes of action,
        damages, and expenses arising in any way related to your breach of any
        of the provisions of these Terms.
      </p>
    ),
  },
  {
    number: "06",
    title: "Governing Law & Jurisdiction",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        These Terms will be governed by and construed in accordance with the
        laws of India, and you submit to the non-exclusive jurisdiction of the
        state and federal courts located in Nashik, Maharashtra, India for the
        resolution of any disputes.
      </p>
    ),
  },
  {
    number: "07",
    title: "Changes to Terms",
    content: (
      <p className="text-body leading-relaxed text-muted-foreground">
        We reserve the right to revise these Terms &amp; Conditions at any
        time. By using this website, you are expected to review these Terms on a
        regular basis to ensure you understand all terms and conditions governing
        the use of this website.
      </p>
    ),
  },
  {
    number: "08",
    title: "Contact Us",
    content: (
      <div className="space-y-3">
        <p className="text-body leading-relaxed text-muted-foreground">
          If you have any questions about these Terms &amp; Conditions, please
          reach out.
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

export default function TermsPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section aria-labelledby="terms-title">
        <ContainerWrapper>
          <div className="relative min-h-[280px] overflow-hidden border-b border-dotted border-edge bg-card sm:min-h-[320px]">
            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 section-dot-grid opacity-40"
              aria-hidden="true"
            />
            {/* Orange radial glow */}
            <div
              className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,90,22,0.10) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6 sm:min-h-[320px] sm:p-10 md:p-14">
              <p className="mb-4 font-mono text-caption uppercase tracking-widest text-muted-foreground">
                Governance &amp; Agreement
              </p>
              <h1
                id="terms-title"
                className="max-w-2xl text-display font-normal"
              >
                Terms &amp; Conditions
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
              Welcome to SNAB Innovations. By accessing our website (
              <a
                href="https://snab.co.in"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                snab.co.in
              </a>
              ) and using our services, you agree to comply with and be bound by
              the following terms and conditions. If you disagree with any part
              of these terms, please do not use our website or services.
            </p>
          </div>
        </ContainerWrapper>
      </section>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.number} aria-labelledby={`terms-${section.number}`}>
          <ContainerWrapper>
            <div className="grid border-b border-dotted border-edge md:grid-cols-[14rem_1fr]">
              {/* Left: number + title */}
              <div className="flex flex-col justify-start gap-2 border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
                <span className="font-mono text-caption text-foreground/30">
                  {section.number}
                </span>
                <h2
                  id={`terms-${section.number}`}
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
