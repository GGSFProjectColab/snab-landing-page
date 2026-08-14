"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

export function CloudShader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <Dithering
      width="100%"
      height="100%"
      colorBack={isDark ? "#000000" : "#f4f1eb"}
      colorFront="#00b3ff"
      shape="sphere"
      type="4x4"
      size={2}
      speed={1}
      scale={0.6}
    />
  );
}
