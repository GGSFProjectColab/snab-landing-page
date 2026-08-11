"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SpecularButton from "@/components/ui/SpecularButton";

function Hero() {
  const router = useRouter();
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
            <Button variant="secondary" size="sm" className="gap-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
              AI Product Engineering Studio
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 id="hero-title" className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular text-white drop-shadow-lg">
              <span className="text-white">We build AI for production.</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center font-bitcount md:pb-3 md:pt-0.5">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-cyan-200 drop-shadow-md"
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

            <p className="text-base md:text-lg leading-relaxed tracking-tight text-white max-w-2xl text-center drop-shadow-md">
              <span className="md:hidden">
                AI-powered solutions: workflows, agents, chatbots, web &amp; mobile apps.
              </span>
              <span className="hidden md:inline">
                We build agentic AI workflows, AI automations, AI agents,
                intelligent chatbots, RAG pipelines, LLM integrations, data
                pipelines, web platforms, mobile apps, and custom software from
                Nashik, India.
              </span>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <SpecularButton
              size="lg"
              radius={18}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#525252"
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={() => router.push('/contact')}
            >
              Talk to us <MoveRight className="w-4 h-4 inline-block ml-1" />
            </SpecularButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };