"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function TextGenerateEffectDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center bg-background p-8">
      <TextGenerateEffect
        as="h1"
        className="max-w-2xl text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        The best way to predict the future is to build it, one component at a
        time.
      </TextGenerateEffect>
    </div>
  );
}
