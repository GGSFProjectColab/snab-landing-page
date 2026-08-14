import { Skeleton } from "@/components/ui/skeleton";
import { ContainerWrapper } from "@/components/site/container";

import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { FeaturedPostSkeleton } from "./FeaturedPostSkeleton";

export default function BlogsLoading() {
  return (
    <main className="flex-1" aria-busy="true" aria-label="Loading blogs">
      <section>
        <ContainerWrapper>
          <div className="py-10 sm:py-14">
            <Skeleton className="h-8 w-24 rounded-sm mb-6" />
            <div className="p-4 sm:p-6">
              <Skeleton className="h-4 w-full max-w-lg rounded-sm mb-2" />
              <Skeleton className="h-4 w-full max-w-md rounded-sm" />
              <div className="mt-6 flex flex-wrap gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} className="h-7 w-16 rounded-sm" />
                ))}
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      <section>
        <ContainerWrapper>
          <div className="p-4 sm:p-6">
            <Skeleton className="h-3 w-16 rounded-sm mb-4" />
            <FeaturedPostSkeleton />
          </div>
        </ContainerWrapper>
      </section>

      

      <section>
        <ContainerWrapper>
          <div className="py-10 sm:py-14">
            <Skeleton className="h-8 w-32 rounded-sm mb-6 mx-4 sm:mx-6" />
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      <section>
        <ContainerWrapper>
          <div className="p-4 py-8 text-center sm:p-6">
            <Skeleton className="h-6 w-64 mx-auto rounded-sm" />
          </div>
        </ContainerWrapper>
      </section>

      <span className="sr-only">Loading blogs content…</span>
    </main>
  );
}
