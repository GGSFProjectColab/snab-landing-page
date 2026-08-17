// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Slow, blurred rise used for the hero's entrance. Children of a `RevealGroup`
 * inherit its stagger, so each block lands a beat after the previous one.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const staticVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

type GroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the first child animates. */
  delay?: number;
  /** Seconds between each child. */
  stagger?: number;
};

export const RevealGroup = ({
  children,
  className,
  delay = 0,
  stagger = 0.14,
}: GroupProps) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: { transition: { delayChildren: delay, staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

export const Reveal = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={reduced ? staticVariants : itemVariants}
    >
      {children}
    </motion.div>
  );
};
