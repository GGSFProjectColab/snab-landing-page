"use client";

import { Dithering } from "@paper-design/shaders-react";

export function CloudShader() {
  return (
    <Dithering
      width="100%"
      height="100%"
      colorBack="#000000"
      colorFront="#00b3ff"
      shape="sphere"
      type="4x4"
      size={2}
      speed={1}
      scale={0.6}
    />
  );
}