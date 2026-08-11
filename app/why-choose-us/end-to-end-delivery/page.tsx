import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { WhyChooseUsLayout } from "../WhyChooseUsLayout";

export const metadata: Metadata = createPageMetadata({
  title: "End-to-End Delivery | SNAB Innovations",
  description:
    "From ideation to deployment, we own the full product lifecycle. Strategy, design, engineering, deployment, and support — one team.",
  path: "/why-choose-us/end-to-end-delivery",
});

const points = [
  {
    number: "01",
    text: "Strategy, design, engineering, deployment, and support — all under one roof.",
  },
  {
    number: "02",
    text: "No handoff gaps. No blame chains. One accountable team from start to finish.",
  },
  {
    number: "03",
    text: "We ship in useful increments, so you see progress every two weeks.",
  },
  {
    number: "04",
    text: "Post-launch support is built into every engagement, not an add-on.",
  },
];

const capabilities = [
  "Product Strategy",
  "Full-Stack Engineering",
  "Cloud Deployment",
  "Ongoing Maintenance",
  "Sprint Demos",
  "Continuous Improvement",
];

export default function EndToEndDeliveryPage() {
  return (
    <WhyChooseUsLayout
      metadata={metadata}
      label="End-to-End Delivery"
      headline="From idea to production, one team."
      description="Strategy, design, engineering, deployment, and support — under one roof. No handoff gaps, no blame chains."
      heroImage="/ascii-magic-11.png"
      points={points}
      contentImage="/ascii-magic-6.png"
      contentImageAlt="End-to-End Delivery visualization"
      capabilities={capabilities}
    />
  );
}
