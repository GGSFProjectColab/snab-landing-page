"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  subtitle?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  autoPlayInterval?: number
}

export function FeatureSteps({
  features,
  className,
  autoPlayInterval = 4000,
}: FeatureStepsProps) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)

  const tick = 33
  const increment = (tick / autoPlayInterval) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          setCurrent((c) => (c + 1) % features.length)
          return 0
        }
        return prev + increment
      })
    }, tick)
    return () => clearInterval(timer)
  }, [features.length, autoPlayInterval, increment])

  const handleHover = useCallback((index: number) => {
    setCurrent(index)
    setProgress(0)
  }, [])

  return (
    <div className={cn("border-b border-dotted border-edge md:grid md:grid-cols-[1fr_1px_0.6fr] md:gap-0", className)}>
      {/* Steps — always rendered, order controlled by flex on mobile, grid on desktop */}
      <div className="flex flex-col order-2 md:order-none">
        {features.map((feature, index) => {
          const isActive = index === current

          return (
            <div
              key={index}
              className={cn(
                "border-b border-dotted border-edge last:border-b-0 transition-colors",
                isActive ? "bg-muted/30" : "bg-transparent"
              )}
              onMouseEnter={() => handleHover(index)}
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {feature.step}
                  </span>
                  <h3 className="font-sans text-sm font-semibold tracking-tight sm:text-base">
                    {feature.title}
                  </h3>
                </div>
                {feature.subtitle && (
                  <p className="mt-1 pl-8 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    {feature.subtitle}
                  </p>
                )}
                <p className="mt-1.5 pl-8 text-xs leading-relaxed text-muted-foreground">
                  {feature.content}
                </p>
              </div>

              {/* Progress bar — only visible on active step */}
              {isActive && (
                <div className="h-[2px] w-full bg-muted">
                  <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.03, ease: "linear" }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Divider — hidden on mobile, visible on desktop */}
      <div className="hidden border-dotted border-edge md:block md:border-l" aria-hidden="true" />

      {/* Image — below steps on mobile, side panel on desktop */}
      <div className="relative order-1 h-48 overflow-hidden bg-muted/20 md:order-none md:h-auto md:block">
        <AnimatePresence mode="wait">
          {features.map(
            (feature, index) =>
              index === current && (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title ?? feature.step}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {feature.step}
                    </span>
                    <h3 className="font-sans mt-0.5 text-sm font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
