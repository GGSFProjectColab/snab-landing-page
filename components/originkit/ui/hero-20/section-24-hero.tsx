// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Reveal, RevealGroup } from "@/components/originkit/ui/hero-20/reveal";

/** Public asset under /originkit/hero-20/ */
function asset(file: string) {
  return `/originkit/hero-20/${file}`;
}

const CornerTicks = ({ size = 8.667, width = 0.722 }) => (
  <>
    {[
      "left-0 top-0 border-l border-t",
      "right-0 top-0 border-r border-t",
      "bottom-0 left-0 border-b border-l",
      "right-0 bottom-0 border-r border-b",
    ].map((position) => (
      <span
        key={position}
        aria-hidden
        className={`absolute border-foreground/30 dark:border-white/35 ${position}`}
        style={{
          width: size,
          height: size,
          borderWidth: 0,
          borderTopWidth: position.includes("border-t") ? width : 0,
          borderBottomWidth: position.includes("border-b") ? width : 0,
          borderLeftWidth: position.includes("border-l") ? width : 0,
          borderRightWidth: position.includes("border-r") ? width : 0,
          margin: -width,
        }}
      />
    ))}
  </>
);

const ArrowIcon = ({ src, className = "" }: { src: string; className?: string }) => (
  <span className="relative block size-[18px] sm:size-[20px] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
    <span className="absolute inset-[25%_32%_25%_32%] block">
      <img src={src} alt="" className={`absolute inset-0 size-full max-w-none object-contain ${className}`} />
    </span>
  </span>
);

export const Section24Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="relative mx-auto flex min-h-[580px] lg:min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center overflow-hidden py-14 sm:py-16 md:py-20">
      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[440px] flex-col items-center gap-5 sm:gap-6 px-4 sm:px-6 ipad:max-w-[760px] desktop-sm:max-w-[820px] full-hd:max-w-[940px]">
        <RevealGroup className="flex flex-col items-center gap-4 sm:gap-5" delay={0.1}>
          {/* Badge */}
          <Reveal className="relative flex items-center justify-center gap-[7.222px] border-[0.722px] border-dashed border-foreground/20 dark:border-white/25 px-4 py-2 sm:py-2.5 backdrop-blur-[2px] bg-background/20 dark:bg-black/20">
            <CornerTicks />
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 h-[40px] w-[210px] -translate-x-1/2 -translate-y-1/2 opacity-5 dark:opacity-10 dark:invert"
              style={{
                backgroundImage: `url(${asset("diagonal-lines.png")})`,
                backgroundSize: "5.056px 5.056px",
              }}
            />
            <span className="relative flex items-center gap-[8px] sm:gap-[10px]">
              <img
                src={asset("crop.svg")}
                alt=""
                width={16}
                height={16}
                className="size-[16px] sm:size-[18px] dark:invert"
              />
              <span className="font-lato text-[12px] sm:text-[13.5px] leading-[1.4] font-bold tracking-[-0.2px] text-foreground dark:text-white">
                Engineering Intelligent Systems
              </span>
            </span>
          </Reveal>

          {/* Headline and Description */}
          <div className="flex flex-col items-center gap-3 sm:gap-3.5">
            <Reveal>
              <h1
                id="hero-title"
                className="text-center font-instrument-serif text-[44px] leading-[1.05] tracking-[-1.4px] text-foreground dark:text-white sm:text-[58px] sm:leading-[1.06] sm:tracking-[-1.8px] md:text-[72px] md:leading-[1.06] md:tracking-[-2.2px] full-hd:text-[90px] full-hd:leading-[1.06] full-hd:tracking-[-2.6px]"
              >
                Engineered for Intelligence,
                <br />
                Built for Scale
              </h1>
            </Reveal>

            <Reveal>
              <p className="max-w-[340px] text-center font-tight text-[15px] leading-[23px] tracking-[-0.3px] text-foreground/80 dark:text-neutral-200 sm:max-w-[440px] sm:text-[17px] sm:leading-[26px] md:max-w-[540px] md:text-[18px] md:leading-[27px] full-hd:max-w-[600px] full-hd:text-[20px] full-hd:leading-[30px]">
                Intelligent platforms, workflow orchestration, and bespoke software designed
                and built for production reliability.
              </p>
            </Reveal>
          </div>
        </RevealGroup>

        {/* Dotted Square Buttons */}
        <Reveal className="flex items-center gap-3 sm:gap-4 pt-1">
          <Link
            href="/contact"
            className="group relative inline-flex cursor-pointer items-center justify-center gap-2.5 border border-dotted border-foreground/40 dark:border-white/40 bg-foreground text-background dark:bg-white dark:text-neutral-950 px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-200 ease-out hover:opacity-90 active:scale-[0.98]"
          >
            <span className="font-lato text-[13px] sm:text-[14px] leading-normal font-medium tracking-tight whitespace-nowrap">
              Talk to us
            </span>
            <ArrowIcon
              src={asset(isDark ? "arrow-dark.svg" : "arrow-light.svg")}
              className="dark:filter-none"
            />
          </Link>

          <Link
            href="/about"
            className="group relative inline-flex cursor-pointer items-center justify-center gap-2.5 border border-dotted border-edge bg-background/40 dark:bg-muted/30 hover:bg-background/70 dark:hover:bg-muted/60 text-foreground dark:text-white px-5 py-2.5 sm:px-6 sm:py-3 backdrop-blur-[2px] transition-all duration-200 ease-out active:scale-[0.98]"
          >
            <span className="font-lato text-[13px] sm:text-[14px] leading-normal font-medium tracking-tight whitespace-nowrap">
              About us
            </span>
            <ArrowIcon
              src={asset(isDark ? "arrow-light.svg" : "arrow-dark.svg")}
            />
          </Link>
        </Reveal>
      </div>
    </div>
  );
};


