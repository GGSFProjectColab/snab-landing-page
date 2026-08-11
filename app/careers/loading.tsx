import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";

export default function CareersLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground" aria-busy="true" aria-label="Loading careers">
      {/* Hero Skeleton */}
      <section className="pt-6 pb-8">
        <ContainerWrapper>
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-4 w-2 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
          </div>

          {/* Large heading skeleton */}
          <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-64 sm:w-80 rounded" />
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* Team Section Skeleton */}
      <section className="py-12 md:py-16">
        <ContainerWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
            <Skeleton className="h-16 sm:h-20 w-full max-w-md rounded" />
            <div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-3/4 rounded mb-4" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
          </div>
          <Skeleton className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-lg" />
        </ContainerWrapper>
      </section>

      <div className="h-8 border-y border-dotted border-edge section-dot-grid" />

      {/* Roles Section Skeleton */}
      <section className="py-12 md:py-16">
        <ContainerWrapper>
          <div className="text-center mb-8">
            <Skeleton className="h-10 sm:h-12 w-80 sm:w-96 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                className="flex flex-col p-5 sm:p-6 border border-dotted border-edge rounded-lg bg-white/[0.02]"
                key={i}
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
        </ContainerWrapper>
      </section>

      <span className="sr-only">Loading careers content…</span>
    </main>
  );
}
