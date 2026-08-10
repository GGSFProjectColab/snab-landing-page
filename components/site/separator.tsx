import { cn } from "@/lib/utils";

type SectionSeparatorProps = {
  className?: string;
};

export function SectionSeparator({ className }: SectionSeparatorProps) {
  return (
    <div
      className={cn(
        "h-8 border-y border-dotted border-edge section-dot-grid",
        className
      )}
      aria-hidden="true"
    />
  );
}
