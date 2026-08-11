import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import { Footer } from "../Footer";
import { getPublishedJobs } from "@/lib/careers";
import { RolesSkeleton } from "./RolesSkeleton";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import "./careers.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Careers — SNAB Innovations",
  description:
    "Join SNAB Innovations. Explore open roles in AI, engineering, and product from Nashik, India.",
  path: "/careers",
});

async function OpenRoles() {
  const jobs = await getPublishedJobs();

  return (
    <>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <Link
              href={`/careers/${job.slug}`}
              key={job.id}
              className="job-card group relative flex flex-col p-5 sm:p-6 border border-dotted border-edge rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Briefcase size={12} />
                      {job.employment_type}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-xs text-muted-foreground">
                      {job.work_mode}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-9 h-9 rounded-full border border-dotted border-edge text-muted-foreground transition-all group-hover:bg-foreground group-hover:text-background group-hover:border-foreground shrink-0">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {job.summary}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-dotted border-edge">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  {job.location}
                </span>
                {job.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-medium uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-green-400" />
                    Featured
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-14 text-center text-muted-foreground text-sm border border-dotted border-edge rounded-lg">
          No published roles today. Thoughtful introductions are always welcome.
        </div>
      )}
    </>
  );
}

function OpenRolesFallback() {
  return <RolesSkeleton />;
}

export default function CareersPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section id="careers" aria-labelledby="careers-title">
        <ContainerWrapper crosshairs="top" crosshairs="bottom">
          <div className="pb-8 pt-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground/40">›</span>
              <span className="text-foreground" aria-current="page">Career</span>
            </nav>

            {/* Large Heading */}
            <h1
              id="careers-title"
              className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
            >
              Career
            </h1>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Meet the Team */}
      <section aria-labelledby="team-title">
        <ContainerWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-8">
            {/* Left — Text */}
            <div>
              <h2
                id="team-title"
                className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
              >
                Meet the team work behind our succes
              </h2>
            </div>

            {/* Right — Description */}
            <div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Our team consists of a group of talented. We value creativity, collaboration, and a passion for excellence. Our members are very intelligent and deligent.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Learn more about us <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Team Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-lg overflow-hidden border border-dotted border-edge mb-4">
            <Image
              src="/careers-why-join.jpg"
              alt="SNAB Innovations team collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Open Roles */}
      <section id="open-roles" aria-labelledby="roles-title">
        <ContainerWrapper>
          <div className="pb-8">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2
                id="roles-title"
                className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
              >
                Currently open positions
              </h2>
            </div>

            <Suspense fallback={<OpenRolesFallback />}>
              <OpenRoles />
            </Suspense>

            {/* General Application CTA */}
            <div className="mt-8 p-5 sm:p-6 border border-dotted border-edge rounded-lg bg-white/[0.015] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Don&apos;t see your role?
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                  We&apos;re always interested in exceptional engineers and product thinkers. Tell us what you&apos;re good at.
                </p>
              </div>
              <Link
                href="/careers/apply"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-dotted border-edge rounded bg-foreground text-background text-sm font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
              >
                Make an introduction <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Trusted Companies */}
      <section aria-label="Trusted companies">
        <ContainerWrapper>
          <div className="py-10 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by <span className="text-foreground font-medium">1800+</span> of the world&apos;s most popular companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {["Stripe", "Vercel", "Notion", "Linear", "Figma", "GitHub"].map((name) => (
                <span
                  key={name}
                  className="font-pixelify text-lg sm:text-xl text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
