"use client";

import React, { type ElementType, useMemo, type ReactNode } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export type TextGenerateEffectProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
  wordClassName?: string;
  trigger?: boolean;
  staggerDuration?: number;
  transition?: Transition;
  filter?: boolean;
};

type RenderOptions = {
  wordClassName?: string;
  trigger: boolean;
  staggerDuration: number;
  transition: Transition;
  filter: boolean;
  prefersReducedMotion: boolean;
};

function getWordCount(node: ReactNode): number {
  if (!node) return 0;
  if (typeof node === "string" || typeof node === "number") {
    const words = String(node).trim().split(/\s+/).filter(Boolean);
    return words.length;
  }
  if (Array.isArray(node)) {
    return node.reduce((acc, child) => acc + getWordCount(child), 0);
  }
  if (React.isValidElement(node)) {
    const { children } = node.props as { children?: ReactNode };
    return getWordCount(children);
  }
  return 1;
}

function renderAnimatedNodes(
  node: ReactNode,
  getIndex: (count?: number) => number,
  options: RenderOptions
): ReactNode {
  if (node === null || node === undefined || typeof node === "boolean") {
    return null;
  }

  if (options.prefersReducedMotion) {
    return node;
  }

  if (typeof node === "string" || typeof node === "number") {
    const text = String(node);
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (/^\s+$/.test(part)) {
        return part;
      }
      const idx = getIndex(1);
      return (
        <motion.span
          key={`w-${idx}-${i}`}
          initial={{
            filter: options.filter ? "blur(4px)" : undefined,
            opacity: 0,
            y: 4,
          }}
          animate={
            options.trigger
              ? {
                  filter: options.filter ? "blur(0px)" : undefined,
                  opacity: 1,
                  y: 0,
                }
              : {
                  filter: options.filter ? "blur(4px)" : undefined,
                  opacity: 0,
                  y: 4,
                }
          }
          transition={{
            ...options.transition,
            delay: idx * options.staggerDuration,
          }}
          className={cn("inline-block will-change-[transform,opacity]", options.wordClassName)}
        >
          {part}
        </motion.span>
      );
    });
  }

  if (React.isValidElement(node)) {
    const wordCount = Math.max(1, getWordCount(node));
    const idx = getIndex(wordCount);
    return (
      <motion.span
        key={`elem-${idx}`}
        initial={{
          filter: options.filter ? "blur(4px)" : undefined,
          opacity: 0,
        }}
        animate={
          options.trigger
            ? {
                filter: options.filter ? "blur(0px)" : undefined,
                opacity: 1,
              }
            : {
                filter: options.filter ? "blur(4px)" : undefined,
                opacity: 0,
              }
        }
        transition={{
          ...options.transition,
          delay: idx * options.staggerDuration,
        }}
        className="inline will-change-[opacity]"
      >
        {node}
      </motion.span>
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>
        {renderAnimatedNodes(child, getIndex, options)}
      </React.Fragment>
    ));
  }

  return node;
}

export function TextGenerateEffect({
  children,
  as = "p",
  id,
  className,
  wordClassName,
  trigger = true,
  staggerDuration = 0.08,
  transition = { duration: 0.45, ease: "easeOut" },
  filter = false,
}: TextGenerateEffectProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const prefersReducedMotion = useReducedMotion() ?? false;

  const content = useMemo(() => {
    let wordCounter = 0;
    const getIndex = (count = 1) => {
      const current = wordCounter;
      wordCounter += count;
      return current;
    };

    return renderAnimatedNodes(children, getIndex, {
      wordClassName,
      trigger,
      staggerDuration,
      transition,
      filter,
      prefersReducedMotion,
    });
  }, [children, wordClassName, trigger, staggerDuration, transition, filter, prefersReducedMotion]);

  if (prefersReducedMotion) {
    const Tag = as as ElementType;
    return (
      <Tag id={id} className={cn(as === "p" ? "block" : "inline-block", className)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={cn(as === "p" ? "block" : "inline-block", className)}
    >
      {content}
    </MotionTag>
  );
}

export default TextGenerateEffect;

