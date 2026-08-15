import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";

type HeaderTitleProps = {
  title: string;
  id?: string;
  className?: string;
};

export function HeaderTitle({ title, id, className }: HeaderTitleProps) {
  const slugifiedId = id || title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className={cn(
        "min-h-16 h-auto py-3.5 sm:py-4 flex items-center border-b border-dotted border-edge px-3 sm:px-4",
        className
      )}
    >
      <TextGenerateEffect
        as="h2"
        id={slugifiedId}
        className="text-heading font-normal tracking-tight leading-[1.15] break-words w-full"
        staggerDuration={0.14}
        transition={{ duration: 0.65 }}
      >
        {title}
      </TextGenerateEffect>
    </div>
  );
}
