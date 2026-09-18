"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ShadowMaskEffect,
  type ShadowMaskEffectHandle,
  type ShadowMaskSourceFactory,
} from "@/components/ui/shadow-mask-effect";
import { LLM_CONTEXT_TEXT } from "@/data/llm-context";

const OPENAI_PATH =
  "M22.282 9.821a6 6 0 0 0-.516-4.91a6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9a6.05 6.05 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206a6 6 0 0 0 3.997-2.9a6.06 6.06 0 0 0-.747-7.073zm-9.022 12.608a4.475 4.475 0 0 1-2.876-1.041l.142-.08l4.778-2.758a.795.795 0 0 0 .393-.681V9.133l2.02 1.169a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494zm-9.66-4.125a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.758a.771.771 0 0 0 .78 0l5.843-3.368v2.333a.08.08 0 0 1-.033.062l-4.778 2.758a4.499 4.499 0 0 1-6.141-1.646zM2.341 7.896a4.485 4.485 0 0 1 2.365-1.973V11.6a.766.766 0 0 0 .388.677l5.814 3.354l-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.787a4.504 4.504 0 0 1-1.646-6.138zm16.596 3.856l-5.832-3.363l2.015-1.164a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.677 8.104v-5.677a.79.79 0 0 0-.407-.668zm2.01-3.023l-.142-.085l-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.499 4.499 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.499 4.499 0 0 1 7.376-3.454l-.142.08l-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v3l-2.598 1.5l-2.607-1.5z";

const CLAUDE_PATH =
  "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z";

const GEMINI_PATH =
  "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z";

const GROK_PATH =
  "M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.007.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815";

const aiLogosSourceFactory: ShadowMaskSourceFactory = ({ width, height, cssWidth }) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, width, height);

  const paths = [
    new Path2D(OPENAI_PATH),
    new Path2D(CLAUDE_PATH),
    new Path2D(GEMINI_PATH),
    new Path2D(GROK_PATH),
  ];

  const cols = 4;
  const colWidth = width / cols;
  const dpr = width / Math.max(1, cssWidth);
  const iconSize = 24 * dpr;

  paths.forEach((path, i) => {
    const cx = (i + 0.5) * colWidth;
    const cy = height / 2;

    ctx.save();
    ctx.translate(cx, cy);
    const scale = iconSize / 24;
    ctx.scale(scale, scale);
    ctx.translate(-12, -12);
    ctx.fillStyle = "#ffffff";
    ctx.fill(path);
    ctx.restore();
  });

  return canvas;
};

const AI_PROMPT =
  "Please read https://snab.co.in/llm.txt and summarize what SNAB Innovations does, its core services, and products.";

const AI_PLATFORMS = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}`,
    title: "Ask ChatGPT",
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}`,
    title: "Ask Claude",
  },
  {
    name: "Gemini",
    href: `https://gemini.google.com/app?q=${encodeURIComponent(AI_PROMPT)}`,
    title: "Ask Gemini",
  },
  {
    name: "Grok",
    href: `https://grok.com/?q=${encodeURIComponent(AI_PROMPT)}`,
    title: "Ask Grok",
  },
];

