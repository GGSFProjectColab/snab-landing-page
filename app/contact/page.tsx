import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata, siteConfig } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { Footer } from "../Footer";
import { LazyContactMap } from "./LazyContactMap";
import { ContactForm } from "./ContactForm";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Our AI & Software Product Team",
  description:
    "Contact SNAB Innovations in Nashik to plan an AI product, workflow automation, website, app, or custom software project.",
  path: "/contact",
});

const contactDetails = [
  {
    label: "Address",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    lines: ["Nashik, Maharashtra", "India 422005"],
    link: { label: "Get directions", href: "https://www.google.com/maps/search/?api=1&query=Nashik%2C%20Maharashtra" },
  },
  {
    label: "Email",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    lines: [siteConfig.email],
    link: { label: "Send mail", href: `mailto:${siteConfig.email}` },
  },
  {
    label: "Phone",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    lines: ["+91 91759 17293", "+91 95455 56045"],
    link: { label: "Schedule a call", href: "tel:+919175917293" },
  },
];

const socialLinks = [
  {
    label: "X",
    href: siteConfig.links.twitter,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.links.youtube,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Section 1: Image + Contact */}
      <section aria-labelledby="contact-title">
        <ContainerWrapper>
          <div className="grid grid-cols-1 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* Image half */}
            <div className="relative min-h-[260px] overflow-hidden border-b border-dotted border-edge sm:min-h-[320px] lg:min-h-full lg:border-b-0">
              <Image
                className="absolute inset-0 h-full w-full object-cover object-center"
                src="https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787682752/lfkhcmtdgwgfay88ttci.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-black/20"
                aria-hidden="true"
              />
              <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                <p className="font-mono text-caption uppercase tracking-widest text-white/80">
                  / contact /
                </p>
              </div>
            </div>

            {/* Content half */}
            <div className="flex flex-col justify-center gap-10 p-6 sm:p-10 lg:p-12 xl:p-16">
              <div>
                <TextGenerateEffect
                  as="h1"
                  id="contact-title"
                  className="block font-normal text-foreground"
                  wordClassName="text-display"
                  staggerDuration={0.10}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  filter
                >
                  Contact
                </TextGenerateEffect>
                <TextGenerateEffect
                  as="p"
                  className="mt-4 max-w-xl text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.045}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  Tell us what you are trying to improve, automate, or launch. We will help shape the right product and a practical path to production.
                </TextGenerateEffect>
              </div>

              {/* Form */}
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-primary mb-2">
                  / send a message /
                </p>
                <TextGenerateEffect
                  as="h2"
                  className="block text-title font-normal text-foreground"
                  staggerDuration={0.09}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  filter
                >
                  Get In Touch
                </TextGenerateEffect>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      {/* Section 2: Map + Address/Phone/Email */}
      <section aria-labelledby="contact-find-title">
        <ContainerWrapper>
          <div className="grid grid-cols-1 pb-10 pt-10 sm:pb-14 sm:pt-14 lg:grid-cols-2">
            {/* Details half */}
            <div className="flex flex-col justify-center gap-8 p-6 sm:p-10 lg:p-12 xl:p-16">
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-primary mb-2">
                  / find us /
                </p>
                <TextGenerateEffect
                  as="h2"
                  id="contact-find-title"
                  className="text-subheading font-normal text-foreground"
                  staggerDuration={0.09}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  filter
                >
                  Nashik, Maharashtra
                </TextGenerateEffect>
              </div>

              <div className="flex flex-col divide-y divide-dotted divide-edge">
                {contactDetails.map((detail) => (
                  <div
                    className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                    key={detail.label}
                  >
                    <span className="mt-0.5 text-primary">
                      {detail.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-caption uppercase tracking-widest text-muted-foreground mb-1">
                        {detail.label}
                      </p>
                      {detail.lines.map((line) => (
                        <p
                          className="text-body text-foreground"
                          key={line}
                        >
                          {line}
                        </p>
                      ))}
                      <a
                        className="mt-1.5 inline-flex items-center gap-1 text-button text-muted-foreground transition-colors hover:text-foreground"
                        href={detail.link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {detail.link.label}
                        <span aria-hidden="true" className="text-caption">↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-muted-foreground mb-3">
                  Follow us
                </p>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      className="inline-flex h-8 w-8 items-center justify-center border border-dotted border-edge text-muted-foreground transition-all duration-200 hover:bg-accent hover:border-foreground/20 hover:text-foreground"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      key={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map half */}
            <div className="relative min-h-[260px] border-b border-dotted border-edge lg:min-h-[360px] lg:border-b-0">
              <div className="contact-map-label">
                <span aria-hidden="true" />
                Nashik / MH / IN
              </div>
              <div className="absolute inset-6 lg:inset-8">
                <LazyContactMap />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}