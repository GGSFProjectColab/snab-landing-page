"use client";

import { usePathname } from "next/navigation";
import GradualBlur from "@/components/ui/gradual-blur";

export function SiteGradualBlur() {
  const pathname = usePathname();

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
      divCount={7}
      curve="bezier"
      exponential
      opacity={0.72}
      zIndex={50}
    />
  );
}

