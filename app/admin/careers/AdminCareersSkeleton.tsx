import { Skeleton } from "@/components/ui/skeleton";

export function AdminCareersSkeleton() {
  return (
    <main
      className="min-h-screen bg-background"
      aria-busy="true"
      aria-label="Loading hiring desk"
    >
      <header className="sticky top-0 z-40 border-b border-dotted border-edge bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Skeleton className="h-7 w-28" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-20" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Skeleton className="mb-2 h-3 w-32" />
          <Skeleton className="h-10 w-64" />
        </div>

        <section className="mb-6 grid grid-cols-3 gap-px border border-dotted border-edge bg-edge">
          <Skeleton className="h-24 bg-background" />
          <Skeleton className="h-24 bg-background" />
          <Skeleton className="h-24 bg-background" />
        </section>

        <section className="mb-4 grid grid-cols-[minmax(240px,1fr)_repeat(3,minmax(145px,auto))] gap-2.5">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </section>

        <section className="grid gap-0">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton className="h-16 border-t border-dotted border-edge" key={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
