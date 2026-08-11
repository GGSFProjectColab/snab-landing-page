import { unstable_cache } from "next/cache";

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  featured: boolean;
};

const blogPosts: BlogPost[] = [
  {
    slug: "ai-product-development",
    category: "Engineering",
    title: "AI Product Development: From Demo to Production",
    excerpt:
      "A practical framework for choosing the right workflow, designing the system, evaluating behavior, and launching with the controls that real operations need.",
    image: "/ascii-magic-14.png",
    readTime: "9 min read",
    featured: true,
  },
  {
    slug: "ai-workflow-automation",
    category: "AI Workflows",
    title: "Building Reliable AI Workflow Automation",
    excerpt:
      "How to design automation pipelines that handle edge cases, maintain audit trails, and scale with your business.",
    image: "/ascii-magic-12.png",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "rag-systems-production",
    category: "Engineering",
    title: "RAG Systems in Production: Lessons Learned",
    excerpt:
      "Real-world challenges and solutions for deploying retrieval-augmented generation at scale.",
    image: "/ascii-magic-13.png",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "ai-evaluation-strategies",
    category: "Product",
    title: "Measuring What Matters: AI Evaluation Strategies",
    excerpt:
      "How to define, measure, and iterate on quality metrics for AI-powered products.",
    image: "/ascii-magic-15.png",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "notary-expert-case-study",
    category: "Case Studies",
    title: "Notary Expert: Streamlining Legal Workflows",
    excerpt:
      "How we built an intelligent platform that reduced document processing time by 60%.",
    image: "/ascii-magic-10.png",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "interview-expert-case-study",
    category: "Case Studies",
    title: "Interview Expert: AI-Powered Interview Management",
    excerpt:
      "Building a platform that transforms interview chaos into structured, actionable records.",
    image: "/ascii-magic-11.png",
    readTime: "6 min read",
    featured: false,
  },
];

async function fetchBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export const getBlogPosts = unstable_cache(fetchBlogPosts, ["blog-posts"], {
  revalidate: 60,
  tags: ["blog-posts"],
});
