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
        "h-10 flex items-center border-b border-dotted border-edge px-2",
        className
      )}
    >
      <h2
        id={slugifiedId}
        className="font-pixelify font-bold text-xl md:text-2xl"
      >
        <TextScramble text={title} />
      </h2>
    </div>
  );
}
