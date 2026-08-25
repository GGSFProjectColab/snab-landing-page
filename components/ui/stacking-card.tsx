'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
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

export interface StackingStep {
  step: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
}

interface CardProps {
  index: number;
  step: StackingStep;
  total: number;
  progress: MotionValue<number>;
}

// Geometric illustrations — inherit currentColor (per-card fg)
function Sunburst() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[320px] max-h-[320px]" fill="none" stroke="currentColor" strokeWidth="1.1">
      <circle cx="100" cy="100" r="12" />
      <circle cx="100" cy="100" r="28" opacity="0.45" />
      {Array.from({ length: 32 }).map((_, i) => {
        const a = (i * 360) / 32;
        const r1 = 34;
        const r2 = 78;
        const x1 = 100 + r1 * Math.cos((a * Math.PI) / 180);
        const y1 = 100 + r1 * Math.sin((a * Math.PI) / 180);
        const x2 = 100 + r2 * Math.cos((a * Math.PI) / 180);
        const y2 = 100 + r2 * Math.sin((a * Math.PI) / 180);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity={i % 2 === 0 ? 1 : 0.35} />;
      })}
      <circle cx="100" cy="100" r="78" opacity="0.12" />
    </svg>
  );
}
function HexStack() {
  const sizes = [22, 34, 48, 62, 76];
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[320px] max-h-[320px]" fill="none" stroke="currentColor" strokeWidth="1.15">
      {sizes.map((r, idx) => {
        const pts = Array.from({ length: 6 })
          .map((_, k) => {
            const ang = -30 + k * 60;
            const x = 100 + r * Math.cos((ang * Math.PI) / 180);
            const y = 100 + r * Math.sin((ang * Math.PI) / 180);
            return `${x},${y}`;
          })
          .join(' ');
        return <polygon key={idx} points={pts} opacity={0.95 - idx * 0.12} />;
      })}
      <circle cx="100" cy="100" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function PyramidWire() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full max-w-[340px] max-h-[270px]" fill="none" stroke="currentColor" strokeWidth="1.15">
      {/* outer */}
      <path d="M100 16 L28 148 L172 148 Z" />
      {/* strata */}
      {[38, 62, 86, 110].map((y) => {
        const t = (y - 16) / (148 - 16);
        const xL = 100 - (100 - 28) * t;
        const xR = 100 + (172 - 100) * t;
        return <line key={y} x1={xL} y1={y} x2={xR} y2={y} />;
      })}
      {/* ribs */}
      <line x1="100" y1="16" x2="100" y2="148" />
      <line x1="100" y1="16" x2="64" y2="148" />
      <line x1="100" y1="16" x2="136" y2="148" />
      {/* base dotted */}
      <line x1="28" y1="148" x2="172" y2="148" strokeDasharray="3 4" opacity="0.5" />
    </svg>
  );
}
function ConcentricRings() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[320px] max-h-[320px]" fill="none" stroke="currentColor" strokeWidth="1.15">
      {[72, 54, 36, 18].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} />
      ))}
      <g fontSize="13" fontFamily="monospace" fill="currentColor" stroke="none" textAnchor="middle" dominantBaseline="middle">
        <text x="100" y="58">−</text>
        <text x="100" y="92">+</text>
        <text x="100" y="124">−</text>
        <text x="100" y="158">+</text>
      </g>
    </svg>
  );
}
function VennGrowth() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full max-w-[360px] max-h-[270px]" fill="none" stroke="currentColor" strokeWidth="1.15">
      <circle cx="76" cy="78" r="42" />
      <circle cx="124" cy="78" r="42" />
      <circle cx="100" cy="48" r="42" />
      {/* hatch intersection */}
      <g opacity="0.85" clipPath="url(#vennClip5)">
        <defs>
          <clipPath id="vennClip5">
            <path d="M100 48 a42 42 0 0 1 24 30 a42 42 0 0 1 -24 30 a42 42 0 0 1 -24 -30 a42 42 0 0 1 24 -30 Z" />
          </clipPath>
        </defs>
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={78 + i * 6} y1={58} x2={86 + i * 6} y2={96} />
        ))}
      </g>
      {/* tiny growth arrow */}
      <g transform="translate(144 18)" opacity="0.9">
        <path d="M4 16 L12 8 L20 14 L20 4" fill="none" strokeWidth="1.2" />
        <path d="M16 4 l4 4 l-4 0 Z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
const GEOMETRICS = [Sunburst, HexStack, PyramidWire, ConcentricRings, VennGrowth] as const;

// Ref Image1 (orange #FF6321, cream #F5E8C7) + Image2 (lime #D6FF94, dark #0C1E1E, blue #A9D0FF) — per-card themes (right side only)
const CARD_THEMES = [
  { bg: '#D6FF94', fg: '#0F1A0A', muted: 'rgba(15,26,10,0.62)', border: 'rgba(15,26,10,0.16)', soft: 'rgba(15,26,10,0.08)' }, // 01 Product Thinking — lime (Image2 01)
  { bg: '#0C1E1E', fg: '#E6FFD9', muted: 'rgba(230,255,217,0.66)', border: 'rgba(230,255,217,0.14)', soft: 'rgba(214,255,148,0.08)' }, // 02 Intelligence — dark (Image2 02)
  { bg: '#F5E8C7', fg: '#1A1500', muted: 'rgba(26,21,0,0.58)', border: 'rgba(26,21,0,0.13)', soft: 'rgba(26,21,0,0.06)' }, // 03 Production — cream (Image1)
  { bg: '#FF6B2E', fg: '#1A0A00', muted: 'rgba(26,10,0,0.64)', border: 'rgba(26,10,0,0.18)', soft: 'rgba(26,10,0,0.09)' }, // 04 Validation — orange (Image1 Smart Actions)
  { bg: '#A9D0FF', fg: '#0A1930', muted: 'rgba(10,25,48,0.60)', border: 'rgba(10,25,48,0.14)', soft: 'rgba(10,25,48,0.07)' }, // 05 Evolve — blue
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
              <div className="w-full max-w-[420px] aspect-square grid place-items-center" style={{ color: theme.fg }}>
                <Geo />
              </div>
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
