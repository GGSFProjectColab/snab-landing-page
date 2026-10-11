export interface ProductFeature {
  title: string;
  description: string;
}

export interface TechStackGroup {
  category: string;
  technologies: string[];
}

export interface ProductMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface EngineerSocialLink {
  label: string;
  url: string;
  platform: "portfolio" | "linkedin" | "x" | "github";
}

export interface EngineerProfile {
  name: string;
  role: string;
  bio: string;
  links: EngineerSocialLink[];
}

export interface ProductVideoEmbed {
  title: string;
  youtubeId: string;
  description?: string;
}

export interface ProductContributor {
  name: string;
  role?: string;
  url?: string;
}

export interface ProductItem {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  headline: string;
  status: "Live" | "Production" | "Active";
  categories: string[];
  summary: string;
  description: string;
  problemStatement: string;
  solution: string;
  capabilities: string[];
  features: ProductFeature[];
  techStack: TechStackGroup[];
  architectureHighlights: string[];
  metrics: ProductMetric[];
  faqs: ProductFaq[];
  link?: string;
  attribution?: string;
  leadEngineer?: string;
  leadEngineerUrl?: string;
  contributors?: ProductContributor[];
  engineerProfile?: EngineerProfile;
  videoEmbed?: ProductVideoEmbed;
  image: string;
  imageDark?: string;
  imageAlt: string;
  contain?: boolean;
  imagePadding?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const PRODUCTS: ProductItem[] = [
  {
    slug: "interviewxpert",
    number: "01",
    name: "InterviewXpert",
    tagline: "AI-Powered Technical & Behavioral Interview Intelligence Platform",
    headline: "Automating Recruitment Workflows with Structured Candidate Intelligence",
    status: "Live",
    categories: ["INTERVIEW AUTOMATION", "AI PRODUCT", "TALENT INTELLIGENCE", "WORKFLOW SOFTWARE"],
    summary:
      "InterviewXpert is an intelligent assessment and workflow automation platform engineered by SNAB Innovations. It unifies candidate evaluations, structured interview rubrics, and automated synthesis to eliminate hiring bias and cut recruitment cycle times by 65%.",
    description:
      "InterviewXpert is an end-to-end AI hiring platform that transforms recruitment pipelines from fragmented human notes into objective, data-backed candidate dossiers. Engineered with deterministic scoring rubrics and conversational AI models, the platform conducts real-time evaluation support, analyzes candidate responses, and provides structured debriefs for hiring committees.",
    problemStatement:
      "Modern talent acquisition teams suffer from inconsistent evaluation rubrics, heavy administrative overhead from manual interview logging, interviewer cognitive bias, and lengthy turnaround times between candidate screens and debriefs.",
    solution:
      "InterviewXpert introduces structured conversational evaluation harnesses, automated transcript synthesis, and verifiable scoring matrixes that run silently during live sessions or asynchronously, delivering audit-ready candidate evaluations within seconds.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Automated Summaries",
      "Evaluation Support",
      "Skill Gap Analysis",
      "Committee Consensus Reports",
    ],
    features: [
      {
        title: "Deterministic Rubric Scoring",
        description:
          "Standardized competency evaluation matrixes that assess technical aptitude, behavioral competencies, and problem-solving velocity without human bias.",
      },
      {
        title: "Automated Executive Debriefs",
        description:
          "Instantly produces structured hiring committee summaries with actionable evidence quotes, code evaluations, and key flags.",
      },
      {
        title: "Real-Time Interview Co-Pilot",
        description:
          "Suggests dynamic follow-up prompts and scenario escalations based on the candidate's live conversational progression.",
      },
      {
        title: "ATS & Pipeline Integration",
        description:
          "Native webhooks and REST integrations to synchronize evaluation scorecards directly into enterprise applicant tracking systems.",
      },
    ],
    techStack: [
      {
        category: "Frontend & Interface",
        technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
      },
      {
        category: "AI & Intelligence",
        technologies: ["OpenAI Whisper", "LLM Reasoning Chains", "Structured JSON Schema Extraction", "Semantic Vectors"],
      },
      {
        category: "Backend & Systems",
        technologies: ["PostgreSQL", "InsForge BaaS", "Edge Workers", "Serverless Functions"],
      },
    ],
    architectureHighlights: [
      "Sub-200ms latency for live prompt generation during candidate interviews.",
      "Strict data isolation and enterprise encryption for candidate audio, video, and transcripts.",
      "Deterministic fallback pipeline guaranteeing scorecard generation even during upstream API degradation.",
    ],
    metrics: [
      { label: "Cycle Time Reduction", value: "65%", detail: "From candidate screen to committee decision" },
      { label: "Interviewer Time Saved", value: "4.2 hrs", detail: "Per requisition weekly on debrief paperwork" },
      { label: "Evaluation Consistency", value: "98.4%", detail: "Rubric alignment score across parallel interviewers" },
    ],
    faqs: [
      {
        question: "What is InterviewXpert and how does it assist hiring teams?",
        answer:
          "InterviewXpert is an intelligent interview automation and candidate assessment platform engineered by SNAB Innovations. It assists talent acquisition teams and engineering managers by standardizing evaluation rubrics, generating real-time interviewer prompts, and automatically synthesizing candidate debrief dossiers to eliminate hiring bias and reduce screening cycles by 65%.",
      },
      {
        question: "Is InterviewXpert developed and maintained by SNAB Innovations?",
        answer:
          "Yes. InterviewXpert is a proprietary recruitment technology platform built and maintained by SNAB Innovations in Nashik, Maharashtra, India. The engineering initiative is led by Nimesh Kulkarni with engineering contributions by Aaradhya Pathak. It operates on modern cloud infrastructure with enterprise-grade security and deterministic evaluation pipelines.",
      },
      {
        question: "How does InterviewXpert eliminate bias in candidate evaluations?",
        answer:
          "InterviewXpert evaluates candidates against predetermined, objective competency matrixes rather than unstructured impressions. All evaluation summaries cite verifiable quotes from candidate responses and code submissions, providing hiring committees with objective, audit-ready data points.",
      },
      {
        question: "Can InterviewXpert integrate with existing Applicant Tracking Systems (ATS)?",
        answer:
          "Yes. InterviewXpert supports bi-directional webhook and REST API integrations with leading ATS platforms including Greenhouse, Lever, Ashby, and Workday, ensuring candidate evaluations flow seamlessly into existing enterprise recruiting workflows.",
      },
      {
        question: "How does InterviewXpert protect candidate data privacy and compliance?",
        answer:
          "Candidate audio, video, transcripts, and evaluation scorecards are secured using AES-256 encryption at rest and TLS 1.3 in transit. SNAB Innovations enforces strict role-based access control (RBAC) and zero-data-retention training policies for third-party foundation models.",
      },
    ],
    link: "https://interviewxpert.in",
    leadEngineer: "Nimesh Kulkarni",
    leadEngineerUrl: "https://www.linkedin.com/in/nimesh-kulkarni-526401266/",
    contributors: [
      {
        name: "Aaradhya Pathak",
        role: "Full-Stack Developer",
        url: "https://www.linkedin.com/in/aaradhyapathak17",
      },
    ],
    videoEmbed: {
      title: "InterviewXpert Platform Walkthrough & Live Demo",
      youtubeId: "lM4np-rxA_8",
      description:
        "Watch InterviewXpert in action: candidate assessment workflows, structured rubric scoring, real-time prompt generation, and automated debrief synthesis.",
    },
    image: "/interviewxpert-dark.png",
    imageDark: "/interviewxpert.png",
    imageAlt: "InterviewXpert AI Candidate Assessment Dashboard Preview",
    seo: {
      title: "InterviewXpert — AI Recruitment & Interview Copilot Platform | SNAB Innovations",
      description:
        "InterviewXpert is an intelligent interview automation and candidate assessment platform engineered by SNAB Innovations in Nashik, led by Nimesh Kulkarni with contributions by Aaradhya Pathak. Automate candidate rubrics, scorecards, and debrief dossiers.",
      keywords: [
        "InterviewXpert",
        "InterviewXpert SNAB",
        "InterviewXpert SNAB Innovations",
        "SNAB InterviewXpert",
        "interviewxpert.in",
        "Nimesh Kulkarni",
        "Aaradhya Pathak",
        "Nimesh Kulkarni InterviewXpert",
        "Aaradhya Pathak InterviewXpert",
        "AI interview platform",
        "AI interview copilot",
        "recruitment automation software",
        "candidate evaluation system",
        "automated interview rubrics",
        "talent intelligence platform",
        "AI hiring tool",
        "SNAB Innovations Nashik",
        "SNAB Innovations products",
      ],
    },
  },
  {
    slug: "notaryxpert",
    number: "02",
    name: "NotaryXpert",
    tagline: "Legal Document Pipeline & Case Orchestration for Notary Professionals",
    headline: "Transforming Legal Document Workflows and Notarial Case Tracking",
    status: "Live",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "AI PRODUCT", "DOCUMENT MANAGEMENT"],
    summary:
      "NotaryXpert is a specialized legal technology operating system built by SNAB Innovations. It equips notary advocates and legal practitioners with automated document verification, client intake scheduling, and encrypted case registry tracking.",
    description:
      "NotaryXpert eliminates the manual paper logbooks and fragmented appointment scheduling common in notarial practice. Built with stringent security controls, digital verification workflows, and automated client notifications, it allows legal officers to manage thousands of notarizations with zero registry errors.",
    problemStatement:
      "Notary practitioners manage massive volumes of physical affidavits, deeds, and statutory declarations. Fragmented physical registers lead to lost audit trails, compliance oversights, and scheduling chaos.",
    solution:
      "A unified digital workstation combining secure digital register logs, barcode and QR document verification, automated appointment scheduling, and instant statutory audit generation.",
    capabilities: [
      "Client Intake Orchestration",
      "Document Verification Workflows",
      "Appointment Coordination",
      "Secure Digital Register",
      "Statutory Audit Trails",
    ],
    features: [
      {
        title: "Digital Register Ledger",
        description:
          "Tamper-resistant digital notary register replacing manual ledger books with indexed search, serial tracking, and automated timestamps.",
      },
      {
        title: "Client Intake & Document Scanning",
        description:
          "Mobile-responsive intake portal for clients to upload draft deeds, identity proofs, and annexures prior to in-person attestation.",
      },
      {
        title: "Automated Appointment Scheduling",
        description:
          "SMS and WhatsApp appointment confirmations with automated reminders and slot coordination for signing parties.",
      },
      {
        title: "Compliance & Verification Registry",
        description:
          "QR-coded digital verification stamp enabling authorities and institutions to verify notarial attestations instantly.",
      },
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
      },
      {
        category: "Backend & Database",
        technologies: ["Node.js", "PostgreSQL", "Cloudflare Storage", "Prisma ORM"],
      },
      {
        category: "Security & Compliance",
        technologies: ["End-to-End Encryption", "Role-Based Access Control", "Audit Trail Logging"],
      },
    ],
    architectureHighlights: [
      "Zero-knowledge encryption layer for client identification documents and sworn affidavits.",
      "Immutable audit trail logging every notarial registry entry with hash verification.",
      "High-availability document retrieval under 100ms for legal compliance verifications.",
    ],
    metrics: [
      { label: "Register Retrieval Time", value: "< 2s", detail: "Instant case history and record lookup" },
      { label: "Paperwork Reduction", value: "80%", detail: "Pre-intake digitization eliminates manual clerical logs" },
      { label: "Compliance Accuracy", value: "100%", detail: "Zero skipped registry numbers or unindexed deeds" },
    ],
    faqs: [
      {
        question: "What is NotaryXpert and who is it designed for?",
        answer:
          "NotaryXpert is a specialized legal operating system engineered by SNAB Innovations for notary public advocates, legal practitioners, and signing authorities. It replaces manual physical ledger books with automated digital registers, secure client document intake, and verified attestation records.",
      },
      {
        question: "How does NotaryXpert replace traditional physical notarial registers?",
        answer:
          "NotaryXpert provides an immutable digital notary ledger that automatically assigns sequential entry numbers, generates timestamps, indexes signing parties with identity verifications, and creates searchable digital archives compliant with notarial documentation mandates.",
      },
      {
        question: "Is client identification and affidavit documentation secure on NotaryXpert?",
        answer:
          "Yes. NotaryXpert utilizes strict encryption standards and role-based permissions. Client identity proofs, sworn affidavits, and sensitive case attachments are safeguarded with private access controls ensuring only authorized legal officers can access them.",
      },
      {
        question: "Can advocates generate statutory audit logs with NotaryXpert?",
        answer:
          "Yes. Practitioners can export comprehensive statutory audit reports with one click, showing chronological attestations, fees collected, and attestation verification codes for regulatory compliance inspections.",
      },
      {
        question: "Is NotaryXpert developed by SNAB Innovations?",
        answer:
          "Yes. NotaryXpert is designed, engineered, and maintained by SNAB Innovations, led by Nimesh Kulkarni as part of our suite of specialized vertical workflow automation platforms.",
      },
    ],
    link: "https://notery.interviewxpert.in/login",
    leadEngineer: "Nimesh Kulkarni",
    leadEngineerUrl: "https://www.linkedin.com/in/nimesh-kulkarni-526401266/",
    image: "/notary-expert.png",
    imageAlt: "NotaryXpert Legal Document Management Platform Interface",
    seo: {
      title: "NotaryXpert — Digital Notary Register & Legal Workflow Software | SNAB Innovations",
      description:
        "NotaryXpert by SNAB Innovations is an intelligent legal workflow platform for notary advocates, led by Nimesh Kulkarni. Digitize document intake, appointment scheduling, and notarial registers with zero errors.",
      keywords: [
        "NotaryXpert",
        "NotaryXpert SNAB",
        "NotaryXpert SNAB Innovations",
        "SNAB NotaryXpert",
        "notery.interviewxpert.in",
        "Nimesh Kulkarni",
        "Nimesh Kulkarni NotaryXpert",
        "notary management software",
        "digital notary register",
        "notary register India",
        "notary advocate software",
        "legal document workflow",
        "legaltech platform India",
        "notarial attestation ledger",
        "SNAB Innovations legal software",
      ],
    },
  },
  {
    slug: "nyaya-ai",
    number: "03",
    name: "NyayaAI",
    tagline: "Multilingual Legal AI & Judicial Intelligence Assistant",
    headline: "Democratizing Legal Access and Judicial Intelligence Across India",
    status: "Live",
    categories: ["LEGAL AI", "AI PRODUCT", "JUDICIAL TECH", "CIVIC TECH"],
    summary:
      "NyayaAI is an AI-powered legal assistance platform engineered by SNAB Innovations. Built to empower citizens, advocates, and judicial officers with PIL/RTI guidance, multilingual document intelligence, and real-time court analytics.",
    description:
      "NyayaAI bridges the gap between intricate statutory frameworks and common citizens. By indexing vast corpora of constitutional law, case citations, High Court judgments, and statutory procedures, NyayaAI provides conversational legal summaries, automated drafting templates, and court statistics in multiple Indian languages.",
    problemStatement:
      "The legal system is intimidating, expensive, and opaque for ordinary citizens, while advocates spend dozens of hours manually searching through disparate judgment gazettes and procedural forms.",
    solution:
      "A multilingual legal intelligence engine that converts complex legal jargon into clear rights advisory, assists in drafting RTI and PIL petitions, and analyzes precedent patterns with factual citations.",
    capabilities: [
      "Constitutional & PIL Guidance",
      "RTI Application Generator",
      "Multilingual Legal Translation",
      "Precedent Document Intelligence",
      "Court Case Tracking & Analytics",
    ],
    features: [
      {
        title: "Multilingual Legal Co-Counsel",
        description:
          "Conversational guidance in Hindi, Marathi, English, and regional languages explaining legal rights, bail provisions, and procedural steps.",
      },
      {
        title: "RTI & PIL Document Architect",
        description:
          "Step-by-step petition generator ensuring all statutory requirements, jurisdictional references, and prayer clauses are accurately framed.",
      },
      {
        title: "Judgment Precedent Summarizer",
        description:
          "Rapid synthesis of 100+ page judicial rulings into key holdings, dissenting opinions, and referenced statutory provisions.",
      },
      {
        title: "Court Analytics & Case Timelines",
        description:
          "Historical analytics on disposal rates, bench tendencies, and case stage durations across Indian district and High Courts.",
      },
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
      },
      {
        category: "AI & NLP Pipeline",
        technologies: ["Custom Legal RAG Engine", "Multilingual Indic Embeddings", "Vector DB (pgvector)", "Citation Verification Safeguards"],
      },
      {
        category: "Data & Storage",
        technologies: ["PostgreSQL", "Cloudflare CDN", "FastAPI Service Workers"],
      },
    ],
    architectureHighlights: [
      "Hallucination-guarded retrieval pipeline verifying every legal section reference against gazetted statutory text.",
      "Strict zero-retention privacy protocol for sensitive legal queries and citizen consultations.",
      "High-throughput vector search processing queries across millions of legal precedent paragraphs in under 350ms.",
    ],
    metrics: [
      { label: "Supported Languages", value: "8+", detail: "Major Indian languages with native legal semantics" },
      { label: "Drafting Speedup", value: "10x", detail: "RTI and initial legal notice preparation speed" },
      { label: "Citation Accuracy", value: "99.1%", detail: "Factual statute and judgment benchmark validation" },
    ],
    faqs: [
      {
        question: "What is NyayaAI and what legal services does it provide?",
        answer:
          "NyayaAI is an AI-powered legal accessibility and judicial intelligence assistant engineered by SNAB Innovations. It assists citizens and legal professionals with multilingual statutory guidance, Right to Information (RTI) drafting, Public Interest Litigation (PIL) guidance, and case precedent summaries across Indian law.",
      },
      {
        question: "Which Indian languages are supported by NyayaAI?",
        answer:
          "NyayaAI supports 8+ major Indian languages including Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, and English, allowing citizens to understand legal rights, court procedures, and statutory sections in their native tongue.",
      },
      {
        question: "How does NyayaAI prevent hallucinations in legal citations?",
        answer:
          "NyayaAI implements a dual-check retrieval-augmented generation (RAG) architecture that validates every referenced legal section, judgment citation, and statutory act against verified official gazettes and court records before returning information to the user.",
      },
      {
        question: "Can citizens use NyayaAI to draft Right to Information (RTI) petitions?",
        answer:
          "Yes. NyayaAI features a guided RTI drafting architect that formulates precise information requests, identifies the appropriate Public Information Officer (PIO) authority, and structures the application to comply with statutory RTI standards.",
      },
      {
        question: "Is NyayaAI developed by SNAB Innovations?",
        answer:
          "Yes. NyayaAI is an initiative researched, architected, and engineered by SNAB Innovations to advance civic technology and democratize legal access.",
      },
    ],
    link: "https://nyayai.interviewxpert.in/",
    image: "/nyaya-ai.png",
    imageAlt: "NyayaAI Judicial and Legal Intelligence Platform Logo",
    contain: true,
    seo: {
      title: "NyayaAI — Multilingual Legal AI & Judicial Intelligence Assistant | SNAB Innovations",
      description:
        "NyayaAI by SNAB Innovations is an AI legal intelligence assistant delivering multilingual statutory guidance, RTI drafting, judgment analysis, and court analytics across India.",
      keywords: [
        "NyayaAI",
        "Nyaya AI",
        "NyayaAI SNAB",
        "NyayaAI SNAB Innovations",
        "SNAB NyayaAI",
        "nyayai.interviewxpert.in",
        "legal AI assistant India",
        "multilingual legal AI",
        "RTI drafting tool AI",
        "PIL guidance software",
        "court case intelligence India",
        "Indian law AI assistant",
        "High Court judgment analysis",
        "SNAB Innovations AI systems",
      ],
    },
  },
  {
    slug: "termy",
    number: "04",
    name: "Termy",
    tagline: "High-Performance Windows Terminal Workspace Engineered in Rust",
    headline: "Fast, Resilient Terminal Workspaces for Systems Engineers and Agentic Devs",
    status: "Live",
    categories: ["RUST DESKTOP", "TERMINAL WORKSPACE", "SYSTEMS SOFTWARE", "OPEN SOURCE"],
    summary:
      "Termy is an ultra-fast, native Windows terminal workspace engineered in Rust by SNAB Innovations. It integrates ConPTY sessions, persistent multi-project workspaces, split panes, and layout state restoration.",
    description:
      "Engineered for developers who demand low-latency shell input and persistent multitasking, Termy bypasses the memory-heavy bloat of Electron-based terminal clients. Built entirely in Rust, it interfaces directly with Windows ConPTY to run PowerShell, Command Prompt, and WSL environments with zero input lag.",
    problemStatement:
      "Developers working on Windows frequently juggle multiple shells across fragmented windows, face high CPU/memory consumption from heavy terminals, and lose active session state when restarting dev machines.",
    solution:
      "A native Rust terminal workstation featuring instantaneous sub-5ms input latency, deterministic session persistence, intelligent split-pane tiling, and native ConPTY multiplexing.",
    capabilities: [
      "ConPTY Native Multiplexing",
      "Persistent Workspace Sessions",
      "Split Panes & Grid Tiling",
      "Zero-Lag GPU Accelerated Shell",
      "Cross-Shell Tabs (WSL, PS, CMD)",
    ],
    features: [
      {
        title: "Rust Core & ConPTY Integration",
        description:
          "Native memory management and direct Windows ConPTY pipeline delivering silky 60fps rendering with minimal CPU overhead.",
      },
      {
        title: "Persistent Project Workspaces",
        description:
          "Save, label, and restore complete multi-pane terminal layouts across machine reboots or branch switches with zero setup time.",
      },
      {
        title: "Flexible Split Panes",
        description:
          "Horizontal and vertical pane splitting with intuitive keyboard hotkeys for simultaneous build execution, logging, and shell interaction.",
      },
      {
        title: "Agentic Coding Integration",
        description:
          "Engineered with clean pipe redirection and headless workspace interfaces designed to pair seamlessly with modern AI coding agent workflows.",
      },
    ],
    techStack: [
      {
        category: "Core Engine",
        technologies: ["Rust", "Windows ConPTY APIs", "Win32 Systems APIs"],
      },
      {
        category: "Renderer & GUI",
        technologies: ["DirectWrite / Direct2D", "GPU Glyph Atlas", "Custom Windowing Pipeline"],
      },
      {
        category: "Shells Supported",
        technologies: ["PowerShell 7", "WSL 2 (Ubuntu/Debian)", "Command Prompt", "Git Bash"],
      },
    ],
    architectureHighlights: [
      "Under 18MB idle memory footprint compared to 300MB+ in typical Electron-wrapped terminal applications.",
      "Deterministic crash-resilient layout file format guaranteeing project restoration after unexpected shutdowns.",
      "Input rendering path executes under 5 milliseconds from keystroke to GPU frame presentation.",
    ],
    metrics: [
      { label: "Memory Footprint", value: "< 20MB", detail: "Ultralight idle memory consumption in Rust" },
      { label: "Input Presentation", value: "< 5ms", detail: "Zero perceptible keystroke input latency" },
      { label: "Startup Speed", value: "35ms", detail: "Cold launch to interactive shell ready state" },
    ],
    faqs: [
      {
        question: "What is Termy and what makes it faster than conventional Windows terminals?",
        answer:
          "Termy is a native Windows terminal workspace engineered in Rust by SNAB Innovations. Unlike web-wrapped or Electron-based terminals that consume hundreds of megabytes of RAM, Termy links directly with Windows ConPTY and GPU-accelerated DirectWrite text rendering, executing with sub-5ms input latency and under 20MB of idle memory.",
      },
      {
        question: "Does Termy support PowerShell, WSL, and Command Prompt in the same window?",
        answer:
          "Yes. Termy allows developers to tile, split, and tab across PowerShell 7, WSL 2 (Ubuntu, Debian, Arch), Git Bash, and Command Prompt simultaneously in unified workspaces.",
      },
      {
        question: "How does Termy persist workspace states across machine restarts?",
        answer:
          "Termy writes deterministic workspace serialization snapshots. Even after unexpected crashes or Windows updates, reopening Termy restores your exact pane split ratios, active working directories, and project tab configurations instantly.",
      },
      {
        question: "Is Termy optimized for AI coding agents and automated background tasks?",
        answer:
          "Yes. Termy features headless session hooks and clean pipe redirection, allowing modern agentic coding workflows to execute commands and monitor terminal logs without interface friction.",
      },
      {
        question: "Who engineered Termy at SNAB Innovations?",
        answer:
          "Termy is led and engineered by Nimesh Kulkarni at SNAB Innovations as part of our focus on ultra-efficient, low-level Rust developer tooling.",
      },
    ],
    link: "https://termyy.vercel.app/",
    leadEngineer: "Nimesh Kulkarni",
    leadEngineerUrl: "https://www.linkedin.com/in/nimesh-kulkarni-526401266/",
    image: "/termy.png",
    imageAlt: "Termy Native Windows Terminal Workspace Icon",
    contain: true,
    imagePadding: "p-8",
    seo: {
      title: "Termy — Native Windows Rust Terminal Workspace | SNAB Innovations",
      description:
        "Termy by SNAB Innovations is a high-performance Windows terminal workspace engineered in Rust, led by Nimesh Kulkarni. Instant ConPTY sessions, split panes, and persistent multi-project workspaces with zero input lag.",
      keywords: [
        "Termy",
        "Termy SNAB",
        "Termy SNAB Innovations",
        "SNAB Termy",
        "termyy.vercel.app",
        "Nimesh Kulkarni",
        "Nimesh Kulkarni Termy",
        "Nimesh Kulkarni Rust",
        "Rust terminal Windows",
        "ConPTY terminal workspace",
        "fast Windows terminal emulator",
        "GPU accelerated terminal",
        "low latency Windows terminal",
        "split pane terminal Windows",
        "agentic coding terminal",
        "SNAB Innovations engineering",
      ],
    },
  },
  {
    slug: "filezenith",
    number: "05",
    name: "FileZenith",
    tagline: "100% Client-Side Private Online PDF, Image & Document Studio",
    headline: "Zero-Server Document Processing Engineered for Absolute Privacy and Speed",
    status: "Live",
    categories: ["CLIENT-SIDE PRIVACY", "DOCUMENT STUDIO", "WASM & CANVAS", "PRODUCTIVITY TOOL"],
    summary:
      "FileZenith is an all-in-one private online file tool suite engineered by Aaradhya Pathak at SNAB Innovations. Built on a strict zero-server upload architecture, all PDF compression, document editing, and image conversions run 100% inside the user's browser.",
    description:
      "In an era where online file converters upload sensitive financial, legal, and personal documents to opaque cloud servers, FileZenith changes the paradigm: your files never leave your device. Engineered with WebAssembly, Canvas rendering pipelines, and modern browser APIs, FileZenith delivers desktop-grade file processing in the browser with 100% privacy.",
    problemStatement:
      "Millions of users need to compress PDFs for government job portals, convert scans, or sign documents daily. Traditional online converters upload these confidential files to remote servers, risking data leaks, compliance violations, and slow bandwidth round-trips.",
    solution:
      "A client-side file studio where WebAssembly engines and canvas pipelines execute compute tasks directly in local memory, processing documents instantaneously without uploading a single byte.",
    capabilities: [
      "Zero-Server Compute",
      "PDF Compression Presets",
      "In-Browser PDF Editor",
      "Client-Side AI OCR",
      "Batch Image Converters",
      "Exam Photo Resizers",
    ],
    features: [
      {
        title: "Zero-Server Privacy Guarantee",
        description:
          "All document logic runs locally using WebAssembly and client-side memory. Confidential bank statements, IDs, and tax documents never touch external infrastructure.",
      },
      {
        title: "Intelligent PDF Compressor & Presets",
        description:
          "Dynamic JPEG stream optimization and FlateDecode stream compression with one-click presets targeting 100KB, 200KB, and 1MB thresholds for online application portals.",
      },
      {
        title: "Interactive Document Editor",
        description:
          "Direct browser-based PDF editing including text insertion, redaction/whiteout, freehand drawing, page reordering, watermarking, and digital signatures.",
      },
      {
        title: "In-Browser AI OCR Extraction",
        description:
          "Client-side optical character recognition utilizing compiled Tesseract Wasm to extract clean, editable text from scanned documents and receipts entirely offline.",
      },
      {
        title: "Exam & Job Portal Photo Resizers",
        description:
          "Pre-calibrated pixel dimension and KB file size engines for RRB, IBPS, SBI PO, SSC, JEE, and CUET government examination forms.",
      },
    ],
    techStack: [
      {
        category: "Client Architecture",
        technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "HTML5 Canvas API"],
      },
      {
        category: "Wasm & Processing Engines",
        technologies: ["PDF-lib Wasm", "Tesseract.js OCR", "Client-Side Image Quantization", "Web Workers"],
      },
      {
        category: "Performance & Hosting",
        technologies: ["Vercel Edge Network", "Service Worker Offline Caching", "Cloudflare CDN"],
      },
    ],
    architectureHighlights: [
      "Zero byte server payload: Network inspection confirms zero document upload requests during any conversion.",
      "Multithreaded Web Workers keep user interface smooth at 60fps even during 50MB PDF compression pipelines.",
      "Instant offline operability via progressive web app architecture.",
    ],
    metrics: [
      { label: "Server Uploads", value: "0 Bytes", detail: "100% private in-browser memory execution" },
      { label: "Compression Ratio", value: "Up to 85%", detail: "Intelligent stream downsampling with zero visual loss" },
      { label: "Active Tools", value: "40+ Utilities", detail: "Dedicated PDF, image, and document engines" },
    ],
    faqs: [
      {
        question: "What is FileZenith and how does 100% client-side file processing work?",
        answer:
          "FileZenith is a private online document and image processing studio engineered by Aaradhya Pathak at SNAB Innovations. Unlike traditional converters that upload your files to cloud servers, FileZenith compiles its PDF and image compression engines into WebAssembly (Wasm) and HTML5 Canvas, executing all conversions entirely in your browser's local memory with zero bytes ever sent over the network.",
      },
      {
        question: "Are my uploaded PDFs, bank statements, or photos ever saved on a server?",
        answer:
          "Never. FileZenith does not have a file storage backend or processing server. Your documents are opened directly into browser memory (RAM), processed on your device's CPU/GPU, and downloaded directly to your disk. You can open Developer Tools Network inspection to verify that zero file payloads leave your machine.",
      },
      {
        question: "Who engineered and maintains FileZenith?",
        answer:
          "FileZenith was engineered and is actively maintained by Aaradhya Pathak (Co-Founder & Full-Stack Developer at SNAB Innovations). You can explore Aaradhya's portfolio at https://aaradhyadev.vercel.app/, connect on LinkedIn at https://www.linkedin.com/in/aaradhyapathak17, follow on X at https://x.com/aaradhya1774, and inspect open projects on GitHub at https://github.com/AaradhyaproK.",
      },
      {
        question: "How does FileZenith compress files to specific limits like 100KB or 200KB for government forms?",
        answer:
          "FileZenith provides dedicated target preset compressors engineered specifically for Indian government job and entrance exam portals (such as UPSC, SSC, IBPS, RRB, and JEE). The engine uses multi-pass binary search quantization to compress images and PDFs to strictly under 100KB, 200KB, or 500KB while preserving maximum visual legibility.",
      },
      {
        question: "Can FileZenith be used offline or without an internet connection?",
        answer:
          "Yes. FileZenith is built as a Progressive Web App (PWA) with Service Worker caching. Once you visit the site, all WebAssembly modules and utilities are cached locally, allowing you to edit PDFs, compress files, and convert images completely offline.",
      },
      {
        question: "Is FileZenith free to use?",
        answer:
          "Yes. FileZenith is 100% free with no subscriptions, no file size paywalls, no daily usage limits, and no watermarks.",
      },
    ],
    link: "https://www.filezenith.com",
    leadEngineer: "Aaradhya Pathak (Co-Founder & Full-Stack Developer)",
    leadEngineerUrl: "https://www.linkedin.com/in/aaradhyapathak17",
    engineerProfile: {
      name: "Aaradhya Pathak",
      role: "Co-Founder & Full-Stack Developer at Snab Innovations",
      bio: "Architected FileZenith with a zero-server upload philosophy, bringing high-performance WebAssembly and HTML5 Canvas document processing directly to the browser for total privacy.",
      links: [
        { label: "Portfolio", url: "https://aaradhyadev.vercel.app/", platform: "portfolio" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/aaradhyapathak17", platform: "linkedin" },
        { label: "X (@aaradhya1774)", url: "https://x.com/aaradhya1774", platform: "x" },
        { label: "GitHub", url: "https://github.com/AaradhyaproK", platform: "github" },
      ],
    },
    videoEmbed: {
      title: "FileZenith Platform Walkthrough & Feature Demo",
      youtubeId: "o9xOSiMloUc",
      description:
        "Watch FileZenith in action: client-side PDF compression, document editing, OCR text extraction, and target file size optimization with 100% in-browser privacy.",
    },
    image: "/filezenith.png",
    imageAlt: "FileZenith Private Online PDF and Image Studio Logo",
    contain: true,
    imagePadding: "p-6",
    seo: {
      title: "FileZenith — Private Client-Side PDF & Image Studio (Zero Server Uploads) | SNAB Innovations",
      description:
        "FileZenith is a 100% private, client-side PDF and image processing studio engineered by Aaradhya Pathak at SNAB Innovations. Compress PDFs, edit documents, and extract OCR with zero server uploads.",
      keywords: [
        "FileZenith",
        "FileZenith SNAB",
        "FileZenith SNAB Innovations",
        "SNAB FileZenith",
        "filezenith.com",
        "File Zenith",
        "private PDF compressor",
        "zero upload file converter",
        "client side PDF editor",
        "100kb PDF compressor UPSC SSC",
        "in-browser OCR tool",
        "private online document studio",
        "Aaradhya Pathak FileZenith",
        "SNAB Innovations products",
      ],
    },
  },
  {
    slug: "feekit",
    number: "06",
    name: "FeeKit",
    tagline: "Free Payment Processing Fee, US Sales Tax & UK VAT Calculation Engines",
    headline: "199+ Financial Calculation Utilities Built for Merchants, Agencies, and Freelancers",
    status: "Live",
    categories: ["FINANCIAL CALCULATORS", "TAX COMPLIANCE", "SAAS UTILITIES", "MERCHANT TOOLS"],
    summary:
      "FeeKit is an extensive financial utility platform engineered by Aaradhya Pathak at SNAB Innovations. Featuring 199+ mathematical calculators for payment gateway fees, 50-state sales tax, UK HMRC VAT compliance, 1099 freelance rates, and instant invoicing.",
    description:
      "Online sellers, SaaS founders, and independent contractors lose thousands annually to hidden merchant interchange fees, state sales tax nexus miscalculations, and unoptimized freelance rate formulas. FeeKit delivers a mathematically rigorous, zero-signup financial toolkit with 199+ specialized calculation models calibrated to current financial and tax schedules.",
    problemStatement:
      "Calculating exact merchant payouts across payment gateways (Stripe, PayPal, Square, Wise) with reverse invoicing, factoring local municipal sales taxes across 50 US states, and forecasting 1099 self-employment tax liabilities requires clunky spreadsheets and opaque documentation.",
    solution:
      "An instant, client-side financial engine suite with 199+ interactive models providing transparent fee breakdowns, reverse payout targets, statutory tax schedules, and e-commerce ROAS analytics.",
    capabilities: [
      "Gateway Fee & Reverse Payouts",
      "50 US States Sales Tax",
      "UK HMRC VAT (20% & 5%)",
      "1099 Freelance Models",
      "ROAS & Margin Analytics",
      "Instant PDF Invoicing",
    ],
    features: [
      {
        title: "Multi-Gateway Merchant Fee Comparators",
        description:
          "Instant calculations for Stripe (USA 2.9% + $0.30, UK 1.5% + 20p), PayPal, Square POS, and Wise across domestic, international, and micropayment tiers.",
      },
      {
        title: "Reverse Payout Calculator",
        description:
          "Computes the exact gross invoice amount to bill clients so the merchant receives their desired net payout after all gateway fees are deducted.",
      },
      {
        title: "50 US States Sales Tax Engines",
        description:
          "Comprehensive state base tax rates paired with county, city, and special district surtax thresholds for California, Texas, New York, Florida, and all 50 states.",
      },
      {
        title: "UK HMRC VAT & MTD Suite",
        description:
          "Standard rate (20%), reduced rate (5%), and zero-rated VAT calculations with gross-to-net reverse modeling aligned with HMRC Making Tax Digital rules.",
      },
      {
        title: "1099 Freelance Rate Architect",
        description:
          "Calculates sustainable hourly and project rates accounting for 15.3% SECA self-employment tax, business overhead, healthcare costs, and non-billable utilization.",
      },
    ],
    techStack: [
      {
        category: "Frontend & Architecture",
        technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Inter / JetBrains Mono"],
      },
      {
        category: "Financial Computation",
        technologies: ["Arbitrary-Precision Decimal Logic", "State & County Tax Matrixes", "Reverse Fee Algorithms"],
      },
      {
        category: "Export & Offline",
        technologies: ["Client-Side PDF Generation", "URL Query Parameter State Sharing", "PWA Web App"],
      },
    ],
    architectureHighlights: [
      "Sub-millisecond mathematical calculations without server API roundtrips.",
      "URL-encoded state serialization allowing users to bookmark and share exact financial calculation scenarios.",
      "Zero account required: complete utility access without paywalls, signups, or data tracking.",
    ],
    metrics: [
      { label: "Calculation Models", value: "199+ Engines", detail: "Specialized gateway, tax, and freelance utilities" },
      { label: "US States Covered", value: "50 States + DC", detail: "Comprehensive sales tax schedules with district caps" },
      { label: "Merchants Served", value: "3,200+ Active", detail: "Trusted by sellers, digital agencies, and consultants" },
    ],
    faqs: [
      {
        question: "What is FeeKit and what financial calculators are included?",
        answer:
          "FeeKit is an extensive financial utility platform engineered by Aaradhya Pathak at SNAB Innovations. It features 199+ calculation engines designed for digital merchants, agencies, freelancers, and finance professionals—covering payment processing fees (Stripe, PayPal, Square, Wise), reverse invoicing, 50-state US sales tax nexus rules, UK HMRC VAT, and 1099 freelance billable rate models.",
      },
      {
        question: "Who engineered and maintains FeeKit?",
        answer:
          "FeeKit is engineered and maintained by Aaradhya Pathak (Co-Founder & Full-Stack Developer at SNAB Innovations). You can explore Aaradhya's developer portfolio at https://aaradhyadev.vercel.app/, connect on LinkedIn at https://www.linkedin.com/in/aaradhyapathak17, follow on X at https://x.com/aaradhya1774, and view open source repositories on GitHub at https://github.com/AaradhyaproK.",
      },
      {
        question: "How does FeeKit's reverse payout calculator work?",
        answer:
          "When billing clients via payment gateways like Stripe or PayPal, transaction fees reduce your final payout. FeeKit's reverse payout calculator computes the exact gross billable amount required so that after all fixed ($0.30) and percentage fees (2.9%) are deducted by the processor, you receive exactly your target net amount.",
      },
      {
        question: "Does FeeKit support all 50 US states sales taxes and UK HMRC VAT rules?",
        answer:
          "Yes. FeeKit maintains comprehensive sales tax schedules for all 50 US states plus Washington D.C., factoring state base rates and county/city surtax thresholds. It also supports UK HMRC VAT tiers (standard 20%, reduced 5%, zero-rated) with gross-to-net reverse calculations compliant with Making Tax Digital (MTD) rules.",
      },
      {
        question: "Are my financial records, invoices, or revenue numbers stored on any server?",
        answer:
          "No. FeeKit executes all mathematical computations locally in your browser using high-precision decimal logic. No revenue numbers, customer invoices, or tax calculations are uploaded or saved to remote databases.",
      },
      {
        question: "Is FeeKit free to use?",
        answer:
          "Yes. FeeKit is completely free with zero subscription charges, no premium paywalls, and no registration or sign-in needed.",
      },
    ],
    link: "https://www.usefeekit.com",
    leadEngineer: "Aaradhya Pathak (Co-Founder & Full-Stack Developer)",
    leadEngineerUrl: "https://www.linkedin.com/in/aaradhyapathak17",
    engineerProfile: {
      name: "Aaradhya Pathak",
      role: "Co-Founder & Full-Stack Developer at Snab Innovations",
      bio: "Engineered and maintains FeeKit's 199+ financial calculation engines, delivering deterministic, arbitrary-precision payment and tax algorithms to thousands of global merchants.",
      links: [
        { label: "Portfolio", url: "https://aaradhyadev.vercel.app/", platform: "portfolio" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/aaradhyapathak17", platform: "linkedin" },
        { label: "X (@aaradhya1774)", url: "https://x.com/aaradhya1774", platform: "x" },
        { label: "GitHub", url: "https://github.com/AaradhyaproK", platform: "github" },
      ],
    },
    videoEmbed: {
      title: "FeeKit Financial & Payment Engine Walkthrough",
      youtubeId: "N9oUxmaKh6M",
      description:
        "Watch FeeKit in action: multi-gateway payment processing fee calculators, reverse payout computations, 50-state sales tax rules, and instant PDF invoice generation.",
    },
    image: "/feekit-icon.png",
    imageAlt: "FeeKit Financial & Payment Calculation Engine Logo",
    contain: true,
    imagePadding: "p-6",
    seo: {
      title: "FeeKit — Payment Processing Fee & 50-State Sales Tax Calculators | SNAB Innovations",
      description:
        "FeeKit is a comprehensive financial calculation engine engineered by Aaradhya Pathak at SNAB Innovations. 199+ tools for Stripe/PayPal fees, reverse invoicing, 50-state sales tax, and UK VAT compliance.",
      keywords: [
        "FeeKit",
        "FeeKit SNAB",
        "FeeKit SNAB Innovations",
        "SNAB FeeKit",
        "usefeekit.com",
        "payment processing fee calculator",
        "Stripe fee calculator 2026",
        "PayPal fee calculator",
        "reverse payout calculator",
        "50 US states sales tax calculator",
        "UK VAT calculator HMRC",
        "1099 freelance tax calculator",
        "Aaradhya Pathak FeeKit",
        "SNAB Innovations financial tools",
      ],
    },
  },
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
