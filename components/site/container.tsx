import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function ContainerWrapper({ children, className }: ContainerWrapperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative mx-[clamp(1rem,1.5vw,2.5rem)] border-x-[1px] border-dotted border-edge">
        {children}
      </div>
    </div>
  );
}