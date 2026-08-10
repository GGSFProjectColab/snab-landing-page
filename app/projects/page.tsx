import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../Footer";
import { createPageMetadata } from "@/lib/site";
import { ProjectsHorizontalWrapper } from "./ProjectsHorizontalWrapper";
import "./projects.css";
import "../legacy.css";

export const metadata: Metadata = createPageMetadata({
  title: "Projects | SNAB Innovations",
  description: "View our selected AI products and software engineering projects built by SNAB Innovations.",
  path: "/projects",
});

const projects = [
  {
    number: "01",
    name: "Interview Expert",
    categories: [
      "INTERVIEW AUTOMATION",
      "AI PRODUCT",
      "WORKFLOW SOFTWARE"
    ],
    description:
      "An AI-enabled platform that helps teams organize interview workflows, reduce administrative work, and turn interview information into structured, actionable records.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Summaries",
      "Evaluation Support"
    ],
    image: "/interviewxpert.png",
    imageAlt: "Interview Expert mark"
  },
  {
    number: "02",
    name: "Notary Expert",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "AI PRODUCT"],
    description:
      "An intelligent workflow platform that helps notary professionals manage documents, appointments, client communication, and case progress more efficiently.",
    capabilities: [
      "Client Intake",
      "Document Workflows",
      "Appointment Coordination",
      "Case Tracking"
    ],
    image: "/notary-expert.png",
    imageAlt: "Notary Expert seal"
  }
];

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <section className="projects-hero">
        <h1>The systems<br />we've shipped<span>.</span></h1>
        <p>A selection of AI products and tools built for real-world professional workflows.</p>
        <span className="scroll-indicator">Scroll to explore &darr;</span>
      </section>

      <ProjectsHorizontalWrapper>
        {projects.map((project) => (
          <section className="project-panel" key={project.number}>
            <div className="project-content">
              <div className="project-info">
                <span className="project-index">{project.number}</span>
                <h2>{project.name}</h2>
                <div className="project-tags">
                  {project.categories.map((category) => (
                    <span className="project-tag" key={category}>{category}</span>
                  ))}
                </div>
                <p>{project.description}</p>
                <div className="project-tags" style={{ borderTop: '1px solid var(--proj-line)', paddingTop: '24px' }}>
                  {project.capabilities.map((cap) => (
                    <span className="project-tag" style={{ border: 'none', padding: 0 }} key={cap}>{cap}</span>
                  ))}
                </div>
              </div>
              <div className="project-visual">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={600}
                  height={600}
                  sizes="(max-width: 900px) 90vw, 40vw"
                />
              </div>
            </div>
          </section>
        ))}
      </ProjectsHorizontalWrapper>

      <Footer />
    </main>
  );
}
