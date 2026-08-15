"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScrollProvider
 *
 * - Drives Lenis from the GSAP ticker (same RAF loop) so ScrollTrigger
 *   positions never drift by even a single frame.
 * - Respects `prefers-reduced-motion`: skips smooth scroll for users who
 *   have that OS preference enabled.
 * - Works on both mobile (touch) and desktop (wheel).
 */
export function SmoothScrollProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect accessibility preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch: keep native feel on mobile, light smoothing on tablet
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Connect Lenis scroll events → ScrollTrigger so pins stay accurate
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's own RAF ticker — prevents 1-frame desync
    function onTick(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(onTick);
    // Disable GSAP lag smoothing so we don't get jump artifacts
    gsap.ticker.lagSmoothing(0);

    // Refresh all ScrollTrigger positions after Lenis is ready
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return null;
}
