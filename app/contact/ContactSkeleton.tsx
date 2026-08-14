import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";


export function ContactSkeleton() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading contact">
      {/* Hero Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[340px] overflow-hidden sm:min-h-[380px]">
            <Skeleton className="absolute inset-0 h-full w-full" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-12">
              <Skeleton className="h-3 w-20 rounded-sm mb-3" />
              <Skeleton className="h-10 w-48 sm:h-12 sm:w-56 rounded-sm" />
              <div className="mt-4 flex items-center gap-1.5">
                <Skeleton className="h-3 w-10 rounded-sm" />
                <Skeleton className="h-3 w-2 rounded-sm" />
                <Skeleton className="h-3 w-14 rounded-sm" />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Content Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="grid grid-cols-1 gap-10 p-4 sm:p-6 md:grid-cols-2 md:gap-12 md:p-8">
            {/* Left Column Skeleton */}
            <div className="flex flex-col gap-8">
              <div>
                <Skeleton className="h-3 w-24 rounded-sm mb-2" />
                <Skeleton className="h-8 w-64 sm:h-10 sm:w-80 rounded-sm" />
                <div className="mt-3">
                  <Skeleton className="h-4 w-full rounded-sm mb-2" />
                  <Skeleton className="h-4 w-full rounded-sm mb-2" />
                  <Skeleton className="h-4 w-3/4 rounded-sm" />
                </div>
              </div>

              {/* Contact Details Skeleton */}
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

            {/* Right Column Skeleton (Form) */}
            <div className="border border-dotted border-edge bg-muted/20 p-5 sm:p-6">
              <div className="mb-5">
                <Skeleton className="h-3 w-28 rounded-sm mb-2" />
                <Skeleton className="h-6 w-32 rounded-sm" />
              </div>
              <div className="flex flex-col gap-5">
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
                <Skeleton className="h-10 w-32 rounded-sm" />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Map Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4">
              <Skeleton className="h-3 w-16 rounded-sm mb-1" />
              <Skeleton className="h-6 w-48 rounded-sm" />
            </div>
            <div className="relative h-[300px] overflow-hidden border border-dotted border-edge sm:h-[350px]">
              <div className="contact-map-skeleton">
                <Skeleton className="contact-map-skeleton-grid" />
                <Skeleton className="contact-map-skeleton-pin" />
                <span>Map loading</span>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      <span className="sr-only">Loading contact content…</span>
    </main>
  );
}
