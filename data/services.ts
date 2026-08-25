export type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  image: string | null;
  imageAlt: string;
  visual?: string;
  highlights?: string[];
};

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Workflow Orchestration",
    description:
      "Intelligent automation pipelines turning manual, repetitive work into reliable, self-running processes.",
    capabilities: ["Process Automation", "Document Processing", "LLM Integration"],
    highlights: [
      "End-to-end document & multimodal ingestion",
      "Real-time LLM reasoning & schema validation",
      "Automated routing with human oversight",
    ],
    image: "/services/Workflow_orchestration_icon_2K_202608251818.jpeg",
    imageAlt: "Workflow Orchestration icon",
    visual: "flow",
  },
  {
    number: "02",
    title: "Intelligent Agents",
    description:
      "Autonomous AI agents that plan, reason, and act inside your systems with human oversight built in.",
    capabilities: ["AI Agents", "Orchestration", "RAG"],
    highlights: [
      "Multi-agent orchestration with role delegators",
      "Deterministic guardrails & safety bounds",
      "Tool integrations with CRM, ERP & custom APIs",
    ],
    image: "/services/Intelligent_agents_icon_nodes_2K_202608251818.jpeg",
    imageAlt: "Intelligent Agents icon",
    visual: "orb",
  },
  {
    number: "03",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications delivering fluid, high-performance customer experiences.",
    capabilities: ["iOS", "Android", "React Native", "Flutter"],
    highlights: [
      "Smooth 60fps performance on iOS & Android",
      "Offline-first caching & biometric security",
      "On-device ML inference with low latency",
    ],
    image: "/services/Minimalist_smartphone_icon_design_2K_202608251818.jpeg",
    imageAlt: "Mobile Apps icon",
    visual: "mobile",
  },
  {
    number: "04",
    title: "Desktop Apps",
    description:
      "Fast, offline-capable desktop software engineered for demanding professional workflows.",
    capabilities: ["Windows", "macOS", "Linux", "Electron"],
    highlights: [
      "Sub-millisecond IPC & minimal RAM footprint",
      "Native tray integration & multi-window docking",
      "Auto-updating cross-platform distribution",
    ],
    image: "/services/Desktop_app_minimalist_tech_icon_202608251818.jpeg",
    imageAlt: "Desktop Apps icon",
    visual: "desktop",
  },
  {
    number: "05",
    title: "Cloud Architecture",
    description:
      "Scalable cloud architecture engineered for reliability, enterprise security, and cost efficiency.",
    capabilities: ["AWS", "GCP", "Azure", "Serverless"],
    highlights: [
      "Multi-region auto-scaling & edge compute",
      "Zero-downtime blue/green deployments",
      "DDoS protection & real-time telemetry",
    ],
    image: "/services/Cloud_architecture_icon_design_2K_202608251818.jpeg",
    imageAlt: "Cloud Architecture icon",
    visual: "dithering",
  },
  {
    number: "06",
    title: "DevOps & Reliability",
    description:
      "Delivery pipelines and infrastructure as code that keep releases fast and systems healthy.",
    capabilities: ["CI/CD", "IaC", "Monitoring"],
    highlights: [
      "Automated CI/CD release pipelines",
      "Infrastructure as Code via Terraform & Docker",
      "24/7 observability & proactive alerting",
    ],
    image: "/services/DevOps_icon_with_gear_2K_202608251818.jpeg",
    imageAlt: "DevOps and Reliability icon",
    visual: "globe",
  },
  {
    number: "07",
    title: "Deployment",
    description:
      "End-to-end release engineering getting your product live on the web, app stores, and cloud — reliably and repeatably.",
    capabilities: ["App Store Releases", "Hosting & CDN", "Rollbacks"],
    highlights: [
      "Zero-downtime production rollouts",
      "Automated signing & store submissions",
      "Blue/green & canary release strategies",
    ],
    image: "/services/Deployment_icon_with_upward_arrow_202608251818.jpeg",
    imageAlt: "Deployment icon",
    visual: "dithering",
  },
  {
    number: "08",
    title: "SEO",
    description:
      "Technical and on-page search optimization engineered into your product from day one, not bolted on after launch.",
    capabilities: ["Technical SEO", "Core Web Vitals", "Structured Data"],
    highlights: [
      "Crawlability, indexing & schema audits",
      "Performance budgets tied to Lighthouse scores",
      "Content architecture & metadata systems",
    ],
    image: "/services/SEO_icon_with_data_visualization_202608251819.jpeg",
    imageAlt: "SEO icon",
    visual: "globe",
  },
  {
    number: "09",
    title: "Training & Development",
    description:
      "Hands-on enablement that levels up your team — from AI adoption workshops to complete engineering handover programs.",
    capabilities: ["AI Enablement", "Workshops", "Documentation"],
    highlights: [
      "Custom curricula for engineering & ops teams",
      "Live system walkthroughs & pair programming",
      "Runbooks, docs & long-term knowledge transfer",
    ],
    image: "/services/Training_and_development_icon_2K_202608251819.jpeg",
    imageAlt: "Training and Development icon",
    visual: "flow",
  },
];
