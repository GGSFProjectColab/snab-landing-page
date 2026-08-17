"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  prefersReducedMotion?: boolean | null;
}

const Word: React.FC<WordProps> = ({ children, progress, range, prefersReducedMotion }) => {
  const scrollOpacity = useTransform(progress, range, [0, 1]);
  const opacity = prefersReducedMotion ? 1 : scrollOpacity;

  return (
    <span className="magic-text-word">
      <span className="magic-text-ghost" aria-hidden="true">
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={container}
      className="magic-text-container"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            prefersReducedMotion={prefersReducedMotion}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};