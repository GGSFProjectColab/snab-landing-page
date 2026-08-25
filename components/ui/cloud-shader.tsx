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
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const shouldPause = paused || prefersReduced;
  // On coarse/mobile, render static placeholder instead of shader to save GPU
  if (mounted && isCoarse && !isActive()) {
    // fallback handled outside; but for direct calls, return static
  }
  function isActive() { return !shouldPause; }

  if (mounted && isCoarse) {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="h-full w-full rounded-lg border border-dotted border-edge bg-gradient-to-br from-orange-500/10 to-teal-500/10" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {mounted && (
        <Dithering
          width="100%"
          height="100%"
          colorBack={isDark ? DARK_BACK : LIGHT_BACK}
          colorFront={isDark ? "#FF6A00" : "#10B981"}
          shape="sphere"
          type="4x4"
          size={1.5}
          speed={shouldPause ? 0 : 0.6}
          scale={0.78}
        />
      )}
    </div>
  );
}