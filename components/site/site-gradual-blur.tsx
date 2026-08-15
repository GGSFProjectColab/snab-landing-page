"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GradualBlur from "@/components/ui/gradual-blur";

export function SiteGradualBlur() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide bottom effect completely on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <GradualBlur
      position="bottom"
      target="page"
      height="clamp(4rem, 9vh, 6.25rem)"
      strength={1.65}
      divCount={isMobile ? 3 : 6}
      curve="bezier"
      exponential
      opacity={0.72}
      zIndex={50}
    />
  );
}


