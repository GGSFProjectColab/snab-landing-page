"use client";

import { useTheme } from "next-themes";
import { MacbookPro } from "@/components/ui/macbook-pro";

const HERO_LIGHT = "https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787656935/jmvt7wh7eew66m2z1loj.png";
const HERO_DARK = "https://res.cloudinary.com/dvzxfbcsd/image/upload/v1787656054/glfm0fbkq0rutv73fjyv.png";

export function DesktopAppVisual() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative flex h-full w-full items-center justify-center p-2">
      {/* Macbook Pro Mockup */}
      <div className="relative z-10 w-full max-w-[250px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center">
        {/* Hero image inside the screen – static, theme-aware, no animation */}
        <div className="absolute z-0 overflow-hidden bg-black" style={{ top: "5.33%", left: "11.46%", width: "77.11%", height: "80.96%", borderRadius: 5 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isDark ? HERO_DARK : HERO_LIGHT}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>
        <MacbookPro
          className="w-full h-auto max-h-[170px] sm:max-h-[220px] md:max-h-[260px] lg:max-h-[290px] text-card"
        />
      </div>
    </div>
  );
}
