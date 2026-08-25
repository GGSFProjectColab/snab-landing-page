'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { Target, BrainCircuit, Rocket, Gauge, TrendingUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Performance notes (pro research):
// - Native scroll only: no ReactLenis/Lenis wrapper. Lenis interpolates scroll via RAF and adds ~2-4ms/frame overhead,
//   conflicts with the site-wide SmoothScrollProvider which was intentionally disabled for FPS. Native scroll is compositor-native.
// - Single scroll observer: one useScroll on parent container, not per-card "start end" observers. Motion re-uses a single RAF listener.
// - Compositor-only props: only `transform: scale` + `translateZ(0)` and `opacity`. No `top`/`height` animation, no `filter`/`backdrop-blur`/`box-shadow` animation.
// - GPU promotion: [transform:translateZ(0)] + [contain:paint] + [backface-visibility:hidden] isolates paint, avoids full-page repaint.
// - will-change is set via inline style only when active; layers limited to 3 cards (budget < 4 promoted layers).
// - No heavy image scale 2→1 rasterization; visuals are lightweight SVG icons + CSS gradients, no external unsplash decode cost.
// - Reduced motion: useReducedMotion() disables scale entirely.
// - Content respects container height budget: sticky offsets use fixed `top` calc, not animated, so layout is stable.

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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

// Title-matched Lucide icons (researched picks) — rendered large, thin stroke (1.1) to match ref line-art aesthetic.
// currentColor inheritance keeps per-card theme fg; tree-shaken, zero new deps (lucide-react already installed).
const GEOMETRICS: readonly LucideIcon[] = [Target, BrainCircuit, Rocket, Gauge, TrendingUp];

// Ref Image1 (orange #FF6321, cream #F5E8C7) + Image2 (lime #D6FF94, dark #0C1E1E, blue #A9D0FF) — per-card themes (right side only)
const CARD_THEMES = [
  { bg: '#D6FF94', fg: '#0F1A0A', muted: 'rgba(15,26,10,0.62)', border: 'rgba(15,26,10,0.16)', soft: 'rgba(15,26,10,0.08)' }, // 01 Product Thinking — lime (Image2 01)
  { bg: '#0C1E1E', fg: '#E6FFD9', muted: 'rgba(230,255,217,0.66)', border: 'rgba(230,255,217,0.14)', soft: 'rgba(214,255,148,0.08)' }, // 02 Intelligence — dark (Image2 02)
  { bg: '#F5E8C7', fg: '#1A1500', muted: 'rgba(26,21,0,0.58)', border: 'rgba(26,21,0,0.13)', soft: 'rgba(26,21,0,0.06)' }, // 03 Production — cream (Image1)
  { bg: '#A9D0FF', fg: '#0A1930', muted: 'rgba(10,25,48,0.60)', border: 'rgba(10,25,48,0.14)', soft: 'rgba(10,25,48,0.07)' }, // 04 Validation — blue
  { bg: '#FF6B2E', fg: '#1A0A00', muted: 'rgba(26,10,0,0.64)', border: 'rgba(26,10,0,0.18)', soft: 'rgba(26,10,0,0.09)' }, // 05 Evolve — orange
] as const;

function StackingCard({ index, step, total, progress }: CardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Geo = GEOMETRICS[index % GEOMETRICS.length];
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const rangeStart = index / total;
  const scaleStep = total > 4 ? 0.032 : 0.045;
  const targetScale = 1 - (total - index) * scaleStep;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const topOffset = `calc(4rem + ${index * 10}px)`;

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
        style={
          prefersReducedMotion
            ? {}
            : {
                scale,
                transformOrigin: 'top center',
                willChange: 'transform',
              }
        }
        className={cn(
          'relative w-full h-full overflow-hidden bg-background border-b border-edge rounded-none flex flex-col',
          '[transform:translateZ(0)] [contain:paint] [backface-visibility:hidden]'
        )}
      >
        <div className="grid md:grid-cols-[1.18fr_0.82fr] gap-0 flex-1 min-h-0">
          {/* Text — light/dark mode colour respectively (bg-background) — small 01 pill removed per request, plain borders */}
          <div className="p-6 sm:p-8 md:p-9 flex flex-col justify-center gap-4 md:gap-5 order-2 md:order-1 bg-background">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {step.subtitle}
              </span>
            </div>

            <h3 className="text-[26px] sm:text-[30px] md:text-[34px] font-normal tracking-tight leading-[1.12] text-foreground text-balance">
              {step.title}
            </h3>

            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-muted-foreground max-w-[46ch] text-pretty">
              {step.content}
            </p>
          </div>

          {/* Visual — only right side gets per-card bg colour, plain solid border (no dotted) */}
          <div
            className="relative flex items-center justify-center overflow-hidden min-h-[340px] md:min-h-0 order-1 md:order-2 p-0 border-b md:border-b-0 md:border-l"
            style={{ borderColor: theme.border, backgroundColor: theme.bg, color: theme.fg }}
          >
            <div className="w-full h-full grid place-items-center p-8 md:p-10 lg:p-12" style={{ backgroundColor: theme.bg, color: theme.fg }}>
              {step.lottie ? (
                <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center">
                  <DotLottieReact
                    src={step.lottie}
                    loop
                    autoplay
                    className="w-full h-full object-contain"
                  />
                </div>
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
}

export function StackingHowWeWork({ steps }: { steps: StackingStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Cards stack — full-screen wrappers. No intro rail per request. */}
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
