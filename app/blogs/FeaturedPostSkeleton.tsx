import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedPostSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-5 border border-dotted border-edge p-4 md:grid-cols-[340px_1fr] md:p-5 bg-muted/5 items-center"
      aria-hidden="true"
    >
      <Skeleton className="h-48 sm:h-56 w-full rounded-none" />
      <div className="flex flex-col justify-center">
        <Skeleton className="h-2.5 w-20 rounded-sm" />
        <Skeleton className="h-5 w-full rounded-sm mt-3 mb-1" />
        <Skeleton className="h-5 w-3/4 rounded-sm" />
        <Skeleton className="h-3 w-full rounded-sm mt-3 mb-1" />
        <Skeleton className="h-3 w-2/3 rounded-sm" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-2.5 w-20 rounded-sm" />
          <Skeleton className="h-2.5 w-16 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
