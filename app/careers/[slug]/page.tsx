import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarClock, Check, MapPin } from "lucide-react";
import { Footer } from "../../Footer";
import { getPublishedJobBySlug } from "@/lib/careers";
import { ApplicationForm } from "../ApplicationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { createJobPostingSchema } from "@/lib/job-schema";
import { createPageMetadata } from "@/lib/site";
import "../careers.css";
import "../../legacy.css";

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

  return <main className="careers-page job-page">
    <JsonLd data={createJobPostingSchema(job)} />
    <section className="job-hero">
      <Link href="/careers#open-roles" className="job-back"><ArrowLeft size={16} /> All open roles</Link>
      <p className="careers-kicker"><span /> {job.department}</p>
      <h1>{job.title}</h1>
      <p className="job-summary">{job.summary}</p>
      <div className="job-meta"><span><MapPin size={15} />{job.location}</span><span>{job.work_mode}</span><span>{job.employment_type}</span><span>{job.experience_level}</span><span><CalendarClock size={15} />{deadlineText(job.closes_at)}</span></div>
      <a href="#apply" className="careers-primary-cta">Apply for this role <ArrowRight size={18} /></a>
    </section>

    <section className="job-body">
      <div className="job-description">
        <section><p className="job-section-label">The opportunity</p><h2>Work with us on the full problem.</h2><p className="job-prose">{job.description}</p></section>
        <section><p className="job-section-label">What you&apos;ll do</p><ul>{job.responsibilities.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul></section>
        <section><p className="job-section-label">What helps you thrive here</p><ul>{job.requirements.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul></section>
        {job.nice_to_have.length ? <section><p className="job-section-label">Useful, not required</p><ul>{job.nice_to_have.map(item => <li key={item}><span className="soft-check">+</span>{item}</li>)}</ul></section> : null}
        <div className="job-equal-note"><strong>Come as you are.</strong><p>We value strong evidence and different paths into the work. If the role excites you but your experience doesn&apos;t match every line, we still encourage you to apply.</p></div>
      </div>
      <aside className="job-sidecard"><p>Role snapshot</p><dl><div><dt>Department</dt><dd>{job.department}</dd></div><div><dt>Location</dt><dd>{job.location}</dd></div><div><dt>Work style</dt><dd>{job.work_mode}</dd></div><div><dt>Type</dt><dd>{job.employment_type}</dd></div><div><dt>Experience</dt><dd>{job.experience_level}</dd></div><div><dt>Deadline</dt><dd>{deadlineText(job.closes_at)}</dd></div></dl><a href="#apply">Start application <ArrowRight size={16} /></a></aside>
    </section>

    <section className="job-application" id="apply"><ApplicationForm job={{ id: job.id, title: job.title }} /></section>
    <Footer />
  </main>;
}
