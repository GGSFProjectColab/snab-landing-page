"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "agentic AI workflows",
      "AI automations",
      "web platforms",
      "mobile apps",
      "AI agents",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-28 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              AI Product Engineering Studio
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 id="hero-title" className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular text-white">
              <span className="text-white">We build AI for production.</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center font-bitcount md:pb-3 md:pt-0.5">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-cyan-300"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed tracking-tight text-white/70 max-w-2xl text-center">
              We build agentic AI workflows, AI automations, AI agents,
              intelligent chatbots, RAG pipelines, LLM integrations, data
              pipelines, web platforms, mobile apps, and custom software from
              Nashik, India.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <a
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-4 bg-black text-white hover:bg-black/90"
              )}
            >
              Talk to us <MoveRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };