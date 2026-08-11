import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { WhyChooseUsLayout } from "../WhyChooseUsLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Workflow-Centric Design | SNAB Innovations",
  description:
    "We start with the workflow, not the model — ensuring real-world impact. Process mapping, user journey analysis, and automation design.",
  path: "/why-choose-us/workflow-centric-design",
});

const points = [
  {
    number: "01",
    text: "We map how work actually flows before choosing any tools or models.",
  },
  {
    number: "02",
    text: "The model serves the process — not the other way around.",
  },
  {
    number: "03",
    text: "Every automation is designed around the people who use it daily.",
  },
  {
    number: "04",
    text: "We validate workflows with real users before writing a single line of code.",
  },
];

const capabilities = [
  "Process Mapping",
  "User Journey Analysis",
  "Automation Design",
  "Tool Selection",
  "Workflow Validation",
  "Impact Measurement",
];

export default function WorkflowCentricDesignPage() {
  return (
    <WhyChooseUsLayout
      metadata={metadata}
      label="Workflow-Centric Design"
      headline="Start with the workflow, not the model."
      description="We map how work actually flows before choosing tools. The model serves the process — not the other way around."
      heroImage="/ascii-magic-12.png"
      points={points}
      contentImage="/ascii-magic-13.png"
      contentImageAlt="Workflow-Centric Design visualization"
      capabilities={capabilities}
      ctaImage="/ascii-magic-10.png"
    />
  );
}
