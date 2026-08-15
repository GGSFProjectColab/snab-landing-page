"use client";

import { motion, type Transition } from "motion/react";
import { type ElementType, useMemo } from "react";
import { cn } from "@/lib/utils";

export type TextGenerateEffectProps = {
  children: string;
  as?: ElementType;
  id?: string;
  className?: string;
  wordClassName?: string;
  trigger?: boolean;
  staggerDuration?: number;
  transition?: Transition;
  filter?: boolean;
};

export function TextGenerateEffect({
  children,
  as = "p",
  id,
  className,
  wordClassName,
  trigger = true,
  staggerDuration = 0.14,
  transition = { duration: 0.65 },
  filter = true,
}: TextGenerateEffectProps) {
  const words = useMemo(() => children.split(" "), [children]);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      aria-label={children}
      className={cn("inline-block", className)}
    >
      <span className="sr-only">{children}</span>
      {words.map((word, i) => (
        <motion.span
          animate={
            trigger
              ? { filter: filter ? "blur(0px)" : undefined, opacity: 1 }
              : { filter: filter ? "blur(4px)" : undefined, opacity: 0 }
          }
          aria-hidden="true"
          className={cn("inline-block whitespace-pre opacity-0", wordClassName)}
          initial={{ filter: filter ? "blur(4px)" : undefined, opacity: 0 }}
          key={`${i}-${word}`}
          transition={{ ...transition, delay: i * staggerDuration }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default TextGenerateEffect;
