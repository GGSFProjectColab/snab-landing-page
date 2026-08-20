"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://snab.co.in/blogs/${slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(`"${title}" by @SNABInnovations\n\n`);
    const url = encodeURIComponent(getUrl());
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`*${title}*\n\nRead the article: ${getUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-caption uppercase tracking-wider text-muted-foreground mr-1">Share:</span>
      <button
        type="button"
        onClick={handleCopy}
        className="p-1.5 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
        title="Copy article link"
      >
        {copied ? <Check size={12} className="text-teal" /> : <Copy size={12} />}
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] bg-foreground text-background px-1.5 py-0.5 whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      {/* X / Twitter */}
      <button
        type="button"
        onClick={handleTwitter}
        className="p-1.5 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Share on X"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={handleLinkedIn}
        className="p-1.5 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Share on LinkedIn"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75a1.75 1.75 0 0 1 1.75 1.75c0 .97-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="p-1.5 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Share on WhatsApp"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
        </svg>
      </button>
    </div>
  );
}
