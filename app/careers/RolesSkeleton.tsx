import { Skeleton } from "@/components/ui/skeleton";

export function RolesSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div
          className="flex flex-col p-6 border border-dotted border-edge bg-white/[0.02]"
          key={index}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <Skeleton className="h-5 w-48 rounded-sm mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 rounded-sm" />
                <Skeleton className="h-3 w-16 rounded-sm" />
              </div>
            </div>
            <Skeleton className="h-9 w-9 shrink-0" />
          </div>

          <div className="mb-5">
            <Skeleton className="h-3 w-full rounded-sm mb-1.5" />
            <Skeleton className="h-3 w-3/4 rounded-sm" />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-dotted border-edge">
            <Skeleton className="h-3 w-24 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
