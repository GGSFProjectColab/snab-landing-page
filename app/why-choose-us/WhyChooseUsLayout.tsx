import type { Metadata } from "next";
import Image from "next/image";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import { Footer } from "../Footer";

interface WhyChooseUsPageProps {
  metadata: Metadata;
  label: string;
  headline: string;
  description: string;
  heroImage: string;
  points: { number: string; text: string }[];
  contentImage: string;
  contentImageAlt: string;
  capabilities: string[];
  visual?: React.ReactNode;
  ctaImage?: string;
}

export function WhyChooseUsLayout({
  metadata,
  label,
  headline,
  description,
  heroImage,
  points,
  contentImage,
  contentImageAlt,
  capabilities,
  visual,
  ctaImage = "/ascii-magic-11.png",
}: WhyChooseUsPageProps) {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section aria-labelledby="wcu-hero-title">
        <ContainerWrapper>
          <div className="relative min-h-[460px] overflow-hidden sm:min-h-[540px]">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[460px] flex-col justify-end p-6 sm:min-h-[540px] sm:p-10 md:p-14">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {label}
              </p>
              <h1
                id="wcu-hero-title"
                className="max-w-4xl font-pixelify text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {headline}
              </h1>
              <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  className="bg-white px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white/90"
                  href="/contact"
                >
                  Start a project ↗
                </a>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* What It Means — Split Layout */}
      <section aria-labelledby="wcu-meaning-title">
        <ContainerWrapper>
          <HeaderTitle title="What It Means" id="wcu-meaning-title" />
          <div className="grid gap-0 border-b border-dotted border-edge md:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-dotted border-edge p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <ul className="space-y-5">
                {points.map((point) => (
                  <li className="flex gap-4" key={point.number}>
                    <span className="font-mono text-sm text-foreground/40">
                      {point.number}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {point.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[300px] overflow-hidden bg-muted/30 sm:min-h-[400px]">
              {visual ? (
                <div className="flex h-full w-full items-center justify-center p-6">
                  {visual}
                </div>
              ) : (
                <Image
                  className="object-cover"
                  src={contentImage}
                  alt={contentImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* How We Do It */}
      <section aria-labelledby="wcu-how-title">
        <ContainerWrapper>
          <HeaderTitle title="How We Do It" id="wcu-how-title" />
          <div className="border-b border-dotted border-edge">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {capabilities.map((cap, i) => (
                <div
                  className={`flex items-center gap-3 border-b border-dotted border-edge p-5 sm:p-6 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${i % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                    i >= capabilities.length - (capabilities.length % 3 || 3)
                      ? "md:border-b-0"
                      : ""
                  }`}
                  key={cap}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-dotted border-edge font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-base">
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* CTA */}
      <section aria-labelledby="wcu-cta-title">
        <ContainerWrapper>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={ctaImage}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 p-6 sm:items-center sm:text-center sm:py-10 md:px-12">
              <h2
                id="wcu-cta-title"
                className="max-w-xl font-pixelify text-2xl font-bold sm:text-3xl"
              >
                Bring us the idea.
                <br />
                We&apos;ll build the path.
              </h2>
              <a
                className="bg-white px-5 py-2.5 text-xs font-medium text-black transition-all hover:bg-white/90"
                href="/contact"
              >
                Start with discovery ↗
              </a>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
