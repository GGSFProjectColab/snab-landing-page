"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import CloudSky from "@/components/originkit/ui/cloud-sky";

export default function HeroCloudBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [running, setRunning] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const runningRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const heroSection = el.closest("section") ?? el;
    let heroVisible = true;
    let pastServices = false;
    let ticking = false;

    const setNext = (next: boolean) => {
      if (runningRef.current === next) return;
      runningRef.current = next;
      setRunning(next);
    };

    const update = () => {
      ticking = false;
      if (document.hidden) {
        setNext(false);
        return;
      }
      setNext(heroVisible && !pastServices);
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const checkPastServices = () => {
      const anchor =
        document.getElementById("services-title") ??
        document.getElementById("services");
      const servicesSection = anchor?.closest("section") ?? anchor;
      if (!servicesSection) {
        pastServices = false;
        return;
      }
      // Off once the whole "What we deliver" section has scrolled above the viewport
      pastServices = servicesSection.getBoundingClientRect().bottom < 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        requestUpdate();
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );
    io.observe(heroSection);

    const onScroll = () => {
      checkPastServices();
      requestUpdate();
    };

    checkPastServices();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", requestUpdate);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", requestUpdate);
    };
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const fallback = isDark ? "#0B1D3A" : "#0075FF";
  const active = mounted && running;

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{ background: fallback }}
      aria-hidden="true"
    >
      {active ? (
        <CloudSky
          background={isDark ? "#0B1D3A" : "#0075FF"}
          baseColor={isDark ? "#27436B" : "#B4D2F0"}
          accentColor="#FFFFFF"
          density={100}
          speed={24}
          size={130}
          clouds={{ cirrus: 0 }}
          pointer={{ parallax: 0, wind: 0 }}
          style={{
            position: "absolute",
            inset: 0,
            minWidth: 0,
            minHeight: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : null}
      {/* Readability scrims — keep hero text legible over animated clouds */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
    </div>
  );
}
