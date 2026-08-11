import { WorkSkeleton } from "./WorkSkeleton";

export default function WorkLoading() {
  return (
    <main
      className="min-h-screen bg-background text-foreground"
      aria-busy="true"
      aria-label="Loading work"
    >
      <WorkSkeleton />
      <span className="sr-only">Loading work content…</span>
    </main>
  );
}
