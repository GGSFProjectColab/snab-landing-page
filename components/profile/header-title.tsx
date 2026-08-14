import { TextScramble } from "./text-scramble";
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
        "h-16 flex items-center border-b border-dotted border-edge px-2",
        className
      )}
    >
      <h2
        id={slugifiedId}
        className="text-heading font-normal"
      >
        <TextScramble text={title} />
      </h2>
    </div>
  );
}
