"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

function getComputedHexColor(element: HTMLElement | null, isDark: boolean): string {
  if (typeof window === "undefined" || !element) {
    return isDark ? "#000000" : "#f7f5f0";
  }

  try {
    // Create a temporary canvas context to resolve any CSS color (including oklch, var, etc.) to exact RGB
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return isDark ? "#000000" : "#f7f5f0";

    // Read computed background of body or parent
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    ctx.fillStyle = bodyBg;
    const resolved = ctx.fillStyle; // Browser converts to #rrggbb or rgba(...)

    if (resolved.startsWith("#")) {
      return resolved;
    }
    const match = resolved.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = Number(match[1]).toString(16).padStart(2, "0");
      const g = Number(match[2]).toString(16).padStart(2, "0");
      const b = Number(match[3]).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    }
  } catch {
    // fallback
  }

  return isDark ? "#000000" : "#f7f5f0";
}

export function CloudShader() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [backColor, setBackColor] = useState("#000000");

  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const exactHex = getComputedHexColor(containerRef.current, isDark);
      setBackColor(exactHex);
    }
  }, [mounted, resolvedTheme, isDark]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex items-center justify-center">
      {mounted && (
        <Dithering
          width="100%"
          height="100%"
          colorBack={backColor}
          colorFront={isDark ? "#00b3ff" : "#0f766e"}
          shape="sphere"
          type="4x4"
          size={2}
          speed={1}
          scale={0.78}
        />
      )}
    </div>
  );
}
