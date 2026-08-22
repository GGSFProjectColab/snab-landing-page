"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

export function ServicesAccordion({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openRow = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenIndex(index);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div className="divide-y divide-dotted divide-edge">
      {services.map((service, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={service.number}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`service-panel-${service.number}`}
              onMouseEnter={() => openRow(index)}
              onFocus={() => openRow(index)}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors duration-200 hover:bg-muted/30 sm:p-6 md:p-8"
            >
              <span className="flex min-w-0 items-baseline gap-4 sm:gap-6 md:gap-10">
                <span className="shrink-0 font-mono text-caption uppercase tracking-widest text-muted-foreground">
                  {service.number}
                </span>
                <span className="text-title font-normal tracking-tight transition-colors group-hover:text-primary sm:text-subheading md:text-heading">
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
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-8 sm:px-6 sm:pb-10 md:px-8 md:pb-12">
                  <p className="max-w-xl text-body leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="border border-dotted border-edge px-2.5 py-1 font-mono text-caption uppercase tracking-wider text-muted-foreground"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  {service.highlights && service.highlights.length > 0 && (
                    <div className="mt-6 hidden space-y-1.5 md:block">
                      <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Key Highlights
                      </p>
                      {service.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2
                            size={13}
                            className="mt-0.5 shrink-0 text-teal"
                          />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
