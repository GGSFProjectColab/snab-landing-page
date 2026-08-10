"use client";

import { cn } from "@/lib/utils";

type ShinyTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  spread?: number;
};

export function ShinyText({
  children,
  className,
  speed = 1.35,
  spread = 110,
}: ShinyTextProps) {
  return (
    <span
      className={cn("shiny-text", className)}
      style={
        {
          "--shiny-speed": `${speed}s`,
          "--shiny-spread": `${spread}%`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
