import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";

export function WorkSkeleton() {
  return (
    <div aria-hidden="true">
      {/* Hero Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="border-b border-dotted border-edge p-6 sm:p-10 md:p-14">
            <Skeleton className="h-3 w-48 rounded-sm" />
            <Skeleton className="mt-3 h-10 sm:h-12 md:h-14 w-full max-w-lg rounded-sm" />
            <div className="mt-4 max-w-2xl space-y-2">
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-3/4 rounded-sm" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge" />

      {/* Selected Work Section Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="py-6">
            <Skeleton className="h-8 sm:h-10 w-56 sm:w-64 rounded-sm" />
          </div>

          <div className="divide-y divide-dotted divide-edge">
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={i}
                className="p-4 sm:p-6 md:p-8 md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center"
              >
                {/* Information Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Index & Status */}
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-3 w-6 rounded-sm" />
                      <div className="flex items-center gap-1.5">
                        <Skeleton className="h-2 w-2 rounded-full" />
                        <Skeleton className="h-3 w-8 rounded-sm" />
                      </div>
                    </div>

                    {/* Title */}
                    <Skeleton className="mt-2 h-6 sm:h-7 w-48 sm:w-56 rounded-sm" />

                    {/* Category Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Skeleton className="h-5 w-28 rounded-sm" />
                      <Skeleton className="h-5 w-20 rounded-sm" />
                      <Skeleton className="h-5 w-24 rounded-sm" />
                    </div>

                    {/* Description */}
                    <div className="mt-4 max-w-xl space-y-2">
                      <Skeleton className="h-3.5 w-full rounded-sm" />
                      <Skeleton className="h-3.5 w-full rounded-sm" />
                      <Skeleton className="h-3.5 w-2/3 rounded-sm" />
                    </div>

                    {/* Capabilities */}
                    <div className="mt-4 border-t border-dotted border-edge pt-3">
                      <Skeleton className="h-3 w-72 rounded-sm" />
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6">
                    <Skeleton className="h-3 w-24 rounded-sm" />
                  </div>
                </div>

                {/* Visual Preview Column */}
                <div className="mt-6 md:mt-0 flex justify-center">
                  <div className="relative h-[220px] w-full max-w-[280px] sm:max-w-[320px] md:h-[240px] md:w-[240px] overflow-hidden rounded-[10px] border border-dotted border-edge p-2 bg-accent/20">
                    <Skeleton className="h-full w-full rounded-[6px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>
    </div>
  );
}
