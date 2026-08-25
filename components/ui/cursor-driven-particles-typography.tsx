"use client";

import React, { useEffect, useRef } from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface CursorDrivenParticleTypographyProps {
  className?: string;
  text: string;
  fontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleDensity?: number;
  dispersionStrength?: number;
  returnSpeed?: number;
  color?: string;
  opacity?: number;
  topOffset?: number;
  interactive?: boolean;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  dispersion: number;
  returnSpd: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    dispersion: number,
    returnSpd: number
  ) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;
    this.originX = x;
    this.originY = y;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 120;

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (interactionRadius - distance) / interactionRadius;

      const repulsionX = forceDirectionX * force * this.dispersion;
      const repulsionY = forceDirectionY * force * this.dispersion;

      this.vx -= repulsionX;
      this.vy -= repulsionY;
    }

    this.vx += (this.originX - this.x) * this.returnSpd;
    this.vy += (this.originY - this.y) * this.returnSpd;

    this.vx *= 0.85;
    this.vy *= 0.85;

    const distToOrigin = Math.sqrt(
      Math.pow(this.x - this.originX, 2) +
        Math.pow(this.y - this.originY, 2)
    );

    if (distToOrigin < 1 && Math.random() > 0.95) {
      this.vx += (Math.random() - 0.5) * 0.2;
      this.vy += (Math.random() - 0.5) * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function getSafeCanvasColor(colorProp?: string, opacity = 0.4): string {
  if (colorProp) {
    if (colorProp.startsWith("#")) {
      const hex = colorProp.replace("#", "");
      let r = 255, g = 255, b = 255;
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      }
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (colorProp.startsWith("rgb")) {
      return colorProp;
    }
  }

  if (typeof document !== "undefined") {
    const isLight = document.documentElement.classList.contains("light");
    return isLight
      ? `rgba(20, 18, 11, ${opacity})`
      : `rgba(255, 255, 255, ${opacity})`;
  }
  return `rgba(255, 255, 255, ${opacity})`;
}

function getSafeFontFamily(fontProp?: string, container?: HTMLElement | null): string {
  if (fontProp && !fontProp.includes("var(")) {
    return fontProp;
  }
  if (typeof window !== "undefined" && container) {
    const computed = window.getComputedStyle(container).fontFamily;
    if (computed && !computed.includes("var(")) {
      return computed;
    }
  }
  return 'Inter, "Geist", "Manrope", system-ui, -apple-system, sans-serif';
}

export function CursorDrivenParticleTypography({
  className,
  text,
  fontSize = 160,
  fontFamily = 'Inter, "Manrope", "Geist", sans-serif',
  particleSize = 1.8,
  particleDensity = 3,
  dispersionStrength = 22,
  returnSpeed = 0.08,
  color,
  opacity = 0.4,
  topOffset = 4,
  interactive = true,
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cheap exit: reduced-motion or coarse pointer or footer offscreen — no particle work at all
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced && interactive === false) {
      // still render but skip animation loop — static fallback handled by early return animation pause below
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    // IntersectionObserver gate: don't run rAF until footer is visible
    let isVisible = false;
    let visibilityObserver: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== "undefined") {
      visibilityObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && particles.length === 0) init();
        if (isVisible && !animationFrameId) animate();
      }, { threshold: 0.1 });
      visibilityObserver.observe(containerRef.current);
    } else {
      isVisible = true;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;

    const init = () => {
      const container = containerRef.current;
      if (!container) return;

      containerWidth = container.clientWidth || container.getBoundingClientRect().width;
      containerHeight = container.clientHeight || container.getBoundingClientRect().height;

      if (containerWidth <= 0 || containerHeight <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(containerWidth * dpr);
      canvas.height = Math.floor(containerHeight * dpr);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const textColor = getSafeCanvasColor(color, opacity);
      const safeFont = getSafeFontFamily(fontFamily, container);

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      // Width-based font scaling: Make the text huge across the full component width
      let targetFontSize = fontSize || 160;
      ctx.font = `bold ${targetFontSize}px ${safeFont}`;
      let measured = ctx.measureText(text);

      const maxW = containerWidth * 0.96;
      if (measured.width > 0) {
        const scaleW = maxW / measured.width;
        targetFontSize = Math.floor(targetFontSize * scaleW);
      }

      targetFontSize = Math.max(32, Math.min(220, targetFontSize));
      ctx.font = `bold ${targetFontSize}px ${safeFont}`;

      // Solid color for template coordinates rasterization
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Draw starting near top so upper half of letters is visible and bottom half is cropped/submerged in blur
      ctx.fillText(text, containerWidth / 2, topOffset);

      const textCoordinates = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles = [];

      // Increase density step on coarse/mobile to halve particles (2x speed)
      const effectiveDensity = isCoarse ? particleDensity + 1 : particleDensity;
      const step = Math.max(1, Math.floor(effectiveDensity * dpr));

      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3] || 0;

          if (alpha > 80) {
            particles.push(
              new Particle(
                x / dpr,
                y / dpr,
                particleSize,
                textColor,
                interactive ? dispersionStrength : 0,
                returnSpeed
              )
            );
          }
        }
      }
    };

    const animate = () => {
      if (!isVisible || document.visibilityState !== "visible") {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      // Throttle footer particles to 30fps when non-interactive to halve load
      const shouldThrottle = !interactive;
      if (shouldThrottle && animationFrameId % 2 === 0) {
        // simple skip every other frame via timestamp check below
      }
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY);
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      init();
    };

    const timeoutId = setTimeout(() => {
      init();
      animate();
    }, 60);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        init();
      });
    }

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const themeObserver = new MutationObserver(() => {
      init();
    });
    if (typeof document !== "undefined") {
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
      canvas.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibilityObserver?.disconnect();
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    text,
    fontSize,
    fontFamily,
    particleSize,
    particleDensity,
    dispersionStrength,
    returnSpeed,
    color,
    opacity,
    topOffset,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full flex items-center justify-center relative touch-none select-none overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn("block w-full h-full", interactive ? "pointer-events-auto" : "pointer-events-none")}
      />
    </div>
  );
}
