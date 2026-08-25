"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log to console in dev, send to analytics in prod
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`[web-vitals] ${metric.name}:`, Math.round(metric.value), metric);
    }
    // In production, forward to your analytics endpoint if needed
    // navigator.sendBeacon?.("/api/vitals", JSON.stringify(metric));
    // @ts-expect-error gtag
    if (typeof window !== "undefined" && window.gtag) {
      // @ts-expect-error gtag
      window.gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });
  return null;
}
