import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";

export default function CareersLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground" aria-busy="true" aria-label="Loading careers">
      {/* Hero Skeleton */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Skeleton className="h-4 w-12 rounded-sm" />
            <Skeleton className="h-4 w-2 rounded-sm" />
            <Skeleton className="h-4 w-14 rounded-sm" />
          </div>
          <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-64 sm:w-80 mx-auto rounded-sm" />
        </div>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* Team Section Skeleton */}
      <section className="py-12 md:py-16">
        <ContainerWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Skeleton className="h-16 sm:h-20 w-full max-w-md rounded-sm" />
            <div className="lg:pt-1">
              <Skeleton className="h-4 w-full rounded-sm mb-2" />
              <Skeleton className="h-4 w-full rounded-sm mb-2" />
              <Skeleton className="h-4 w-3/4 rounded-sm" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* Roles Section Skeleton */}
      <section className="py-12 md:py-16">
        <ContainerWrapper>
          <div className="text-center mb-10">
            <Skeleton className="h-10 sm:h-12 w-80 sm:w-96 mx-auto rounded-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                className="flex flex-col p-6 border border-dotted border-edge bg-white/[0.02]"
                key={i}
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
        </ContainerWrapper>
      </section>

      <span className="sr-only">Loading careers content…</span>
    </main>
  );
}
