"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";

export function GrainGradientShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setMounted(true);

    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. Instant baseline background rendered on server HTML (0ms delay, no waiting) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at 15% 15%, rgba(255, 106, 0, 0.4), transparent 48%),
               radial-gradient(ellipse at 85% 15%, rgba(235, 168, 255, 0.35), transparent 48%),
               radial-gradient(ellipse at 15% 85%, rgba(255, 162, 0, 0.3), transparent 48%),
               radial-gradient(ellipse at 85% 85%, rgba(43, 0, 255, 0.35), transparent 52%),
               #000000`
            : `radial-gradient(ellipse at 15% 15%, rgba(255, 177, 153, 0.45), transparent 48%),
               radial-gradient(ellipse at 85% 15%, rgba(212, 184, 255, 0.45), transparent 48%),
               radial-gradient(ellipse at 15% 85%, rgba(255, 227, 160, 0.45), transparent 48%),
               radial-gradient(ellipse at 85% 85%, rgba(159, 216, 232, 0.45), transparent 52%),
               #F7F7F4`,
          filter: "blur(20px)",
          transform: "scale(1.05)",
        }}
        aria-hidden="true"
      />

      {/* 2. WebGL Grain Shader mounts seamlessly on top */}
      {mounted && isInView && (
        <div className="absolute inset-0 w-full h-full transition-opacity duration-700">
          {isDark ? (
            <GrainGradient
              width="100%"
              height="100%"
              colors={["#ff6a00", "#eba8ff", "#ffa200", "#2b00ff"]}
              colorBack="#000000"
              softness={0.79}
              intensity={0.51}
              noise={0.25}
              shape="corners"
              speed={1}
              fit="cover"
              minPixelRatio={1}
              maxPixelCount={1000000}
            />
          ) : (
            <GrainGradient
              width="100%"
              height="100%"
              colors={["#ffb199", "#d4b8ff", "#ffe3a0", "#9fd8e8"]}
              colorBack="#F7F7F4"
              softness={0.85}
              intensity={0.4}
              noise={0.15}
              shape="corners"
              speed={1}
              fit="cover"
              minPixelRatio={1}
              maxPixelCount={1000000}
            />
          )}
        </div>
      )}
    </div>
  );
}






