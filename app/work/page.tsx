import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../Footer";
import { createPageMetadata } from "@/lib/site";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";

export const metadata: Metadata = createPageMetadata({
  title: "Work | SNAB Innovations",
  description:
    "Explore selected AI products, platforms, and custom software systems built by SNAB Innovations.",
  path: "/work",
});

const workItems = [
  {
    number: "01",
    name: "Interview Expert",
    status: "Live",
    categories: ["INTERVIEW AUTOMATION", "AI PRODUCT", "WORKFLOW SOFTWARE"],
    description:
      "An AI-enabled platform that helps teams organize interview workflows, reduce administrative overhead, and convert candidate interactions into structured, actionable intelligence.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Automated Summaries",
      "Evaluation Support",
    ],
    image: "/interviewxpert-dark.png",
    imageDark: "/interviewxpert.png",
    imageAlt: "Interview Expert Interface Preview",
  },
  {
    number: "02",
    name: "Notary Expert",
    status: "Live",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "AI PRODUCT"],
    description:
      "An intelligent workflow platform empowering notary professionals to manage legal document pipelines, appointments, client communication, and case tracking.",
    capabilities: [
      "Client Intake",
      "Document Workflows",
      "Appointment Coordination",
      "Case Tracking",
    ],
    image: "/notary-expert.png",
    imageAlt: "Notary Expert Platform Preview",
  },
  {
    number: "03",
    name: "NyayaAI",
    status: "Live",
    categories: ["LEGAL AI", "AI PRODUCT", "JUDICIAL TECH"],
    description:
      "An AI-powered legal assistance platform that helps citizens, lawyers, and judges navigate the justice system — with PIL/RTI guidance, court statistics dashboards, document intelligence, and multilingual access.",
    capabilities: [
      "Legal Guidance",
      "Document Intelligence",
      "Case Analytics",
      "Multilingual Access",
    ],
    image: "/nyaya-ai.png",
    imageAlt: "NyayaAI Logo",
    link: "https://nyayai.interviewxpert.in/",
    contain: true,
  },
  {
    number: "04",
    name: "RoomMateMatch",
    status: "Live",
    categories: ["HOSTEL FINDER", "AI MATCHING", "COMMUNITY PLATFORM"],
    description:
      "A platform that helps students find hostels and connect with compatible roommates through AI-powered matching, verified listings, and secure in-app chat.",
    capabilities: [
      "AI-Powered Matching",
      "Verified Listings",
      "Secure Chat",
      "Community Events",
    ],
    image: "/roommate-match.png",
    imageAlt: "RoomMateMatch Logo",
    link: "https://roommate.bluecreast.in/",
    contain: true,
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section aria-labelledby="work-hero-title">
        <ContainerWrapper>
          <div className="border-b border-dotted border-edge p-6 sm:p-10 md:p-14">
            <span className="font-mono text-caption text-muted-foreground uppercase tracking-widest">
              PORTFOLIO // SELECTED SYSTEMS
            </span>
            <h1
              id="work-hero-title"
              className="mt-3 text-display font-normal"
            >
              Built for real-world operations<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted-foreground">
              A collection of AI products, enterprise automation platforms, and software systems engineered for high-impact professional workflows.
            </p>
          </div>
        </ContainerWrapper>
      </section>

      {/* Main Work Showcase List */}
      <section aria-labelledby="selected-work-title">
        <ContainerWrapper>
          <HeaderTitle title="Work we've shipped" id="selected-work-title" />

          <div className="divide-y divide-dotted divide-edge">
            {workItems.map((item) => (
              <div
                key={item.number}
                className="group p-4 sm:p-6 md:p-8 md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center"
              >
                {/* Information Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Index & Status */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-caption text-muted-foreground">
                        {item.number}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                        <span className="font-mono text-caption text-muted-foreground">
                          {item.status}
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-2 text-title font-normal tracking-tight">
                      {item.name}
                    </h2>

                    {/* Category Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-sm border border-dotted border-edge px-2 py-0.5 font-mono text-caption text-muted-foreground"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-4 max-w-xl text-body leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Capabilities list */}
                    <div className="mt-4 border-t border-dotted border-edge pt-3">
                      <span className="block font-mono text-caption text-muted-foreground/80">
                        {item.capabilities.join(" • ")}
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6">
                    <a
                      href={"link" in item && item.link ? item.link : "#"}
                      target={"link" in item && item.link ? "_blank" : undefined}
                      rel={"link" in item && item.link ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-button font-normal text-foreground transition-colors hover:text-muted-foreground"
                    >
                      <span>Explore system</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                </div>

                {/* Visual Preview Column */}
                <div className="mt-6 md:mt-0 flex justify-center">
                  <div className="relative h-[220px] w-full max-w-[280px] sm:max-w-[320px] md:h-[240px] md:w-[240px] overflow-hidden rounded-[10px] border border-dotted border-edge p-2 bg-accent/20 transition-colors group-hover:border-foreground/20">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 10px)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-[6px]">
                      <Image
                        className={`h-full w-full ${"contain" in item && item.contain ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-105 ${"imageDark" in item && item.imageDark ? "block dark:hidden" : ""}`}
                        src={item.image}
                        alt={item.imageAlt}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                      {"imageDark" in item && item.imageDark && (
                        <Image
                          className={`h-full w-full ${"contain" in item && item.contain ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-105 hidden dark:block`}
                          src={item.imageDark as string}
                          alt={item.imageAlt}
                          width={400}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 240px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}
