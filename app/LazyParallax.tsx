"use client";
import dynamic from "next/dynamic";

export const LazyParallaxHowWeWork = dynamic(
  () => import("@/components/ui/parallax-scroll-feature-section").then((m) => m.ParallaxHowWeWork),
  {
    ssr: false,
    loading: () => <div className="min-h-[50vh] border-b border-dotted border-edge animate-pulse bg-muted/10" />,
  }
);
