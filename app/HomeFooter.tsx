import { BrandLogo } from "./BrandLogo";
import { siteConfig } from "@/lib/site";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Interview Expert", href: "https://interviewxpert.in", external: true },
      { label: "Notary Expert", href: "https://notaryexpert.in", external: true },
      { label: "NyayaAI", href: "https://nyayai.interviewxpert.in/", external: true },
      { label: "Termy", href: "https://termyy.vercel.app/", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "robots.txt", href: "/robots.txt", external: true },
      { label: "llm.txt", href: "/llm.txt", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export function HomeFooter() {
  return (
    <footer className="relative" aria-labelledby="footer-brand">
      <div className="full-bleed-border-t" aria-hidden="true" />

      <div className="mx-auto w-full">
        <div className="relative mx-[clamp(1rem,1.5vw,2.5rem)] border-x border-dotted border-edge">
          {/* Brand + Nav row */}
          <div className="grid grid-cols-1 gap-0 border-b border-dotted border-edge md:grid-cols-[1fr_2fr]">
            {/* Brand section */}
            <div className="footer-brand-cell relative flex flex-col justify-between gap-4 border-b border-dotted border-edge p-4 sm:p-6 md:border-b-0 md:border-r">
              <div className="flex flex-col gap-4">
                <a
                  className="inline-flex w-max items-center gap-3"
                  href="/#home"
                  aria-label="SNAB Innovations home"
                >
                  <BrandLogo className="h-10 w-10" />
                  <span id="footer-brand" className="text-title font-normal">
                    SNAB Innovations
                  </span>
                </a>
                <TextGenerateEffect
                  as="p"
                  className="max-w-xs text-body leading-relaxed text-muted-foreground"
                  staggerDuration={0.03}
                >
                  Engineering firm building intelligent platforms and dependable systems from Nashik, India.
                </TextGenerateEffect>

                {/* Social icons */}
                <div className="mt-2 flex items-center gap-3">
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center border border-dotted border-edge text-button transition-all duration-200 hover:bg-accent hover:border-foreground/20"
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on X"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center border border-dotted border-edge text-button transition-all duration-200 hover:bg-accent hover:border-foreground/20"
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center border border-dotted border-edge text-button transition-all duration-200 hover:bg-accent hover:border-foreground/20"
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center border border-dotted border-edge text-button transition-all duration-200 hover:bg-accent hover:border-foreground/20"
                    href={siteConfig.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe on YouTube"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>

                {/* Copyright row placed below socials */}
                <p className="mt-1 text-caption text-muted-foreground">
                  &copy; {new Date().getFullYear()} SNAB Innovations. All rights reserved.
                </p>
              </div>
            </div>

            {/* Navigation columns */}
            <nav className="grid grid-cols-2 gap-0 border-b border-dotted border-edge md:grid-cols-4 md:border-b-0" aria-label="Footer navigation">
              {footerColumns.map((column, colIdx) => (
                <div
                  className={`flex flex-col gap-3 border-b border-dotted border-edge p-4 sm:p-6 last:border-b-0 md:border-b-0 ${
                    colIdx < footerColumns.length - 1 ? "md:border-r" : ""
                  } ${colIdx > 0 ? "md:pl-6" : "md:pl-6"} ${colIdx < footerColumns.length - 1 ? "md:pr-6" : "md:pr-6"}`}
                  key={column.title}
                >
                  <h3 className="text-caption font-medium uppercase tracking-wider text-foreground/80">
                    {column.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {column.links.map((item) => (
                      <a
                        className="inline-flex items-center gap-1 text-button text-muted-foreground transition-colors duration-200 hover:text-foreground hover:translate-x-1 transform"
                        href={item.href}
                        key={item.label}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                        <span>{item.label}</span>
                        {item.external && (
                          <span className="text-[10px] text-muted-foreground/60" aria-hidden="true">
                            ↗
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Interactive Particle Typography - hello@snab.co.in (Half-cut submerged in bottom blur) */}
          <div className="flex items-center justify-center overflow-hidden w-full p-0 m-0 pb-0">
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-full flex items-center justify-center cursor-pointer p-0 m-0 pb-0"
              aria-label="Email SNAB Innovations at hello@snab.co.in"
            >
              <CursorDrivenParticleTypography
                text="hello@snab.co.in"
                opacity={0.4}
                particleSize={1.8}
                particleDensity={3}
                dispersionStrength={22}
                returnSpeed={0.08}
                topOffset={4}
                className="w-full h-[60px] sm:h-[85px] md:h-[115px] lg:h-[135px] p-0 m-0 pb-0"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
