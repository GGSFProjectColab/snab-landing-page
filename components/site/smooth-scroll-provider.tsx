"use client";

import { useEffect } from "react";

/**
 * SmoothScrollProvider — disabled
 *
 * Lenis smooth scroll was removed due to FPS/lag reports.
 * This provider now acts as a cleanup shim:
 * - destroys any lingering Lenis instance from previous builds / HMR
 * - restores native scroll and cleans up classes/styles
 * Keep the file so `Providers` import stays stable; re-enable by reverting.
 */
export function SmoothScrollProvider() {
  useEffect(() => {
    try {
      const win = window as unknown as { __lenis?: { destroy?: () => void } };
      if (win.__lenis?.destroy) {
        win.__lenis.destroy();
      }
      delete (win as unknown as Record<string, unknown>).__lenis;
    } catch {
      // ignore
    }
    document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped", "lenis-autoToggle");
    document.documentElement.style.scrollBehavior = "";
    document.documentElement.style.removeProperty("scroll-behavior");
  }, []);

  return null;
}
