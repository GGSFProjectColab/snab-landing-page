"use client";

import { useState } from "react";

interface LaptopVideoMockupProps {
  youtubeId: string;
  title: string;
  description?: string;
  productName?: string;
}

export function LaptopVideoMockup({
  youtubeId,
  title,
  description,
  productName,
}: LaptopVideoMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── 3D Realistic Laptop Device Frame ──────────────────────── */}
      <div
        className="group relative w-full max-w-4xl transition-all duration-500 ease-out cursor-default select-none"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic Ambient Screen Glow behind Laptop (Fixed scale, no zoom) */}
        <div
          className={`pointer-events-none absolute -inset-6 sm:-inset-10 rounded-[40px] bg-gradient-to-r from-teal/20 via-sky-500/15 to-emerald-500/20 blur-3xl transition-opacity duration-700 ${
            isHovered ? "opacity-75" : "opacity-45"
          }`}
          aria-hidden="true"
        />

        {/* ── Laptop Container (No zoom effect on hover) ── */}
        <div
          className={`relative transition-transform duration-500 ease-out will-change-transform ${
            isHovered ? "-translate-y-1.5" : "translate-y-0"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ── 1. LAPTOP LID / DISPLAY SCREEN ───────────────────────── */}
          <div className="relative rounded-t-2xl sm:rounded-t-[32px] border border-neutral-600/70 dark:border-neutral-700/80 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 p-2 sm:p-3.5 pb-2 sm:pb-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
            {/* CNC Aluminum Outer Bezel Highlight */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-[32px]"
              aria-hidden="true"
            />

            {/* Top Camera Notch & Sensors Bar */}
            <div className="relative flex items-center justify-between px-3 sm:px-6 pb-2 pt-0.5 sm:pt-1">
              {/* Window Controls Dot Mimic (Mac Style left accent) */}
              <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500/80 shadow-sm" />
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-yellow-500/80 shadow-sm" />
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500/80 shadow-sm" />
              </div>

              {/* Center HD Camera Module */}
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-neutral-950 border border-neutral-700 shadow-inner">
                  {/* Camera multi-coated glass iris */}
                  <span className="h-1 w-1 rounded-full bg-neutral-900 ring-1 ring-sky-900/60" />
                  {/* Ambient Light Sensor Dot */}
                  <span
                    className={`absolute -right-2.5 h-1 w-1 rounded-full transition-all duration-300 ${
                      isHovered ? "bg-teal shadow-[0_0_6px_#14b8a6]" : "bg-teal/40"
                    }`}
                  />
                </div>
              </div>

              {/* Right Studio Micro Badge */}
              <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-neutral-400/70">
                <span className="h-1 w-1 rounded-full bg-neutral-500" />
                <span className="hidden sm:inline">1080P PRO</span>
              </div>
            </div>

            {/* ── Screen Display Area (Glass with 16:9 Iframe) ── */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl border border-neutral-800/90 bg-black shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">
              {/* YouTube Video Player */}
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />

              {/* Realistic Glass Screen Glare Reflection Overlay */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07] transition-opacity duration-700 ${
                  isHovered ? "opacity-80" : "opacity-40"
                }`}
                aria-hidden="true"
              />
            </div>

            {/* Bottom Display Chin - Only product name, no "SNAB STUDIO DISPLAY" */}
            <div className="flex items-center justify-center pt-1.5 pb-0.5">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-medium select-none">
                {productName || "WORKFLOW DEMO"}
              </span>
            </div>
          </div>

          {/* ── 2. RECESSED DISPLAY HINGE ────────────────────────────── */}
          <div className="relative -mt-0.5 mx-auto w-[92%] h-1 sm:h-1.5 bg-neutral-950 border-x border-neutral-800 shadow-inner" />

          {/* ── 3. LAPTOP LOWER CHASSIS & KEYBOARD DECK ──────────────── */}
          <div className="relative -mt-0.5 w-[103%] -ml-[1.5%]">
            {/* CNC Aluminum Unibody Lip & Front Deck */}
            <div className="h-4 sm:h-5.5 w-full rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-850 border-x border-b border-neutral-600/80 shadow-[0_12px_24px_rgba(0,0,0,0.7)] flex items-start justify-center relative overflow-hidden">
              {/* Metallic top specular line along chassis rim */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden="true"
              />

              {/* Machined Center Thumb Scoop (Opening Notch) */}
              <div className="w-24 sm:w-36 h-2 sm:h-2.5 rounded-b-lg bg-neutral-950/95 border-b border-neutral-500/40 shadow-inner flex items-center justify-center">
                <div className="w-12 sm:w-16 h-[1px] bg-neutral-700/60 rounded-full" />
              </div>

              {/* Subtle trackpad outline indication on deck */}
              <div
                className="pointer-events-none absolute bottom-0.5 w-32 sm:w-48 h-1 rounded-t border-t border-neutral-500/20"
                aria-hidden="true"
              />
            </div>

            {/* Non-slip Rubber Feet (left & right bottom) */}
            <div className="flex justify-between px-8 sm:px-14 -mt-0.5">
              <span className="h-1 w-6 sm:w-8 rounded-full bg-neutral-950/80 shadow-sm" />
              <span className="h-1 w-6 sm:w-8 rounded-full bg-neutral-950/80 shadow-sm" />
            </div>

            {/* Multi-layered Realistic Ambient Contact Shadow underneath Laptop (Fixed scale, no zoom) */}
            <div
              className={`mx-auto w-[92%] h-4 sm:h-6 bg-black/60 blur-lg rounded-full transition-opacity duration-700 -mt-1.5 ${
                isHovered ? "opacity-90 blur-xl" : "opacity-70"
              }`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
