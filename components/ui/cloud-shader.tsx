"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

const DARK_BACK = "#14120B";
const LIGHT_BACK = "#F7F7F4";

export function CloudShader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

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
          size={2}
          speed={1}
          scale={0.78}
        />
      )}
    </div>
  );
}