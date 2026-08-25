"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

const DARK_BACK = "#14120B";
const LIGHT_BACK = "#F7F7F4";

export function CloudShader({ paused = false }: { paused?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const shouldPause = paused || prefersReduced;

  // Keep animation on mobile (coarse) — use lighter params for perf instead of static fallback
  const speed = shouldPause ? 0 : isCoarse ? 0.45 : 0.6;
  const size = isCoarse ? 1.2 : 1.5;
  const scale = isCoarse ? 0.72 : 0.78;

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {mounted ? (
        <Dithering
          width="100%"
          height="100%"
          colorBack={isDark ? DARK_BACK : LIGHT_BACK}
          colorFront={isDark ? "#FF6A00" : "#10B981"}
          shape="sphere"
          type="4x4"
          size={size}
          speed={speed}
          scale={scale}
        />
      ) : (
        <div
          className="h-full w-full rounded-lg border border-dotted border-edge bg-gradient-to-br from-orange-500/10 to-teal-500/10 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}