"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
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
  const [foreground, setForeground] = useState("#171717");

  useEffect(() => {
    const fg = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();
    if (fg) {
      setForeground(fg);
    }
  }, [resolvedTheme]);

  const icons = useMemo(
    () =>
      iconComponents.map((Icon, i) => (
        <Icon key={i} size={64} strokeWidth={1.5} color={foreground} />
      )),
    [foreground],
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="scale-[0.55] sm:scale-75">
        <IconCloud icons={icons} showControl={false} />
      </div>
    </div>
  );
}
