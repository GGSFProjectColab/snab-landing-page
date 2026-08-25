"use client";
import dynamic from "next/dynamic";

export const LazyServicesSection = dynamic(() => import("./ServicesSection").then((m) => m.ServicesSection), {
  ssr: false,
  loading: () => <div className="py-10 border-b border-dotted border-edge min-h-[380px] animate-pulse bg-muted/20 flex items-center justify-center text-caption text-muted-foreground">Loading services…</div>,
});
