"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface HowWeWorkStep {
  step: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

interface ParallaxHowWeWorkProps {
  steps: HowWeWorkStep[];
}

function ParallaxStep({
  step,
  index,
}: {
  step: HowWeWorkStep;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.97, 1]);

  const isReverse = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`min-h-[85vh] md:min-h-screen flex items-center justify-center py-20 md:py-0 px-4 sm:px-8 md:px-10 ${
        isReverse ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col-reverse gap-12 md:gap-20 lg:gap-40`}
    >
      {/* Text side */}
      <motion.div
        style={{ y: translateY }}
        className="flex-1 max-w-md text-left"
      >
        <div className="flex items-baseline gap-2.5 mb-3">
          <span className="font-mono text-caption text-muted-foreground">
            {step.step}
          </span>
          <span className="font-mono text-caption text-muted-foreground uppercase tracking-wider">
            {step.subtitle}
          </span>
        </div>
        <TextGenerateEffect
          as="h3"
          className="text-[28px] sm:text-[34px] md:text-[42px] font-normal tracking-tight leading-[1.15]"
          staggerDuration={0.06}
        >
          {step.title}
        </TextGenerateEffect>
        <motion.div
          style={{ y: translateY }}
          className="mt-5 max-w-md"
        >
          <TextGenerateEffect
            as="p"
            className="text-body leading-relaxed text-muted-foreground"
            staggerDuration={0.02}
          >
            {step.content}
          </TextGenerateEffect>
        </motion.div>
      </motion.div>

      {/* Image side — compositor-only (no clipPath), next/image lazy */}
      <motion.div
        style={{
          opacity,
          scale,
          willChange: "transform, opacity",
        }}
        className="relative flex-shrink-0 [contain:paint] [transform:translateZ(0)]"
      >
        <div className="relative h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] md:h-[380px] md:w-[380px] overflow-hidden border border-dotted border-edge p-1">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 10px)",
            }}
            aria-hidden="true"
          />
          <Image
            src={step.image.replace(".png", ".webp")}
            alt={step.title}
            fill
            sizes="(max-width: 768px) 240px, 380px"
            quality={75}
            loading="lazy"
            decoding="async"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function ParallaxHowWeWork({ steps }: ParallaxHowWeWorkProps) {
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <ParallaxStep key={step.step} step={step} index={index} />
      ))}
    </div>
  );
}
