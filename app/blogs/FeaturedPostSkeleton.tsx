import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedPostSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-6 border border-dotted border-edge p-4 md:grid-cols-[1fr_1fr] md:p-6"
      aria-hidden="true"
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-col justify-center">
        <Skeleton className="h-2.5 w-20 rounded-sm" />
        <Skeleton className="h-6 w-full rounded-sm mt-3 mb-1" />
        <Skeleton className="h-6 w-4/5 rounded-sm" />
        <Skeleton className="h-3 w-full rounded-sm mt-4 mb-1" />
        <Skeleton className="h-3 w-full rounded-sm mb-1" />
        <Skeleton className="h-3 w-3/4 rounded-sm" />
        <div className="mt-6 flex items-center gap-4">
          <Skeleton className="h-2.5 w-16 rounded-sm" />
          <Skeleton className="h-2.5 w-16 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
