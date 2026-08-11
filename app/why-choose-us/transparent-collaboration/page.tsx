import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata } from "@/lib/site";
import { WhyChooseUsLayout } from "../WhyChooseUsLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Transparent Collaboration | SNAB Innovations",
  description:
    "Shared milestones, demos, and decisions keep you close to the work. See the work as it happens with open communication.",
  path: "/why-choose-us/transparent-collaboration",
});

const points = [
  {
    number: "01",
    text: "Shared dashboards give you real-time visibility into project progress.",
  },
  {
    number: "02",
    text: "Regular demos every two weeks — you see working software, not slides.",
  },
  {
    number: "03",
    text: "Direct Slack access means no ticket systems or email chains for quick questions.",
  },
  {
    number: "04",
    text: "Milestones are agreed together, tracked openly, and hit consistently.",
  },
];

const capabilities = [
  "Sprint Demos",
  "Shared Milestones",
  "Real-Time Dashboards",
  "Direct Slack Access",
  "Weekly Syncs",
  "Open Decision Logs",
];

export default function TransparentCollaborationPage() {
  return (
    <WhyChooseUsLayout
      metadata={metadata}
      label="Transparent Collaboration"
      headline="See the work as it happens."
      description="Shared dashboards, regular demos, and open communication. You never wonder what's happening — you see it."
      heroImage="/transparent-collaboration.jpg"
      points={points}
      contentImage="/transparent-collaboration.jpg"
      contentImageAlt="Transparent Collaboration visualization"
      capabilities={capabilities}
    />
  );
}
