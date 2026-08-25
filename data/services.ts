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
  {
    number: "07",
    title: "Deployment & Rollout",
    description:
      "Automated release pipelines with zero downtime deployments multi environment promotion and instant rollback capabilities for reliable software delivery.",
    capabilities: ["Zero Downtime", "Blue-Green", "Canary Releases", "Rollback Automation"],
    highlights: [
      "Zero downtime releases using blue green and canary strategies with real time health telemetry",
      "Multi environment promotion pipelines spanning development staging and production",
      "Automated rollback triggers with instant recovery upon anomaly or latency detection",
      "Release gating with automated integration test suites and security compliance validation",
      "Changelog automation audit trails and release notification workflows across channels",
    ],
    image: "/services/Deployment_icon_with_upward_arrow_202608251818.jpeg",
    imageAlt: "Deployment and Rollout icon",
    visual: "flow",
  },
  {
    number: "08",
    title: "SEO & Growth",
    description:
      "Technical SEO architectures performance optimization and data driven search strategies that maximize organic visibility and search engine authority.",
    capabilities: ["Technical SEO", "Core Web Vitals", "Schema Markup", "Analytics"],
    highlights: [
      "Technical SEO architecture with server side rendering dynamic metadata and structured JSON-LD",
      "Core Web Vitals optimization targeting sub second load times and top tier Lighthouse scores",
      "Automated XML sitemaps canonical URL management and search engine indexing pipelines",
      "Advanced analytics tracking event instrumentation and conversion funnel measurement",
      "Semantic HTML structure crawl budget optimization and comprehensive audit reporting",
    ],
    image: "/services/SEO_icon_with_data_visualization_202608251819.jpeg",
    imageAlt: "SEO and Growth icon",
    visual: "dithering",
  },
  {
    number: "09",
    title: "Training & Development",
    description:
      "Empowering engineering teams through hands-on technical workshops AI enablement and tailored curriculum in modern software architecture.",
    capabilities: ["AI Enablement", "Team Workshops", "Tech Mentoring", "Architecture Reviews"],
    highlights: [
      "Hands on engineering workshops on AI agent integration LLM workflows and modern tooling",
      "Custom team training curricula covering modern full stack frameworks cloud and DevOps",
      "Architecture reviews and pair programming sessions to upskill internal engineering teams",
      "Best practice playbooks for AI prompt engineering evaluation harnesses and system security",
      "Post training mentorship continuous code reviews and technical enablement support",
    ],
    image: "/services/Training_and_development_icon_2K_202608251819.jpeg",
    imageAlt: "Training and Development icon",
    visual: "orb",
  },
];

export const HOME_SERVICES: Service[] = SERVICES.slice(0, 6);

