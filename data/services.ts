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
      "Intelligent automation pipelines that convert fragmented manual work into dependable self running processes engineered for accuracy scale and auditability.",
    capabilities: ["Process Automation", "Document Processing", "LLM Integration"],
    highlights: [
      "Structured ingestion for documents events and system data with normalization",
      "Language model reasoning with validated schemas and complete audit trails",
      "Adaptive routing with human oversight where judgment and compliance matter",
      "Continuous monitoring with automatic error recovery and SLA reporting",
      "Versioned workflow definitions with instant rollback and compliance logging",
    ],
    image: "/services/Workflow_orchestration_icon_2K_202608251818.jpeg",
    imageAlt: "Workflow Orchestration icon",
    visual: "flow",
  },
  {
    number: "02",
    title: "Intelligent Agents",
    description:
      "Autonomous agents that plan reason and act inside your business systems with human oversight built in for safe delegation at scale.",
    capabilities: ["AI Agents", "Orchestration", "RAG"],
    highlights: [
      "Multi agent orchestration with role based delegation and task planning",
      "Tool use across CRM ERP and custom APIs with secure scoped access",
      "Deterministic guardrails and policy bounds for every autonomous action",
      "Memory and retrieval grounded in your private knowledge base and documents",
      "Continuous evaluation with feedback loops and performance scoring",
    ],
    image: "/services/Intelligent_agents_icon_nodes_2K_202608251818.jpeg",
    imageAlt: "Intelligent Agents icon",
    visual: "orb",
  },
  {
    number: "03",
    title: "Mobile Apps",
    description:
      "Native and cross platform mobile applications that deliver fluid high performance experiences customers trust every day.",
    capabilities: ["iOS", "Android", "React Native", "Flutter"],
    highlights: [
      "Consistent 60fps performance across iOS and Android with fluid animations",
      "Offline first data caching with biometric authentication and encryption",
      "On device intelligence with low latency inference and privacy preservation",
      "Store ready builds with analytics crash reporting and staged rollouts",
      "Push notifications with deep linking and in app messaging journeys",
    ],
    image: "/services/Minimalist_smartphone_icon_design_2K_202608251818.jpeg",
    imageAlt: "Mobile Apps icon",
    visual: "mobile",
  },
  {
    number: "04",
    title: "Desktop Apps",
    description:
      "Fast offline capable desktop software engineered for demanding professional workflows and power users who need reliability.",
    capabilities: ["Windows", "macOS", "Linux", "Electron"],
    highlights: [
      "Native performance with minimal memory footprint and fast startup",
      "Multi window docking tray integration keyboard shortcuts and menus",
      "Secure local storage with encrypted sync when online and conflict handling",
      "Auto updating installers for Windows macOS and Linux with delta patches",
      "Hardware acceleration for graphics and realtime data visualization",
    ],
    image: "/services/Desktop_app_minimalist_tech_icon_202608251818.jpeg",
    imageAlt: "Desktop Apps icon",
    visual: "desktop",
  },
  {
    number: "05",
    title: "Cloud Architecture",
    description:
      "Scalable cloud architecture engineered for enterprise reliability security and cost efficiency from the first deployment.",
    capabilities: ["AWS", "GCP", "Azure", "Serverless"],
    highlights: [
      "Multi region auto scaling with edge distribution and global load balancing",
      "Zero downtime releases using blue green and canary strategies with checks",
      "Security hardening with network isolation encryption and DDoS protection",
      "Cost aware observability with real time telemetry and budget alerts",
      "Infrastructure as code with reproducible environments and drift detection",
    ],
    image: "/services/Cloud_architecture_icon_design_2K_202608251818.jpeg",
    imageAlt: "Cloud Architecture icon",
    visual: "dithering",
  },
  {
    number: "06",
    title: "DevOps & Reliability",
    description:
      "Delivery pipelines and infrastructure as code that keep releases fast systems healthy and operations predictable.",
    capabilities: ["CI/CD", "IaC", "Monitoring"],
    highlights: [
      "Automated CI CD pipelines with tested promotion gates and approvals",
      "Infrastructure as code using Terraform Docker and Kubernetes at scale",
      "Proactive observability with centralized logs metrics and alerting",
      "Incident playbooks with rapid rollback and recovery runbooks",
      "Secrets management and policy guarded deployments with audit history",
    ],
    image: "/services/DevOps_icon_with_gear_2K_202608251818.jpeg",
    imageAlt: "DevOps and Reliability icon",
    visual: "globe",
  },
];
