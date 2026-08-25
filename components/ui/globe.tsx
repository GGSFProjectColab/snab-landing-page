"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  // --- full globe guarantees: scale 1 + centered offset + fully opaque ---
  scale: 1,
  offset: [0, 0],
  opacity: 1,
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  paused = false,
}: {
  className?: string
  config?: COBEOptions
  paused?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return
    // Respect reduced motion — show static full globe without animation loop
    const prefersReducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedNow) {
      requestAnimationFrame(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1"
      })
      return
    }
    const shouldIdle = paused

    const onResize = () => {
      if (canvasRef.current) {
        // Keep globe fully round: use the smaller side so canvas stays square
        const rect = canvasRef.current.getBoundingClientRect()
        const size = Math.min(rect.width, rect.height) || canvasRef.current.offsetWidth
        widthRef.current = size > 0 ? size : 280
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    // Clamp DPR for performance, *2 in official is 2x; we clamp to 1.5 on low-end but keep 2 for full detail
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const shouldPause = prefersReducedNow || shouldIdle

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      // Explicit full-globe settings — scale 1 + offset 0,0 centers globe in canvas (full, not half)
      scale: (config as unknown as { scale?: number }).scale ?? 1,
      offset: (config as unknown as { offset?: [number, number] }).offset ?? [0, 0],
      width: widthRef.current * dpr,
      height: widthRef.current * dpr,
      onRender: (state) => {
        if (!shouldPause && !pointerInteracting.current) phiRef.current += 0.005
        state.phi = phiRef.current + rs.get()
        // Sync canvas size each frame — ensures full globe after resize without recreate
        state.width = widthRef.current * dpr
        state.height = widthRef.current * dpr
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config, paused])

  return (
    <div
      className={cn(
        // Full globe container: centered square, not cropped hemispherical
        // Use relative flex when embedded (DevOps card), absolute when caller passes absolute inset-0
        "relative mx-auto flex aspect-square h-full w-full max-w-[520px] max-h-full items-center justify-center overflow-visible",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size] block object-contain"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
