"use client";

import { useEffect, useRef, useState } from "react";

function useFps(updateInterval = 500) {
  const [fps, setFps] = useState(0);
  const [ms, setMs] = useState(0);
  const frames = useRef(0);
  const last = useRef(performance.now());
  const prevFps = useRef(0);

  useEffect(() => {
    let rafId = 0;

    const tick = (now: number) => {
      frames.current += 1;
      const elapsed = now - last.current;

      if (elapsed >= updateInterval) {
        const value = Math.round((frames.current * 1000) / elapsed);
        const frameMs = frames.current > 0 ? elapsed / frames.current : 0;

        // smooth a bit to avoid jitter
        const smoothed = Math.round(prevFps.current * 0.3 + value * 0.7);
        prevFps.current = smoothed;

        setFps(smoothed);
        setMs(Math.round(frameMs * 10) / 10);
        frames.current = 0;
        last.current = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // pause when tab hidden to avoid skewed numbers
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        last.current = performance.now();
        frames.current = 0;
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [updateInterval]);

  return { fps, ms };
}

export function FpsCounter() {
  const { fps, ms } = useFps(500);
  const [hidden, setHidden] = useState(false);

  // only render on client + dev
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || process.env.NODE_ENV === "production") return null;
  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 right-4 z-[9999] h-7 w-7 rounded-full bg-white text-black text-[10px] font-mono font-bold shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Show FPS"
        title="Show FPS"
      >
        FPS
      </button>
    );
  }

  const status = fps >= 50 ? "good" : fps >= 30 ? "mid" : "bad";
  const color =
    status === "good"
      ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
      : status === "mid"
        ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
        : "text-red-400 border-red-400/30 bg-red-400/10";

  const dot =
    status === "good" ? "bg-emerald-400" : status === "mid" ? "bg-amber-400" : "bg-red-400";

  return (
    <div
      className={`fixed bottom-4 right-4 z-[9999] flex items-center gap-2.5 rounded-full border backdrop-blur-md px-3 py-1.5 shadow-lg font-mono text-xs ${color}`}
    >
      <span className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot} animate-pulse`} />
        <span className="font-bold tabular-nums">{fps}</span>
        <span className="opacity-70">FPS</span>
      </span>
      <span className="h-3 w-px bg-white/15" />
      <span className="tabular-nums opacity-80">{ms} ms</span>
      <button
        onClick={() => setHidden(true)}
        className="ml-1 -mr-1 h-5 w-5 rounded-full hover:bg-white/10 flex items-center justify-center text-[10px] leading-none opacity-60 hover:opacity-100 transition"
        aria-label="Hide FPS"
      >
        ✕
      </button>
    </div>
  );
}
