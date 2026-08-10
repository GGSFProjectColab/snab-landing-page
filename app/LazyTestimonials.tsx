"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const skeletonCardStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  background: "var(--muted)",
  minHeight: 320,
  borderRadius: 18,
  animation: "skeleton-shimmer 1.55s ease-in-out infinite",
  backgroundImage:
    "linear-gradient(90deg, transparent, color-mix(in srgb, var(--foreground) 6%, transparent), transparent)",
};

function TestimonialsSkeleton() {
  return (
    <div
      className="grid gap-2.5"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", minHeight: 360 }}
      aria-hidden="true"
    >
      <div style={skeletonCardStyle} />
      <div style={skeletonCardStyle} className="hidden sm:block" />
      <div style={skeletonCardStyle} className="hidden md:block" />
    </div>
  );
}

const StaggerTestimonials = dynamic(
  () => import("@/components/ui/stagger-testimonials").then((module) => module.StaggerTestimonials),
  { ssr: false, loading: TestimonialsSkeleton },
);

export function LazyTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return <div ref={ref}>{visible ? <StaggerTestimonials /> : <TestimonialsSkeleton />}</div>;
}
