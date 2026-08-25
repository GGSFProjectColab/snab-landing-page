"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

export function ServicesAccordion({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isHoverable, setIsHoverable] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openRow = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenIndex(index);
  };

  const handleHoverOpen = (index: number) => {
    if (!isHoverable || prefersReducedMotion) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => openRow(index), 80);
  };

  const handleHoverLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateHover = () => setIsHoverable(hoverQuery.matches);
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    updateHover();
    updateMotion();
    hoverQuery.addEventListener?.("change", updateHover);
    motionQuery.addEventListener?.("change", updateMotion);
    return () => {
      hoverQuery.removeEventListener?.("change", updateHover);
      motionQuery.removeEventListener?.("change", updateMotion);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div className="divide-y divide-dotted divide-edge">
      {services.map((service, index) => {
        const isOpen = openIndex === index;
        const isLCP = index === 0;

        return (
          <div key={service.number}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`service-panel-${service.number}`}
              onMouseEnter={() => handleHoverOpen(index)}
              onMouseLeave={handleHoverLeave}
              onFocus={() => openRow(index)}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-muted/30 sm:gap-4 sm:p-6 md:p-8"
            >
              <span className="flex min-w-0 items-baseline gap-3 sm:gap-6 md:gap-10">
                <span className="shrink-0 font-mono text-[10px] sm:text-caption uppercase tracking-widest text-muted-foreground">
                  {service.number}
                </span>
                <span className="text-base sm:text-title font-normal tracking-tight transition-colors group-hover:text-primary md:text-heading lg:text-heading">
                  {service.title}
                </span>
              </span>
              <ArrowDown
                aria-hidden="true"
                className={cn(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-hover:text-primary",
                  isOpen && "rotate-180 text-primary",
                )}
              />
            </button>

            <div
              id={`service-panel-${service.number}`}
              aria-hidden={!isOpen}
              className={cn(
                "grid ease-out",
                prefersReducedMotion ? "transition-none" : "transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-12">
                  <div className="grid gap-5 sm:gap-6 md:gap-8 lg:gap-10 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_380px] items-start">
                    {/* Left: Text content */}
                    <div className="min-w-0 order-last md:order-first">
                      <p className="max-w-xl text-sm sm:text-body leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                        {service.capabilities.map((capability) => (
                          <span
                            key={capability}
                            className="border border-dotted border-edge px-2 py-1 text-[10px] sm:px-2.5 sm:py-1 font-mono sm:text-caption uppercase tracking-wider text-muted-foreground"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>

                      {service.highlights && service.highlights.length > 0 && (
                        <div className="mt-5 sm:mt-6 space-y-1.5">
                          <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Key Highlights
                          </p>
                          {service.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-start gap-2 text-[13px] sm:text-sm text-muted-foreground"
                            >
                              <CheckCircle2
                                size={13}
                                className="mt-0.5 shrink-0 text-teal"
                              />
                              <span className="leading-snug">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Service image - responsive full-bleed on mobile, contained on desktop */}
                    {service.image && (
                      <div className="relative overflow-hidden order-first md:order-last -mx-4 sm:-mx-6 md:mx-0">
                        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10]">
                          <Image
                            src={service.image}
                            alt={service.imageAlt || service.title}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 300px, 380px"
                            priority={isLCP}
                            loading={isLCP ? "eager" : "lazy"}
                            {...(isLCP ? { fetchPriority: "high" as const } : {})}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
