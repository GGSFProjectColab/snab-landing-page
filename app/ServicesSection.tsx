"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import { CloudShader } from "@/components/ui/cloud-shader";
import FluidOrb from "@/components/ui/fluid-orb";
import { AIWorkflowFlow } from "@/components/ui/ai-workflow-flow";
import { Globe } from "@/components/ui/globe";
import { MobileAppVisual } from "@/components/ui/mobile-app-visual";
import { DesktopAppVisual } from "@/components/ui/desktop-app-visual";
import { CheckCircle2 } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SERVICES as ENRICHED_SERVICES, type Service } from "@/data/services";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Perf safe variants: opacity plus y only, GPU composited, no blur on bullets
const bulletContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.32,
    },
  },
};

const bulletItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: "easeOut" as const },
  },
};

// Single service card: desktop bullets are hidden md:block, mobile untouched
const ServiceCardItem = memo(function ServiceCardItem({
  service,
  isActive,
}: {
  service: Service;
  isActive: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = isActive && !prefersReducedMotion;

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      <div className="grid h-full w-full grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dotted divide-edge overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col justify-start p-3 sm:p-6 lg:p-8 overflow-hidden">
          {/* Title: AI generating blur reveal, retriggers on active change via key - Tier 1: Title */}
          {shouldAnimate ? (
            <TextGenerateEffect
              key={`title-${service.number}`}
              as="h3"
              className="text-base md:text-title font-medium md:font-normal tracking-tight text-foreground"
              staggerDuration={0.08}
              transition={{ duration: 0.45, ease: "easeOut" }}
              filter={true}
            >
              {service.title}
            </TextGenerateEffect>
          ) : (
            <h3 className="text-base md:text-title font-medium md:font-normal tracking-tight text-foreground">
              {service.title}
            </h3>
          )}

          {shouldAnimate ? (
            <TextGenerateEffect
              key={`desc-${service.number}`}
              as="p"
              className="mt-1 md:mt-2 text-xs md:text-body leading-relaxed text-muted-foreground max-w-lg"
              staggerDuration={0.03}
              transition={{ duration: 0.42, ease: "easeOut" }}
              filter={false}
            >
              {service.description}
            </TextGenerateEffect>
          ) : (
            <p className="mt-1 md:mt-2 text-xs md:text-body leading-relaxed text-muted-foreground max-w-lg">
              {service.description}
            </p>
          )}

          {service.highlights && service.highlights.length > 0 && (
            <div className="hidden md:block mt-5 space-y-2">
              <p className="font-mono text-caption font-medium tracking-widest uppercase text-muted-foreground/80">
                Key Highlights
              </p>

              {shouldAnimate ? (
                <motion.div
                  key={`bullets-${service.number}`}
                  initial="hidden"
                  animate="visible"
                  variants={bulletContainerVariants}
                  className="grid gap-1.5"
                >
                  {service.highlights.map((highlight) => (
                    <motion.div
                      key={highlight}
                      variants={bulletItemVariants}
                      className="flex items-start gap-2 text-body leading-snug text-muted-foreground will-change-transform"
                    >
                      <CheckCircle2 size={14} className="mt-1 shrink-0 text-teal" />
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="grid gap-1.5">
                  {service.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-2 text-body leading-snug text-muted-foreground"
                    >
                      <CheckCircle2 size={14} className="mt-1 shrink-0 text-teal" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Visual — controlled: keep mounted, pause offscreen (original behaviour, throttle via paused) */}
        <div className="relative flex h-full w-full items-center justify-center overflow-visible bg-background p-2 sm:p-4 lg:p-6">
          {service.visual === "flow" ? (
            <div className="relative h-full w-full max-h-[250px] sm:max-h-[290px] lg:max-h-[360px] flex items-center justify-center">
              <AIWorkflowFlow expanded={true} paused={!isActive} />
            </div>
          ) : service.visual === "orb" ? (
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <div className="block lg:hidden">
                <FluidOrb size={180} paused={!isActive} />
              </div>
              <div className="hidden lg:block">
                <FluidOrb size={300} paused={!isActive} />
              </div>
            </div>
          ) : service.visual === "mobile" ? (
            <div className="w-full h-full flex items-center justify-center">
              <MobileAppVisual />
            </div>
          ) : service.visual === "desktop" ? (
            <div className="w-full h-full flex items-center justify-center">
              <DesktopAppVisual />
            </div>
          ) : service.visual === "dithering" ? (
            <div className="relative aspect-video w-full max-w-[280px] sm:max-w-none h-[170px] sm:h-[220px] lg:h-[300px] overflow-hidden flex items-center justify-center">
              <CloudShader paused={!isActive} />
            </div>
          ) : service.visual === "globe" ? (
            <div className="relative flex h-full w-full items-center justify-center overflow-visible p-4 sm:p-6">
              <div className="relative flex aspect-square w-full h-auto max-w-[220px] max-h-[220px] sm:max-w-[300px] sm:max-h-[300px] lg:max-w-[360px] lg:max-h-[360px] shrink-0 items-center justify-center overflow-visible">
                <Globe paused={!isActive} className="h-full w-full max-w-none max-h-none" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-1">
              <FluidOrb size={180} paused={!isActive} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Tabs: identical grid styling, now drives carousel API
const GliderTabs = memo(function GliderTabs({
  services,
  activeStep,
  onTabClick,
}: {
  services: Service[];
  activeStep: number;
  onTabClick: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 border-b border-dotted border-edge bg-background">
      {services.map((srv, idx) => {
        const isActive = activeStep === idx;
        const mobileIsLastCol = (idx + 1) % 3 === 0;
        const mobileIsTopRow = idx < 3;
        const desktopIsLastCol = idx === services.length - 1;
        const isDesktopLastColWrapped =
          services.length > 6 && (idx + 1) % 6 === 0;

        return (
          <button
            key={`glider-tab-${srv.number}`}
            type="button"
            onClick={() => onTabClick(idx)}
            aria-current={isActive ? "true" : undefined}
            aria-label={`Show ${srv.title}`}
            className={cn(
              "flex items-center justify-center p-2 sm:py-2.5 lg:py-3",
              "font-mono text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider",
              "transition-colors duration-150 rounded-none cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              !mobileIsLastCol ? "border-r border-dotted border-edge md:border-r-0" : "",
              mobileIsTopRow ? "border-b border-dotted border-edge md:border-b-0" : "",
              !desktopIsLastCol && !isDesktopLastColWrapped
                ? "md:border-r md:border-dotted md:border-edge"
                : "",
              services.length > 6 && idx < 6 ? "md:border-b md:border-dotted md:border-edge lg:border-b-0" : "",
              isActive
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30 bg-transparent"
            )}
          >
            <span className="truncate">{srv.title}</span>
          </button>
        );
      })}
    </div>
  );
});

// ServicesSection: carousel with 5s autoplay, lightweight text animation
export function ServicesSection({ services: initialServices }: { services?: Service[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  const services =
    initialServices && initialServices.length === ENRICHED_SERVICES.length
      ? ENRICHED_SERVICES
      : initialServices || ENRICHED_SERVICES;

  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const onSelect = useCallback(
    (currentApi: CarouselApi) => {
      if (!currentApi) return;
      setActiveStep(currentApi.selectedScrollSnap());
    },
    []
  );

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const handleTabClick = useCallback(
    (idx: number) => {
      api?.scrollTo(idx);
    },
    [api]
  );

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const plugins = prefersReducedMotion ? [] : [autoplayRef.current];

  return (
    <section aria-labelledby="services-title" className="relative w-full">
      <ContainerWrapper>
        <HeaderTitle title="What we deliver" id="services-title" />

        {/* Tabs – drive carousel */}
        <GliderTabs services={services} activeStep={activeStep} onTabClick={handleTabClick} />

        {/* Carousel stage – 5s autoplay, manual only on reduced motion */}
        <div className="relative w-full border-b border-dotted border-edge bg-background group/carousel">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              containScroll: "trimSnaps",
            }}
            plugins={plugins as never}
            setApi={setApi}
            className="w-full"
            onMouseEnter={() => autoplayRef.current.stop()}
            onMouseLeave={() => {
              if (!prefersReducedMotion) autoplayRef.current.play();
            }}
          >
            <CarouselContent className="-ml-0">
              {services.map((service, idx) => (
                <CarouselItem key={`service-card-${service.number}`} className="pl-0 basis-full">
                  <div className="h-[360px] sm:h-[420px] md:h-[calc(100vh-190px)] md:min-h-[480px] md:max-h-[580px] w-full">
                    <ServiceCardItem service={service} isActive={activeStep === idx} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Arrow controls – dotted border theme */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-3">
            <button
              type="button"
              aria-label="Previous service"
              onClick={scrollPrev}
              className="pointer-events-auto inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-dotted border-edge bg-background/90 backdrop-blur shadow-sm text-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next service"
              onClick={scrollNext}
              className="pointer-events-auto inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-dotted border-edge bg-background/90 backdrop-blur shadow-sm text-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom progress + dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
            {services.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                aria-label={`Go to slide ${idx + 1} of ${services.length}`}
                aria-current={activeStep === idx ? "true" : undefined}
                onClick={() => handleTabClick(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 border border-dotted",
                  activeStep === idx
                    ? "w-6 bg-foreground border-foreground"
                    : "w-1.5 bg-background/80 border-edge hover:bg-muted-foreground/40"
                )}
              />
            ))}
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}
