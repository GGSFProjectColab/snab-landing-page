"use client";

import { useEffect, useState } from "react";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import { CloudShader } from "@/components/ui/cloud-shader";
import FluidOrb from "@/components/ui/fluid-orb";
import { AIWorkflowFlow } from "@/components/ui/ai-workflow-flow";
import { Globe } from "@/components/ui/globe";

type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  image: string | null;
  imageAlt: string;
  visual?: string;
};

const INITIAL_COUNT = 3;

export function ServicesSection({ services }: { services: Service[] }) {
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const visibleServices = isDesktop || showAll ? services : services.slice(0, INITIAL_COUNT);

  return (
    <section aria-labelledby="services-title">
      <ContainerWrapper>
        <HeaderTitle title="Services we provide" id="services-title" />
        <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
          {visibleServices.map((service) =>
            service.visual ? (
              <div
                className="border-b border-dotted border-edge last:border-b-0 md:border-r"
                key={service.title}
              >
                <div className="grid md:h-full md:grid-cols-2">
                  <div className="flex flex-col items-center p-3 text-center sm:p-4 md:items-start md:text-left">
                    <h3 className="text-title font-normal">{service.title}</h3>
                    <p className="mt-2 text-body text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  {service.visual === "dithering" ? (
                    <div className="relative aspect-video w-full overflow-hidden md:aspect-auto">
                      <CloudShader />
                    </div>
                  ) : service.visual === "flow" ? (
                    <div className="relative flex w-full items-center justify-center overflow-hidden p-4 md:aspect-auto md:h-[208px]">
                      <AIWorkflowFlow />
                    </div>
                  ) : service.visual === "globe" ? (
                    <div className="relative aspect-video w-full overflow-hidden md:aspect-auto">
                      <Globe />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-muted/40 p-6">
                      <FluidOrb size={200} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="border-b border-dotted border-edge p-3 last:border-b-0 sm:p-4 md:odd:border-r"
                key={service.title}
              >
                <h3 className="text-title font-normal">{service.title}</h3>
                <p className="mt-2 text-body text-muted-foreground">
                  {service.description}
                </p>
              </div>
            )
          )}
        </div>
        {!showAll && services.length > INITIAL_COUNT && (
          <div className="flex justify-center py-6 md:hidden">
            <button
              onClick={() => setShowAll(true)}
              className="text-button font-normal text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              View more
            </button>
          </div>
        )}
      </ContainerWrapper>
    </section>
  );
}
