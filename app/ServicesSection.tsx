"use client";

import { memo, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);



export type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  image: string | null;
  imageAlt: string;
  visual?: string;
  highlights?: string[];
};

const ENRICHED_SERVICES: Service[] = [
  {
    number: "01",
    title: "AI Workflows",
    description:
      "Intelligent automation pipelines turning manual, repetitive work into reliable, self-running processes.",
    capabilities: ["Process Automation", "Document Processing", "LLM Integration"],
    highlights: [
      "End-to-end document & multimodal ingestion",
      "Real-time LLM reasoning & schema validation",
      "Automated routing with human oversight",
    ],
    image: null,
    imageAlt: "",
    visual: "flow",
  },
  {
    number: "02",
    title: "Agentic AI",
    description:
      "Autonomous AI agents that plan, reason, and act inside your systems with human oversight built in.",
    capabilities: ["AI Agents", "Orchestration", "RAG"],
    highlights: [
      "Multi-agent orchestration with role delegators",
      "Deterministic guardrails & safety bounds",
      "Tool integrations with CRM, ERP & custom APIs",
    ],
    image: null,
    imageAlt: "",
    visual: "orb",
  },
  {
    number: "03",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications delivering fluid, high-performance customer experiences.",
    capabilities: ["iOS", "Android", "React Native", "Flutter"],
    highlights: [
      "Smooth 60fps performance on iOS & Android",
      "Offline-first caching & biometric security",
      "On-device ML inference with low latency",
    ],
    image: null,
    imageAlt: "",
    visual: "mobile",
  },
  {
    number: "04",
    title: "Desktop Apps",
    description:
      "Fast, offline-capable desktop software engineered for demanding professional workflows.",
    capabilities: ["Windows", "macOS", "Linux", "Electron"],
    highlights: [
      "Sub-millisecond IPC & minimal RAM footprint",
      "Native tray integration & multi-window docking",
      "Auto-updating cross-platform distribution",
    ],
    image: null,
    imageAlt: "",
    visual: "desktop",
  },
  {
    number: "05",
    title: "Cloud Solutions",
    description:
      "Scalable cloud architecture engineered for reliability, enterprise security, and cost efficiency.",
    capabilities: ["AWS", "GCP", "Azure", "Serverless"],
    highlights: [
      "Multi-region auto-scaling & edge compute",
      "Zero-downtime blue/green deployments",
      "DDoS protection & real-time telemetry",
    ],
    image: null,
    imageAlt: "",
    visual: "dithering",
  },
  {
    number: "06",
    title: "DevOps Solutions",
    description:
      "Delivery pipelines and infrastructure as code that keep releases fast and systems healthy.",
    capabilities: ["CI/CD", "IaC", "Monitoring"],
    highlights: [
      "Automated CI/CD release pipelines",
      "Infrastructure as Code via Terraform & Docker",
      "24/7 observability & proactive alerting",
    ],
    image: null,
    imageAlt: "",
    visual: "globe",
  },
];

