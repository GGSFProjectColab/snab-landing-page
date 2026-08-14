import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";


export function HomeSkeleton() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading home page">
      {/* Hero Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[600px] overflow-hidden bg-muted/30">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-12">
              <div className="flex flex-col items-center gap-6 text-center">
                <Skeleton className="h-4 w-48 rounded-sm" />
                <Skeleton className="h-12 w-80 rounded-sm sm:h-14 sm:w-96 md:h-16 md:w-[500px]" />
                <Skeleton className="h-12 w-72 rounded-sm sm:h-14 sm:w-80 md:h-16 md:w-96" />
                <Skeleton className="h-4 w-64 rounded-sm sm:w-80" />
                <Skeleton className="h-4 w-56 rounded-sm sm:w-64" />
                <div className="mt-4 flex gap-4">
                  <Skeleton className="h-12 w-40 rounded-sm" />
                  <Skeleton className="h-12 w-32 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* About snab Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-40 rounded-sm" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="relative min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px]">
              <Skeleton className="h-full w-full rounded-none" />
            </div>
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <Skeleton className="mb-3 h-3 w-20 rounded-sm" />
              <Skeleton className="mb-4 h-6 w-48 rounded-sm sm:h-7 sm:w-56" />
              <Skeleton className="mb-2 h-4 w-full rounded-sm" />
              <Skeleton className="mb-2 h-4 w-full rounded-sm" />
              <Skeleton className="mb-6 h-4 w-3/4 rounded-sm" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Services Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-32 rounded-sm" />
          <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                className={`flex flex-col justify-between p-5 sm:p-6 border-b border-dotted border-edge ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                  i >= 3 ? "md:border-b-0" : ""
                }`}
                key={i}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-3 w-6 rounded-sm" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                  <Skeleton className="mt-4 h-5 w-32 rounded-sm" />
                  <Skeleton className="mt-3 h-3 w-full rounded-sm mb-1.5" />
                  <Skeleton className="h-3 w-3/4 rounded-sm" />
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

      

      {/* Current Work Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-36 rounded-sm" />
          <div className="divide-y divide-dotted divide-edge">
            {[0, 1].map((i) => (
              <div className="p-3 sm:p-4 md:grid md:gap-4 md:grid-cols-[1fr_auto]" key={i}>
                <div className="hidden md:block">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-8 rounded-sm" />
                    <Skeleton className="h-3 w-10 rounded-sm" />
                  </div>
                  <Skeleton className="mt-2 h-5 w-48 rounded-sm" />
                  <div className="mt-2 flex gap-1.5">
                    <Skeleton className="h-4 w-24 rounded-sm" />
                    <Skeleton className="h-4 w-20 rounded-sm" />
                    <Skeleton className="h-4 w-28 rounded-sm" />
                  </div>
                  <Skeleton className="mt-3 h-4 w-full rounded-sm" />
                  <Skeleton className="mt-2 h-3 w-48 rounded-sm" />
                </div>
                <div className="hidden items-center justify-center md:flex">
                  <Skeleton className="h-[200px] w-[200px] rounded-[10px]" />
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Why Choose Us Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-40 rounded-sm" />
          <div className="grid grid-cols-1 border-b border-dotted border-edge sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                className={`group flex flex-col border-b border-dotted border-edge last:border-b-0 sm:border-b-0 ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                  i < 3 ? "md:border-b" : ""
                }`}
                key={i}
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-muted/30 p-6">
                  <Skeleton className="h-full w-full rounded-none" />
                </div>
                <div className="border-t border-dotted border-edge" />
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <Skeleton className="h-5 w-40 rounded-sm sm:h-6" />
                    <Skeleton className="mt-2 h-4 w-full rounded-sm" />
                    <Skeleton className="mt-1 h-4 w-3/4 rounded-sm" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Skeleton className="h-8 w-8 rounded-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Ask Your AI Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-40 rounded-sm" />
          <div className="border border-dotted border-edge p-6 sm:p-8">
            <Skeleton className="h-4 w-48 rounded-sm mb-4" />
            <Skeleton className="h-10 w-full rounded-sm mb-3" />
            <Skeleton className="h-4 w-64 rounded-sm" />
          </div>
        </ContainerWrapper>
      </section>

      

      {/* FAQ Skeleton */}
      <section>
        <ContainerWrapper>
          <Skeleton className="mb-6 h-8 w-16 rounded-sm" />
          <div className="divide-y divide-dotted divide-edge">
            {Array.from({ length: 5 }, (_, i) => (
              <div className="p-3 sm:p-4" key={i}>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-3 w-5 rounded-sm" />
                  <Skeleton className="h-4 w-3/4 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Contact CTA Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 py-8 px-5 sm:justify-end sm:py-10 sm:px-6 md:px-12">
              <Skeleton className="h-6 w-48 rounded-sm sm:h-7 sm:w-56" />
              <Skeleton className="h-4 w-64 rounded-sm sm:w-80" />
              <Skeleton className="h-4 w-56 rounded-sm sm:w-64" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-2">
                <Skeleton className="h-10 w-36 rounded-sm" />
                <Skeleton className="h-4 w-48 rounded-sm" />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Tagline Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="p-3 py-8 text-center sm:p-4">
            <Skeleton className="mx-auto h-6 w-80 rounded-sm sm:h-8 sm:w-96" />
          </div>
        </ContainerWrapper>
      </section>

      <span className="sr-only">Loading home page content…</span>
    </main>
  );
}
