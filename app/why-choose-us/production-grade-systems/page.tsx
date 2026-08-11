import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { WhyChooseUsLayout } from "../WhyChooseUsLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Production-Grade Systems | SNAB Innovations",
  description:
    "Every solution is built for scale, reliability, and security from day one. Auto-scaling, monitoring, error handling, and secure auth.",
  path: "/why-choose-us/production-grade-systems",
});

const points = [
  {
    number: "01",
    text: "Every system is designed to handle real traffic, real failures, and real security threats.",
  },
  {
    number: "02",
    text: "We build monitoring and alerting in from day one — not as an afterthought.",
  },
  {
    number: "03",
    text: "Auto-scaling, redundancy, and failover are standard, not premium features.",
  },
  {
    number: "04",
    text: "Security audits and penetration testing are part of our delivery process.",
  },
];

const capabilities = [
  "Auto-Scaling Infrastructure",
  "Real-Time Monitoring",
  "Error Handling & Recovery",
  "Secure Authentication",
  "Data Encryption",
  "Load Testing",
];

export default function ProductionGradeSystemsPage() {
  return (
    <WhyChooseUsLayout
      metadata={metadata}
      label="Production-Grade Systems"
      headline="Built for scale, reliability, and security."
      description="Every solution is built for scale, reliability, and security from day one. No shortcuts, no tech debt compromises."
      heroImage="/ascii-magic-11.png"
      points={points}
      contentImage="/ascii-magic-6.png"
      contentImageAlt="Production-Grade Systems visualization"
      capabilities={capabilities}
    />
  );
}
