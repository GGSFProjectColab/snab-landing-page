import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";

import { RolesSkeleton } from "./RolesSkeleton";

export default function CareersLoading() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading careers">
      {/* Hero Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="relative py-16 md:py-24 overflow-hidden">
            <div className="relative z-10 text-center">
              <nav className="flex items-center justify-center gap-2 mb-6" aria-label="Loading breadcrumb">
                <Skeleton className="h-4 w-12 rounded-sm" />
                <Skeleton className="h-4 w-2 rounded-sm" />
                <Skeleton className="h-4 w-14 rounded-sm" />
              </nav>
              <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-64 sm:w-80 mx-auto rounded-sm" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Meet the Team Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="h-10 flex items-center border-b border-dotted border-edge px-2">
            <Skeleton className="h-5 w-40 rounded-sm" />
          </div>
          <div className="p-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <Skeleton className="h-16 sm:h-20 w-full max-w-md rounded-sm" />
              <div className="lg:pt-1">
                <Skeleton className="h-4 w-full rounded-sm mb-2" />
                <Skeleton className="h-4 w-full rounded-sm mb-2" />
                <Skeleton className="h-4 w-3/4 rounded-sm" />
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Open Roles Skeleton */}
      <section>
        <ContainerWrapper>
          <div className="h-10 flex items-center border-b border-dotted border-edge px-2">
            <Skeleton className="h-5 w-36 rounded-sm" />
          </div>
          <div className="p-4 pb-8">
            <RolesSkeleton />

            {/* General Application CTA Skeleton */}
            <div className="mt-6 p-5 border border-dotted border-edge bg-white/[0.015] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <Skeleton className="h-4 w-40 rounded-sm mb-2" />
                <Skeleton className="h-3 w-64 rounded-sm" />
              </div>
              <Skeleton className="h-9 w-44 rounded-sm shrink-0" />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      <span className="sr-only">Loading careers content…</span>
    </main>
  );
}
