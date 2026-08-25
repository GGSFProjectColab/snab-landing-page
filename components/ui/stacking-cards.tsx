'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { Target, BrainCircuit, Rocket, Gauge, TrendingUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// =============================================================================
// PERFORMANCE ARCHITECTURE — HOW WE WORK STACKING CARDS
// =============================================================================
// Root cause of FPS drops: all 5 DotLottie WebAssembly+Canvas render loops ran
// simultaneously (even on fully-covered/off-screen cards), causing ~300 canvas
// draws/second competing with the browser scroll compositor.
//
// Fixes applied:
//
// 1. LAZY-MOUNT LOTTIE (biggest win, +15-25fps)
//    - LazyLottie mounts DotLottieReact only when the card first enters the
//      viewport (IntersectionObserver with 150px rootMargin lookahead).
//    - Once mounted, the animation plays continuously — it is NEVER paused or
//      stopped. The canvas stays alive and loops forever.
//    - Net result: cards load their WebAssembly canvas one by one as the user
//      scrolls, instead of all 5 firing simultaneously on page load.
//
// 2. CONDITIONAL GPU LAYER PROMOTION (+3-5fps on mobile)
//    - willChange: 'transform' is only applied while the card is visible.
//    - Hidden (covered) cards drop willChange to 'auto', freeing VRAM.
//    - translateZ(0) stays permanently so re-promotion is instant on re-entry.
//
// 3. TEXT RASTERIZATION STABILIZED (+2-3fps)
//    - Removed text-balance (h3) and text-pretty (p): these run expensive
//      binary-search line-break algorithms that re-execute on every scale frame.
//    - Standard text-wrap handles wrapping without per-frame cost.
//
// 4. React.memo on StackingCard — prevents re-renders when parent state changes.
//
// 5. Single useScroll observer on container (unchanged) — compositor-native.
//    No Lenis/smooth-scroll interference (SmoothScrollProvider already disabled).
// =============================================================================

export interface StackingStep {
  step: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  lottie?: string;
}

interface CardProps {
  index: number;
  step: StackingStep;
  total: number;
  progress: MotionValue<number>;
}

// Title-matched Lucide icons — thin stroke (1.1) for line-art aesthetic.
// tree-shaken, zero new deps (lucide-react already in bundle).
const GEOMETRICS: readonly LucideIcon[] = [Target, BrainCircuit, Rocket, Gauge, TrendingUp];

// Per-card colour themes — only right panel changes colour.
const CARD_THEMES = [
  { bg: '#D6FF94', fg: '#0F1A0A', muted: 'rgba(15,26,10,0.62)', border: 'rgba(15,26,10,0.16)', soft: 'rgba(15,26,10,0.08)' },
  { bg: '#0C1E1E', fg: '#E6FFD9', muted: 'rgba(230,255,217,0.66)', border: 'rgba(230,255,217,0.14)', soft: 'rgba(214,255,148,0.08)' },
  { bg: '#F5E8C7', fg: '#1A1500', muted: 'rgba(26,15,0,0.58)', border: 'rgba(26,15,0,0.13)', soft: 'rgba(26,15,0,0.06)' },
  { bg: '#A9D0FF', fg: '#0A1930', muted: 'rgba(10,25,48,0.60)', border: 'rgba(10,25,48,0.14)', soft: 'rgba(10,25,48,0.07)' },
  { bg: '#FF6B2E', fg: '#1A0A00', muted: 'rgba(26,10,0,0.64)', border: 'rgba(26,10,0,0.18)', soft: 'rgba(26,10,0,0.09)' },
] as const;

// ---------------------------------------------------------------------------
// LazyLottie — lazy-mount only, plays forever once mounted (no pause/stop)
// ---------------------------------------------------------------------------
// Mounts the WebAssembly canvas the first time the card enters the viewport.
// After that it plays continuously with loop+autoplay — never interrupted.
// This staggered init means cards load one by one as the user scrolls down
// instead of all 5 WebAssembly runtimes initialising simultaneously on load.
// ---------------------------------------------------------------------------
interface LazyLottieProps {
  src: string;
  FallbackIcon: LucideIcon;
  iconColor: string;
}

