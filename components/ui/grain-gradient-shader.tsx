"use client";

import { GrainGradient } from "@paper-design/shaders-react";

export function GrainGradientShader() {
  return (
    <div className="absolute inset-0 w-full h-full">
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
      />
    </div>
  );
}
