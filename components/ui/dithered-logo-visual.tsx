"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DitheredLogo } from "./dithered-logo";

export function DitheredLogoVisual() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden p-6 flex items-center justify-center ${
        isDark ? "bg-black" : "bg-[#f4f1eb]"
      }`}
    >
      <DitheredLogo
        imageSrc="/logo.png"
        className="h-full w-full text-white"
        gridSize={120}
        scale={0.7}
        dotScale={1.2}
        invert={true}
        cornerRadius={0}
        threshold={160}
        contrast={20}
        gamma={1.2}
        blur={3}
        diffusionStrength={1}
        particleColor={isDark ? "#ffffff" : "#0f766e"}
      />
    </div>
  );
}