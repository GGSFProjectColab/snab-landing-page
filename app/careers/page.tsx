import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Footer } from "../Footer";
import { getPublishedJobs } from "@/lib/careers";
import { RolesSkeleton } from "./RolesSkeleton";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import "./careers.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Careers in AI & Software Engineering",
  description:
    "Explore open AI, product, design, and software engineering roles at SNAB Innovations in Nashik, India.",
  path: "/careers",
});

const benefits = [
  {
    number: "01",
    title: "Mission-Driven Craft",
    copy: "Every role at SNAB directly contributes to intelligent tools and workflow software that solve real, complex problems for users.",
  },
  {
    number: "02",
    title: "AI-Native Engineering",
    copy: "Collaborate alongside experienced engineers building agentic workflows, LLM pipelines, and production-grade applications.",
  },
  {
    number: "03",
    title: "High Ownership & Growth",
    copy: "We keep teams small and senior so everyone connects strategy, architecture, implementation, and customer impact.",
  },
  {
    number: "04",
    title: "Flexible Work Environment",
    copy: "Low-friction, focused work environment based in Nashik, India with hybrid flexibility—where contribution matters most.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Application Review",
    copy: "We read every application carefully, evaluating craft, judgment, and past problem ownership.",
  },
  {
    number: "02",
    title: "Working Conversation",
    copy: "A focused conversation about what you've built, key learnings, and how you approach complex challenges.",
  },
  {
    number: "03",
    title: "Practical Collaboration",
    copy: "A role-relevant exercise or technical deep dive—scoped, respectful, and never speculative work.",
  },
  {
    number: "04",
    title: "Decision & Clarity",
    copy: "We communicate decisions clearly and promptly, respecting your time and providing honest feedback.",
  },
];

async function OpenRoles() {
  const jobs = await getPublishedJobs();

  return (
    <>
      <div className="roles-header">
        <div>
          <p className="careers-kicker">
            <span className="careers-kicker-dot" /> Current Openings
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Explore available opportunities to shape the future of AI software with us.
          </p>
        </div>
        <div className="roles-count-badge">
          <span>{String(jobs.length).padStart(2, "0")} OPEN {jobs.length === 1 ? "ROLE" : "ROLES"}</span>
        </div>
      </div>

      {jobs.length ? (
        <div className="roles-list">
          {jobs.map((job) => (
            <Link href={`/careers/${job.slug}`} key={job.id} className="role-card group">
              <div>
                <div className="role-department">{job.department}</div>
                <div className="role-location-badge">
                  <MapPin size={12} />
                  <span>{job.location} · {job.work_mode}</span>
                </div>
              </div>
              <div>
                <h3 className="role-title">{job.title}</h3>
                <p className="role-summary">{job.summary}</p>
              </div>
              <div className="role-action" aria-hidden="true">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-openings">
          <p>There are no published roles today, but thoughtful introductions are always welcome.</p>
        </div>
      )}
    </>
  );
}

function OpenRolesFallback() {
  return (
    <>
      <div className="roles-header">
        <div>
          <p className="careers-kicker">
            <span className="careers-kicker-dot" /> Current Openings
          </p>
          <p className="text-sm text-muted-foreground mt-1">Loading open roles...</p>
        </div>
        <div className="roles-count-badge">
          <span>LOADING...</span>
        </div>
      </div>
      <RolesSkeleton />
    </>
  );
}

export default function CareersPage() {
  return (
    <main className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero" aria-labelledby="careers-title">
        <ContainerWrapper>
          <HeaderTitle title="Careers at SNAB" id="careers-title" />
          
          <div className="careers-hero-banner-frame">
            <Image
              src="/careers-hero-banner.jpg"
              alt="SNAB AI Engineering Studio"
              width={1200}
              height={675}
              priority
              className="object-cover"
            />
          </div>

          <div className="careers-hero-content">
            <div>
              <p className="careers-kicker">
                <span className="careers-kicker-dot" /> Careers at SNAB Innovations
              </p>
              <h1 className="careers-hero-heading">
                Build work that matters.
              </h1>
              <p className="careers-hero-intro">
                At SNAB, we believe that building high-impact AI products starts with passionate people.
                Join a small, curious team engineering intelligent software from Nashik for teams worldwide.
              </p>
            </div>
            
            <div className="careers-hero-meta">
              <p className="careers-hero-meta-title">At a glance</p>
              <div className="careers-hero-meta-list">
                <div className="careers-hero-meta-item">
                  <span className="careers-hero-meta-label">Location</span>
                  <span className="careers-hero-meta-val">Nashik, IN / Hybrid</span>
                </div>
                <div className="careers-hero-meta-item">
                  <span className="careers-hero-meta-label">Structure</span>
                  <span className="careers-hero-meta-val">Small & Senior Team</span>
                </div>
                <div className="careers-hero-meta-item">
                  <span className="careers-hero-meta-label">Culture</span>
                  <span className="careers-hero-meta-val">High Autonomy</span>
                </div>
              </div>
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Why Join SNAB Section */}
      <section className="py-12 md:py-16" aria-labelledby="why-join-title">
        <ContainerWrapper>
          <HeaderTitle title="Why Join SNAB?" id="why-join-title" />
          
          <div className="why-join-grid mt-8">
            <div className="why-join-image-frame">
              <Image
                src="/careers-why-join.jpg"
                alt="SNAB Team Collaboration"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>

            <div className="why-join-benefits">
              {benefits.map((item) => (
                <div className="benefit-item" key={item.number}>
                  <span className="benefit-number">{item.number}</span>
                  <div>
                    <h3 className="benefit-title">{item.title}</h3>
                    <p className="benefit-desc">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Join Our Growing Team Section */}
      <section className="py-12 md:py-16" id="open-roles" aria-labelledby="roles-title">
        <ContainerWrapper>
          <HeaderTitle title="Join Our Growing Team" id="roles-title" />

          <div className="mt-8">
            <Suspense fallback={<OpenRolesFallback />}>
              <OpenRoles />
            </Suspense>
          </div>

          <div className="general-application">
            <div>
              <h3 className="general-app-title">Don&apos;t see your specific role?</h3>
              <p className="general-app-desc">
                We&apos;re always interested in meeting exceptional AI engineers, full-stack developers, and product thinkers. Tell us what you&apos;re unusually good at and the kind of problem you want to solve.
              </p>
            </div>
            <Link href="/careers/apply" className="general-app-btn">
              Make an introduction <ArrowRight size={16} />
            </Link>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {/* Recruitment Process Section */}
      <section className="py-12 md:py-16" aria-labelledby="process-title">
        <ContainerWrapper>
          <HeaderTitle title="What Happens Next" id="process-title" />

          <div className="process-grid mt-8">
            {processSteps.map((step) => (
              <div className="process-card" key={step.number}>
                <span className="process-step-num">{step.number}</span>
                <div>
                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-desc">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <Footer />
    </main>
  );
}
