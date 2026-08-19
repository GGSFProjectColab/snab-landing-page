import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";


export function ContactSkeleton() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading contact">
      {/* Section 1: Image + Contact */}
      <section>
        <ContainerWrapper>
          <div className="grid grid-cols-1 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* Image half Skeleton */}
            <div className="relative min-h-[260px] overflow-hidden border-b border-dotted border-edge sm:min-h-[320px] lg:min-h-full lg:border-b-0">
              <Skeleton className="absolute inset-0 h-full w-full" />
            </div>

            {/* Content half Skeleton */}
            <div className="flex flex-col justify-center gap-10 p-6 sm:p-10 lg:p-12 xl:p-16">
              <div>
                <Skeleton className="h-12 w-44 sm:h-14 sm:w-52 rounded-sm" />
                <div className="mt-4 max-w-xl">
                  <Skeleton className="h-4 w-full rounded-sm mb-2" />
                  <Skeleton className="h-4 w-full rounded-sm mb-2" />
                  <Skeleton className="h-4 w-3/4 rounded-sm" />
                </div>
              </div>

              {/* Form Skeleton */}
              <div>
                <Skeleton className="h-3 w-28 rounded-sm mb-2" />
                <Skeleton className="h-6 w-32 rounded-sm" />
                <div className="mt-6 flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-16 rounded-sm" />
                    <Skeleton className="h-10 w-full rounded-sm" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-12 rounded-sm" />
                    <Skeleton className="h-10 w-full rounded-sm" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-12 rounded-sm" />
                    <Skeleton className="h-10 w-full rounded-sm" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-16 rounded-sm" />
                    <Skeleton className="h-24 w-full rounded-sm" />
                  </div>
                  <Skeleton className="h-10 w-36 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      {/* Section 2: Map + Details */}
      <section className="full-bleed-border-t">
        <ContainerWrapper>
          <div className="grid grid-cols-1 pb-10 pt-10 sm:pb-14 sm:pt-14 lg:grid-cols-2">
            {/* Details half Skeleton */}
            <div className="flex flex-col justify-center gap-8 p-6 sm:p-10 lg:p-12 xl:p-16">
              <div>
                <Skeleton className="h-3 w-16 rounded-sm mb-2" />
                <Skeleton className="h-8 w-56 rounded-sm" />
              </div>
              <div className="flex flex-col divide-y divide-dotted divide-edge">
                {Array.from({ length: 3 }, (_, i) => (
                  <div className="flex items-start gap-3 py-4 first:pt-0 last:pb-0" key={i}>
                    <Skeleton className="mt-0.5 h-4 w-4 rounded-sm" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-3 w-16 rounded-sm mb-1.5" />
                      <Skeleton className="h-4 w-32 rounded-sm mb-1" />
                      <Skeleton className="h-3 w-24 rounded-sm" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links Skeleton */}
              <div>
                <Skeleton className="h-3 w-16 rounded-sm mb-3" />
                <div className="flex items-center gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <Skeleton className="h-8 w-8 rounded-sm" key={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Map half Skeleton */}
            <div className="relative min-h-[260px] border-b border-dotted border-edge lg:min-h-[360px] lg:border-b-0">
              <div className="absolute inset-6 lg:inset-8">
                <div className="contact-map-skeleton">
                  <Skeleton className="contact-map-skeleton-grid" />
                  <Skeleton className="contact-map-skeleton-pin" />
                  <span>Map loading</span>
                </div>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <span className="sr-only">Loading contact content…</span>
    </main>
  );
}