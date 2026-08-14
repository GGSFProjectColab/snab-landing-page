"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GrainGradient),
  { ssr: false }
);

export function GrainGradientShader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="absolute inset-0 w-full h-full">
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
          colorBack="#f8f5f0"
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
  );
}
