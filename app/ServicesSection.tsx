"use client";

import { useEffect, useRef, useState } from "react";
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

export function ServicesSection({ services: initialServices }: { services?: Service[] }) {
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const services = initialServices && initialServices.length === ENRICHED_SERVICES.length
    ? ENRICHED_SERVICES
    : (initialServices || ENRICHED_SERVICES);

  // GSAP ScrollTrigger for pinned interactive card animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const stage = stageRef.current;
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

      if (!container || !stage || cards.length < 2) return;

      gsap.set(cards[0], { xPercent: 0, opacity: 1, zIndex: 10, visibility: "visible" });
      cards.slice(1).forEach((card, idx) => {
        gsap.set(card, {
          xPercent: -100,
          opacity: 0,
          zIndex: 10 + idx + 1,
          visibility: "hidden",
        });
      });

      const totalTransitions = cards.length - 1;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top 64px",
          end: `+=${totalTransitions * 800}`,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(
              cards.length - 1,
              Math.floor(self.progress * cards.length)
            );
            setActiveStep(step);
          },
        },
      });

      scrollTriggerRef.current = timeline.scrollTrigger ?? null;

      for (let i = 0; i < totalTransitions; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        timeline
          .set(nextCard, { visibility: "visible" })
          .to(
            nextCard,
            {
              xPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            `step-${i}`
          )
          .to(
            currentCard,
            {
              opacity: 0.15,
              scale: 0.97,
              duration: 0.8,
              ease: "power2.inOut",
            },
            `step-${i}+=0.1`
          )
          .set(currentCard, { visibility: "hidden" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  // Smooth animated scroll to clicked section
  const handleTabClick = (targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (!st) {
      setActiveStep(targetIndex);
      return;
    }

    const totalTransitions = services.length - 1;
    const targetProgress = totalTransitions > 0 ? targetIndex / totalTransitions : 0;
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    const scrollObj = { y: window.scrollY };
    gsap.to(scrollObj, {
      y: targetScroll,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
    });
  };

  return (
    <section aria-labelledby="services-title" className="relative w-full">
      <div ref={containerRef} className="relative w-full">
        <ContainerWrapper>
          {/* Header stays pinned */}
          <HeaderTitle title="What services we provide" id="services-title" />

          {/* Mobile: 3+3 two-row glider / Desktop: all 6 in one row */}
          <div className="grid grid-cols-3 md:grid-cols-6 border-b border-dotted border-edge bg-background">
            {services.map((srv, idx) => {
              const isActive = activeStep === idx;

              // Mobile (3-col): right border on cols 1 & 2, bottom border on top row (0-2)
              const mobileIsLastCol = (idx + 1) % 3 === 0;
              const mobileIsTopRow = idx < 3;

              // Desktop (6-col): right border on all except last item
              const desktopIsLastCol = idx === services.length - 1;

              return (
                <button
                  key={`glider-tab-${srv.number}`}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  className={[
                    "flex items-center justify-center p-2 sm:py-2.5 lg:py-3",
                    "font-mono text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider",
                    "transition-all duration-200 rounded-none cursor-pointer select-none",
                    // Mobile borders
                    !mobileIsLastCol ? "border-r border-dotted border-edge md:border-r-0" : "",
                    mobileIsTopRow ? "border-b border-dotted border-edge md:border-b-0" : "",
                    // Desktop borders — right border on all but last
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

          {/* Stacked Service Cards Stage (Responsive sizing across mobile & desktop) */}
          <div
            ref={stageRef}
            className="relative min-h-[440px] sm:min-h-[480px] h-[calc(100vh-190px)] max-h-[580px] w-full overflow-hidden border-b border-dotted border-edge bg-background"
          >
            {services.map((service, index) => (
              <div
                key={`service-card-${service.number}`}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="absolute inset-0 flex h-full w-full bg-background overflow-hidden"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dotted divide-edge overflow-hidden">
                  {/* Left Column: Top-aligned Title, Intro & Compact Key Highlights */}
                  <div className="flex flex-col justify-start p-4 sm:p-6 lg:p-8 overflow-hidden">
                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-normal tracking-tight text-foreground">
                      {service.title}
                    </h3>

                    {/* Small Introduction */}
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-lg">
                      {service.description}
                    </p>

                    {/* Key Highlights */}
                    {service.highlights && service.highlights.length > 0 && (
                      <div className="mt-2.5 sm:mt-4 space-y-1 sm:space-y-1.5">
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
                      <div className="relative h-full w-full max-h-[220px] sm:max-h-[280px] lg:max-h-[360px] flex items-center justify-center">
                        <AIWorkflowFlow expanded={true} />
                      </div>
                    ) : service.visual === "orb" ? (
                      <div className="flex flex-col items-center justify-center p-2 text-center">
                        <div className="block lg:hidden">
                          <FluidOrb size={190} />
                        </div>
                        <div className="hidden lg:block">
                          <FluidOrb size={300} />
                        </div>
                      </div>
                    ) : service.visual === "mobile" ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <MobileAppVisual image={service.image} imageAlt={service.imageAlt} />
                      </div>
                    ) : service.visual === "desktop" ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <DesktopAppVisual />
                      </div>
                    ) : service.visual === "dithering" ? (
                      <div className="relative aspect-video w-full h-[170px] sm:h-[220px] lg:h-[300px] overflow-hidden flex items-center justify-center">
                        <CloudShader />
                      </div>
                    ) : service.visual === "globe" ? (
                      <div className="relative aspect-square w-full max-w-[190px] sm:max-w-[260px] lg:max-w-[360px] overflow-hidden flex items-center justify-center">
                        <Globe />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-2">
                        <FluidOrb size={190} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </div>
    </section>
  );
}
