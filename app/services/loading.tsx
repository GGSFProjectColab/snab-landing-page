import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";

export default function ServicesLoading() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading services">
      {/* Hero Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[460px] overflow-hidden sm:min-h-[540px]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="relative z-10 flex min-h-[460px] flex-col justify-end p-6 sm:min-h-[540px] sm:p-10 md:p-14">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-3 w-24 rounded-sm" />
              </div>
              <Skeleton className="h-8 w-full max-w-2xl rounded-sm sm:h-10 md:h-12 lg:h-14" />
              <Skeleton className="h-6 w-3/4 max-w-xl rounded-sm mt-4 sm:h-8" />
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Skeleton className="h-10 w-36 rounded-sm" />
                <Skeleton className="h-10 w-36 rounded-sm" />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* Services Grid Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="py-12 md:py-16">
            <Skeleton className="h-10 sm:h-12 w-64 sm:w-80 mx-auto rounded-sm mb-10" />
          </div>
          <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                className={`flex flex-col justify-between p-5 sm:p-6 border-b border-dotted border-edge ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                  i >= 3 ? "md:border-b-0" : ""
                } bg-muted/10`}
                key={i}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-3 w-6 rounded-sm" />
                  </div>
                  <div className="mt-5">
                    <Skeleton className="h-3 w-28 rounded-sm mb-2" />
                    <Skeleton className="h-6 w-40 rounded-sm mb-2" />
                    <Skeleton className="h-3 w-full rounded-sm mb-1.5" />
                    <Skeleton className="h-3 w-3/4 rounded-sm" />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-dotted border-edge/60">
                  <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-5 w-20 rounded-sm" />
                    <Skeleton className="h-5 w-24 rounded-sm" />
                    <Skeleton className="h-5 w-16 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* Delivery Process Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="py-12 md:py-16">
            <Skeleton className="h-10 sm:h-12 w-64 sm:w-80 mx-auto rounded-sm mb-10" />
          </div>
          <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                className={`p-5 sm:p-6 border-b border-dotted border-edge last:border-b-0 sm:border-b-0 ${
                  i < 3 ? "md:border-r" : ""
                }`}
                key={i}
              >
                <Skeleton className="h-3 w-6 rounded-sm mb-2" />
                <Skeleton className="h-5 w-28 rounded-sm mb-2" />
                <Skeleton className="h-3 w-full rounded-sm mb-1.5" />
                <Skeleton className="h-3 w-3/4 rounded-sm" />
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* CTA Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 p-6 sm:items-center sm:text-center sm:py-10 md:px-12">
              <Skeleton className="h-7 w-64 rounded-sm sm:h-9" />
              <Skeleton className="h-10 w-44 rounded-sm" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      <span className="sr-only">Loading services content…</span>
    </main>
  );
}
