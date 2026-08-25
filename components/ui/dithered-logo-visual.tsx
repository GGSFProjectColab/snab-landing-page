"use client";

import { DitheredLogo } from "./dithered-logo";

export function DitheredLogoVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <DitheredLogo
        imageSrc="/logo.png"
        className="h-full w-full text-foreground"
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
        particleColor="currentColor"
      />
    </div>
  );
}
