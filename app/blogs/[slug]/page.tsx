import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Sparkles } from "lucide-react";
import { ContainerWrapper } from "@/components/site/container";
import { HeaderTitle } from "@/components/profile/header-title";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { GrainGradientShader } from "@/components/ui/grain-gradient-shader";
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from "@/lib/blogs";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { sanitizeBlogHtml } from "@/lib/html-sanitize";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShareButtons } from "./ShareButtons";
import { ViewCounter } from "./ViewCounter";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  const rawImage = post.cover_image || "/seo/SEO-OG.png";
  const ogImage = rawImage.startsWith("http://") || rawImage.startsWith("https://")
    ? rawImage
    : absoluteUrl(rawImage);

  const isPng = ogImage.toLowerCase().includes(".png");
  const isJpg = ogImage.toLowerCase().includes(".jpg") || ogImage.toLowerCase().includes(".jpeg");
  const isWebp = ogImage.toLowerCase().includes(".webp");
  const mimeType = isPng ? "image/png" : isWebp ? "image/webp" : isJpg ? "image/jpeg" : "image/png";

  const canonicalUrl = absoluteUrl(`/blogs/${post.slug}`);
  const description = post.excerpt || "Article by SNAB Innovations on AI and software engineering.";

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      section: post.category,
      authors: [post.author_name],
      images: [
        {
          url: ogImage,
          secureUrl: ogImage.startsWith("https://") ? ogImage : undefined,
          width: 1200,
          height: 630,
          type: mimeType,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@snabInnovations",
      creator: "@snabInnovations",
      title: post.title,
      description,
      images: [
        {
          url: ogImage,
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const rawImage = post.cover_image || "/seo/SEO-OG.png";
  const ogImage = rawImage.startsWith("http://") || rawImage.startsWith("https://")
    ? rawImage
    : absoluteUrl(rawImage);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blogs/${post.slug}`),
    },
    image: ogImage,
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="flex-1">
        {/* COMPACT & SLEEK TITLE BLOCK WITH ALL AUTHOR & ARTICLE INFO */}
        <section aria-labelledby="blog-post-title">
          <ContainerWrapper>
            <div className="relative overflow-hidden bg-muted/30 border-b border-dotted border-edge p-4 sm:p-6 md:p-8">
              {/* Dynamic Grain Gradient Shader Background */}
              <GrainGradientShader />
              
              {/* Overlay for legibility */}
              <div
                className="absolute inset-0 bg-background/55 dark:bg-black/55 backdrop-blur-[2px]"
                aria-hidden="true"
              />

              {/* Top Bar: Back Link + Category + Share */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1.5 font-mono text-caption uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors border border-dotted border-edge px-2.5 py-1 bg-background/60 dark:bg-black/40 backdrop-blur-sm"
                  >
                    <ArrowLeft size={12} />
                    All articles
                  </Link>

                  <span className="font-mono text-caption uppercase tracking-wider text-teal border border-dotted border-teal/40 px-2.5 py-1 bg-teal/10 backdrop-blur-sm">
                    {post.category}
                  </span>

                  {post.featured && (
                    <span className="inline-flex items-center gap-1 font-mono text-caption uppercase tracking-wider text-amber-300 border border-dotted border-amber-500/40 px-2 py-1 bg-amber-500/20 backdrop-blur-sm">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  )}
                </div>

                <div className="hidden sm:block">
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="relative z-10 max-w-3xl">
                <TextGenerateEffect
                  as="h1"
                  id="blog-post-title"
                  className="text-subheading sm:text-heading font-normal tracking-tight leading-tight text-foreground dark:text-white"
                  staggerDuration={0.10}
                  transition={{ duration: 0.55 }}
                >
                  {post.title}
                </TextGenerateEffect>

                {post.excerpt && (
                  <TextGenerateEffect
                    as="p"
                    className="mt-2 text-body text-muted-foreground dark:text-slate-200 leading-relaxed"
                    staggerDuration={0.045}
                    transition={{ duration: 0.55 }}
                  >
                    {post.excerpt}
                  </TextGenerateEffect>
                )}
              </div>

              {/* Author, Publication Date & Read Time in Title Block */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-dotted border-edge/60 flex flex-wrap items-center justify-between gap-3 text-caption text-foreground/80 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  {post.author_image ? (
                    <div className="relative h-7 w-7 overflow-hidden border border-edge bg-muted shrink-0">
                      <Image
                        src={post.author_image}
                        alt={post.author_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center bg-teal/20 border border-teal/40 text-teal font-mono text-caption uppercase shrink-0">
                      {post.author_name.slice(0, 2)}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground dark:text-white">
                      {post.author_name}
                    </span>
                    {post.author_role && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground dark:text-slate-400">
                          {post.author_role}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-caption text-muted-foreground dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.read_time || "5 min read"}
                  </span>
                  <span>•</span>
                  <ViewCounter slug={post.slug} initialCount={post.view_count ?? 0} />
                </div>
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* CENTERED CLEAN BLOG ARTICLE BODY */}
        <section aria-label="Article content">
          <ContainerWrapper>
            <div className="py-10 sm:py-14 px-4 sm:px-6">
              <div className="max-w-2xl sm:max-w-3xl mx-auto">
                {/* Full Uncropped Cover Image in Original Dimensions & Aspect Ratio */}
                {post.cover_image && !post.cover_image.includes("ascii-magic") && (
                  <div className="w-full overflow-hidden mb-8 border border-dotted border-edge bg-muted/10 flex items-center justify-center p-1 sm:p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-auto max-h-[700px] object-contain mx-auto"
                    />
                  </div>
                )}

                {/* Plain, clean, readable blog typography */}
                <article
                  className="blog-rich-content text-body text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.content) }}
                />

                {/* Bottom navigation & share */}
                <div className="mt-12 pt-6 border-t border-dotted border-edge flex items-center justify-between gap-4">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1.5 font-mono text-caption uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft size={12} />
                    Back to all articles
                  </Link>

                  <ShareButtons title={post.title} slug={post.slug} />
                </div>
              </div>
            </div>
          </ContainerWrapper>
        </section>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-posts-title">
            <ContainerWrapper>
              <HeaderTitle title="More from the blog" id="related-posts-title" />
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 xl:grid-cols-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blogs/${related.slug}`}
                    className="group flex flex-col border border-dotted border-edge transition-colors hover:border-foreground/30"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                      <Image
                        src={related.cover_image || "/seo/SEO-OG.png"}
                        alt={related.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <span className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
                        {related.category}
                      </span>
                      <h3 className="mt-2 text-title font-normal leading-snug group-hover:text-teal transition-colors">
                        {related.title}
                      </h3>
                      <p className="mt-2 flex-1 text-body leading-relaxed text-muted-foreground line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-caption text-muted-foreground">
                          {related.read_time || "5 min read"}
                        </span>
                        <span className="text-caption text-muted-foreground transition-colors group-hover:text-foreground">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ContainerWrapper>
          </section>
        )}
      </main>
    </>
  );
}
