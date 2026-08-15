"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  Edit3,
  Code2,
  Upload,
  AlertCircle,
  Check,
  ChevronDown,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { calculateReadTime } from "@/lib/blogs";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const HIGHLIGHT_COLORS = [
  { name: "Yellow", bg: "#fef08a", text: "#713f12", border: "#fde047" },
  { name: "Green", bg: "#bbf7d0", text: "#14532d", border: "#86efac" },
  { name: "Blue", bg: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc" },
  { name: "Purple", bg: "#e9d5ff", text: "#581c87", border: "#d8b4fe" },
  { name: "Pink", bg: "#fecdd3", text: "#881337", border: "#fda4af" },
  { name: "Orange", bg: "#fed7aa", text: "#7c2d12", border: "#fdba74" },
];

const TEXT_COLORS = [
  { name: "Default", color: "inherit" },
  { name: "White", color: "#f8fafc" },
  { name: "Muted", color: "#94a3b8" },
  { name: "Teal", color: "#2dd4bf" },
  { name: "Blue", color: "#38bdf8" },
  { name: "Purple", color: "#c084fc" },
  { name: "Amber", color: "#fbbf24" },
  { name: "Rose", color: "#fb7185" },
];

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "html">("write");
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showTextColorMenu, setShowTextColorMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState("1 min read");

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || "";
      }
    }
    updateStats(value || "");
  }, [value]);

  const updateStats = (html: string) => {
    const text = html.replace(/<[^>]+>/g, " ").trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
    setReadTime(calculateReadTime(html));
  };

  const handleContentChange = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    onChange(html);
    updateStats(html);
  }, [onChange]);

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, arg);
    handleContentChange();
  };

  const formatBlock = (tag: string) => {
    exec("formatBlock", tag);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const htmlData = e.clipboardData.getData("text/html");
    const plainText = e.clipboardData.getData("text/plain");

    if (htmlData) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlData, "text/html");

      doc.querySelectorAll("*").forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style) {
          htmlEl.style.backgroundColor = "";
          htmlEl.style.color = "";
          htmlEl.style.fontFamily = "";
          htmlEl.style.fontSize = "";
          htmlEl.style.lineHeight = "";
        }
        if (el.tagName.toLowerCase() === "font") {
          el.replaceWith(...Array.from(el.childNodes));
        }
      });

      const cleanHtml = doc.body.innerHTML;
      exec("insertHTML", cleanHtml);
    } else if (plainText) {
      exec("insertText", plainText);
    }
  };

  const applyHighlight = (color: typeof HIGHLIGHT_COLORS[0] | null) => {
    setShowHighlightMenu(false);
    if (!color) {
      exec("removeFormat");
      return;
    }
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.className = `blog-highlight blog-highlight-${color.name.toLowerCase()}`;
    
    try {
      range.surroundContents(span);
      handleContentChange();
    } catch {
      exec("hiliteColor", color.bg);
    }
  };

  const applyTextColor = (color: string) => {
    setShowTextColorMenu(false);
    exec("foreColor", color);
  };

  const handleInsertLink = () => {
    if (!linkUrl) return;
    let finalUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith("/") && !finalUrl.startsWith("#")) {
      finalUrl = `https://${finalUrl}`;
    }

    if (linkText) {
      const html = `<a href="${finalUrl}" target="_blank" rel="noopener noreferrer" class="text-teal underline hover:text-teal/80">${linkText}</a>`;
      exec("insertHTML", html);
    } else {
      exec("createLink", finalUrl);
    }

    setLinkUrl("");
    setLinkText("");
    setShowLinkModal(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl) return;
    const captionHtml = imageCaption.trim()
      ? `<figcaption class="mt-2 text-center text-xs text-muted-foreground font-mono">${imageCaption.trim()}</figcaption>`
      : "";
    const imgHtml = `
      <figure class="my-6 overflow-hidden border border-dotted border-edge p-2 bg-muted/20">
        <img src="${imageUrl}" alt="${imageCaption || 'Blog image'}" class="w-full h-auto object-cover max-h-[500px]" />
        ${captionHtml}
      </figure>
      <p><br></p>
    `;
    exec("insertHTML", imgHtml);
    setImageUrl("");
    setImageCaption("");
    setShowImageModal(false);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`Image size exceeds 2 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select an image under 2 MB.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/blogs/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
      } else {
        alert(data.error || "Failed to upload image.");
      }
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const insertCallout = (type: "note" | "tip" | "warning") => {
    const typeLabel = type === "note" ? "Note" : type === "tip" ? "Pro Tip" : "Important";
    const calloutHtml = `
      <div class="callout callout-${type} my-4 p-4 border-l-4 bg-muted/40 border-dotted border-edge">
        <strong class="text-foreground">${typeLabel}:</strong>
        <p class="mt-1 text-sm text-muted-foreground">Add your callout details here...</p>
      </div>
      <p><br></p>
    `;
    exec("insertHTML", calloutHtml);
  };

  const insertTable = (rows = 3, cols = 3) => {
    let tableHtml = `<div class="my-6 overflow-x-auto"><table class="w-full border-collapse border border-dotted border-edge text-xs"><thead><tr class="bg-muted/50">`;
    for (let c = 0; c < cols; c++) {
      tableHtml += `<th class="border border-dotted border-edge p-2 text-left font-semibold">Header ${c + 1}</th>`;
    }
    tableHtml += `</tr></thead><tbody>`;
    for (let r = 0; r < rows; r++) {
      tableHtml += `<tr>`;
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td class="border border-dotted border-edge p-2">Cell data</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table></div><p><br></p>`;
    exec("insertHTML", tableHtml);
  };

  return (
    <div
      className={`flex flex-col border border-dotted border-edge bg-background overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-4 z-50 shadow-2xl bg-background" : "min-h-[480px]"
      }`}
    >
      {/* Top Toolbar Navigation & Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dotted border-edge bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === "write"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("html")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === "html"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            HTML Source
          </button>
        </div>

        {/* Word and Read Stats & Fullscreen Toggle */}
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{readTime}</span>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 hover:text-foreground transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Word-Like Formatting Toolbar */}
      {activeTab === "write" && (
        <div className="flex flex-wrap items-center gap-1 border-b border-dotted border-edge bg-muted/10 p-2 text-muted-foreground">
          {/* History */}
          <button
            type="button"
            onClick={() => exec("undo")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Heading select */}
          <select
            aria-label="Text structure and headings"
            onChange={(e) => {
              if (e.target.value) formatBlock(e.target.value);
            }}
            defaultValue="p"
            className="h-7 bg-background border border-dotted border-edge px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1 (H1)</option>
            <option value="h2">Heading 2 (H2)</option>
            <option value="h3">Heading 3 (H3)</option>
            <option value="h4">Heading 4 (H4)</option>
            <option value="blockquote">Quote Block</option>
            <option value="pre">Code Block</option>
          </select>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Inline styles */}
          <button
            type="button"
            onClick={() => exec("bold")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors font-bold"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors italic"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors underline"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors line-through"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Text Highlight Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowHighlightMenu(!showHighlightMenu);
                setShowTextColorMenu(false);
              }}
              className="flex items-center gap-1 p-1.5 hover:bg-muted hover:text-foreground transition-colors"
              title="Text Highlight Color"
            >
              <Highlighter className="w-4 h-4 text-amber-400" />
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
            {showHighlightMenu && (
              <div className="absolute left-0 top-full mt-1 z-30 flex flex-col gap-1 p-2 bg-background border border-dotted border-edge shadow-xl min-w-[150px]">
                <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground px-1">
                  Highlight Color
                </span>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {HIGHLIGHT_COLORS.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => applyHighlight(item)}
                      className="h-6 flex items-center justify-center text-[10px] font-bold border transition-transform hover:scale-105"
                      style={{
                        backgroundColor: item.bg,
                        color: item.text,
                        borderColor: item.border,
                      }}
                      title={item.name}
                    >
                      {item.name[0]}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => applyHighlight(null)}
                  className="mt-1 text-left px-1.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Clear Highlight
                </button>
              </div>
            )}
          </div>

          {/* Text Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTextColorMenu(!showTextColorMenu);
                setShowHighlightMenu(false);
              }}
              className="flex items-center gap-1 p-1.5 hover:bg-muted hover:text-foreground transition-colors"
              title="Font Color"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
            {showTextColorMenu && (
              <div className="absolute left-0 top-full mt-1 z-30 flex flex-col gap-1 p-2 bg-background border border-dotted border-edge shadow-xl min-w-[140px]">
                <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground px-1">
                  Text Color
                </span>
                <div className="grid grid-cols-4 gap-1.5 mt-1">
                  {TEXT_COLORS.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => applyTextColor(item.color)}
                      className="h-5 w-5 border border-edge flex items-center justify-center hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.color === "inherit" ? "#94a3b8" : item.color }}
                      title={item.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyFull")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Bulleted List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Media & Embeds */}
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTable(3, 3)}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors"
            title="Insert Horizontal Divider"
          >
            <Minus className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-edge mx-1" />

          {/* Callouts */}
          <button
            type="button"
            onClick={() => insertCallout("note")}
            className="px-2 py-1 text-[11px] font-mono bg-muted/60 hover:bg-muted hover:text-foreground transition-colors font-medium border border-dotted border-edge"
            title="Insert Note Box"
          >
            + Note
          </button>
          <button
            type="button"
            onClick={() => insertCallout("tip")}
            className="px-2 py-1 text-[11px] font-mono bg-muted/60 hover:bg-muted hover:text-foreground transition-colors font-medium text-teal border border-dotted border-edge"
            title="Insert Pro Tip Box"
          >
            + Tip
          </button>

          {/* Clear formatting */}
          <button
            type="button"
            onClick={() => exec("removeFormat")}
            className="p-1.5 hover:bg-muted hover:text-foreground transition-colors ml-auto"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div className={`p-4 bg-background ${isFullscreen ? "flex-1 overflow-y-auto" : "min-h-[300px]"}`}>
        {activeTab === "write" && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentChange}
            onBlur={handleContentChange}
            onPaste={handlePaste}
            data-placeholder={placeholder || "Start writing your blog post..."}
            className="max-w-none min-h-[340px] focus:outline-none text-foreground text-xs leading-relaxed blog-content-editable"
            style={{
              outline: "none",
            }}
          />
        )}

        {activeTab === "preview" && (
          <div className="max-w-none min-h-[340px] text-foreground text-xs leading-relaxed blog-rich-content">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  value || "<p class='text-muted-foreground italic'>No content yet. Write something to see preview.</p>",
              }}
            />
          </div>
        )}

        {activeTab === "html" && (
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              updateStats(e.target.value);
            }}
            placeholder="Edit raw HTML directly..."
            className="w-full h-[360px] bg-muted/20 border border-dotted border-edge p-3 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
          />
        )}
      </div>

      {/* Link Insertion Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-background border border-dotted border-edge p-5 shadow-2xl">
            <h3 className="text-xs font-semibold mb-3">Insert Hyperlink</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Link Text (Optional if text is selected)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Read our documentation"
                  className="w-full bg-muted/30 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Destination URL *
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-muted/30 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3 py-1.5 text-xs border border-dotted border-edge hover:bg-muted text-muted-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-4 py-1.5 text-xs bg-foreground text-background font-medium hover:opacity-90"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Insertion Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-background border border-dotted border-edge p-5 shadow-2xl">
            <h3 className="text-xs font-semibold mb-3">Insert Image</h3>
            
            {/* Upload from Computer */}
            <div className="mb-4">
              <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                Upload from Computer
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 border border-dotted border-edge py-4 hover:border-foreground/40 transition-colors text-xs text-muted-foreground hover:text-foreground"
              >
                <Upload className="w-4 h-4" />
                {isUploading ? "Uploading image..." : "Click to select and upload image"}
              </button>
            </div>

            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-edge" />
              <span className="px-2 text-[10px] uppercase font-mono text-muted-foreground">Or image URL</span>
              <div className="flex-1 h-px bg-edge" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /uploads/..."
                  className="w-full bg-muted/30 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Caption / Alt Text
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Description of the image"
                  className="w-full bg-muted/30 border border-dotted border-edge px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
            </div>

            {imageUrl && (
              <div className="mt-3 p-2 bg-muted/30 border border-dotted border-edge">
                <p className="text-[10px] text-muted-foreground mb-1">Preview:</p>
                <img src={imageUrl} alt="Preview" className="h-24 object-cover mx-auto border border-edge" />
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-3 py-1.5 text-xs border border-dotted border-edge hover:bg-muted text-muted-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={!imageUrl}
                className="px-4 py-1.5 text-xs bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-40"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
