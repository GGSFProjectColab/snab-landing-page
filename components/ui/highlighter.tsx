"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Lightweight pro Highlighter – no rough-notation, no ResizeObserver, GPU-only transforms.
 * - highlight: scaleX (GPU)
 * - underline: SVG pathLength (GPU)
 * - box: scale + border (GPU)
 * - circle: SVG ellipse pathLength (GPU)
 * - inView lazy, prefers-reduced-motion, once:true, will-change
 */
export function Highlighter({
  children,
  action = "highlight",
  color = "#fde68a",
  strokeWidth = 1.8,
  animationDuration = 550,
  iterations = 1,
  padding,
  multiline = true,
  isView = false,
  delay = 0.12,
  className,
}: HighlighterProps) {
  void iterations;
  void padding;
  void multiline;

  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    margin: "-12% 0px -8% 0px",
    amount: 0.35,
  });

  const shouldAnimate = isView ? inView : true;
  const show = prefersReducedMotion ? true : shouldAnimate;

  const dur = animationDuration / 1000;

  if (action === "underline") {
    return (
      <span
        ref={ref}
        className={cn("relative inline pb-[0.18em] align-baseline", className)}
        style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" } as React.CSSProperties}
      >
        <span className="relative z-[1]">{children}</span>
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 bottom-[-1px] h-[7px] w-full overflow-visible"
          viewBox="0 0 100 7"
          preserveAspectRatio="none"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, delay, ease: "easeOut" }}
          style={{ willChange: "opacity", transform: "translateZ(0)" } as React.CSSProperties}
        >
          <motion.path
            d="M0 5 Q 10 1.2 20 5 T 40 5 T 60 5 T 80 5 T 100 5"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: show ? 1 : 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: dur, ease: [0.22, 1, 0.36, 1], delay: delay + 0.06 }
            }
            style={{ willChange: "stroke-dasharray" } as React.CSSProperties}
          />
        </motion.svg>
      </span>
    );
  }

  if (action === "strike-through") {
    return (
      <span
        ref={ref}
        className={cn("relative inline align-baseline", className)}
        style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" } as React.CSSProperties}
      >
        <span className="relative z-[1]">{children}</span>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
          style={{ backgroundColor: color, height: strokeWidth, willChange: "transform", transform: "translateZ(0)", transformOrigin: "left center" } as React.CSSProperties}
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: show ? 1 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: dur, ease: [0.25, 0.1, 0.25, 1], delay }}
        />
      </span>
    );
  }

  if (action === "box") {
    return (
      <span
        ref={ref}
        className={cn("relative inline rounded-[4px] px-[0.32em] py-[0.06em] -mx-[0.06em] align-baseline", className)}
        style={{ "--hl": color, WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" } as React.CSSProperties}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[5px] -z-10"
          style={{
            border: `${strokeWidth}px solid ${color}`,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            transformOrigin: "center",
          } as React.CSSProperties}
          initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          animate={{ scale: show ? 1 : 0.96, opacity: show ? 1 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: dur, ease: [0.25, 0.1, 0.25, 1], delay }}
        />
        <span className="relative z-[1]">{children}</span>
      </span>
    );
  }

  if (action === "circle") {
    return (
      <span
        ref={ref}
        className={cn("relative inline px-[0.42em] py-[0.12em] -mx-[0.08em] align-baseline", className)}
        style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" } as React.CSSProperties}
      >
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible -z-10"
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, delay }}
          style={{ willChange: "opacity", transform: "translateZ(0)" } as React.CSSProperties}
        >
          <motion.ellipse
            cx="50"
            cy="16"
            rx="48"
            ry="13"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: show ? 1 : 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: dur + 0.15, ease: [0.22, 1, 0.36, 1], delay: delay + 0.06 }}
            style={{ willChange: "stroke-dasharray", rotate: "-1deg" } as React.CSSProperties}
          />
        </motion.svg>
        <span className="relative z-[1]">{children}</span>
      </span>
    );
  }

  if (action === "bracket") {
    return (
      <span
        ref={ref}
        className={cn("relative inline px-[0.28em] py-[0.06em] -mx-[0.04em] align-baseline", className)}
        style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" } as React.CSSProperties}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ willChange: "opacity" } as React.CSSProperties}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, delay }}
        >
          <span
            className="absolute left-0 top-0 bottom-0 w-[7px] rounded-l-[4px]"
            style={{ borderLeft: `${strokeWidth}px solid ${color}`, borderTop: `${strokeWidth}px solid ${color}`, borderBottom: `${strokeWidth}px solid ${color}` }}
          />
          <span
            className="absolute right-0 top-0 bottom-0 w-[7px] rounded-r-[4px]"
            style={{ borderRight: `${strokeWidth}px solid ${color}`, borderTop: `${strokeWidth}px solid ${color}`, borderBottom: `${strokeWidth}px solid ${color}` }}
          />
        </motion.span>
        <span className="relative z-[1]">{children}</span>
      </span>
    );
  }

  // default: highlight (includes crossed-off fallback)
  return (
    <span
      ref={ref}
      className={cn("relative inline rounded-[3px] px-[0.28em] py-[0.08em] -mx-[0.06em] align-baseline", className)}
      style={{ "--hl": color, WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" } as React.CSSProperties}
    >
      <motion.span
        aria-hidden="true"
        className="highlighter-bg pointer-events-none absolute inset-0 rounded-[3px] -z-10"
        style={{
          backgroundColor: color,
          transformOrigin: "left center",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        } as React.CSSProperties}
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: show ? 1 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: dur, ease: [0.25, 0.1, 0.25, 1], delay }}
      />
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}

export default Highlighter;
