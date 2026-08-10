import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { Footer } from "../Footer";
import "./services.css";
import "../legacy.css";

const phases = [
  {
    number: "01", phase: "Phase One", title: "Discovery & Consultation", signal: "Direction",
    description: "Our journey begins with a deep dive. We host a focused consultation to clarify your vision, evaluate feasibility, define target users, and establish high-level project goals.",
    deliverables: ["Initial concept brainstorming", "Feasibility & technology advice", "Business requirements alignment"],
  },
  {
    number: "02", phase: "Phase Two", title: "Requirement Analysis", signal: "Definition",
    description: "We analyze technical constraints and compile functional requirements into a shared software specification that maps exactly what needs to be built.",
    deliverables: ["Functional specifications document", "User story mapping", "API architecture draft"],
  },
  {
    number: "03", phase: "Phase Three", title: "Planning & Strategy", signal: "Blueprint",
    description: "Our architects map database schemas, select the right cloud infrastructure, outline milestones, and organize the work into practical delivery sprints.",
    deliverables: ["Tech stack finalization", "Database diagram draft", "Sprint timelines & milestone plan"],
  },
  {
    number: "04", phase: "Phase Four", title: "UI/UX Design", signal: "Experience",
    description: "Our designers create wireframes, interactive user flows, and high-fidelity layouts that make complex products feel clear, cohesive, and effortless to use.",
    deliverables: ["Wireframes & prototypes", "Premium visual styling direction", "Interactive click-through mockups"],
  },
  {
    number: "05", phase: "Phase Five", title: "Development", signal: "Build",
    description: "Our engineers write clean, scalable code in iterative sprints, keeping progress visible through regular demonstrations and automated build environments.",
    deliverables: ["Agile two-week development sprints", "Frequent demo walkthroughs", "Continuous integration pipelines"],
  },
  {
    number: "06", phase: "Phase Six", title: "Testing & QA", signal: "Confidence",
    description: "Manual and automated testing examine product logic, security controls, API responses, performance, accessibility, and cross-browser visual compatibility.",
    deliverables: ["Manual user acceptance testing", "Automated system test cases", "Security & performance checkups"],
  },
  {
    number: "07", phase: "Phase Seven", title: "Deployment", signal: "Release",
    description: "We launch through secure, automated delivery pipelines into AWS, GCP, or Azure, using rollout and rollback strategies designed to minimize release risk and downtime.",
    deliverables: ["Production cloud configuration", "CI/CD deployment automation", "DNS, SSL & analytics setup"],
  },
  {
    number: "08", phase: "Phase Eight", title: "Maintenance & Support", signal: "Growth",
    description: "After launch, we provide ongoing maintenance, monitoring, performance audits, and feature development so the product can stay secure and scale with demand.",
    deliverables: ["24/7 server monitoring & alert logs", "Monthly dependency & security updates", "New feature rollouts & integrations"],
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "AI & Custom Software Development Services",
  description:
    "Explore end-to-end AI and custom software development: discovery, product strategy, UI/UX, engineering, QA, cloud deployment, and ongoing support.",
  path: "/services",
});

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M11 5l5 5-5 5" /></svg>;
}

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero-grid" aria-hidden="true" />
        <div className="services-hero-copy">
          <p className="services-kicker"><span aria-hidden="true" /> End-to-end product delivery</p>
          <h1 id="services-title">From first sketch<br />to <em>always on.</em></h1>
          <p className="services-hero-intro">One accountable team to define, design, engineer, launch, and continuously improve your digital product.</p>
          <div className="services-hero-actions">
            <a href="/contact" className="services-primary-cta">Plan your project <ArrowIcon /></a>
            <a href="#delivery-process" className="services-text-link">Explore the process <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="services-blueprint" aria-label="Eight-phase delivery system">
          <div className="services-blueprint-head"><span>Delivery system</span><span>SNAB / 01—08</span></div>
          <div className="services-radar" aria-hidden="true">
            <span className="services-radar-ring ring-one" /><span className="services-radar-ring ring-two" /><span className="services-radar-ring ring-three" />
            <span className="services-radar-axis axis-x" /><span className="services-radar-axis axis-y" /><span className="services-radar-sweep" /><span className="services-radar-core">08</span>
          </div>
          <ol className="services-blueprint-phases">
            {phases.map((phase) => <li key={phase.number}><span>{phase.number}</span><span>{phase.signal}</span></li>)}
          </ol>
          <div className="services-blueprint-status"><span><i /> One team</span><span>Idea → Operation</span></div>
        </div>

        <div className="services-proof-strip" aria-label="Delivery principles">
          <div><strong>08</strong><span>Connected phases</span></div>
          <div><strong>01</strong><span>Accountable team</span></div>
          <div><strong>∞</strong><span>Room to evolve</span></div>
        </div>
      </section>

      <section className="services-process" id="delivery-process" aria-labelledby="delivery-title">
        <div className="services-process-intro">
          <p><span>01</span> How we deliver</p>
          <h2 id="delivery-title">A clear route from ambiguity to operation.</h2>
          <p>Every phase closes a different kind of risk. You see the decisions, outputs, and progress before the work moves forward.</p>
        </div>
        <ol className="services-phase-list">
          {phases.map((phase) => (
            <li className="services-phase" key={phase.number}>
              <div className="services-phase-marker" aria-hidden="true"><span>{phase.number}</span><i /></div>
              <div className="services-phase-label"><span>{phase.phase}</span><span>{phase.signal}</span></div>
              <div className="services-phase-copy"><h3>{phase.title}</h3><p>{phase.description}</p></div>
              <div className="services-phase-outputs">
                <p>Typical outputs</p>
                <ul>{phase.deliverables.map((deliverable) => <li key={deliverable}><span aria-hidden="true">↳</span> {deliverable}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="services-working-model" aria-labelledby="working-model-title">
        <div className="services-model-index"><span>02</span><p>Built into every phase</p></div>
        <div className="services-model-copy"><p>Our operating standard</p><h2 id="working-model-title">Visible progress. Secure foundations. No mystery handoffs.</h2></div>
        <ul className="services-model-points">
          <li><span>01</span><strong>Transparent delivery</strong><p>Shared milestones, demos, and decisions keep your team close to the work.</p></li>
          <li><span>02</span><strong>Security by design</strong><p>Security requirements and testing are considered across the lifecycle—not added at the end.</p></li>
          <li><span>03</span><strong>Built to change</strong><p>Maintainable systems, observability, and documented decisions make future growth easier.</p></li>
        </ul>
      </section>

      <section className="services-cta" aria-labelledby="services-cta-title">
        <div className="services-cta-grid" aria-hidden="true" />
        <p>Have a product in mind?</p>
        <h2 id="services-cta-title">Bring us the idea.<br />We&apos;ll build the path.</h2>
        <a href="/contact">Start with discovery <ArrowIcon /></a>
        <span className="services-cta-note">Nashik, India / Working globally</span>
      </section>
      <Footer />
    </main>
  );
}
