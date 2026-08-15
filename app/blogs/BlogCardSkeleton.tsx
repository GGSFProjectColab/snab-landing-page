import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div
      className="flex flex-col border border-dotted border-edge bg-muted/5"
      aria-hidden="true"
    >
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="flex flex-1 flex-col p-4">
        <Skeleton className="h-2.5 w-16 rounded-sm mb-2" />
        <Skeleton className="h-4 w-full rounded-sm mb-1" />
        <Skeleton className="h-4 w-3/4 rounded-sm mb-2" />
        <Skeleton className="h-3 w-full rounded-sm mb-1" />
        <Skeleton className="h-3 w-full rounded-sm mb-1" />
        <Skeleton className="h-3 w-2/3 rounded-sm" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-2.5 w-16 rounded-sm" />
          <Skeleton className="h-2.5 w-3 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
