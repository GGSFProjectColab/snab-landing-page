"use client";

import Image from "next/image";
import { useState } from "react";

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function AskAiSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await fetch("/llm.txt");
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <section aria-labelledby="ask-ai-title">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
        {/* Left side - Image with copy button */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
            <Image
              className="w-full h-auto"
              src="/ascii-magic-15.png"
              alt="AI Assistant"
              width={500}
              height={500}
              priority
            />
            {/* Copy button overlay */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 border border-white/30 bg-black/50 px-5 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:border-white/50"
              >
                {copied ? "Copied!" : "Context.MD"}
                <CopyIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
            /Ask Your AI
          </p>
          <h2
            id="ask-ai-title"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
          >
            Feeling fatigue?
            <br />
            Ask AI
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Don&apos;t feel like scrolling? Copy Context.md, paste into{" "}
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              ChatGPT
            </a>{" "}
            or{" "}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Claude
            </a>
            , it explains every style, control and export.
          </p>
        </div>
      </div>
    </section>
  );
}
