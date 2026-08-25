"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScrollProvider />
      {children}
    </>
  );
}
