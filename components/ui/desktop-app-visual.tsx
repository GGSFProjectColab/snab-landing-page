"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { MacbookPro } from "@/components/ui/macbook-pro";

const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GrainGradient),
  { ssr: false }
);

export function DesktopAppVisual() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative flex h-full w-full items-center justify-center p-2">
      {/* Macbook Pro Mockup */}
      <div className="relative z-10 w-full max-w-[250px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center">
        {/* Grain gradient inside the screen */}
        <div className="absolute z-0" style={{ top: "5.33%", left: "11.46%", width: "77.11%", height: "80.96%", borderRadius: 5, overflow: "hidden" }}>
          {isDark ? (
            <GrainGradient
              width="100%"
              height="100%"
              colors={["#22c55e", "#f97316", "#eab308", "#06b6d4"]}
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
              colors={["#86efac", "#fdba74", "#fde68a", "#a5f3fc"]}
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
        <MacbookPro
          className="w-full h-auto max-h-[170px] sm:max-h-[220px] md:max-h-[260px] lg:max-h-[290px] text-card"
        />
      </div>
    </div>
  );
}
