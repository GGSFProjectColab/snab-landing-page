"use client";

import React, {
  useState,
  useRef,
  useCallback,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export interface PageItem {
  id: string;
  title: string;
  badge?: string;
  heading: string;
  description: string;
  stats: Array<{
    label: string;
    value: string;
    change?: string;
    trend?: "up" | "down" | "neutral";
  }>;
}

export const VELOCITY_PAGES: PageItem[] = [
  {
    id: "overview",
    title: "Overview",
    heading: "Every drop-off, mapped.",
    description:
      "Velocity traces each session end to end, so your team always knows exactly where people give up.",
    stats: [
      { label: "Sessions today", value: "12,480", change: "+6.1%", trend: "up" },
      { label: "Overall conversion", value: "41%", change: "+2.4%", trend: "up" },
      { label: "Alerts open", value: "3", change: "-1", trend: "down" },
    ],
  },
  {
    id: "funnels",
    title: "Funnels",
    heading: "See the exact step people quit.",
    description:
      "Four steps, one funnel: pricing view, trial start, payment, active subscription.",
    stats: [
      { label: "Biggest leak", value: "30%", change: "+1.8%", trend: "up" },
      { label: "Trial-to-payment drop", value: "30%", change: "-2.6%", trend: "down" },
      { label: "Weekly retention", value: "68%", change: "+3.2%", trend: "up" },
    ],
  },
  {
    id: "alerts",
    title: "Alerts",
    heading: "Get paged before churn happens.",
    description:
      "Threshold and anomaly rules route straight to Slack, so a leak never sits unnoticed for a week.",
    stats: [
      { label: "Active alert rules", value: "14", change: "+2", trend: "up" },
      { label: "Mean time to notice", value: "4m", change: "-38%", trend: "down" },
      { label: "False positive rate", value: "2%", change: "-1%", trend: "down" },
    ],
  },
];

interface PageCurtainContextValue {
  activeIndex: number;
  targetIndex: number;
  isPending: boolean;
  curtainTitle: string;
  goToPage: (nextIndex: number) => void;
  totalPages: number;
}

const PageCurtainContext = createContext<PageCurtainContextValue | null>(null);

export function usePageCurtain() {
  const ctx = useContext(PageCurtainContext);
  if (!ctx) {
    throw new Error("usePageCurtain must be used within a PageCurtainStage");
  }
  return ctx;
}

interface PageCurtainStageProps {
  children?: ReactNode;
  pages?: PageItem[];
  defaultIndex?: number;
  className?: string;
  onPageChange?: (index: number, page: PageItem) => void;
}

export function PageCurtainStage({
  children,
  pages = VELOCITY_PAGES,
  defaultIndex = 0,
  className,
  onPageChange,
}: PageCurtainStageProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [targetIndex, setTargetIndex] = useState(defaultIndex);
  const [curtainTitle, setCurtainTitle] = useState(pages[defaultIndex]?.title || "");
  const [isPending, setIsPending] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainTitleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const goToPage = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex || isPending || nextIndex < 0 || nextIndex >= pages.length) {
        return;
      }

      const targetPage = pages[nextIndex];
      const isForward = nextIndex > activeIndex;
      setTargetIndex(nextIndex);
      setCurtainTitle(targetPage.title);
      setIsPending(true);

      const curtain = curtainRef.current;
      const titleEl = curtainTitleRef.current;
      if (!curtain || !titleEl) {
        setActiveIndex(nextIndex);
        setIsPending(false);
        onPageChange?.(nextIndex, targetPage);
        return;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Direction calculations:
      // Forward (Left to Right progression): curtain sweeps in from Right (+130% -> 0%), then exits Left (0% -> -130%)
      // Backward (Right to Left progression): curtain sweeps in from Left (-130% -> 0%), then exits Right (0% -> +130%)
      const enterFrom = isForward ? 130 : -130;
      const exitTo = isForward ? -130 : 130;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsPending(false);
          onPageChange?.(nextIndex, targetPage);
        },
      });
      timelineRef.current = tl;

      // Pre-position curtain
      gsap.set(curtain, {
        xPercent: enterFrom,
        opacity: 1,
        visibility: "visible",
      });

      gsap.set(titleEl, {
        opacity: 1,
      });

      // Phase 1: Sweep in covering the viewport (0.52s)
      tl.to(curtain, {
        xPercent: 0,
        duration: 0.52,
        ease: "power3.inOut",
      })
        // Midpoint: Switch state exactly when viewport is 100% occluded
        .add(() => {
          setActiveIndex(nextIndex);
        })
        .to({}, { duration: 0.05 })
        // Phase 2: Sweep out revealing the incoming page (0.52s)
        .to(curtain, {
          xPercent: exitTo,
          duration: 0.52,
          ease: "power3.inOut",
        })
        .set(curtain, {
          visibility: "hidden",
        });
    },
    [activeIndex, isPending, pages, onPageChange]
  );

  return (
    <PageCurtainContext.Provider
      value={{
        activeIndex,
        targetIndex,
        isPending,
        curtainTitle,
        goToPage,
        totalPages: pages.length,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative w-full min-h-[560px] md:min-h-[640px] overflow-hidden rounded-2xl md:rounded-3xl",
          "bg-[#F7F7F4] dark:bg-[#14120B] text-neutral-900 dark:text-neutral-100",
          "border border-black/[0.08] dark:border-white/[0.12] shadow-2xl transition-colors duration-300",
          className
        )}
      >
        {/* Ambient atmospheric background gradient glow matching the website themes */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          aria-hidden="true"
        >
          {/* Light mode gradient */}
          <div className="absolute inset-0 block dark:hidden bg-[radial-gradient(ellipse_80%_80%_at_90%_40%,rgba(253,224,71,0.35),rgba(251,146,60,0.18)_45%,transparent_75%)]" />
          {/* Dark mode gradient */}
          <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_80%_80%_at_90%_40%,rgba(245,158,11,0.22),rgba(217,119,6,0.1)_45%,transparent_75%)]" />
          {/* Subtle noise grain for luxury texture */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col justify-between min-h-[560px] md:min-h-[640px] p-6 sm:p-10 md:p-14">
          {children ? (
            children
          ) : (
            <PageCurtainDefaultContent pages={pages} activeIndex={activeIndex} />
          )}
        </div>

        {/* Animated Slanted Page Curtain Overlay - Theme Adaptive */}
        <div
          ref={curtainRef}
          className="absolute inset-y-0 -left-[30%] -right-[30%] z-50 pointer-events-none invisible"
          style={{
            transform: "skewX(-7.5deg)",
            transformOrigin: "center center",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          <div className="relative w-full h-full bg-[#F7F7F4] dark:bg-[#14120B] border-x border-black/15 dark:border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.18)] dark:shadow-[0_0_120px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden transition-colors duration-300">
            {/* Ambient inner curtain sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] dark:from-white/[0.04] via-transparent to-black/[0.05] dark:to-black/60" />

            {/* Unskewed Centered Title */}
            <div
              ref={curtainTitleRef}
              style={{ transform: "skewX(7.5deg)" }}
              className="relative z-10 font-instrument-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] font-normal text-[#14120B] dark:text-white tracking-[-0.03em] leading-none select-none pointer-events-none drop-shadow-xl dark:drop-shadow-2xl text-center px-4"
            >
              {curtainTitle}
            </div>
          </div>
        </div>
      </div>
    </PageCurtainContext.Provider>
  );
}

function PageCurtainDefaultContent({
  pages,
  activeIndex,
}: {
  pages: PageItem[];
  activeIndex: number;
}) {
  const currentPage = pages[activeIndex] || pages[0];

  return (
    <>
      {/* Top Navbar inside the preview */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Velocity
        </span>
        <button
          type="button"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          Sign in
        </button>
      </div>

      {/* Main Hero & Metrics */}
      <div className="max-w-2xl my-auto py-8 sm:py-12">
        {/* Large serif heading */}
        <h2 className="font-instrument-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] text-neutral-950 dark:text-white">
          {currentPage.heading}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
          {currentPage.description}
        </p>

        {/* Metrics Grid */}
        <div className="mt-8 sm:mt-12 space-y-4 max-w-lg">
          {currentPage.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between text-sm sm:text-base border-b border-black/[0.08] dark:border-white/[0.08] pb-3"
            >
              <span className="text-neutral-600 dark:text-neutral-400 font-normal">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="font-medium text-neutral-950 dark:text-white text-base sm:text-lg tracking-tight">
                  {stat.value}
                </span>
                {stat.change && (
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-medium",
                      stat.trend === "up"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-neutral-500 dark:text-neutral-400"
                    )}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tabs Component */}
      <div className="flex items-center justify-center pt-4">
        <PageCurtainTabs pages={pages} />
      </div>
    </>
  );
}

export function PageCurtainTabs({
  pages = VELOCITY_PAGES,
  className,
}: {
  pages?: PageItem[];
  className?: string;
}) {
  const { activeIndex, targetIndex, isPending, goToPage } = usePageCurtain();
  const effectiveIndex = isPending ? targetIndex : activeIndex;

  return (
    <nav
      aria-label="Section navigation tabs"
      className={cn(
        "inline-flex items-center gap-1.5 p-1.5 rounded-full",
        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md",
        "border border-black/[0.08] dark:border-white/[0.12]",
        "shadow-lg shadow-black/[0.04] dark:shadow-black/40",
        className
      )}
    >
      {pages.map((page, idx) => {
        const isActive = effectiveIndex === idx;
        return (
          <button
            key={page.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={isPending}
            onClick={() => goToPage(idx)}
            className={cn(
              "relative px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 outline-none",
              isActive
                ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md scale-100"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            )}
          >
            {page.title}
          </button>
        );
      })}
    </nav>
  );
}

export function PageCurtainShowcase({
  className,
}: {
  className?: string;
}) {
  return (
    <section aria-label="Page Curtains Interactive Showcase" className={cn("w-full", className)}>
      <PageCurtainStage pages={VELOCITY_PAGES} />
    </section>
  );
}
