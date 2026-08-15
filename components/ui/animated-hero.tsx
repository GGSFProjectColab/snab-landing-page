"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SpecularButton from "@/components/ui/SpecularButton";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

function Hero() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);
  const titles = useMemo(
    () => [
      "web platforms",
      "mobile apps",
      "AI products",
      "custom systems",
      "automation tools",
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
        <div className="flex gap-6 py-20 lg:py-28 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col items-center">
            <h1 id="hero-title" className="text-display max-w-2xl tracking-tighter text-center font-normal text-foreground dark:text-white dark:drop-shadow-lg">
              <span className="text-foreground dark:text-white">We engineer</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-3 md:pt-0.5">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-normal text-teal dark:text-cyan-200 dark:drop-shadow-md"
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
              <span className="text-foreground dark:text-white">that perform.</span>
            </h1>

            <div className="text-body leading-relaxed tracking-tight text-muted-foreground dark:text-white max-w-2xl text-center dark:drop-shadow-md">
              <div className="md:hidden">
                <TextGenerateEffect
                  as="p"
                  staggerDuration={0.06}
                  className="text-body leading-relaxed tracking-tight text-muted-foreground dark:text-white max-w-2xl text-center dark:drop-shadow-md"
                >
                  Software engineering for AI, web, and mobile.
                </TextGenerateEffect>
              </div>
              <div className="hidden md:block">
                <TextGenerateEffect
                  as="p"
                  staggerDuration={0.03}
                  className="text-body leading-relaxed tracking-tight text-muted-foreground dark:text-white max-w-2xl text-center dark:drop-shadow-md"
                >
                  SNAB Innovations is a software engineering studio. We build AI products, web platforms, mobile apps, and custom systems from Nashik, India.
                </TextGenerateEffect>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <SpecularButton
              size="md"
              radius={6}
              tint={isDark ? "#ffffff" : "#1a191f"}
              tintOpacity={isDark ? 0.08 : 0.05}
              blur={12}
              textColor={isDark ? "#ffffff" : "#1a191f"}
              lineColor={isDark ? "#ffffff" : "#1a191f"}
              baseColor={isDark ? "#666666" : "#8b8794"}
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1}
              speed={0.5}
              followMouse={false}
              proximity={250}
              autoAnimate
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