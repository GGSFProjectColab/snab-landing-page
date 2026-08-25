"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GradualBlur = dynamic(() => import("@/components/ui/gradual-blur"), { ssr: false });

export function SiteGradualBlur() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const check = () => {
      setIsMobile(window.innerWidth < 768 || mqCoarse.matches);
      setPrefersReduced(mqReduced.matches);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    mqReduced.addEventListener?.("change", check);
    // Defer blur mount by 2s to keep first paint clean (Vercel progressive enhance pattern)
    const t = setTimeout(() => setReady(true), 2000);
    return () => {
      window.removeEventListener("resize", check);
      mqReduced.removeEventListener?.("change", check);
      clearTimeout(t);
    };
  }, []);

  // Hide completely on admin, reduced-motion, mobile, or before ready
  if (pathname?.startsWith("/admin") || prefersReduced || isMobile || !ready) {
    return null;
  }

  return (
    <GradualBlur
      position="bottom"
      target="page"
      height="clamp(4rem, 9vh, 6.25rem)"
      strength={1.15}
      divCount={4}
      curve="bezier"
      exponential
      opacity={0.6}
      zIndex={50}
    />
  );
}


