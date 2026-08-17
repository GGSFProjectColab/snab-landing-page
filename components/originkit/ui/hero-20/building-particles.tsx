// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ParticleImage from "@/components/originkit/ui/hero-20/svg-particle";

/** Public asset under /sections/hero-20/assets */
function asset(file: string) {
  return `/originkit/hero-20/${file}`;
}

/**
 * Halftone building render.
 *
 * Hover assembly is a desktop affordance — touch has no hover to give, and with
 * `hoverEnabled` on, the field idles scattered and would never resolve on a
 * phone or tablet. Below desktop-sm it stays off, so the artwork renders
 * assembled and static.
 */
const PARTICLE_SIZE = { mobile: 11, tablet: 8, desktop: 6 };

export const BuildingParticles = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const tablet = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setIsDesktop(desktop.matches);
      setIsTablet(tablet.matches);
    };
    sync();
    desktop.addEventListener("change", sync);
    tablet.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      tablet.removeEventListener("change", sync);
    };
  }, []);

  /**
   * The copy sits above the canvas, so moving across the headline never reaches
   * the field and the particles ignore the cursor. Pointer moves anywhere in
   * the section are forwarded to the canvas with their real coordinates, so
   * hover and repulsion track the cursor over text as well as open space.
   */
  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = wrap?.closest("section") || wrap?.closest("main") || wrap?.parentElement;
    if (!wrap || !stage || !isDesktop) return;

    const canvas = () => wrap.querySelector("canvas");

    const forward = (event: PointerEvent) => {
      canvas()?.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: event.clientX,
          clientY: event.clientY,
          bubbles: true,
        }),
      );
    };

    const release = () => {
      canvas()?.dispatchEvent(
        new MouseEvent("mouseout", {
          bubbles: true,
          relatedTarget: document.body,
        }),
      );
    };

    stage.addEventListener("pointermove", forward);
    stage.addEventListener("pointerleave", release);
    return () => {
      stage.removeEventListener("pointermove", forward);
      stage.removeEventListener("pointerleave", release);
    };
  }, [isDesktop]);

  const particleSize = isDesktop
    ? PARTICLE_SIZE.desktop
    : isTablet
      ? PARTICLE_SIZE.tablet
      : PARTICLE_SIZE.mobile;

  return (
    <div ref={wrapRef} className="size-full">
      <ParticleImage
        width="100%"
        height="100%"
        backgroundColor="transparent"
        particleCount={500}
        particleSize={particleSize}
        particleShape="circle"
        particleColor="original"
        invertColors={isDark}
        hoverEnabled={isDesktop}
        // Roam targets default to a rectangle spanning the canvas, so the
        // scattered state reads as a hard-edged block of noise; an oval keeps
        // its edges soft. The transition drives both the assemble and the
        // scatter tween — 1.6s lets the building resolve rather than snap.
        hoverConfig={{
          hoverType: "roam",
          roamShape: "oval",
          roamOpacity: isDark ? 0.35 : 0.5,
          transition: { duration: 1.6, ease: "easeInOut" },
        }}
        repulsionEnabled={isDesktop}
        repulsionConfig={{
          repulsionMode: "random",
          repulsionForce: 10,
          repulsionRadius: 60,
        }}
        imageConfig={{
          image: asset("building.png"),
          mode: "fill",
          scale: 10,
        }}
      />
    </div>
  );
};
