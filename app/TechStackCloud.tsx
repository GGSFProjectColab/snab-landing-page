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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  return (
    <div className="flex h-full w-full items-center justify-center">
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
