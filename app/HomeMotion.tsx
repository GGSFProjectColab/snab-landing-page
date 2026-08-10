"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const revealGroups = [
  {
    trigger: ".proof-section",
    targets: [".funding-block"],
    start: "top 76%"
  },
  {
    trigger: ".about-editorial-section",
    targets: [".about-meta-bar", ".about-editorial-grid"],
    start: "top 78%"
  },
  {
    trigger: ".services-section",
    targets: [".services-header"],
    start: "top 76%"
  },
  {
    trigger: ".projects-section",
    targets: [".projects-header", ".projects-footer"],
    start: "top 78%"
  },
  {
    trigger: ".business-growth-section",
    targets: [".business-growth-copy"],
    start: "top 76%"
  },
  {
    trigger: ".testimonials-section",
    targets: [".testimonials-header", ".testimonials-carousel"],
    start: "top 78%"
  },
  {
    trigger: ".faq-section",
    targets: [".faq-title", ".faq-right-col"],
    start: "top 78%"
  },
  {
    trigger: ".home-footer",
    targets: [".home-footer-inner"],
    start: "top 86%"
  }
] as const;

const cascadeGroups = [
  {
    trigger: ".metric-row",
    targets: ".metric-card",
    start: "top 82%"
  },
  {
    trigger: ".services-board",
    targets: ".service-card",
    start: "top 80%"
  },
  {
    trigger: ".projects-panel",
    targets: ".project-row",
    start: "top 82%"
  },
  {
    trigger: ".faq-list",
    targets: ".faq-item",
    start: "top 84%"
  }
] as const;

export function HomeMotion() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 900px)",
          finePointer: "(hover: hover) and (pointer: fine)",
          reducedMotion: "(prefers-reduced-motion: reduce)"
        },
        (matchContext) => {
          const { desktop, finePointer, reducedMotion } =
            matchContext.conditions as {
              desktop: boolean;
              finePointer: boolean;
              reducedMotion: boolean;
            };
          let smoother: ScrollSmoother | undefined;

          if (reducedMotion) {
            gsap.set(
              [
                ".hero-copy > *",
                ".pixel-tree",
                ...revealGroups.flatMap((group) => group.targets),
                ...cascadeGroups.map((group) => group.targets)
              ],
              { clearProps: "all" }
            );
            return;
          }

          if (desktop && finePointer) {
            root.classList.add("has-scroll-smoother");
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1.05,
              smoothTouch: false,
              normalizeScroll: false,
              effects: false
            });
          }

          gsap
            .timeline({
              defaults: { ease: "power3.out", force3D: true },
              lazy: false,
              onComplete: () => {
                const tree = document.querySelector<HTMLImageElement>(".pixel-tree");
                if (tree) {
                  tree.style.imageRendering = "pixelated";
                }
              }
            })
            .from(".topbar", {
              autoAlpha: 0,
              y: -12,
              duration: 0.55
            })
            .from(
              ".hero-copy > *",
              {
                autoAlpha: 0,
                y: desktop ? 24 : 16,
                duration: 0.72,
                stagger: 0.09
              },
              0.08
            )
            .from(
              ".pixel-tree",
              {
                autoAlpha: 0,
                xPercent: desktop ? 4 : 2,
                duration: 1.05,
                ease: "power2.out"
              },
              0.2
            )
            .from(
              ".hero .bottom-rail",
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.9,
                ease: "power3.inOut"
              },
              0.35
            );

          revealGroups.forEach(({ trigger, targets, start }) => {
            const existingTargets = targets
              .map((selector) => document.querySelector(selector))
              .filter((element): element is Element => Boolean(element));

            if (!existingTargets.length) {
              return;
            }

            gsap.from(existingTargets, {
              scrollTrigger: {
                trigger,
                start,
                once: true
              },
              autoAlpha: 0,
              y: desktop ? 30 : 20,
              duration: desktop ? 0.8 : 0.64,
              stagger: desktop ? 0.11 : 0.07,
              ease: "power3.out"
            });
          });

          cascadeGroups.forEach(({ trigger, targets, start }) => {
            const existingTargets = gsap.utils.toArray<Element>(targets);

            if (!existingTargets.length) {
              return;
            }

            gsap.from(existingTargets, {
              scrollTrigger: {
                trigger,
                start,
                once: true
              },
              autoAlpha: 0,
              y: desktop ? 18 : 12,
              duration: desktop ? 0.68 : 0.56,
              stagger: desktop ? 0.075 : 0.055,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(existingTargets, {
                  clearProps: "opacity,transform,visibility"
                });
              }
            });
          });

          if (desktop) {
            gsap.to(".pixel-tree", {
              yPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.65
              }
            });

            gsap.to(".growth-tree-video", {
              yPercent: -3,
              scale: 1.015,
              ease: "none",
              scrollTrigger: {
                trigger: ".business-growth-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            });
          }

          return () => {
            smoother?.kill();
            root.classList.remove("has-scroll-smoother");
          };
        }
      );

      return () => media.revert();
    });

    return () => {
      root.classList.remove("has-scroll-smoother");
      context.revert();
    };
  }, []);

  return null;
}
