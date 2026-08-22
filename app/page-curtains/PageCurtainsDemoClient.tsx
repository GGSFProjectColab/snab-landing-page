"use client";

import React, { useState } from "react";
import {
  PageCurtainStage,
  VELOCITY_PAGES,
  type PageItem,
} from "@/components/ui/page-curtain";
import { useTheme } from "next-themes";
import { Copy, Check, Sun, Moon, RotateCcw, Code, Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SNAB_PAGES: PageItem[] = [
  {
    id: "workflows",
    title: "Workflows",
    heading: "Automate complex operations.",
    description:
      "Self-healing agentic pipelines that run high-throughput data processing and document workflows with human oversight.",
    stats: [
      { label: "Active pipelines", value: "2,840", change: "+14.2%", trend: "up" },
      { label: "Execution latency", value: "180ms", change: "-42%", trend: "down" },
      { label: "Success rate", value: "99.98%", change: "+0.1%", trend: "up" },
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    heading: "Reasoning models at the core.",
    description:
      "Purpose-built LLM agents with multi-step planning, tool invocation, and contextual retrieval for mission-critical software.",
    stats: [
      { label: "Model precision", value: "98.4%", change: "+3.6%", trend: "up" },
      { label: "Token efficiency", value: "4.2x", change: "+18%", trend: "up" },
      { label: "Context window", value: "128k", change: "Full", trend: "neutral" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    heading: "Production scale from day one.",
    description:
      "Global edge routing, PostgreSQL BaaS clustering, and zero-downtime releases built for maximum reliability.",
    stats: [
      { label: "Global uptime", value: "99.99%", change: "+0.02%", trend: "up" },
      { label: "P99 Response", value: "32ms", change: "-12ms", trend: "down" },
      { label: "Daily throughput", value: "48.2M", change: "+24%", trend: "up" },
    ],
  },
];

export function PageCurtainsDemoClient() {
  const [tab, setTab] = useState<"preview" | "source">("preview");
  const [copied, setCopied] = useState(false);
  const [preset, setPreset] = useState<"velocity" | "snab">("velocity");
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("npx shadcn@latest add @motion/page-curtains");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pages = preset === "velocity" ? VELOCITY_PAGES : SNAB_PAGES;

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-dotted border-edge">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono bg-teal/10 text-teal border border-teal/20 mb-2">
            <Sparkles className="size-3" />
            Motion UI Component
          </div>
          <h1 className="font-instrument-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
            Slanted Page Curtain Transition
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl">
            GPU-accelerated, direction-aware stage curtain transitions with centered title masking, built for Next.js, Motion, and GSAP.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">PRESET:</span>
          <div className="inline-flex rounded-lg p-1 bg-muted/40 border border-edge text-xs">
            <button
              type="button"
              onClick={() => setPreset("velocity")}
              className={cn(
                "px-2.5 py-1 rounded font-medium transition-colors",
                preset === "velocity"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Velocity (Video)
            </button>
            <button
              type="button"
              onClick={() => setPreset("snab")}
              className={cn(
                "px-2.5 py-1 rounded font-medium transition-colors",
                preset === "snab"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              SNAB Architecture
            </button>
          </div>
        </div>
      </div>

      {/* Frame Container mirroring the exact video preview frame */}
      <div className="rounded-2xl border border-edge bg-card overflow-hidden shadow-2xl">
        {/* Top bar header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0a0a0a] text-white border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={cn(
                "px-2.5 py-1 rounded transition-colors flex items-center gap-1.5",
                tab === "preview"
                  ? "bg-white/15 text-white font-medium"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <Eye className="size-3.5" />
              PREVIEW
            </button>
            <button
              type="button"
              onClick={() => setTab("source")}
              className={cn(
                "px-2.5 py-1 rounded transition-colors flex items-center gap-1.5",
                tab === "source"
                  ? "bg-white/15 text-white font-medium"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <Code className="size-3.5" />
              {"< > SOURCE"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Install CLI command snippet */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-black/60 border border-white/15 text-neutral-300">
              <span className="text-neutral-500">↓</span>
              <code>npx shadcn@latest add @motion/page-curtains</code>
              <button
                type="button"
                onClick={handleCopyCmd}
                title="Copy install command"
                className="text-neutral-400 hover:text-white transition-colors ml-1"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
            </div>

            {/* Theme Toggle inside preview */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* Tab Viewport */}
        {tab === "preview" ? (
          <div className="p-3 sm:p-6 bg-neutral-950/20">
            <PageCurtainStage key={preset} pages={pages} />
          </div>
        ) : (
          <div className="p-4 sm:p-6 bg-[#0a0a0a] text-neutral-200 font-mono text-xs overflow-x-auto">
            <pre className="leading-relaxed">
              <code>{`import { PageCurtainStage } from "@/components/ui/page-curtain";

export default function MyPage() {
  return (
    <PageCurtainStage
      pages={[
        {
          id: "overview",
          title: "Overview",
          heading: "Every drop-off, mapped.",
          description: "Velocity traces each session end to end...",
          stats: [
            { label: "Sessions today", value: "12,480", change: "+6.1%", trend: "up" },
            { label: "Overall conversion", value: "41%", change: "+2.4%", trend: "up" },
            { label: "Alerts open", value: "3", change: "-1", trend: "down" },
          ],
        },
        // ...additional pages
      ]}
    />
  );
}`}</code>
            </pre>
          </div>
        )}

        {/* Bottom meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#0a0a0a] text-neutral-400 border-t border-white/10 font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 uppercase">COMPONENTS USED:</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-200 font-medium">
              PageCurtain
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-200 font-medium">
              SmoothTabs
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-500 hover:text-white transition-colors cursor-pointer">
              INSTALL GUIDE
            </span>
            <div className="flex items-center gap-1">
              <span className="text-neutral-400">MOTIONSCORE</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                A
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
