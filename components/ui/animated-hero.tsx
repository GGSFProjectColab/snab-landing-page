"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SpecularButton from "@/components/ui/SpecularButton";

function Hero() {
  const router = useRouter();
  const [titleNumber, setTitleNumber] = useState(0);
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
          <div className="flex gap-4 flex-col">
            <h1 id="hero-title" className="text-display max-w-2xl tracking-tighter text-center font-normal text-white drop-shadow-lg">
              <span className="text-white">We engineer</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-3 md:pt-0.5">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-normal text-cyan-200 drop-shadow-md"
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
              <span className="text-white">that perform.</span>
            </h1>

            <p className="text-body leading-relaxed tracking-tight text-white max-w-2xl text-center drop-shadow-md">
              <span className="md:hidden">
                Software engineering for AI, web, and mobile.
              </span>
              <span className="hidden md:inline">
                SNAB Innovations is a software engineering studio. We build AI products,
                web platforms, mobile apps, and custom systems from Nashik, India.
              </span>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <SpecularButton
              size="md"
              radius={6}
              tint="#ffffff"
              tintOpacity={0.08}
              blur={12}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#666666"
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