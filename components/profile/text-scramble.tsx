"use client";

import { useEffect, useRef } from "react";

type TextScrambleProps = {
  text: string;
  className?: string;
};

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({ text, className }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.textContent = text;
      return;
    }

    let frame = 0;
    let queue: { char: string; start: number; end: number }[] = [];
    let frameRequest: number;

    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { char, start, end } = queue[i];
        if (frame >= end) {
          output += char;
          complete++;
        } else if (frame >= start) {
          const randomIndex = Math.floor(
            Math.random() * chars.length
          );
          output += `<span class="text-muted-foreground">${chars[randomIndex]}</span>`;
        } else {
          output += "";
        }
      }

      el.innerHTML = output;

      if (complete < queue.length) {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    const scramble = () => {
      frame = 0;
      queue = [];

      for (let i = 0; i < text.length; i++) {
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        queue.push({ char: text[i], start, end });
      }

      update();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      cancelAnimationFrame(frameRequest);
      observer.disconnect();
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
