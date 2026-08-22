"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LoaderAnimation } from "@/components/ui/loader-animation";

const MIN_DISPLAY_MS = 2100;
const HARD_CAP_MS = 4000;
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

type Phase = "active" | "exiting" | "unmounted";

function getLenis() {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

export function AppPreloader() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(() =>
    pathname === "/" ? "active" : "unmounted"
  );

  useEffect(() => {
    if (phase !== "active") return;

    const root = document.documentElement;
    root.style.overflow = "hidden";
    getLenis()?.stop();
    document.body.setAttribute("aria-busy", "true");

    let minElapsed = false;
    let loaded = document.readyState === "complete";
    let dismissed = false;

    const dismiss = () => {
      if (dismissed || !minElapsed || !loaded) return;
      dismissed = true;
      setPhase("exiting");
    };

    const minTimer = window.setTimeout(() => {
      minElapsed = true;
      dismiss();
    }, MIN_DISPLAY_MS);

    const capTimer = window.setTimeout(() => {
      minElapsed = true;
      loaded = true;
      dismiss();
    }, HARD_CAP_MS);

    const onLoad = () => {
      loaded = true;
      dismiss();
    };
    if (!loaded) window.addEventListener("load", onLoad);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(capTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "unmounted") return;
    document.documentElement.style.overflow = "";
    getLenis()?.start();
    document.body.removeAttribute("aria-busy");
  }, [phase]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setPhase("unmounted");
      }}
    >
      {phase === "active" && (
        <motion.div
          key="preloader"
          data-preloader=""
          role="status"
          aria-label="Loading SNAB Innovations"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ y: 0 }}
          exit={
            prefersReduced
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { y: "-100%", transition: { duration: 0.7, ease: CURTAIN_EASE } }
          }
        >
          <LoaderAnimation />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppPreloader;
