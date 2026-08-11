import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContainerWrapper } from "@/components/site/container";
import { SectionSeparator } from "@/components/site/separator";
import { HeaderTitle } from "@/components/profile/header-title";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Blogs | SNAB Innovations",
  description:
    "Practical guides and insights on AI product development, workflow automation, and production software delivery from SNAB Innovations.",
  path: "/blogs",
});

const categories = [
  "All",
  "AI Workflows",
  "Case Studies",
  "Engineering",
  "Product",
];

const blogPosts = [
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

const featuredPost = blogPosts.find((post) => post.featured);
const gridPosts = blogPosts.filter((post) => !post.featured);

function CategoryFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <button
          key={category}
          type="button"
          className={`px-3 py-1 text-xs transition-colors ${
            index === 0
              ? "border border-foreground bg-foreground text-background"
              : "border border-dotted border-edge text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function FeaturedCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group grid grid-cols-1 gap-6 border border-dotted border-edge p-4 transition-colors hover:border-foreground/30 md:grid-cols-[1fr_1fr] md:p-6"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
        <Image
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {post.category}
        </span>
        <h2 className="mt-3 text-2xl font-medium leading-tight md:text-3xl">
          {post.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
          <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col border border-dotted border-edge transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
        <Image
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {post.category}
        </span>
        <h3 className="mt-2 text-base font-medium leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            {post.readTime}
          </span>
          <span className="text-[10px] text-muted-foreground transition-colors group-hover:text-foreground">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsPage() {
  return (
    <main className="flex-1">
      <section aria-labelledby="blogs-title">
        <ContainerWrapper>
          <HeaderTitle title="Blogs" id="blogs-title" />
          <div className="p-4 sm:p-6">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Practical guides and insights from SNAB Innovations on AI product
              development, workflow automation, and building software that holds
              up in production.
            </p>
            <div className="mt-6">
              <CategoryFilters />
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      {featuredPost && (
        <section aria-labelledby="featured-post-title">
          <ContainerWrapper>
            <div className="p-4 sm:p-6">
              <h2
                id="featured-post-title"
                className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Featured
              </h2>
              <FeaturedCard post={featuredPost} />
            </div>
          </ContainerWrapper>
        </section>
      )}

      <SectionSeparator />

      <section aria-labelledby="latest-posts-title">
        <ContainerWrapper>
          <HeaderTitle title="Latest posts" id="latest-posts-title" />
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </ContainerWrapper>
      </section>

      <SectionSeparator />

      <section aria-label="Tagline">
        <ContainerWrapper>
          <div className="p-4 py-8 text-center sm:p-6">
            <p className="font-pixelify text-base text-muted-foreground sm:text-xl md:text-2xl">
              &ldquo;Building intelligent software that holds up&rdquo;
            </p>
          </div>
        </ContainerWrapper>
      </section>
    </main>
  );
}