// Memoized single service card to prevent re-rendering during scroll
const ServiceCardItem = memo(function ServiceCardItem({
  service,
  innerRef,
}: {
  service: Service;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={innerRef}
      className="absolute inset-0 flex h-full w-full bg-background overflow-hidden"
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="grid h-full w-full grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dotted divide-edge overflow-hidden">
        {/* Left Column: Top-aligned Title & Intro (Key Highlights only on md+ web view) */}
        <div className="flex flex-col justify-start p-3 sm:p-6 lg:p-8 overflow-hidden">
          {/* Service Title */}
          <TextGenerateEffect
            as="h3"
            className="text-base sm:text-xl lg:text-2xl font-medium sm:font-normal tracking-tight text-foreground"
            staggerDuration={0.14}
            transition={{ duration: 0.65 }}
            filter={false}
          >
            {service.title}
          </TextGenerateEffect>

          {/* Small Introduction */}
          <TextGenerateEffect
            as="p"
            className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-lg"
            staggerDuration={0.04}
            transition={{ duration: 0.65 }}
            filter={false}
          >
            {service.description}
          </TextGenerateEffect>

          {/* Key Highlights - Hidden on mobile, visible on desktop / web view */}
          {service.highlights && service.highlights.length > 0 && (
            <div className="hidden md:block mt-2.5 sm:mt-4 space-y-1 sm:space-y-1.5">
              <p className="font-mono text-[9px] sm:text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                Key Highlights
              </p>
              <div className="grid gap-1 sm:gap-1.5">
                {service.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      size={13}
                      className="mt-0.5 shrink-0 text-teal"
                    />
                    <span className="leading-tight sm:leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Responsive Visual Component calibrated for mobile & desktop */}
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background p-1.5 sm:p-4 lg:p-6">
          {service.visual === "flow" ? (
            <div className="relative h-full w-full max-h-[250px] sm:max-h-[290px] lg:max-h-[360px] flex items-center justify-center">
              <AIWorkflowFlow expanded={true} />
            </div>
          ) : service.visual === "orb" ? (
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <div className="block lg:hidden">
                <FluidOrb size={180} />
              </div>
              <div className="hidden lg:block">
                <FluidOrb size={300} />
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
              <CloudShader />
            </div>
          ) : service.visual === "globe" ? (
            <div className="relative aspect-square w-full max-w-[190px] sm:max-w-[260px] lg:max-w-[360px] overflow-hidden flex items-center justify-center">
              <Globe />
            </div>
          ) : (
            <div className="flex items-center justify-center p-1">
              <FluidOrb size={180} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Memoized Glider Tabs component
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

        return (
          <button
            key={`glider-tab-${srv.number}`}
            type="button"
            onClick={() => onTabClick(idx)}
            className={[
              "flex items-center justify-center p-2 sm:py-2.5 lg:py-3",
              "font-mono text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider",
              "transition-colors duration-150 rounded-none cursor-pointer select-none",
              !mobileIsLastCol ? "border-r border-dotted border-edge md:border-r-0" : "",
              mobileIsTopRow ? "border-b border-dotted border-edge md:border-b-0" : "",
              !desktopIsLastCol ? "md:border-r md:border-dotted md:border-edge" : "",
              isActive
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30 bg-transparent",
            ].join(" ")}
          >
            <span className="truncate">{srv.title}</span>
          </button>
        );
      })}
    </div>
  );
});

export function ServicesSection({ services: initialServices }: { services?: Service[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const services = initialServices && initialServices.length === ENRICHED_SERVICES.length
    ? ENRICHED_SERVICES
    : (initialServices || ENRICHED_SERVICES);

  // GSAP ScrollTrigger with matchMedia for responsive smooth performance
  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

    if (!container || !stage || cards.length < 2) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = (context.conditions || {}) as {
          isDesktop?: boolean;
          isMobile?: boolean;
          reduceMotion?: boolean;
        };

        if (reduceMotion) {
          gsap.set(cards, { clearProps: "all" });
          return;
        }

        // Set initial states using autoAlpha and hardware-accelerated transforms
        gsap.set(cards[0], {
          xPercent: 0,
          scale: 1,
          autoAlpha: 1,
          zIndex: 10,
          pointerEvents: "auto",
          force3D: true,
        });

        cards.slice(1).forEach((card, idx) => {
          gsap.set(card, {
            xPercent: -100,
            scale: 1,
            autoAlpha: 0,
            zIndex: 10 + idx + 1,
            pointerEvents: "none",
            force3D: true,
          });
        });

        const totalTransitions = cards.length - 1;
        const scrollDistance = totalTransitions * (isDesktop ? 650 : 450);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: "top 64px",
            end: `+=${scrollDistance}`,
            scrub: isDesktop ? 0.5 : 0.25,
            anticipatePin: isDesktop ? 1 : 0,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const step = Math.min(
                totalTransitions,
                Math.floor(self.progress * totalTransitions + 0.5)
              );
              if (step !== activeStepRef.current) {
                activeStepRef.current = step;
                setActiveStep(step);
              }
            },
          },
        });

        scrollTriggerRef.current = timeline.scrollTrigger ?? null;
        timelineRef.current = timeline;

        // Build transitions with linear ease ('none') for 1:1 scroll synchronization
        for (let i = 0; i < totalTransitions; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          timeline
            .to(
              nextCard,
              {
                xPercent: 0,
                autoAlpha: 1,
                pointerEvents: "auto",
                duration: 1,
                ease: "none",
                force3D: true,
              },
              `step-${i}`
            )
            .to(
              currentCard,
              {
                autoAlpha: 0,
                scale: 0.98,
                pointerEvents: "none",
                duration: 0.9,
                ease: "none",
                force3D: true,
              },
              `step-${i}`
            );
        }
      },
      containerRef
    );

    return () => {
      mm.revert();
      scrollTriggerRef.current = null;
      timelineRef.current = null;
    };
  }, [services.length]);

  // Smooth jump to clicked tab using Lenis if active, falling back to window smooth scroll
  const handleTabClick = (targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (!st) {
      setActiveStep(targetIndex);
      activeStepRef.current = targetIndex;
      return;
    }

    const totalTransitions = services.length - 1;
    const targetProgress = totalTransitions > 0 ? targetIndex / totalTransitions : 0;
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    activeStepRef.current = targetIndex;
    setActiveStep(targetIndex);

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetScroll, {
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section aria-labelledby="services-title" className="relative w-full">
      <div ref={containerRef} className="relative w-full">
        <ContainerWrapper>
          {/* Header stays pinned */}
          <HeaderTitle title="What services we provide" id="services-title" />

          {/* Glider Tabs */}
          <GliderTabs
            services={services}
            activeStep={activeStep}
            onTabClick={handleTabClick}
          />

          {/* Stacked Service Cards Stage (Responsive sizing across mobile & desktop) */}
          <div
            ref={stageRef}
            className="relative h-[360px] sm:h-[420px] md:h-[calc(100vh-190px)] md:min-h-[480px] md:max-h-[580px] w-full overflow-hidden border-b border-dotted border-edge bg-background"
          >
            {services.map((service, index) => (
              <ServiceCardItem
                key={`service-card-${service.number}`}
                service={service}
                innerRef={(el) => {
                  cardsRef.current[index] = el;
                }}
              />
            ))}
          </div>
        </ContainerWrapper>
      </div>
    </section>
  );
}
