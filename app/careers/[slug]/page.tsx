import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarClock, MapPin } from "lucide-react";
import { Footer } from "../../Footer";
import { getPublishedJobBySlug } from "@/lib/careers";
import { ApplicationForm } from "../ApplicationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { createJobPostingSchema } from "@/lib/job-schema";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import "../careers.css";

type Props = { params: Promise<{ slug: string }> };

function deadlineText(value: string | null) {
  if (!value) return "Open until filled";
  return `Apply by ${new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(value))}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJobBySlug(slug);
  return job
    ? createPageMetadata({
        title: `${job.title} — Careers`,
        description: job.summary,
        path: `/careers/${job.slug}`,
      })
    : createPageMetadata({
        title: "Role not found",
        description: "This SNAB Innovations role is no longer available.",
        path: `/careers/${slug}`,
        noIndex: true,
      });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = await getPublishedJobBySlug(slug);
  if (!job) notFound();

  return (
    <main className="flex-1">
      <JsonLd data={createJobPostingSchema(job)} />

      {/* Hero */}
      <section>
        <ContainerWrapper>
          <div className="pb-8">
            <Link
              href="/careers#open-roles"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              All open roles
            </Link>

            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {job.department}
            </p>

            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {job.title}
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              {job.summary}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 border border-dotted border-edge rounded px-2.5 py-1 font-mono text-xs text-muted-foreground">
                <MapPin size={12} />
                {job.location}
              </span>
              <span className="border border-dotted border-edge rounded px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {job.work_mode}
              </span>
              <span className="border border-dotted border-edge rounded px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {job.employment_type}
              </span>
              <span className="border border-dotted border-edge rounded px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {job.experience_level}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-dotted border-edge rounded px-2.5 py-1 font-mono text-xs text-muted-foreground">
                <CalendarClock size={12} />
                {deadlineText(job.closes_at)}
              </span>
            </div>

            <a
              href="#apply"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 border border-dotted border-edge rounded bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Apply for this role <ArrowRight size={16} />
            </a>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Body */}
      <section>
        <ContainerWrapper>
          <div className="pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-10">
              {/* Description */}
              <div>
                <div className="mb-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    The opportunity
                  </p>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Work with us on the full problem.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    What you&apos;ll do
                  </p>
                  <ul className="flex flex-col gap-2">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    What helps you thrive here
                  </p>
                  <ul className="flex flex-col gap-2">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {job.nice_to_have.length > 0 && (
                  <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Useful, not required
                    </p>
                    <ul className="flex flex-col gap-2">
                      {job.nice_to_have.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-foreground/40 mt-0.5 shrink-0">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t border-dotted border-edge pt-5 mt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Come as you are.</strong>{" "}
                    We value strong evidence and different paths into the work. If the role excites you but your experience doesn&apos;t match every line, we still encourage you to apply.
                  </p>
                </div>
              </div>

              {/* Side Card */}
              <aside className="border border-dotted border-edge rounded-lg p-4 bg-white/[0.02] self-start lg:sticky lg:top-24">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Role snapshot
                </p>
                <dl className="flex flex-col gap-2.5">
                  {[
                    ["Department", job.department],
                    ["Location", job.location],
                    ["Work style", job.work_mode],
                    ["Type", job.employment_type],
                    ["Experience", job.experience_level],
                    ["Deadline", deadlineText(job.closes_at)],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-dotted border-edge pb-2.5 last:border-0 last:pb-0">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-sm text-foreground mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  Start application <ArrowRight size={14} />
                </a>
              </aside>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Application */}
      <section id="apply">
        <ContainerWrapper>
          <div className="pb-8">
            <ApplicationForm job={{ id: job.id, title: job.title }} />
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
