"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface TeamMember {
  id: "sanika" | "bhavesh" | "aaradhya" | "nimesh";
  name: string;
  shortName: string;
  linkedin: string;
  targetX: number; // percentage from left
  targetY: number; // percentage from top (head position)
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sanika",
    name: "Sanika Wadnerkar",
    shortName: "Sanika",
    linkedin: "https://www.linkedin.com/in/sanika-wadnerkar-728068267/",
    targetX: 19,
    targetY: 37,
  },
  {
    id: "bhavesh",
    name: "Bhavesh Patil",
    shortName: "Bhavesh",
    linkedin: "https://www.linkedin.com/in/bhavesh-paatil/",
    targetX: 37,
    targetY: 27,
  },
  {
    id: "nimesh",
    name: "Nimesh Kulkarni",
    shortName: "Nimesh",
    linkedin: "https://www.linkedin.com/in/nimesh-kulkarni-526401266/",
    targetX: 55,
    targetY: 29,
  },
  {
    id: "aaradhya",
    name: "Aaradhya Pathak",
    shortName: "Aaradhya",
    linkedin: "https://www.linkedin.com/in/aaradhyapathak17/",
    targetX: 77,
    targetY: 19,
  },
];

export function TeamInteractiveSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
      {/* Left: Our Core Team & Vision */}
      <div className="flex flex-col justify-center gap-4">
        <TextGenerateEffect
          as="h2"
          className="text-title font-normal text-foreground leading-snug"
          staggerDuration={0.09}
          transition={{ duration: 0.55 }}
        >
          Our Core Team & Vision
        </TextGenerateEffect>

        {/* Desktop Narrative */}
        <div className="hidden md:flex flex-col gap-3">
          <TextGenerateEffect
            as="p"
            className="text-body leading-relaxed text-muted-foreground"
            staggerDuration={0.045}
            transition={{ duration: 0.55 }}
          >
            At the heart of SNAB Innovations is a dedicated team of four core engineers and product builders:{" "}
            <Link
              href="https://www.linkedin.com/in/sanika-wadnerkar-728068267/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId("sanika")}
              onMouseLeave={() => setHoveredId(null)}
              className={`font-medium underline underline-offset-4 decoration-dotted transition-all duration-200 ${
                hoveredId === "sanika"
                  ? "text-yellow-600 dark:text-emerald-300 decoration-solid decoration-yellow-500 dark:decoration-emerald-400"
                  : "text-foreground decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:text-yellow-600 dark:hover:text-emerald-300 hover:decoration-solid"
              }`}
            >
              Sanika Wadnerkar ↗
            </Link>
            {", "}
            <Link
              href="https://www.linkedin.com/in/bhavesh-paatil/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId("bhavesh")}
              onMouseLeave={() => setHoveredId(null)}
              className={`font-medium underline underline-offset-4 decoration-dotted transition-all duration-200 ${
                hoveredId === "bhavesh"
                  ? "text-yellow-600 dark:text-emerald-300 decoration-solid decoration-yellow-500 dark:decoration-emerald-400"
                  : "text-foreground decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:text-yellow-600 dark:hover:text-emerald-300 hover:decoration-solid"
              }`}
            >
              Bhavesh Patil ↗
            </Link>
            {", "}
            <Link
              href="https://www.linkedin.com/in/aaradhyapathak17/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId("aaradhya")}
              onMouseLeave={() => setHoveredId(null)}
              className={`font-medium underline underline-offset-4 decoration-dotted transition-all duration-200 ${
                hoveredId === "aaradhya"
                  ? "text-yellow-600 dark:text-emerald-300 decoration-solid decoration-yellow-500 dark:decoration-emerald-400"
                  : "text-foreground decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:text-yellow-600 dark:hover:text-emerald-300 hover:decoration-solid"
              }`}
            >
              Aaradhya Pathak ↗
            </Link>
            {", and "}
            <Link
              href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId("nimesh")}
              onMouseLeave={() => setHoveredId(null)}
              className={`font-medium underline underline-offset-4 decoration-dotted transition-all duration-200 ${
                hoveredId === "nimesh"
                  ? "text-yellow-600 dark:text-emerald-300 decoration-solid decoration-yellow-500 dark:decoration-emerald-400"
                  : "text-foreground decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:text-yellow-600 dark:hover:text-emerald-300 hover:decoration-solid"
              }`}
            >
              Nimesh Kulkarni ↗
            </Link>
            . Operating from our studio in Nashik, Maharashtra, we combine deep multidisciplinary expertise across machine learning pipelines, distributed software architecture, user experience design, and scalable full-stack engineering to build dependable systems that endure.
          </TextGenerateEffect>
          <TextGenerateEffect
            as="p"
            className="text-body leading-relaxed text-muted-foreground"
            staggerDuration={0.045}
            transition={{ duration: 0.55 }}
          >
            Driven by a bold vision to scale globally and{" "}
            <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">
              make India truly AI-enabled
            </mark>
            , we{" "}
            <Link
              href="/contact"
              className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors"
            >
              partner with startups and enterprises ↗
            </Link>{" "}
            to deliver{" "}
            <span className="text-foreground underline underline-offset-4 decoration-yellow-500/60 dark:decoration-emerald-400/70 font-medium">
              accessible, production-ready AI infrastructure
            </span>{" "}
            and resilient software built to accelerate long-term growth.
          </TextGenerateEffect>
        </div>

        {/* Mobile Narrative */}
        <div className="md:hidden">
          <TextGenerateEffect
            as="p"
            className="text-[14px] leading-relaxed text-muted-foreground"
            staggerDuration={0.045}
            transition={{ duration: 0.55 }}
          >
            Led by{" "}
            <Link
              href="https://www.linkedin.com/in/sanika-wadnerkar-728068267/"
              target="_blank"
              rel="noopener noreferrer"
              onTouchStart={() => setHoveredId("sanika")}
              className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors"
            >
              Sanika Wadnerkar ↗
            </Link>
            {", "}
            <Link
              href="https://www.linkedin.com/in/bhavesh-paatil/"
              target="_blank"
              rel="noopener noreferrer"
              onTouchStart={() => setHoveredId("bhavesh")}
              className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors"
            >
              Bhavesh Patil ↗
            </Link>
            {", "}
            <Link
              href="https://www.linkedin.com/in/aaradhyapathak17/"
              target="_blank"
              rel="noopener noreferrer"
              onTouchStart={() => setHoveredId("aaradhya")}
              className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors"
            >
              Aaradhya Pathak ↗
            </Link>
            {", and "}
            <Link
              href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/"
              target="_blank"
              rel="noopener noreferrer"
              onTouchStart={() => setHoveredId("nimesh")}
              className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors"
            >
              Nimesh Kulkarni ↗
            </Link>{" "}
            from Nashik, India, our team is driven to scale globally,{" "}
            <mark className="bg-yellow-300/70 text-stone-900 dark:bg-emerald-500/20 dark:text-emerald-200 dark:border dark:border-emerald-400/35 px-1.5 py-0.5 rounded-[3px] font-medium">
              make India AI-enabled
            </mark>
            , and{" "}
            <Link
              href="/contact"
              className="text-foreground font-medium underline underline-offset-4 decoration-dotted decoration-yellow-500/70 dark:decoration-emerald-400/80 hover:decoration-solid hover:text-yellow-600 dark:hover:text-emerald-300 transition-colors"
            >
              empower startups with production-ready technology ↗
            </Link>
            .
          </TextGenerateEffect>
        </div>
      </div>

      {/* Right: Team Image with Dotted Hover Pointer Overlay */}
      <div className="flex items-center justify-center">
        <div
          className="relative w-full overflow-hidden select-none group"
          style={{ maxWidth: "600px", aspectRatio: "1179 / 824" }}
        >
          <Image
            src="/about-team.jpeg"
            alt="SNAB Innovations core team: Sanika Wadnerkar, Bhavesh Patil, Aaradhya Pathak, and Nimesh Kulkarni"
            fill
            className="object-contain object-center transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 600px"
          />

          {/* Interactive Hover Dotted Arrow & Name Tag Overlay */}
          {TEAM_MEMBERS.map((member) => {
            const isHovered = hoveredId === member.id;
            return (
              <div
                key={member.id}
                style={{
                  left: `${member.targetX}%`,
                  top: `${member.targetY}%`,
                }}
                className={`absolute pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-300 ease-out z-20 ${
                  isHovered
                    ? "opacity-100 scale-100 -translate-y-[10px]"
                    : "opacity-0 scale-90 translate-y-0"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  {/* Name Tag Pill with subtle glow */}
                  <div className="px-2 py-0.5 rounded-[4px] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap shadow-md bg-yellow-300/95 text-stone-950 border border-yellow-400 dark:bg-emerald-950/95 dark:text-emerald-200 dark:border-emerald-500/60 backdrop-blur-sm">
                    {member.shortName}
                  </div>

                  {/* Dotted Arrow pointing down to the person */}
                  <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    fill="none"
                    className="overflow-visible text-yellow-500 dark:text-emerald-400 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-pulse"
                  >
                    {/* Dotted stem */}
                    <line
                      x1="11"
                      y1="0"
                      x2="11"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                      strokeLinecap="round"
                    />
                    {/* Downward pointing arrowhead */}
                    <path
                      d="M5 15 L11 23 L17 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}

          {/* Interactive hover hotspots directly over each teammate in the photo */}
          <div
            className="absolute top-0 left-0 w-[28%] h-full cursor-pointer z-10"
            onMouseEnter={() => setHoveredId("sanika")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => window.open(TEAM_MEMBERS[0].linkedin, "_blank")}
            title="Sanika Wadnerkar (LinkedIn)"
          />
          <div
            className="absolute top-0 left-[28%] w-[20%] h-full cursor-pointer z-10"
            onMouseEnter={() => setHoveredId("bhavesh")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => window.open(TEAM_MEMBERS[1].linkedin, "_blank")}
            title="Bhavesh Patil (LinkedIn)"
          />
          <div
            className="absolute top-0 left-[48%] w-[20%] h-full cursor-pointer z-10"
            onMouseEnter={() => setHoveredId("nimesh")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => window.open(TEAM_MEMBERS[2].linkedin, "_blank")}
            title="Nimesh Kulkarni (LinkedIn)"
          />
          <div
            className="absolute top-0 left-[68%] w-[32%] h-full cursor-pointer z-10"
            onMouseEnter={() => setHoveredId("aaradhya")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => window.open(TEAM_MEMBERS[3].linkedin, "_blank")}
            title="Aaradhya Pathak (LinkedIn)"
          />
        </div>
      </div>
    </div>
  );
}
