"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";
import {
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Cloud,
  Server,
  Database,
  Code2,
  Layers,
  Terminal,
  Package,
  Cpu,
  AppWindow,
  Workflow,
  Atom,
} from "lucide-react";

const iconComponents = [
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Cloud,
  Server,
  Database,
  Code2,
  Layers,
  Terminal,
  Package,
  Cpu,
  AppWindow,
  Workflow,
  Atom,
];

export function TechStackCloud() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;
  const foreground = isDark ? "#ffffff" : "#171717";

  const icons = useMemo(
    () =>
      iconComponents.map((Icon, i) => (
        <Icon key={i} size={64} strokeWidth={1.75} color={foreground} />
      )),
    [foreground],
  );

  if (!isInView) {
    return <div ref={ref} className="flex h-full w-full items-center justify-center min-h-[200px]"><div className="h-20 w-20 rounded-full border border-dotted border-edge bg-muted/20" /></div>;
  }

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center">
      <div className="scale-[0.55] sm:scale-75">
        <IconCloud
          key={isDark ? "dark" : "light"}
          icons={icons}
          showControl={false}
        />
      </div>
    </div>
  );
}
