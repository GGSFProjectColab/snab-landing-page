import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { WhyChooseUsLayout } from "../WhyChooseUsLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Cross-Platform Expertise | SNAB Innovations",
  description:
    "Web, mobile, desktop — we build where your users need us. Shared logic, native experiences, consistent quality across platforms.",
  path: "/why-choose-us/cross-platform-expertise",
});

const points = [
  {
    number: "01",
    text: "We build once and deploy everywhere — web, mobile, and desktop.",
  },
  {
    number: "02",
    text: "Shared business logic with native UI experiences on each platform.",
  },
  {
    number: "03",
    text: "Consistent quality and performance, no matter where your users are.",
  },
  {
    number: "04",
    text: "One codebase to maintain, one team to support — reducing cost and complexity.",
  },
];

const capabilities = [
  "Next.js & React Web Apps",
  "React Native Mobile",
  "Electron Desktop",
  "Shared API Layer",
  "Platform-Specific Optimization",
  "Unified Codebase",
];

export default function CrossPlatformExpertisePage() {
  return (
    <WhyChooseUsLayout
      metadata={metadata}
      label="Cross-Platform Expertise"
      headline="Web, mobile, desktop — where your users are."
      description="We build once and deploy everywhere. Shared logic, native experiences, consistent quality across platforms."
      heroImage="/ascii-magic-16.png"
      points={points}
      contentImage="/ascii-magic-19.png"
      contentImageAlt="Cross-Platform Expertise visualization"
      capabilities={capabilities}
      ctaImage="/ascii-magic-12.png"
    />
  );
}