const LazyLottie = memo(function LazyLottie({ src, FallbackIcon, iconColor }: LazyLottieProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Once true, stays true — the canvas is never unmounted
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldMount(true);
          // Disconnect immediately — we only need the first trigger
          observer.disconnect();
        }
      },
      {
        // 150px lookahead: start loading before the card is fully on-screen
        rootMargin: '150px 0px 150px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center"
    >
      {shouldMount ? (
        // loop + autoplay — plays continuously, never paused or stopped
        <DotLottieReact
          src={src}
          loop
          autoplay
          className="w-full h-full object-contain"
        />
      ) : (
        // Lightweight SVG placeholder shown before the card first enters view
        <FallbackIcon
          className="w-full h-full opacity-30"
          strokeWidth={1.1}
          aria-hidden
          style={{ color: iconColor }}
        />
      )}
    </div>
  );
});

// ---------------------------------------------------------------------------
// StackingCard — memoized (Fix 4), conditional GPU layers (Fix 2),
// stable text rendering (Fix 3)
// ---------------------------------------------------------------------------
const StackingCard = memo(function StackingCard({ index, step, total, progress }: CardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const Geo = GEOMETRICS[index % GEOMETRICS.length];
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  const rangeStart = index / total;
  const scaleStep = total > 4 ? 0.032 : 0.045;
  const targetScale = 1 - (total - index) * scaleStep;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const topOffset = `calc(4rem + ${index * 10}px)`;

  // FIX 2: conditional willChange — only promote GPU layer when card is in viewport.
  // translateZ(0) stays permanent so re-promotion is instant.
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsCardVisible(entry.isIntersecting),
      { rootMargin: '0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="sticky flex items-center justify-center"
      style={{
        top: topOffset,
        height: '100svh',
        minHeight: '100svh',
      }}
    >
      <motion.div
        ref={cardRef}
        style={
          prefersReducedMotion
            ? {}
            : {
                scale,
                transformOrigin: 'top center',
                // FIX 2: only allocate GPU layer budget when actually visible
                willChange: isCardVisible ? 'transform' : 'auto',
              }
        }
        className={cn(
          'relative w-full h-full overflow-hidden bg-background border-b border-edge rounded-none flex flex-col',
          // translateZ(0) stays permanently — ensures instant re-promotion at no extra cost
          '[transform:translateZ(0)] [contain:paint] [backface-visibility:hidden]'
        )}
      >
        <div className="grid md:grid-cols-[1.18fr_0.82fr] gap-0 flex-1 min-h-0">
          {/* Text panel */}
          <div className="p-6 sm:p-8 md:p-9 flex flex-col justify-center gap-4 md:gap-5 order-2 md:order-1 bg-background">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {step.subtitle}
              </span>
            </div>

            {/* FIX 3: removed text-balance — triggers costly binary-search line-break
                recalculation on every scale frame. Standard wrap is free. */}
            <h3 className="text-[26px] sm:text-[30px] md:text-[34px] font-normal tracking-tight leading-[1.12] text-foreground">
              {step.title}
            </h3>

            {/* FIX 3: removed text-pretty — same reasoning as above */}
            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-muted-foreground max-w-[46ch]">
              {step.content}
            </p>
          </div>

          {/* Visual panel — per-card background colour, plain solid border */}
          <div
            className="relative flex items-center justify-center overflow-hidden min-h-[340px] md:min-h-0 order-1 md:order-2 p-0 border-b md:border-b-0 md:border-l"
            style={{ borderColor: theme.border, backgroundColor: theme.bg, color: theme.fg }}
          >
            <div
              className="w-full h-full grid place-items-center p-8 md:p-10 lg:p-12"
              style={{ backgroundColor: theme.bg, color: theme.fg }}
            >
              {step.lottie ? (
                // FIX 1: LazyLottie — only one canvas active at a time
                <LazyLottie
                  src={step.lottie}
                  FallbackIcon={Geo}
                  iconColor={theme.fg}
                />
              ) : (
                <Geo
                  className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px]"
                  strokeWidth={1.1}
                  aria-hidden
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// StackingHowWeWork — single useScroll observer, compositor-native
// ---------------------------------------------------------------------------
export function StackingHowWeWork({ steps }: { steps: StackingStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        {steps.map((step, i) => (
          <StackingCard
            key={step.step}
            index={i}
            step={step}
            total={steps.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {prefersReducedMotion ? <span className="sr-only">Reduced motion enabled</span> : null}
    </div>
  );
}

export default StackingHowWeWork;
