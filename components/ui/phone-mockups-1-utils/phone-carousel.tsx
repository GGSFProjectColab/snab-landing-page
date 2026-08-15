"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Wifi, Battery } from "lucide-react";
import { cn } from "@/lib/utils";

const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GrainGradient),
  { ssr: false }
);

export interface PhoneCarouselProps {
  className?: string;
}

export function PhoneCarousel({
  className,
}: PhoneCarouselProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={cn("relative flex flex-col items-center justify-center max-h-full", className)}>
      <div className="relative h-[200px] sm:h-[230px] md:h-[340px] lg:h-[390px] xl:h-[415px] aspect-[9/19] rounded-[24px] sm:rounded-[28px] md:rounded-[36px] lg:rounded-[42px] p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-neutral-950 border-[2px] sm:border-[2.5px] md:border-[3px] lg:border-[3.5px] border-neutral-700 shadow-xl md:shadow-2xl shadow-black/70 ring-1 ring-white/10 shrink-0">
        <div className="absolute -left-[3px] sm:-left-[4px] md:-left-[5px] top-[24%] h-[8%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-l-sm bg-neutral-600" />
        <div className="absolute -left-[3px] sm:-left-[4px] md:-left-[5px] top-[34%] h-[12%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-l-sm bg-neutral-600" />
        <div className="absolute -left-[3px] sm:-left-[4px] md:-left-[5px] top-[48%] h-[12%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-l-sm bg-neutral-600" />
        <div className="absolute -right-[3px] sm:-right-[4px] md:-right-[5px] top-[30%] h-[16%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-r-sm bg-neutral-600" />
        <div className="relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[26px] md:rounded-[28px] lg:rounded-[32px] bg-black">
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-3.5 md:px-4 pt-1.5 sm:pt-2 md:pt-2 text-white">
            <span className="font-mono text-[9px] sm:text-[9.5px] md:text-[10px] lg:text-[11px] font-semibold tracking-tight">9:41</span>
            <div className="h-3.5 sm:h-3.5 md:h-4 lg:h-4.5 w-12 sm:w-14 md:w-16 lg:w-20 rounded-full bg-black ring-1 ring-neutral-800 flex items-center justify-end px-1 sm:px-1.5">
              <div className="h-1.5 sm:h-1.5 md:h-2 w-1.5 sm:w-1.5 md:w-2 rounded-full bg-neutral-900 ring-1 ring-blue-900/50" />
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-1.5 opacity-90 text-[9px] sm:text-[9.5px] md:text-[10px]">
              <Wifi className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3 md:w-3" />
              <Battery className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-3.5 md:w-3.5" />
            </div>
          </div>
          <div className="absolute inset-0">
            {isDark ? (
              <GrainGradient
                width="100%"
                height="100%"
                colors={["#22c55e", "#f97316", "#eab308", "#06b6d4"]}
                colorBack="#000000"
                softness={0.79}
                intensity={0.51}
                noise={0.25}
                shape="corners"
                speed={1}
                fit="cover"
                minPixelRatio={1}
                maxPixelCount={1000000}
              />
            ) : (
              <GrainGradient
                width="100%"
                height="100%"
                colors={["#86efac", "#fdba74", "#fde68a", "#a5f3fc"]}
                colorBack="#F7F7F4"
                softness={0.85}
                intensity={0.4}
                noise={0.15}
                shape="corners"
                speed={1}
                fit="cover"
                minPixelRatio={1}
                maxPixelCount={1000000}
              />
            )}
          </div>
          <div className="absolute bottom-1 md:bottom-1.5 left-1/2 z-30 h-0.5 sm:h-1 md:h-1.5 w-12 sm:w-16 md:w-20 lg:w-24 -translate-x-1/2 rounded-full bg-white/50 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}
