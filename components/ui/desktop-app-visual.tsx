"use client";

import { MacbookPro } from "@/components/ui/macbook-pro";

export function DesktopAppVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-2">
      {/* Background subtle glow & grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--edge) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      {/* Macbook Pro Mockup */}
      <div className="relative z-10 w-full max-w-[250px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center">
        <MacbookPro
          src="/ascii-magic-16.png"
          className="w-full h-auto max-h-[170px] sm:max-h-[220px] md:max-h-[260px] lg:max-h-[290px] text-card"
        />
      </div>
    </div>
  );
}
