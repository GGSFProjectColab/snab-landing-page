import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";

export default function AboutLoading() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading about">
      {/* Hero Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[340px] overflow-hidden sm:min-h-[400px]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-6 sm:min-h-[400px] sm:p-10 md:p-14">
              <Skeleton className="mb-4 h-3 w-16 rounded-sm" />
              <Skeleton className="h-12 w-64 rounded-sm sm:h-14 sm:w-80 md:h-16 md:w-96" />
              <Skeleton className="mt-4 h-4 w-64 rounded-sm sm:h-5 sm:w-80" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Who We Are Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-40 rounded-sm" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <Skeleton className="mb-3 h-3 w-24 rounded-sm" />
              <Skeleton className="mb-4 h-6 w-48 rounded-sm sm:h-7 sm:w-64" />
              <Skeleton className="mb-2 h-4 w-full rounded-sm" />
              <Skeleton className="mb-2 h-4 w-full rounded-sm" />
              <Skeleton className="mb-6 h-4 w-3/4 rounded-sm" />
              <div className="mt-6 space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <div className="flex items-start gap-3" key={i}>
                    <Skeleton className="mt-0.5 h-3 w-5 rounded-sm" />
                    <Skeleton className="h-4 w-48 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px]">
              <Skeleton className="h-full w-full rounded-none" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* What We Do Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-32 rounded-sm" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="relative order-2 min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px] md:order-1">
              <Skeleton className="h-full w-full rounded-none" />
            </div>
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-l md:order-2 md:p-10">
              <Skeleton className="mb-3 h-3 w-20 rounded-sm" />
              <Skeleton className="mb-4 h-6 w-32 rounded-sm sm:h-7 sm:w-40" />
              <div className="space-y-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <Skeleton className="h-3 w-5 rounded-sm" />
                    <Skeleton className="h-4 w-40 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Our Approach Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-36 rounded-sm" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <Skeleton className="mb-3 h-3 w-20 rounded-sm" />
              <Skeleton className="mb-6 h-6 w-48 rounded-sm sm:h-7 sm:w-56" />
              <div className="space-y-5">
                {[0, 1, 2, 3].map((i) => (
                  <div className="flex gap-4" key={i}>
                    <Skeleton className="h-4 w-6 rounded-sm" />
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-4 w-20 rounded-sm" />
                      <Skeleton className="h-3 w-full rounded-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px]">
              <Skeleton className="h-full w-full rounded-none" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Selected Work Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-36 rounded-sm" />
          <div className="divide-y divide-dotted divide-edge border-b border-dotted border-edge">
            {[0, 1].map((i) => (
              <div
                className="grid gap-0 sm:grid-cols-[1fr_auto] md:grid-cols-[1fr_240px]"
                key={i}
              >
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                  <Skeleton className="h-6 w-40 rounded-sm sm:h-7 sm:w-48" />
                  <Skeleton className="mt-2 h-4 w-56 rounded-sm sm:w-72" />
                  <Skeleton className="mt-4 h-3 w-20 rounded-sm" />
                </div>
                <div className="flex items-center justify-center border-t border-dotted border-edge p-6 sm:border-t-0 sm:border-l sm:p-8 md:border-l">
                  <div className="relative h-40 w-40 overflow-hidden rounded border border-dotted border-edge sm:h-48 sm:w-48">
                    <Skeleton className="h-full w-full rounded-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* CTA Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 p-6 sm:items-center sm:text-center sm:py-10 md:px-12">
              <Skeleton className="h-6 w-48 rounded-sm sm:h-7 sm:w-64" />
              <Skeleton className="h-10 w-40 rounded-sm" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <span className="sr-only">Loading about content…</span>
    </main>
  );
}
