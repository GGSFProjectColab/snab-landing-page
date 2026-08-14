import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
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



function FeaturedCard({ post }: { post: BlogPost }) {
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
        <span className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
          {post.category}
        </span>
        <h2 className="mt-3 text-subheading font-normal leading-tight">
          {post.title}
        </h2>
        <p className="mt-4 text-body leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-caption text-muted-foreground">{post.readTime}</span>
          <span className="text-caption text-muted-foreground transition-colors group-hover:text-foreground">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
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
        <span className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
          {post.category}
        </span>
        <h3 className="mt-2 text-title font-normal leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-body leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-caption text-muted-foreground">
            {post.readTime}
          </span>
          <span className="text-caption text-muted-foreground transition-colors group-hover:text-foreground">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

async function FeaturedPost() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find((post) => post.featured);

  if (!featuredPost) return null;

  return (
    <section aria-labelledby="featured-post-title">
      <ContainerWrapper>
        <div className="p-4 sm:p-6">
          <h2
            id="featured-post-title"
            className="mb-4 text-caption font-medium uppercase tracking-wider text-muted-foreground"
          >
            Featured
          </h2>
          <FeaturedCard post={featuredPost} />
        </div>
      </ContainerWrapper>
    </section>
  );
}

function FeaturedPostFallback() {
  return (
    <section>
      <ContainerWrapper>
        <div className="p-4 sm:p-6">
          <div className="h-3 w-16 rounded-sm bg-muted animate-pulse mb-4" />
          <FeaturedPostSkeleton />
        </div>
      </ContainerWrapper>
    </section>
  );
}

async function BlogGrid() {
  const posts = await getBlogPosts();
  const gridPosts = posts.filter((post) => !post.featured);

  return (
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
  );
}

function BlogGridFallback() {
  return (
    <section>
      <ContainerWrapper>
        <div className="py-10 sm:py-14">
          <div className="h-8 w-32 rounded-sm bg-muted animate-pulse mb-6 mx-4 sm:mx-6" />
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}

export default function BlogsPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={<FeaturedPostFallback />}>
        <FeaturedPost />
      </Suspense>

      <Suspense fallback={<BlogGridFallback />}>
        <BlogGrid />
      </Suspense>

      <section aria-label="Tagline">
        <ContainerWrapper>
          <div className="p-4 py-8 text-center sm:p-6">
            <p className="text-title font-normal text-muted-foreground">
              &ldquo;Building intelligent software that holds up&rdquo;
            </p>
          </div>
        </ContainerWrapper>
      </section>
    </main>
  );
}
