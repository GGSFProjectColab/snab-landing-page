"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/components/hooks/use-screen-size";

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
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateY = useTransform(scrollYProgress, [0, 1], [-40, 0]);

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

      {/* Image side */}
      <motion.div
        style={{
          opacity,
          clipPath,
        }}
        className="relative flex-shrink-0"
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.image}
            alt={step.title}
            className="relative h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function ParallaxHowWeWork({ steps }: ParallaxHowWeWorkProps) {
  const screenSize = useScreenSize();

  return (
    <div className="relative overflow-hidden border-b border-dotted border-edge">
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 48 : 80}
          fadeDuration={500}
          delay={1200}
          pixelClassName="rounded-full bg-[#ffa04f]"
        />
      </div>
      <div className="relative z-10 flex flex-col pointer-events-none">
        {steps.map((step, index) => (
          <ParallaxStep key={step.step} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}