function AiChatbotCrtLogos() {
  const effectRef = useRef<ShadowMaskEffectHandle>(null);

  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    effectRef.current?.activateCell(index, { x, y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    effectRef.current?.moveCell(index, { x, y });
  };

  const handlePointerLeave = (index: number) => {
    effectRef.current?.deactivateCell(index);
  };

  return (
    <div className="relative mt-6 w-[200px] sm:w-[220px] h-[36px] sm:h-[40px] flex items-center justify-center md:justify-start">
      {/* CRT Shadow Mask Shader Canvas */}
      <ShadowMaskEffect
        ref={effectRef}
        source={aiLogosSourceFactory}
        cells={{ columns: 4, rows: 1 }}
        cellStyles={[
          { contentWidth: 24, contentHeight: 24 },
          { contentWidth: 24, contentHeight: 24 },
          { contentWidth: 24, contentHeight: 24 },
          { contentWidth: 24, contentHeight: 24 },
        ]}
        continuous={true}
        className="absolute inset-0 pointer-events-none"
        style={{ aspectRatio: "unset" }}
      />

      {/* Interactive Links / Hit areas */}
      <TooltipProvider delayDuration={150}>
        <div className="absolute inset-0 grid grid-cols-4 h-full w-full">
          {AI_PLATFORMS.map((platform, idx) => (
            <Tooltip key={platform.name}>
              <TooltipTrigger asChild>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask ${platform.name} to summarize SNAB Innovations`}
                  onPointerEnter={(e) => handlePointerEnter(e, idx)}
                  onPointerMove={(e) => handlePointerMove(e, idx)}
                  onPointerLeave={() => handlePointerLeave(idx)}
                  onClick={() => effectRef.current?.triggerCell(idx, 1)}
                  className="flex items-center justify-center h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-mono text-xs">
                {platform.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  // 1. Try modern navigator.clipboard
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  // 2. Fallback using invisible textarea
  if (typeof document !== "undefined") {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      console.error("Copy fallback failed:", err);
    }
  }

  return false;
}

function MorphCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await copyTextToClipboard(LLM_CONTEXT_TEXT);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className={`relative z-20 flex items-center justify-center h-[36px] px-5 sm:px-6 rounded-[40px] border backdrop-blur-md cursor-pointer select-none shadow-md transition-all duration-200 ${
        copied
          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10"
          : "bg-white/85 hover:bg-white dark:bg-black/75 dark:hover:bg-black/90 text-foreground border-black/15 dark:border-white/20"
      }`}
    >
      <div className="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {!copied ? (
            <motion.div
              key="icon-copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center text-current"
            >
              <Copy className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="icon-check"
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center text-emerald-500 dark:text-emerald-400"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "context"}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.15 }}
          className="font-bold tracking-tight text-[13px] ml-2.5"
        >
          {copied ? "Copied!" : "Context.MD"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function AskAiSection() {
  return (
    <section
      aria-labelledby="ask-ai-title"
      className="border-b border-dotted border-edge py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10"
    >
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
        {/* Left side - Image with copy button */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md border border-dotted border-edge transition-colors hover:border-foreground/30">
            {/* Dark mode image */}
            <Image
              className="w-full h-auto hidden dark:block"
              src="/ascii-magic-15.webp"
              alt="AI Assistant"
              width={500}
              height={500}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 280px, 400px"
              quality={75}
            />
            {/* Light mode image */}
            <Image
              className="w-full h-auto block dark:hidden"
              src="/ascii-magic-15-light.jpg"
              alt="AI Assistant"
              width={500}
              height={500}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 280px, 400px"
              quality={75}
            />
            {/* Copy button overlay */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <MorphCopyButton />
            </div>
          </div>
        </div>

        {/* Right side - Text content & AI Logos */}
        <div className="flex flex-col justify-center text-center md:text-left items-center md:items-start">
          <TextGenerateEffect
            as="p"
            className="font-mono text-caption tracking-widest text-muted-foreground uppercase"
            staggerDuration={0.05}
          >
            /Ask Your AI
          </TextGenerateEffect>
          <TextGenerateEffect
            as="h2"
            id="ask-ai-title"
            className="mt-3 text-heading font-normal tracking-tight"
            staggerDuration={0.06}
          >
            Feeling fatigue? Ask AI
          </TextGenerateEffect>
          <TextGenerateEffect
            as="p"
            className="mt-4 text-body leading-relaxed text-muted-foreground"
            staggerDuration={0.02}
          >
            Don&apos;t feel like scrolling? Click your favorite AI chatbot below to get an instant summary from our llm.txt, or copy Context.md directly.
          </TextGenerateEffect>

          {/* AI Chatbots (CRT Shadow Mask Phosphor Shader Effect) */}
          <AiChatbotCrtLogos />
        </div>
      </div>
    </section>
  );
}
