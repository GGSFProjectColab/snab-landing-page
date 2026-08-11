import type { Metadata } from "next";
import Link from "next/link";
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
              className="job-card group flex flex-col p-5 border border-dotted border-edge bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Briefcase size={11} />
                      {job.employment_type}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-xs text-muted-foreground">
                      {job.work_mode}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-8 h-8 border border-dotted border-edge text-muted-foreground transition-all group-hover:bg-foreground group-hover:text-background group-hover:border-foreground shrink-0">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
                {job.summary}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-dotted border-edge">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={11} />
                  {job.location}
                </span>
                {job.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-medium uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-green-400" />
                    Featured
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground text-sm border border-dotted border-edge">
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
        <ContainerWrapper>
          <div className="relative py-16 md:py-24 overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: "url('/careers-hero-bg.png')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" aria-hidden="true" />

            <div className="relative z-10 text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
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
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Meet the Team */}
      <section aria-labelledby="team-title">
        <ContainerWrapper>
          <div className="h-10 flex items-center border-b border-dotted border-edge px-2">
            <h2 id="team-title" className="font-pixelify font-bold text-xl md:text-2xl">About the team</h2>
          </div>
          <div className="p-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left — Heading */}
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.2]">
                  Meet the team behind our success
                </h2>
              </div>

              {/* Right — Description */}
              <div className="lg:pt-1">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We value creativity, collaboration, and excellence. Join us in building AI-powered products from Nashik, India.
                </p>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Open Roles */}
      <section id="open-roles" aria-labelledby="roles-title">
        <ContainerWrapper>
          <div className="h-10 flex items-center border-b border-dotted border-edge px-2">
            <h2 id="roles-title" className="font-pixelify font-bold text-xl md:text-2xl">Open positions</h2>
          </div>
          <div className="p-4 pb-8">
            <Suspense fallback={<OpenRolesFallback />}>
              <OpenRoles />
            </Suspense>

            {/* General Application CTA */}
            <div className="mt-6 p-5 border border-dotted border-edge bg-white/[0.015] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Don&apos;t see your role?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-lg">
                  We&apos;re always interested in exceptional engineers. Tell us what you&apos;re good at.
                </p>
              </div>
              <Link
                href="/careers/apply"
                className="inline-flex items-center gap-2 px-4 py-2 border border-dotted border-edge bg-foreground text-background text-sm font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
              >
                Make an introduction <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
