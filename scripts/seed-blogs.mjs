import { createClient } from "@insforge/sdk";

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "https://zztrxs4z.ap-southeast.insforge.app",
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "anon_d78fdf69395515e188c068ba4ffbf17850993aaa6c4182d569ebee4ee1d6187b",
});

const initialBlogs = [
  {
    slug: "ai-product-development",
    category: "Engineering",
    title: "AI Product Development: From Demo to Production",
    excerpt: "A practical framework for choosing the right workflow, designing the system, evaluating behavior, and launching with the controls that real operations need.",
    content: `<h2>AI Product Engineering Guide</h2>
<p>AI product development is not the act of connecting a model to a text box. A useful product also needs a well-defined workflow, trusted data, clear permissions, measurable behavior, a usable interface, and an operating plan for everything that happens after launch.</p>
<div class="callout callout-note">
  <strong>Start with the job:</strong> The strongest starting question is not “Which model should we use?” It is “Which part of this workflow is slow, inconsistent, expensive, or unnecessarily difficult for the people doing it?”
</div>
<h3>1. Choose a workflow with a measurable outcome</h3>
<p>Begin with the work as it happens today. Identify the people involved, the information they use, the decisions they make, the systems they touch, and the handoffs where context is lost.</p>
<p>A promising AI opportunity usually has four characteristics:</p>
<ul>
  <li>The task happens often enough to justify changing it;</li>
  <li>The input and desired outcome can be described with real examples;</li>
  <li>Quality can be evaluated by people who understand the domain; and</li>
  <li>The workflow has a safe path when the system is uncertain or wrong.</li>
</ul>
<h3>2. Define the boundary between software, AI, and people</h3>
<p>Models are useful where language, ambiguity, extraction, ranking, or flexible reasoning matter. Deterministic software is better for permissions, calculations, transactional rules, and actions that must behave the same way every time.</p>
<p>A dependable system uses each where it is strongest. For example, a model may extract structured information from a document, while application code validates required fields and a person approves an exception before data reaches the system of record.</p>`,
    cover_image: "/ascii-magic-14.png",
    author_name: "Nimay Kulkarni",
    author_image: "",
    author_role: "Founder & AI Lead",
    read_time: "9 min read",
    featured: true,
    status: "published",
  },
  {
    slug: "ai-workflow-automation",
    category: "AI Workflows",
    title: "Building Reliable AI Workflow Automation",
    excerpt: "How to design automation pipelines that handle edge cases, maintain audit trails, and scale with your business.",
    content: `<h2>Engineering Resilient Workflows</h2>
<p>Workflow automation is only as strong as its reliability under non-standard inputs. When integrating LLMs and generative agents into enterprise pipelines, designing fallback mechanisms and automated retries with deterministic validation is crucial.</p>
<h3>Key Architectural Pillars</h3>
<ul>
  <li><strong>Idempotency:</strong> Every task should be replayable without side-effects.</li>
  <li><strong>Structured Outputs:</strong> Enforce strict JSON Schema output contracts.</li>
  <li><strong>Audit Trails:</strong> Log prompt versions, latencies, and human overrides.</li>
</ul>`,
    cover_image: "/ascii-magic-12.png",
    author_name: "SNAB Engineering",
    author_image: "",
    author_role: "Systems Team",
    read_time: "6 min read",
    featured: false,
    status: "published",
  },
  {
    slug: "rag-systems-production",
    category: "Engineering",
    title: "RAG Systems in Production: Lessons Learned",
    excerpt: "Real-world challenges and solutions for deploying retrieval-augmented generation at scale.",
    content: `<h2>Beyond Naive Retrieval</h2>
<p>Deploying Retrieval-Augmented Generation (RAG) in production environments requires addressing data chunking strategies, hybrid keyword + dense vector search, reranking, and cache invalidation.</p>
<div class="callout callout-tip">
  <strong>Pro Tip:</strong> Implement reranking with cross-encoders on the top-20 vector search candidates to dramatically boost citation relevance.
</div>`,
    cover_image: "/ascii-magic-13.png",
    author_name: "Nimay Kulkarni",
    author_image: "",
    author_role: "Founder & AI Lead",
    read_time: "7 min read",
    featured: false,
    status: "published",
  },
  {
    slug: "ai-evaluation-strategies",
    category: "Product",
    title: "Measuring What Matters: AI Evaluation Strategies",
    excerpt: "How to define, measure, and iterate on quality metrics for AI-powered products.",
    content: `<h2>The Continuous Evaluation Loop</h2>
<p>Traditional software tests deterministic unit cases. For AI systems, automated evaluation suites (evals) evaluate faithfulness, answer relevancy, context recall, and toxicity.</p>`,
    cover_image: "/ascii-magic-15.png",
    author_name: "SNAB Product Team",
    author_image: "",
    author_role: "Product & Research",
    read_time: "5 min read",
    featured: false,
    status: "published",
  },
  {
    slug: "notary-expert-case-study",
    category: "Case Studies",
    title: "Notary Expert: Streamlining Legal Workflows",
    excerpt: "How we built an intelligent platform that reduced document processing time by 60%.",
    content: `<h2>Automating Legal Complexity</h2>
<p>Notary workflows require meticulous compliance, secure document verification, and client scheduling. Notary Expert demonstrates how domain-specific AI assistance accelerates document drafting while maintaining human oversight.</p>`,
    cover_image: "/ascii-magic-10.png",
    author_name: "SNAB Solutions",
    author_image: "",
    author_role: "Case Studies",
    read_time: "8 min read",
    featured: false,
    status: "published",
  },
  {
    slug: "interview-expert-case-study",
    category: "Case Studies",
    title: "Interview Expert: AI-Powered Interview Management",
    excerpt: "Building a platform that transforms interview chaos into structured, actionable records.",
    content: `<h2>Transforming the Hiring Experience</h2>
<p>Interview Expert provides structured evaluation rubrics, intelligent candidate transcription analysis, and real-time synthesis for technical interview panels.</p>`,
    cover_image: "/ascii-magic-11.png",
    author_name: "SNAB Solutions",
    author_image: "",
    author_role: "Case Studies",
    read_time: "6 min read",
    featured: false,
    status: "published",
  }
];

async function seed() {
  console.log("Seeding blogs table...");
  for (const blog of initialBlogs) {
    const { data: existing } = await client.database
      .from("blogs")
      .select("id")
      .eq("slug", blog.slug)
      .maybeSingle();

    if (existing) {
      console.log(`Blog ${blog.slug} already exists, skipping.`);
      continue;
    }

    const { data, error } = await client.database
      .from("blogs")
      .insert([blog]);

    if (error) {
      console.error(`Error inserting ${blog.slug}:`, error);
    } else {
      console.log(`Inserted ${blog.slug}`);
    }
  }
  console.log("Seeding complete!");
}

seed();
