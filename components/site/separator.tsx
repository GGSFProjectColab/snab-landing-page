import { cn } from "@/lib/utils";

type SectionSeparatorProps = {
  className?: string;
};

export function SectionSeparator({ className }: SectionSeparatorProps) {
  return (
    <div className="mx-auto max-w-6xl" aria-hidden="true">
      <div
        className={cn(
          "relative mx-2 h-8 border-x border-y border-dotted border-edge section-dot-grid",
          className
        )}
      />
    </div>
  );
}
