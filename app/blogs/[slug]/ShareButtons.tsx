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
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-1">Share:</span>
      <button
        type="button"
        onClick={handleCopy}
        className="p-2 border border-dotted border-edge rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
        title="Copy article link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-teal" /> : <Copy className="w-3.5 h-3.5" />}
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded font-medium shadow whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      {/* X / Twitter */}
      <button
        type="button"
        onClick={handleTwitter}
        className="p-2 border border-dotted border-edge rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Share on X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={handleLinkedIn}
        className="p-2 border border-dotted border-edge rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75a1.75 1.75 0 0 1 1.75 1.75c0 .97-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      </button>
    </div>
  );
}
