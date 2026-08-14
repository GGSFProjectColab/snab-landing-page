"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  FileText,
  Filter,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import { type BlogPost, slugify, calculateReadTime } from "@/lib/blogs";
import { RichTextEditor } from "./RichTextEditor";

const CATEGORIES = [
  "Engineering",
  "AI Workflows",
  "Product",
  "Case Studies",
  "Architecture",
  "Research",
  "Company",
];

export function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Editor Modal State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState("Engineering");
  const [customCategory, setCustomCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("/ascii-magic-14.png");
  const [authorName, setAuthorName] = useState("Nimay Kulkarni");
  const [authorImage, setAuthorImage] = useState("");
  const [authorRole, setAuthorRole] = useState("Founder & AI Lead");
  const [readTime, setReadTime] = useState("5 min read");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("published");

  // Uploading state
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAuthor, setIsUploadingAuthor] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation State
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch blogs on load
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) {
        throw new Error("Failed to load blogs. Please log in.");
      }
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err: any) {
      setError(err.message || "Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle Title change -> auto slug if not manually altered
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
  };

  // Open Create New Blog
  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setTitle("");
    setSlug("");
    setIsSlugManual(false);
    setCategory("Engineering");
    setCustomCategory("");
    setExcerpt("");
    setContent(`<h2>Overview</h2><p>Start writing your blog content here...</p>`);
    setCoverImage("/ascii-magic-14.png");
    setAuthorName("Nimay Kulkarni");
    setAuthorImage("");
    setAuthorRole("Founder & AI Lead");
    setReadTime("5 min read");
    setFeatured(false);
    setStatus("published");
    setEditorOpen(true);
  };

  // Open Edit Blog
  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setIsSlugManual(true);
    if (CATEGORIES.includes(blog.category)) {
      setCategory(blog.category);
      setCustomCategory("");
    } else {
      setCategory("Custom");
      setCustomCategory(blog.category);
    }
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCoverImage(blog.cover_image || "/ascii-magic-14.png");
    setAuthorName(blog.author_name || "SNAB Team");
    setAuthorImage(blog.author_image || "");
    setAuthorRole(blog.author_role || "");
    setReadTime(blog.read_time || "5 min read");
    setFeatured(Boolean(blog.featured));
    setStatus(blog.status === "draft" ? "draft" : "published");
    setEditorOpen(true);
  };

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCover(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blogs/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        alert(data.error || "Failed to upload cover image.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Upload Author Avatar
  const handleAuthorUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingAuthor(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blogs/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setAuthorImage(data.url);
      } else {
        alert(data.error || "Failed to upload author avatar.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUploadingAuthor(false);
    }
  };

  // Save Blog (Create or Update)
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    const finalCategory = category === "Custom" ? customCategory.trim() || "General" : category;
    const finalSlug = slug.trim() || slugify(title);

    setIsSaving(true);
    try {
      const blogPayload = {
        id: editingBlogId || undefined,
        title: title.trim(),
        slug: finalSlug,
        category: finalCategory,
        excerpt: excerpt.trim(),
        content: content || "",
        cover_image: coverImage.trim(),
        author_name: authorName.trim() || "SNAB Team",
        author_image: authorImage.trim() || null,
        author_role: authorRole.trim() || null,
        read_time: readTime || calculateReadTime(content),
        featured: Boolean(featured),
        status: status,
      };

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_blog",
          blog: blogPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog post.");
      }

      setEditorOpen(false);
      await fetchBlogs();
    } catch (err: any) {
      alert(err.message || "Failed to save blog.");
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = async (blog: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextFeatured = !blog.featured;
    
    // Optimistic UI update
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id === blog.id) return { ...b, featured: nextFeatured };
        if (nextFeatured) return { ...b, featured: false };
        return b;
      })
    );

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_featured",
          id: blog.id,
          featured: nextFeatured,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update featured status.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
      fetchBlogs();
    }
  };

  // Delete Blog
  const handleDeleteBlog = async () => {
    if (!deletingBlog) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_blog",
          id: deletingBlog.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete blog post.");
      }

      setBlogs((prev) => prev.filter((b) => b.id !== deletingBlog.id));
      setDeletingBlog(null);
    } catch (err: any) {
      alert("Error deleting blog: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author_name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || b.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" || b.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;
  const featuredCount = blogs.filter((b) => b.featured).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-dotted border-edge pb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
            Blog Management
            <span className="text-xs font-mono px-2 py-0.5 bg-muted border border-edge text-muted-foreground">
              {totalCount} Total
            </span>
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Publish, edit, and feature articles with real-time updates on your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="p-2 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Refresh Blogs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-medium text-xs hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Create Blog
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-dotted border-edge p-4 bg-muted/10">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">Published</span>
          <div className="mt-1 text-2xl font-bold text-foreground">{publishedCount}</div>
        </div>
        <div className="border border-dotted border-edge p-4 bg-muted/10">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">Drafts</span>
          <div className="mt-1 text-2xl font-bold text-amber-500">{draftCount}</div>
        </div>
        <div className="border border-dotted border-edge p-4 bg-muted/10">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">Featured Hero</span>
          <div className="mt-1 text-2xl font-bold text-teal">{featuredCount}</div>
        </div>
        <div className="border border-dotted border-edge p-4 bg-muted/10">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">Categories</span>
          <div className="mt-1 text-2xl font-bold text-foreground">
            {new Set(blogs.map((b) => b.category)).size}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs by title, author, or excerpt..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-dotted border-edge text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filter by blog status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-background border border-dotted border-edge px-3 text-xs text-foreground focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            aria-label="Filter by blog category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 bg-background border border-dotted border-edge px-3 text-xs text-foreground focus:outline-none"
          >
            <option value="all">All Categories</option>
            {Array.from(new Set(blogs.map((b) => b.category))).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="py-20 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-foreground" />
          <span className="text-xs">Loading blogs from database...</span>
        </div>
      ) : error ? (
        <div className="p-6 border border-dotted border-red-500/30 bg-red-500/10 text-red-400 text-center">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" />
          <p className="font-semibold text-xs">{error}</p>
          <button
            onClick={fetchBlogs}
            className="mt-3 px-3 py-1.5 bg-foreground text-background text-xs font-semibold"
          >
            Try Again
          </button>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-16 text-center border border-dotted border-edge bg-muted/5">
          <FileText className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-foreground font-semibold text-sm">No blog posts found</p>
          <p className="text-xs text-muted-foreground mt-1">
            {search || categoryFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your search or filters."
              : "Get started by creating your first blog post."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background text-xs font-semibold hover:opacity-90"
          >
            <Plus className="w-3.5 h-3.5" />
            Create First Blog
          </button>
        </div>
      ) : (
        <div className="border border-dotted border-edge overflow-hidden divide-y divide-dotted divide-edge">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors bg-background"
            >
              {/* Left Column: Image thumbnail + Details */}
              <div className="flex items-start gap-4 flex-1">
                <div className="relative h-16 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden border border-dotted border-edge bg-muted/40">
                  <Image
                    src={blog.cover_image || "/ascii-magic-14.png"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-muted border border-edge text-muted-foreground">
                      {blog.category}
                    </span>
                    {blog.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 bg-teal/10 border border-teal/30 text-teal">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                        blog.status === "published"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-foreground truncate max-w-xl group-hover:text-teal transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 max-w-2xl">
                    {blog.excerpt || "No excerpt provided."}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {blog.author_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.read_time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleToggleFeatured(blog, e)}
                  className={`p-2 border transition-colors ${
                    blog.featured
                      ? "bg-teal/10 border-teal text-teal"
                      : "border-dotted border-edge text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  title={blog.featured ? "Remove from Featured" : "Set as Featured Post"}
                >
                  <Star className={`w-4 h-4 ${blog.featured ? "fill-teal" : ""}`} />
                </button>

                <Link
                  href={`/blogs/${blog.slug}`}
                  target="_blank"
                  className="p-2 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="View Live Blog"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(blog)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-dotted border-edge hover:bg-muted text-foreground text-xs font-semibold transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingBlog(blog)}
                  className="p-2 border border-dotted border-red-500/30 hover:bg-red-500/10 text-red-400 transition-colors"
                  title="Delete Blog"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT BLOG MODAL */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-background border border-dotted border-edge shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-dotted border-edge px-6 py-4 bg-muted/20">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  {editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Complete the fields below and write your formatted blog post.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="p-1.5 border border-dotted border-edge hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. High-Speed AI Inference Architecture"
                    className="w-full bg-muted/20 border border-dotted border-edge px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-foreground">
                      URL Slug *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSlugManual(!isSlugManual)}
                      className="text-[10px] text-teal hover:underline font-mono"
                    >
                      {isSlugManual ? "Auto-generate" : "Custom Slug"}
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setIsSlugManual(true);
                      setSlug(slugify(e.target.value));
                    }}
                    placeholder="e.g. high-speed-ai-inference"
                    className="w-full bg-muted/20 border border-dotted border-edge px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                </div>
              </div>

              {/* Row 2: Category, Status, Featured, Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Category *
                  </label>
                  <select
                    aria-label="Blog category selection"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-muted/20 border border-dotted border-edge px-3 py-2 text-xs text-foreground focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="Custom">+ Custom Category</option>
                  </select>
                  {category === "Custom" && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter custom category"
                      className="mt-2 w-full bg-muted/20 border border-dotted border-edge px-2.5 py-1 text-xs text-foreground"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Publication Status
                  </label>
                  <select
                    aria-label="Blog publication status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-muted/20 border border-dotted border-edge px-3 py-2 text-xs text-foreground focus:outline-none"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-muted/20 border border-dotted border-edge px-3 py-2 text-xs text-foreground focus:outline-none"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-dotted border-edge bg-muted/10 hover:bg-muted/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="border-edge text-teal focus:ring-teal h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-teal" />
                      Hero Featured
                    </span>
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Excerpt / Brief Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short, compelling summary of the article displayed on cards and search results..."
                  className="w-full bg-muted/20 border border-dotted border-edge p-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>

              {/* Author & Cover Image Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dotted border-edge bg-muted/5">
                {/* Author Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Author Information
                  </h4>
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Nimay Kulkarni"
                      className="w-full bg-muted/20 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Author Role / Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Founder & AI Engineer"
                      className="w-full bg-muted/20 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Author Avatar Image (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        ref={authorInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAuthorUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => authorInputRef.current?.click()}
                        disabled={isUploadingAuthor}
                        className="px-3 py-1.5 border border-dotted border-edge text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        {isUploadingAuthor ? "Uploading..." : "Upload Avatar"}
                      </button>
                      <input
                        type="text"
                        value={authorImage}
                        onChange={(e) => setAuthorImage(e.target.value)}
                        placeholder="or paste image URL"
                        className="flex-1 bg-muted/20 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Image Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Cover / Banner Image
                  </h4>
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                      Cover Image URL or File *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={isUploadingCover}
                        className="px-3 py-1.5 border border-dotted border-edge text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        {isUploadingCover ? "Uploading..." : "Upload Cover"}
                      </button>
                      <input
                        type="text"
                        required
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="/ascii-magic-14.png or https://..."
                        className="flex-1 bg-muted/20 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground"
                      />
                    </div>
                  </div>
                  {coverImage && (
                    <div className="relative h-24 w-full overflow-hidden border border-dotted border-edge bg-muted/20">
                      <Image
                        src={coverImage}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Rich Word-like Document Content Editor */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Blog Content (Rich Text Document Editor) *
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your article here. Use the toolbar for bold, italic, highlights, headings, lists, tables, callouts, and images..."
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-dotted border-edge">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="px-4 py-2 border border-dotted border-edge text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-foreground text-background text-xs font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Saving Blog...
                    </>
                  ) : editingBlogId ? (
                    "Save Changes"
                  ) : (
                    "Publish Blog"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deletingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-background border border-dotted border-red-500/40 p-6">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <div className="p-2 bg-red-500/10 border border-red-500/30">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Delete Blog Post</h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Are you sure you want to permanently delete{" "}
              <strong className="text-foreground">&ldquo;{deletingBlog.title}&rdquo;</strong>? This
              action will immediately remove the blog from your live website.
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingBlog(null)}
                className="px-3 py-1.5 border border-dotted border-edge text-xs text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBlog}
                disabled={isDeleting}
                className="px-4 py-1.5 bg-red-500 text-white text-xs font-semibold hover:bg-red-600 disabled:opacity-50 flex items-center gap-1.5"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
