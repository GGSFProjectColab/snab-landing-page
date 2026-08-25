import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { createPageMetadata } from "@/lib/site";
import { getBlogPosts, type BlogPost } from "@/lib/blogs";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { FeaturedPostSkeleton } from "./FeaturedPostSkeleton";

export const metadata: Metadata = createPageMetadata({
  title: "Blogs | SNAB Innovations",
  description:
    "Practical guides and insights on AI product development, workflow automation, and production software delivery from SNAB Innovations.",
  path: "/blogs",
});

export const dynamic = "force-dynamic";

function FeaturedCard({ post }: { post: BlogPost }) {
  const imageSrc = post.cover_image || "/seo/SEO-OG.png";
  const readTimeStr = post.read_time || "5 min read";

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group grid grid-cols-1 gap-5 border border-dotted border-edge p-4 transition-colors hover:border-foreground/30 md:grid-cols-[340px_1fr] md:p-5 bg-muted/5 items-center"
    >
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-muted/15 flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
          src={imageSrc}
          alt={post.title}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-caption font-medium uppercase tracking-wider text-teal">
            {post.category}
          </span>
          <span className="text-caption text-muted-foreground">•</span>
          <span className="text-caption font-mono text-muted-foreground">{readTimeStr}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold leading-snug group-hover:text-teal transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-caption font-mono text-muted-foreground flex items-center gap-1.5">
            <span>By</span>
            <strong className="font-semibold text-foreground">{post.author_name}</strong>
          </span>
          <span className="text-caption font-mono text-teal font-medium group-hover:underline">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const imageSrc = post.cover_image || "/seo/SEO-OG.png";
  const readTimeStr = post.read_time || "5 min read";

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col border border-dotted border-edge transition-colors hover:border-foreground/30 bg-muted/5"
    >
      <div className="relative h-44 w-full overflow-hidden bg-muted/15 flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
          src={imageSrc}
          alt={post.title}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
            {post.category}
          </span>
          <span className="text-caption font-mono text-muted-foreground">
            {readTimeStr}
          </span>
        </div>
        <h3 className="mt-2 text-sm font-semibold leading-snug group-hover:text-teal transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-dotted border-edge/60">
          <span className="text-[11px] font-mono text-muted-foreground">
            {post.author_name}
          </span>
          <span className="text-caption text-muted-foreground transition-colors group-hover:text-foreground">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

async function BlogContent() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <section aria-labelledby="latest-posts-title">
        <ContainerWrapper>
          <HeaderTitle title="From the blog" id="latest-posts-title" />
          <div className="py-20 px-4 text-center">
            <p className="text-body text-muted-foreground">
              No articles published yet. Check back soon.
            </p>
          </div>
        </ContainerWrapper>
      </section>
    );
  }

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const gridPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <>
      {featuredPost && (
        <section aria-labelledby="featured-post-title">
          <ContainerWrapper>
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <TextGenerateEffect
                  as="h2"
                  id="featured-post-title"
                  className="text-caption font-medium uppercase tracking-wider text-muted-foreground"
                  staggerDuration={0.10}
                  transition={{ duration: 0.55 }}
                >
                  Featured
                </TextGenerateEffect>
              </div>
              <FeaturedCard post={featuredPost} />
            </div>
          </ContainerWrapper>
        </section>
      )}

      {gridPosts.length > 0 && (
        <section aria-labelledby="latest-posts-title">
          <ContainerWrapper>
            <HeaderTitle title="From the blog" id="latest-posts-title" />
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 xl:grid-cols-4">
              {gridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </ContainerWrapper>
        </section>
      )}
    </>
  );
}

function BlogFallback() {
  return (
    <section>
      <ContainerWrapper>
        <div className="p-4 sm:p-6">
          <div className="h-3 w-16 bg-muted animate-pulse mb-4" />
          <FeaturedPostSkeleton />
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default function BlogsPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={<BlogFallback />}>
        <BlogContent />
      </Suspense>
    </main>
  );
}
