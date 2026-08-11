import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { WhyChooseUsLayout } from "../WhyChooseUsLayout";

export const metadata: Metadata = createPageMetadata({
  title: "AI-First Architecture | SNAB Innovations",
  description:
    "We design every system with AI at its core, not as an afterthought. Custom LLM pipelines, RAG systems, and inference optimization.",
  path: "/why-choose-us/ai-first-architecture",
});

const points = [
  {
    number: "01",
    text: "AI shapes every decision — data models, APIs, and user experience — from day one.",
  },
  {
    number: "02",
    text: "We don't retrofit intelligence. We architect systems where AI is the foundation.",
  },
  {
    number: "03",
    text: "Each model choice is driven by the problem, not hype — ensuring real performance.",
  },
  {
    number: "04",
    text: "From prompt engineering to fine-tuning, we build AI that actually works in production.",
  },
];

const capabilities = [
  "Custom LLM Pipelines",
  "RAG Systems",
  "Vector Search",
  "Inference Optimization",
  "Model Evaluation",
  "AI-Native Data Models",
];

export default function AiFirstArchitecturePage() {
  return (
    <WhyChooseUsLayout
      metadata={metadata}
      label="AI-First Architecture"
      headline="AI at the core, not the bolt-on."
      description="We design every system with AI at its core, not as an afterthought. Intelligence is built into the foundation — not layered on top."
      heroImage="/ascii-magic-11.png"
      points={points}
      contentImage="/ascii-magic-14.png"
      contentImageAlt="AI-First Architecture visualization"
      capabilities={capabilities}
      ctaImage="/ascii-magic-6.png"
    />
  );
}
