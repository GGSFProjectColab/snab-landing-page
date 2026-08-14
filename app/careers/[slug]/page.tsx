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

import { HeaderTitle } from "@/components/profile/header-title";
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
          <div className="px-4 pb-6 pt-5">
            <Link
              href="/careers#open-roles"
              className="inline-flex items-center gap-2 font-mono text-caption uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft size={12} />
              All open roles
            </Link>

            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-caption uppercase tracking-wider text-muted-foreground">
                {job.department}
              </span>
            </div>

            <h1 className="text-display font-normal tracking-tight text-foreground">
              {job.title}
            </h1>

            <p className="text-muted-foreground text-body mt-2 max-w-xl leading-relaxed">
              {job.summary}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1 border border-dotted border-edge px-2 py-0.5 font-mono text-caption text-muted-foreground">
                <MapPin size={10} />
                {job.location}
              </span>
              <span className="border border-dotted border-edge px-2 py-0.5 font-mono text-caption text-muted-foreground">
                {job.work_mode}
              </span>
              <span className="border border-dotted border-edge px-2 py-0.5 font-mono text-caption text-muted-foreground">
                {job.employment_type}
              </span>
              <span className="inline-flex items-center gap-1 border border-dotted border-edge px-2 py-0.5 font-mono text-caption text-muted-foreground">
                <CalendarClock size={10} />
                {deadlineText(job.closes_at)}
              </span>
            </div>

            <a
              href="#apply"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-dotted border-edge bg-foreground text-background text-button font-normal hover:opacity-90 transition-opacity"
            >
              Apply for this role <ArrowRight size={12} />
            </a>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Body */}
      <section>
        <ContainerWrapper>
          <HeaderTitle title="Role details" />
          <div className="px-4 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 lg:gap-8">
              {/* Description */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-label font-medium text-foreground mb-1.5">
                    The opportunity
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-label font-medium text-foreground mb-1.5">
                    What you&apos;ll do
                  </h3>
                  <ul className="space-y-1">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-body text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-foreground mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-label font-medium text-foreground mb-1.5">
                    What helps you thrive here
                  </h3>
                  <ul className="space-y-1">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-body text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-foreground mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {job.nice_to_have.length > 0 && (
                  <div>
                    <h3 className="text-label font-medium text-foreground mb-1.5">
                      Nice to have
                    </h3>
                    <ul className="space-y-1">
                      {job.nice_to_have.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-body text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-foreground mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t border-dotted border-edge pt-4">
                  <p className="text-body text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Come as you are.</strong>{" "}
                    We value different paths into the work. If the role excites you, apply.
                  </p>
                </div>
              </div>

              {/* Side Card */}
              <aside className="border border-dotted border-edge p-3 bg-white/[0.02] self-start lg:sticky lg:top-20">
                <p className="font-mono text-caption uppercase tracking-wider text-muted-foreground mb-2">
                  Snapshot
                </p>
                <dl className="space-y-1.5">
                  {[
                    ["Department", job.department],
                    ["Location", job.location],
                    ["Work style", job.work_mode],
                    ["Type", job.employment_type],
                    ["Deadline", deadlineText(job.closes_at)],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-dotted border-edge pb-1.5 last:border-0 last:pb-0">
                      <dt className="font-mono text-caption uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-caption text-foreground mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-1.5 mt-3 text-button font-normal text-foreground hover:text-muted-foreground transition-colors"
                >
                  Start application <ArrowRight size={10} />
                </a>
              </aside>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      

      {/* Application */}
      <section id="apply">
        <ContainerWrapper>
          <HeaderTitle title="Apply" />
          <div className="px-4 pb-6">
            <ApplicationForm job={{ id: job.id, title: job.title }} />
          </div>
        </ContainerWrapper>
      </section>

      

      <Footer />
    </main>
  );
}
