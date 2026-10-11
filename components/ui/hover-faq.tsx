"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

interface HoverFaqAccordionProps {
  faqs: readonly FaqItem[];
  className?: string;
}

export function HoverFaqAccordion({ faqs, className = "" }: HoverFaqAccordionProps) {
  // Support hover index (desktop) and clicked/toggled index (mobile/keyboard)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [toggledIndex, setToggledIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setToggledIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={`rounded-lg border border-dotted border-edge divide-y divide-dotted divide-edge bg-card/10 overflow-hidden ${className}`}
    >
      {faqs.map((faq, index) => {
        const isOpen = hoveredIndex === index || toggledIndex === index;

        return (
          <div
            key={faq.question}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleToggle(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={isOpen}
            className={`group p-5 sm:p-6 transition-all duration-300 cursor-pointer select-none outline-none focus-visible:bg-card/30 ${
              isOpen ? "bg-card/25 shadow-sm" : "hover:bg-card/15"
            }`}
          >
            {/* Header Question Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <span
                  className={`font-mono text-caption pt-0.5 shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-teal font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-body sm:text-title font-medium transition-colors duration-300 leading-snug ${
                    isOpen ? "text-foreground" : "text-foreground/90 group-hover:text-teal"
                  }`}
                >
                  {faq.question}
                </span>
              </div>

              {/* Expand Indicator Icon */}
              <div
                className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-dotted transition-all duration-300 ${
                  isOpen
                    ? "border-teal/40 bg-teal/10 text-teal rotate-45"
                    : "border-edge text-muted-foreground group-hover:border-teal/40 group-hover:text-teal rotate-0"
                }`}
                aria-hidden="true"
              >
                <Plus size={14} className="transition-transform duration-300" />
              </div>
            </div>

            {/* Smooth Animated Collapsible Content */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-3 pt-3" : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pl-8 sm:pl-10 text-body leading-relaxed text-muted-foreground border-t border-dotted border-edge/40 pt-3">
                  <p className="whitespace-pre-line">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
