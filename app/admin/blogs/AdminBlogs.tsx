"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  ArrowLeft,
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
  const [mounted, setMounted] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

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
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("Nimay Kulkarni");
  const [authorImage, setAuthorImage] = useState("");
  const [authorRole, setAuthorRole] = useState("Founder & AI Lead");
  const [readTime, setReadTime] = useState("5 min read");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("published");

  // Uploading state
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAuthor, setIsUploadingAuthor] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation State
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editorOpen && !isSaving) {
          setEditorOpen(false);
        } else if (deletingBlog && !isDeleting) {
          setDeletingBlog(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorOpen, deletingBlog, isSaving, isDeleting]);

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
    setMounted(true);
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
    setFormError(null);
    setFormSuccess(null);
    setEditingBlogId(null);
    setTitle("");
    setSlug("");
    setIsSlugManual(false);
    setCategory("Engineering");
    setCustomCategory("");
    setExcerpt("");
    setContent(`<h2>Overview</h2><p>Start writing your blog content here...</p>`);
    setCoverImage("");
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
    setFormError(null);
    setFormSuccess(null);
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
    setCoverImage(blog.cover_image || "");
    setAuthorName(blog.author_name || "SNAB Team");
    setAuthorImage(blog.author_image || "");
    setAuthorRole(blog.author_role || "");
    setReadTime(blog.read_time || "5 min read");
    setFeatured(Boolean(blog.featured));
    setStatus(blog.status === "draft" ? "draft" : "published");
    setEditorOpen(true);
  };

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB max

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);

    if (file.size > MAX_IMAGE_SIZE) {
      setFormError(`Cover image size exceeds the 2 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select an image under 2 MB.`);
      if (coverInputRef.current) coverInputRef.current.value = "";
      return;
    }

    setIsUploadingCover(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blogs/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        setFormError(data.error || "Failed to upload cover image.");
      }
    } catch (err: any) {
      setFormError("Error uploading cover: " + err.message);
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  // Upload Author Avatar
  const handleAuthorUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);

    if (file.size > MAX_IMAGE_SIZE) {
      setFormError(`Author avatar size exceeds the 2 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select an image under 2 MB.`);
      if (authorInputRef.current) authorInputRef.current.value = "";
      return;
    }

    setIsUploadingAuthor(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blogs/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setAuthorImage(data.url);
      } else {
        setFormError(data.error || "Failed to upload author avatar.");
      }
    } catch (err: any) {
      setFormError("Error uploading avatar: " + err.message);
    } finally {
      setIsUploadingAuthor(false);
      if (authorInputRef.current) authorInputRef.current.value = "";
    }
  };

  // Save Blog (Create or Update)
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!title.trim()) {
      setFormError("Please enter a blog title.");
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
      setFormError(err.message || "Failed to save blog.");
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
  }).sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;
  const featuredCount = blogs.filter((b) => b.featured).length;

  // ==========================================
  // CREATE / EDIT BLOG FULL WORKSPACE VIEW
  // ==========================================
  if (editorOpen) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-background/95 backdrop-blur-md border-b border-dotted border-edge flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditorOpen(false)}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dotted border-edge hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog List
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground flex items-center gap-2">
                {editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <div className="text-[11px] font-mono mt-0.5">
                {status === "published" ? (
                  <span className="text-green-400 font-semibold">● Ready to publish live</span>
                ) : (
                  <span className="text-amber-400 font-semibold">● Saving as draft</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setEditorOpen(false)}
              disabled={isSaving}
              className="px-3.5 py-1.5 border border-dotted border-edge text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="blog-editor-form"
              disabled={isSaving}
              className="px-5 py-1.5 bg-foreground text-background text-xs font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity shadow-sm"
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
        </div>

        {/* Error Notification */}
        {formError && (
          <div className="p-3.5 border border-dotted border-red-500/40 bg-red-500/10 text-red-400 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
            <button
              type="button"
              onClick={() => setFormError(null)}
              className="text-red-400 hover:text-red-300 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Form Body */}
        <form
          id="blog-editor-form"
          onSubmit={handleSaveBlog}
          className="space-y-6"
        >
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-5 border border-dotted border-edge bg-muted/5">
            {/* Author Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Author Information
                </h4>
              </div>

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
                <div className="flex items-start gap-3">
                  {/* Avatar preview */}
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-dotted border-edge bg-muted/30 shrink-0 flex items-center justify-center">
                    {authorImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={authorImage}
                        alt="Author avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground uppercase">
                        {authorName ? authorName.slice(0, 2) : "AU"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
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
                        className="px-3 py-1.5 border border-dotted border-edge text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 font-medium"
                      >
                        <Upload className={`w-3.5 h-3.5 ${isUploadingAuthor ? "animate-spin" : ""}`} />
                        {isUploadingAuthor ? "Uploading..." : "Upload Avatar (Max 2MB)"}
                      </button>
                      {authorImage && (
                        <button
                          type="button"
                          onClick={() => setAuthorImage("")}
                          className="px-2 py-1.5 border border-dotted border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                          title="Remove Avatar"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={authorImage}
                      onChange={(e) => setAuthorImage(e.target.value)}
                      placeholder="or paste image URL (https://...)"
                      className="w-full bg-muted/20 border border-dotted border-edge px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Cover / Banner Image (Original Size)
                </h4>
                {coverImage && (
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="text-[11px] text-red-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Cover
                  </button>
                )}
              </div>

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />

              {coverImage ? (
                <div className="space-y-3">
                  {/* Full Original Size Uncropped Preview */}
                  <div className="relative w-full overflow-hidden border border-dotted border-edge bg-muted/10 group flex items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={isUploadingCover}
                        className="px-3 py-1.5 bg-foreground text-background text-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" /> Change
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold hover:bg-red-600 flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={isUploadingCover}
                      className="px-3 py-1.5 border border-dotted border-edge text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Upload className={`w-3.5 h-3.5 ${isUploadingCover ? "animate-spin" : ""}`} />
                      {isUploadingCover ? "Uploading..." : "Upload New File"}
                    </button>
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 bg-muted/20 border border-dotted border-edge px-2.5 py-1 text-xs text-foreground"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="border-2 border-dashed border-edge hover:border-foreground/40 bg-muted/5 hover:bg-muted/15 p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="p-2.5 border border-dotted border-edge bg-muted/20 group-hover:bg-muted/40 transition-colors">
                      <Upload className={`w-4 h-4 text-muted-foreground group-hover:text-foreground ${isUploadingCover ? "animate-spin" : ""}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {isUploadingCover ? "Uploading image to cloud..." : "Click to select and upload Cover Image"}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        PNG, JPG, WEBP, or AVIF (max 2 MB • displayed at original size)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-muted-foreground shrink-0">Or URL:</span>
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Paste an image URL directly (https://...)"
                      className="flex-1 bg-muted/20 border border-dotted border-edge px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
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
        </form>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-background/95 backdrop-blur-md border-t border-dotted border-edge flex items-center justify-between shadow-xs">
          <div className="text-[11px] font-mono text-muted-foreground hidden sm:block">
            {status === "published" ? (
              <span className="text-green-400 font-semibold">● Ready to publish live</span>
            ) : (
              <span className="text-amber-400 font-semibold">● Saving as draft</span>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={() => setEditorOpen(false)}
              disabled={isSaving}
              className="px-4 py-2 border border-dotted border-edge text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="blog-editor-form"
              disabled={isSaving}
              className="px-6 py-2 bg-foreground text-background text-xs font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
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
        </div>
      </div>
    );
  }

  // ==========================================
  // BLOG LIST / MANAGEMENT DASHBOARD VIEW
  // ==========================================
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
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort blog posts"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 bg-background border border-dotted border-edge px-3 text-xs text-foreground focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="py-20 border border-dotted border-edge text-center bg-muted/5">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground mb-3" />
          <p className="text-xs text-muted-foreground font-mono">Loading blog posts from database...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-20 border border-dotted border-edge text-center bg-muted/5 space-y-3">
          <FileText className="w-8 h-8 mx-auto text-muted-foreground opacity-50" />
          <h3 className="text-sm font-semibold text-foreground">No blog posts found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {search || categoryFilter !== "all" || statusFilter !== "all"
              ? "No blogs match your current search and filter criteria."
              : "You have not created any blog posts yet. Click the button below to write your first article."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-foreground text-background font-medium text-xs hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Create First Blog
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-dotted border-edge p-4 sm:p-5 bg-background hover:bg-muted/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Blog info */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 border border-dotted ${
                      blog.status === "published"
                        ? "border-green-500/40 text-green-400 bg-green-500/10"
                        : "border-amber-500/40 text-amber-400 bg-amber-500/10"
                    }`}
                  >
                    {blog.status}
                  </span>

                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-dotted border-edge text-teal bg-teal/5">
                    {blog.category}
                  </span>

                  {blog.featured && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-dotted border-amber-500/40 text-amber-300 bg-amber-500/10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors truncate">
                  {blog.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-1">
                  {blog.excerpt || "No excerpt provided."}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {blog.author_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {blog.read_time || "5 min read"}
                  </span>
                  <span>/{blog.slug}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-edge/40">
                <button
                  type="button"
                  onClick={(e) => handleToggleFeatured(blog, e)}
                  className={`p-2 border border-dotted transition-colors ${
                    blog.featured
                      ? "border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                      : "border-edge text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  title={blog.featured ? "Remove from Hero Feature" : "Set as Hero Feature"}
                >
                  <Star className={`w-4 h-4 ${blog.featured ? "fill-amber-400" : ""}`} />
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

      {/* DELETE CONFIRMATION DIALOG */}
      {mounted && deletingBlog && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-background border border-dotted border-red-500/40 p-6 shadow-2xl">
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
        </div>,
        document.body
      )}
    </div>
  );
}
