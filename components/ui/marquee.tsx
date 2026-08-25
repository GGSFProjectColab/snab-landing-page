import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden z-10",
        className
      )}
      {...props}
    >
      <div className="relative flex w-full overflow-hidden py-3 [contain:paint]">
        <div
          className={cn(
            "flex w-max animate-marquee will-change-transform [backface-visibility:hidden] [transform:translate3d(0,0,0)] motion-reduce:animate-none [contain:layout_style]",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
          <div aria-hidden="true" className="flex shrink-0">
            {children}
          </div>
          <div aria-hidden="true" className="hidden 2xl:flex shrink-0">
            {children}
          </div>
          <div aria-hidden="true" className="hidden 2xl:flex shrink-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
