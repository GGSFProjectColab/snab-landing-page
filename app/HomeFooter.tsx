import { BrandLogo } from "./BrandLogo";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
  ],
  [
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
];

export function HomeFooter() {
  return (
    <footer aria-labelledby="footer-brand">
      {/* Shader band */}
      <div
        className="h-20 sm:h-24 relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, var(--footer-shader-front) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
          aria-hidden="true"
        />
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <a
              className="flex items-center gap-2"
              href="/"
              aria-label="SNAB Innovations home"
            >
              <BrandLogo className="h-8 w-8" />
              <span id="footer-brand" className="font-pixelify text-base">
                SNAB Innovations
              </span>
            </a>
            <div className="flex items-center gap-2">
              <a
                className="inline-flex h-8 items-center gap-2 border border-dotted border-edge px-3 text-xs font-medium transition-colors hover:bg-accent"
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter
              </a>
              <a
                className="inline-flex h-8 items-center gap-2 border border-dotted border-edge px-3 text-xs font-medium transition-colors hover:bg-accent"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <nav
            className="grid grid-cols-2 gap-6 sm:grid-cols-3"
            aria-label="Footer navigation"
          >
            {footerColumns.map((column, columnIndex) => (
              <div className="flex flex-col gap-2" key={columnIndex}>
                {column.map((item) => (
                  <a
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-dotted border-edge py-4 text-xs text-muted-foreground">
          <p>&copy; 2026 SNAB Innovations</p>
          <p className="font-mono text-[10px]">
            Built with love, LLMs and Coffee
          </p>
        </div>
      </div>

      {/* Ending dot grid */}
      <div className="h-20 sm:h-24 ending-dot-grid" aria-hidden="true" />
    </footer>
  );
}
