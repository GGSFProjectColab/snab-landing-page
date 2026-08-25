"use client";
import dynamic from "next/dynamic";

// Pro perf: stacking cards use native scroll, single observer, compositor-only transforms.
// We keep dynamic import (ssr: false) so motion hooks don't run on server and initial payload stays light.
export const LazyParallaxHowWeWork = dynamic(
  () => import("@/components/ui/stacking-cards").then((m) => m.StackingHowWeWork),
  {
    ssr: false,
    loading: () => <div className="min-h-[50vh] border-b border-dotted border-edge animate-pulse bg-muted/10" />,
  }
);

// Alias for new naming clarity — same implementation
export const LazyStackingHowWeWork = LazyParallaxHowWeWork;
