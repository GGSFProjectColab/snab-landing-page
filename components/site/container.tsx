import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerWrapperProps = {
  children: ReactNode;
  className?: string;
  crosshairs?: "top" | "bottom" | "both" | "none";
};

export function ContainerWrapper({
  children,
  className,
  crosshairs = "none",
}: ContainerWrapperProps) {
  return (
    <div className={cn("mx-auto max-w-6xl", className)}>
      <div className="relative mx-2 border-x-[1px] border-dotted border-edge">
        {crosshairs === "top" || crosshairs === "both" ? (
          <>
            <span className="crosshair absolute -left-[6px] -top-[6px]" />
            <span className="crosshair absolute -right-[6px] -top-[6px]" />
          </>
        ) : null}
        {children}
        {crosshairs === "bottom" || crosshairs === "both" ? (
          <>
            <span className="crosshair absolute -bottom-[6px] -left-[6px]" />
            <span className="crosshair absolute -bottom-[6px] -right-[6px]" />
          </>
        ) : null}
      </div>
    </div>
  );
}
