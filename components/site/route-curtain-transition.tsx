"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

const ROUTE_TITLES: Record<string, string> = {
  "/": "SNAB",
  "/about": "About",
  "/services": "Services",
  "/work": "Work",
  "/careers": "Careers",
  "/careers/apply": "Apply",
  "/blogs": "Blogs",
  "/contact": "Contact",
  "/page-curtains": "Page Curtains",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

const ROUTE_ORDER = [
  "/",
  "/about",
  "/services",
  "/work",
  "/careers",
  "/blogs",
  "/contact",
  "/page-curtains",
];

function getRouteTitle(pathname: string): string {
  const cleanPath = pathname.split("?")[0].split("#")[0];
  if (ROUTE_TITLES[cleanPath]) return ROUTE_TITLES[cleanPath];

  // Derive from first segment: e.g. /blogs/post-1 -> "Blogs"
  const segments = cleanPath.split("/").filter(Boolean);
  if (segments.length > 0) {
    const parentPath = "/" + segments[0];
    if (ROUTE_TITLES[parentPath]) return ROUTE_TITLES[parentPath];
    return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
  }
  return "SNAB";
}

function getRouteDirection(fromPath: string, toPath: string): "forward" | "backward" {
  const fromClean = fromPath.split("?")[0].split("#")[0];
  const toClean = toPath.split("?")[0].split("#")[0];

  const fromIdx = ROUTE_ORDER.indexOf(fromClean);
  const toIdx = ROUTE_ORDER.indexOf(toClean);

  if (fromIdx !== -1 && toIdx !== -1) {
    return toIdx >= fromIdx ? "forward" : "backward";
  }
  return "forward";
}

export function RouteCurtainTransition() {
  const router = useRouter();
  const currentPathname = usePathname();
  const [curtainTitle, setCurtainTitle] = useState("");

  const isNavigatingRef = useRef(false);
  const targetPathRef = useRef<string | null>(null);
  const directionRef = useRef<"forward" | "backward">("forward");
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Trigger phase 2 (exit animation) when the new route has committed
  const startExitTransition = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    const curtain = curtainRef.current;
    const container = containerRef.current;
    if (!curtain || !container) {
      isNavigatingRef.current = false;
      targetPathRef.current = null;
      return;
    }

    const isForward = directionRef.current === "forward";
    const exitTo = isForward ? -130 : 130;

    // Small delay to allow the new page DOM to paint completely
    setTimeout(() => {
      gsap.to(curtain, {
        xPercent: exitTo,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          isNavigatingRef.current = false;
          targetPathRef.current = null;
          if (container) {
            gsap.set(container, { visibility: "hidden" });
          }
        },
      });
    }, 60);
  }, []);

  // Listen to Next.js route commits (pathname changes)
  useEffect(() => {
    if (!isNavigatingRef.current || !targetPathRef.current) return;

    const currentClean = currentPathname.split("?")[0].split("#")[0];
    if (currentClean === targetPathRef.current) {
      startExitTransition();
    }
  }, [currentPathname, startExitTransition]);

  const executeTransition = useCallback(
    (targetHref: string, title: string, direction: "forward" | "backward") => {
      const curtain = curtainRef.current;
      const container = containerRef.current;
      const titleEl = titleRef.current;
      if (!curtain || !container || !titleEl) {
        router.push(targetHref);
        return;
      }

      isNavigatingRef.current = true;
      const targetClean = targetHref.split("?")[0].split("#")[0];
      targetPathRef.current = targetClean;
      directionRef.current = direction;
      setCurtainTitle(title);

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const isForward = direction === "forward";
      const enterFrom = isForward ? 130 : -130;

      // Show container and place curtain off-screen
      gsap.set(container, { visibility: "visible" });
      gsap.set(curtain, {
        xPercent: enterFrom,
        opacity: 1,
      });
      gsap.set(titleEl, { opacity: 1 });

      // Phase 1: Sweep in to cover full screen smoothly (0.55s)
      gsap.to(curtain, {
        xPercent: 0,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          // Screen 100% occluded: trigger router push and scroll to top
          router.push(targetHref);
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });

          // Fallback timer: in case pathname is already identical or route transition takes too long
          if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
          fallbackTimerRef.current = setTimeout(() => {
            if (isNavigatingRef.current) {
              startExitTransition();
            }
          }, 850);
        },
      });
    },
    [router, startExitTransition]
  );

  // Global click interception for internal links
  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      if (e.defaultPrevented || isNavigatingRef.current) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external, anchor hash-only, mailto, tel, downloads, or target="_blank"
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      // Ignore if clicking link to current exact URL without search params
      const currentPath = window.location.pathname;
      const targetPath = href.split("?")[0].split("#")[0];
      if (targetPath === currentPath && !href.includes("?")) {
        return;
      }

      // Intercept and run page curtain transition
      e.preventDefault();
      const title = getRouteTitle(href);
      const direction = getRouteDirection(currentPath, targetPath);
      executeTransition(href, title, direction);
    }

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [executeTransition]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden invisible"
      aria-hidden="true"
    >
      {/* Animated Slanted Curtain - Follows website theme palette (#F7F7F4 light, #14120B dark) */}
      <div
        ref={curtainRef}
        className="absolute inset-y-0 -left-[30vw] -right-[30vw] z-50 pointer-events-none"
        style={{
          transform: "skewX(-7.5deg)",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <div className="relative w-full h-full bg-[#F7F7F4] dark:bg-[#14120B] border-x border-black/15 dark:border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.18)] dark:shadow-[0_0_120px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden transition-colors duration-300">
          {/* Ambient inner curtain gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] dark:from-white/[0.04] via-transparent to-black/[0.05] dark:to-black/60" />

          {/* Unskewed Centered Large Title with theme-adaptive typography */}
          <div
            ref={titleRef}
            style={{ transform: "skewX(7.5deg)" }}
            className="relative z-10 font-instrument-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-normal text-[#14120B] dark:text-white tracking-[-0.03em] leading-none select-none pointer-events-none drop-shadow-xl dark:drop-shadow-2xl text-center px-6 max-w-[90vw] truncate"
          >
            {curtainTitle}
          </div>
        </div>
      </div>
    </div>
  );
}
