"use client";
import dynamic from "next/dynamic";

export const LazyAskAiSection = dynamic(() => import("./AskAiSection").then((m) => m.AskAiSection), {
  ssr: false,
  loading: () => <div className="py-12 sm:py-16 md:py-20 border-b border-dotted border-edge px-4 min-h-[260px] animate-pulse bg-muted/20" />,
});
