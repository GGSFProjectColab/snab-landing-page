"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScrollProvider />
      {children}
    </NextThemesProvider>
  );
}
