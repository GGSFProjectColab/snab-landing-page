import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function ContainerWrapper({ children, className }: ContainerWrapperProps) {
  return (
    <div className={cn("mx-auto max-w-[1440px]", className)}>
      <div className="relative mx-4 border-x-[1px] border-dotted border-edge">
        {children}
      </div>
    </div>
  );
}