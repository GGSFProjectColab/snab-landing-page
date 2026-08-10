import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ArrowUpRight, CalendarClock, Code2, HeartHandshake, Sparkles } from "lucide-react";
import { Footer } from "../Footer";
import { getPublishedJobs } from "@/lib/careers";
import { RolesSkeleton } from "./RolesSkeleton";
import { createPageMetadata } from "@/lib/site";
import "./careers.css";
import "../legacy.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Careers in AI & Software Engineering",
  description:
    "Explore open AI, product, design, and software engineering roles at SNAB Innovations in Nashik, India.",
  path: "/careers",
});

const principles = [
  { icon: Sparkles, number: "01", title: "Make useful things", copy: "We care about ambitious technology, but measure our work by whether it makes someone’s day meaningfully better." },
  { icon: Code2, number: "02", title: "Own the whole problem", copy: "Small teams do their best work when everyone can connect decisions, craft, implementation, and customer impact." },
  { icon: HeartHandshake, number: "03", title: "Be direct and kind", copy: "Clear thinking and honest feedback move work forward. Respect makes that honesty sustainable." },
];

function deadlineText(value: string | null) {
  if (!value) return "Open until filled";
  return `Apply by ${new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(value))}`;
}

async function OpenRoles() {
  const jobs = await getPublishedJobs();

  return (
    <>
      <div className="roles-header">
        <div><p>Current openings</p><h2 id="roles-title">Find your next problem.</h2></div>
        <span>{String(jobs.length).padStart(2, "0")} open {jobs.length === 1 ? "role" : "roles"}</span>
      </div>

      {jobs.length ? (
        <div className="roles-list">
          {jobs.map((job, index) => (
            <Link href={`/careers/${job.slug}`} key={job.id} className="role-card">
              <span className="role-id">{String(index + 1).padStart(2, "0")}</span>
              <div className="role-details">
                <p>{job.department}</p><h3>{job.title}</h3><span>{job.summary}</span>
              </div>
              <div className="role-facts"><span>{job.location}</span><span>{job.work_mode}</span><span>{job.employment_type}</span><span className="role-deadline"><CalendarClock size={12} />{deadlineText(job.closes_at)}</span></div>
              <span className="role-action" aria-hidden="true"><ArrowUpRight size={24} /></span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-openings"><p>There aren&apos;t any published roles today, but good introductions are always welcome.</p></div>
      )}
    </>
  );
}

function OpenRolesFallback() {
  return (
    <>
      <div className="roles-header">
        <div><p>Current openings</p><h2 id="roles-title">Find your next problem.</h2></div>
        <span>Loading roles</span>
      </div>
      <RolesSkeleton />
    </>
  );
}

export default function CareersPage() {
  return (
    <main className="careers-page">
      <section className="careers-hero" aria-labelledby="careers-title">
        <div className="careers-grid" aria-hidden="true" />
        <div className="careers-hero-index" aria-hidden="true">C / 01</div>
        <div className="careers-hero-copy">
          <p className="careers-kicker"><span /> Careers at SNAB</p>
          <h1 id="careers-title">Build work<br />that <em>matters.</em></h1>
          <p className="careers-intro">Join a small, curious team designing and engineering AI-native products from Nashik for people everywhere.</p>
          <a className="careers-primary-cta" href="#open-roles">See open roles <ArrowRight size={18} /></a>
        </div>
        <div className="careers-hero-aside">
          <p>What you can expect</p>
          <dl>
            <div><dt>Team</dt><dd>Small & senior</dd></div>
            <div><dt>Work</dt><dd>High ownership</dd></div>
            <div><dt>Base</dt><dd>Nashik, India</dd></div>
          </dl>
        </div>
        <div className="careers-marquee" aria-hidden="true"><span>THINK CLEARLY / BUILD BRAVELY / STAY CURIOUS / </span><span>THINK CLEARLY / BUILD BRAVELY / STAY CURIOUS / </span></div>
      </section>

      <section className="careers-principles" aria-labelledby="principles-title">
        <div className="section-heading careers-section-heading">
          <p>How we work</p>
          <h2 id="principles-title">A studio for people who like the hard parts.</h2>
        </div>
        <div className="principles-grid">
          {principles.map(({ icon: Icon, number, title, copy }) => (
            <article className="principle-card" key={number}>
              <div><span>{number}</span><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></div>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-roles" id="open-roles" aria-labelledby="roles-title">
        <Suspense fallback={<OpenRolesFallback />}>
          <OpenRoles />
        </Suspense>

        <div className="general-application">
          <div><p>Nothing with your name on it?</p><h3>Don&apos;t wait for the perfect listing.</h3></div>
          <p>Tell us what you&apos;re unusually good at and the kind of problem you want to own. We keep thoughtful introductions in our talent network.</p>
          <Link href="/careers/apply">Make an introduction <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="careers-process" aria-labelledby="process-title">
        <div className="section-heading careers-section-heading"><p>What happens next</p><h2 id="process-title">A clear, human process.</h2></div>
        <ol>
          <li><span>01</span><div><h3>Application review</h3><p>We read every complete application and look for evidence of craft, judgment, and ownership.</p></div></li>
          <li><span>02</span><div><h3>Working conversation</h3><p>A focused conversation about what you&apos;ve built, what you learned, and how you think.</p></div></li>
          <li><span>03</span><div><h3>Practical collaboration</h3><p>A role-relevant exercise or portfolio deep dive — scoped, respectful, and never speculative work.</p></div></li>
          <li><span>04</span><div><h3>Decision & clarity</h3><p>We share the decision directly, explain next steps, and avoid leaving candidates in limbo.</p></div></li>
        </ol>
      </section>

      <Footer />
    </main>
  );
}
