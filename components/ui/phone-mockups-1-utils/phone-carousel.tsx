"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Wifi, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ImageItem {
  src: string;
  alt: string;
}

export interface PhoneCarouselProps {
  images: ImageItem[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function PhoneCarousel({
  images,
  className,
  autoPlay = true,
  autoPlayInterval = 3500,
}: PhoneCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={cn("relative flex flex-col items-center justify-center max-h-full", className)}>
      {/* Phone Hardware Mockup Outer Frame */}
      <div className="relative h-[170px] sm:h-[210px] md:h-[340px] lg:h-[390px] xl:h-[415px] aspect-[9/19] rounded-[22px] sm:rounded-[28px] md:rounded-[36px] lg:rounded-[42px] p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-neutral-950 border-[2px] sm:border-[2.5px] md:border-[3px] lg:border-[3.5px] border-neutral-700 shadow-xl md:shadow-2xl shadow-black/70 ring-1 ring-white/10 shrink-0">
        {/* Hardware side buttons */}
        <div className="absolute -left-[3px] sm:-left-[4px] md:-left-[5px] top-[24%] h-[8%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-l-sm bg-neutral-600" />
        <div className="absolute -left-[3px] sm:-left-[4px] md:-left-[5px] top-[34%] h-[12%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-l-sm bg-neutral-600" />
        <div className="absolute -left-[3px] sm:-left-[4px] md:-left-[5px] top-[48%] h-[12%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-l-sm bg-neutral-600" />
        <div className="absolute -right-[3px] sm:-right-[4px] md:-right-[5px] top-[30%] h-[16%] w-[2px] sm:w-[3px] md:w-[3.5px] rounded-r-sm bg-neutral-600" />

        {/* Phone Screen Inner Container */}
        <div className="relative h-full w-full overflow-hidden rounded-[16px] sm:rounded-[22px] md:rounded-[28px] lg:rounded-[32px] bg-black">
          {/* Status Bar & Dynamic Island */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-2 sm:px-3 md:px-4 pt-1 sm:pt-1.5 md:pt-2 text-white">
            <span className="font-mono text-[7px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-tight">9:41</span>
            {/* Dynamic Island */}
            <div className="h-2.5 sm:h-3.5 md:h-4 lg:h-4.5 w-9 sm:w-14 md:w-16 lg:w-20 rounded-full bg-black ring-1 ring-neutral-800 flex items-center justify-end px-1 sm:px-1.5">
              <div className="h-1 sm:h-1.5 md:h-2 w-1 sm:w-1.5 md:w-2 rounded-full bg-neutral-900 ring-1 ring-blue-900/50" />
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 opacity-90 text-[7px] sm:text-[9px] md:text-[10px]">
              <Wifi className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" />
              <Battery className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
            </div>
          </div>

          {/* Screen Image Slides */}
          <div className="relative h-full w-full">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-in-out",
                  idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Home indicator bar */}
          <div className="absolute bottom-1 md:bottom-1.5 left-1/2 z-30 h-0.5 sm:h-1 md:h-1.5 w-12 sm:w-16 md:w-20 lg:w-24 -translate-x-1/2 rounded-full bg-white/50 backdrop-blur-sm" />
        </div>
      </div>

      {/* Carousel Navigation Buttons & Dots Indicator */}
      <div className="mt-2 sm:mt-2.5 md:mt-3 flex items-center gap-2 sm:gap-2.5 md:gap-3 z-20 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          aria-label="Previous mobile screen"
          className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 rounded-full border-dotted border-edge bg-background/80 hover:bg-muted text-foreground p-0"
        >
          <ChevronLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
        </Button>

        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300",
                idx === currentIndex
                  ? "w-3 sm:w-4 md:w-5 bg-teal"
                  : "w-1 sm:w-1.5 md:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          aria-label="Next mobile screen"
          className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 rounded-full border-dotted border-edge bg-background/80 hover:bg-muted text-foreground p-0"
        >
          <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
        </Button>
      </div>
    </div>
  );
}
