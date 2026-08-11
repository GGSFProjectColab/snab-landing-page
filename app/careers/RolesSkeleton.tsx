import { Skeleton } from "@/components/ui/skeleton";

export function RolesSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div
          className="flex flex-col p-5 sm:p-6 border border-dotted border-edge rounded-lg bg-white/[0.02]"
          key={index}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <Skeleton className="h-5 w-48 rounded mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          </div>

          <Skeleton className="h-3 w-full rounded mb-1" />
          <Skeleton className="h-3 w-3/4 rounded mb-4" />

          <div className="flex items-center gap-3 pt-3 border-t border-dotted border-edge">
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
