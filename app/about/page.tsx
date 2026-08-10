import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata } from "@/lib/site";
import { BrandLogo } from "../BrandLogo";
import "./about.css";
import "../legacy.css";

const principles = [
  "We start with the workflow, not the model.",
  "We design for reliability, security, and maintainability.",
  "We ship in useful increments and improve continuously.",
  "We take ownership from the first decision to production.",
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We learn the domain, the users, and the constraints. Then we map the problem clearly.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We shape the system—flows, interfaces, data, and AI behavior—around the work it must support.",
  },
  {
    number: "03",
    title: "Engineer",
    description:
      "We build the complete product with clean code, practical testing, and production observability.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "We measure what happens in use, learn from real conditions, and refine the system over time.",
  },
];

const capabilities = [
  {
    title: "AI product development",
    description:
      "From product definition to the data, model, interface, and evaluation layers required in production.",
  },
  {
    title: "Workflow automation",
    description:
      "Connected systems that reduce manual work without losing the rules, reviews, or context that matter.",
  },
  {
    title: "Web platforms",
    description:
      "Purpose-built applications for teams that need clear interfaces, dependable integrations, and room to grow.",
  },
  {
    title: "Desktop software",
    description:
      "Focused cross-platform tools for workflows that need local performance, privacy, or device access.",
  },
  {
    title: "Agents and assistants",
    description:
      "Task-oriented systems that act, decide, and hand work back to people at the right moment.",
  },
  {
    title: "RAG systems",
    description:
      "Retrieval and knowledge layers designed around trusted sources, useful answers, and visible failure modes.",
  },
];

const products = [
  {
    name: "Interview Expert",
    description:
      "An AI-enabled platform that helps teams organize interview workflows and turn interview information into structured, actionable records.",
    image: "/interviewxpert.png",
    imageAlt: "Interview Expert product mark",
  },
  {
    name: "Notary Expert",
    description:
      "An intelligent workflow platform for managing documents, appointments, client communication, and case progress.",
    image: "/notary-expert.png",
    imageAlt: "Notary Expert product mark",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "About Our AI Product Engineering Studio",
  description:
    "Meet SNAB Innovations, a Nashik-based AI product and software engineering studio building dependable products, workflow automation, agents, and connected systems.",
  path: "/about",
});

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="about-arrow"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 10H16M11 5L16 10L11 15" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <article>
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-copy">
            <h1 id="about-title">
              We build the systems behind intelligent work<span>.</span>
            </h1>
            <p>
              SNAB Innovations is an AI product and software engineering studio
              based in Nashik, India. We help teams turn complex workflows into
              dependable systems—designed with clarity, built for scale, and
              improved over time.
            </p>
          </div>

          <div className="about-tree-frame" aria-hidden="true">
            <Image src="/pixel-tree.svg" alt="" width={1113} height={479} sizes="(max-width: 800px) 100vw, 62vw" />
          </div>
        </section>

        <section className="about-purpose" aria-labelledby="purpose-title">
          <div className="about-purpose-container">
            <p className="about-section-kicker">Why we exist</p>
            <h2 id="purpose-title">
              Closing the gap between AI demos and dependable products<span>.</span>
            </h2>
            <p className="about-purpose-lead">
              AI has moved fast. Product outcomes have not always kept pace. We
              bring product thinking, engineering discipline, and domain context
              together to build systems that work in the real world.
            </p>
            <ul className="about-principles" aria-label="Our product principles">
              {principles.map((principle, idx) => (
                <li key={principle}><span>0{idx + 1}</span> {principle}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-process" id="approach" aria-labelledby="process-title">
          <div className="about-section-header">
            <p className="about-section-kicker">How we work</p>
            <h2 id="process-title">The engineering process.</h2>
          </div>

          <ol className="about-process-list">
            {process.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="about-capabilities"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="about-section-header">
            <p className="about-section-kicker">What we build</p>
            <h2 id="capabilities-title">Capabilities.</h2>
          </div>

          <ul className="about-capabilities-list">
            {capabilities.map((capability) => (
              <li key={capability.title} className="capability-card">
                <h2>{capability.title}</h2>
                <p>{capability.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-work" aria-labelledby="work-title">
          <div className="about-section-header">
            <p className="about-section-kicker">Selected product work</p>
            <h2 id="work-title">What we've shipped.</h2>
          </div>

          <div className="about-products">
            {products.map((product) => (
              <article className="about-product" key={product.name}>
                <div className="about-product-mark">
                  <Image src={product.image} alt={product.imageAlt} width={320} height={320} sizes="(max-width: 700px) 42vw, 240px" />
                </div>
                <div className="about-product-copy">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <a href="/projects">
                    View product <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta" aria-labelledby="about-cta-title">
          <div className="about-cta-container">
            <p className="about-section-kicker">Let's build what matters</p>
            <h2 id="about-cta-title">
              Bring us the workflow that should work better<span>.</span>
            </h2>
            <p>
              Whether you are starting from an idea or improving an existing
              product, we can help shape the system and build it properly.
            </p>
            <a className="about-cta-link" href="/contact">
              Start a conversation <ArrowIcon />
            </a>
          </div>
        </section>
      </article>

      <footer className="about-footer">
        <a className="about-brand about-footer-brand" href="/">
          <BrandLogo className="about-footer-logo" />
          <span>SNAB Innovations</span>
        </a>
        <p>
          AI product &amp; software engineering studio
          <br />
          Nashik, India
        </p>
        <nav aria-label="Footer navigation">
          <a href="/about">About</a>
          <a href="/projects">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#approach">Approach</a>
          <a href="/careers">Careers</a>
          <a href="/contact">Contact</a>
        </nav>
        <small>&copy; 2026 SNAB Innovations</small>
      </footer>
    </main>
  );
}
