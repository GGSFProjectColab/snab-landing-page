// Zero-dependency HTML sanitizer for blog content.
// Works on server and client (no DOM required).
// Goal: preserve existing editor output (headings, lists, links, images,
// tables, callouts, highlights) while stripping executable vectors.
// This is intentionally conservative to avoid breaking existing posts.

const DANGEROUS_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "base",
  "form",
  "input",
  "textarea",
  "button",
  "select",
  "option",
  "frame",
  "frameset",
  "noscript",
  "template",
  "slot",
  "applet",
  "video",
  "audio",
  "source",
  "track",
]);

const DANGEROUS_PROTOCOL = /^(javascript|vbscript|file|data:text\/html)/i;

function sanitizeUrlValue(value: string): string {
  const trimmed = value.trim().replace(/^[\u0000-\u0020]+/, "");
  if (DANGEROUS_PROTOCOL.test(trimmed)) return "#";
  return value;
}

function sanitizeAttributes(tag: string, attrs: string): string {
  // Remove event handlers (on*), then sanitize href/src/xlink:href, then
  // filter dangerous style content. Preserve everything else to avoid
  // breaking existing class-based styling (callouts, highlights).
  let out = attrs.replace(/\s+on[a-zA-Z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/g, "");

  out = out.replace(
    /\s+(href|src|xlink:href)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
    (match, name: string, raw: string) => {
      const quote = raw[0] === '"' || raw[0] === "'" ? raw[0] : '"';
      const unquoted = raw.replace(/^["']|["']$/g, "");
      const cleaned = sanitizeUrlValue(unquoted);
      return ` ${name}=${quote}${cleaned}${quote}`;
    }
  );

  // Strip style attribute only if it contains executable/dangerous CSS.
  out = out.replace(/\s+style\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, (match, raw: string) => {
    const unquoted = String(raw).replace(/^["']|["']$/g, "").toLowerCase();
    if (
      unquoted.includes("javascript:") ||
      unquoted.includes("expression(") ||
      unquoted.includes("behavior") ||
      unquoted.includes("binding") ||
      unquoted.includes("url(")
    ) {
      return "";
    }
    return match;
  });

  // Remove formaction (can trigger javascript: URLs on buttons/inputs).
  out = out.replace(/\s+formaction\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  return out;
}

export function sanitizeBlogHtml(html: unknown): string {
  if (typeof html !== "string" || !html) return "";
  // Cap input to avoid ReDoS / memory blowups; existing posts are far smaller.
  const capped = html.length > 500_000 ? html.slice(0, 500_000) : html;
  let out = capped;

  // Remove full dangerous blocks including content (script/style/iframe/etc).
  for (const tag of DANGEROUS_TAGS) {
    // <tag ...>...</tag>
    const block = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`, "gi");
    out = out.replace(block, "");
    // Self-closing / orphan open tags: <tag ...> , <tag .../>
    const open = new RegExp(`<${tag}(\\s[^>]*)?\\/?>`, "gi");
    out = out.replace(open, "");
  }

  // Sanitize remaining tags' attributes tag-by-tag.
  out = out.replace(/<([a-zA-Z][a-zA-Z0-9-]*)([^<>]*)>/g, (full, tagName: string, attrs: string) => {
    const lower = String(tagName).toLowerCase();
    if (DANGEROUS_TAGS.has(lower)) return "";
    // Closing tags never reach here (they start with /) but guard anyway.
    return `<${tagName}${sanitizeAttributes(lower, attrs || "")}>`;
  });

  return out;
}

export function isSafeRedirectUrl(url: string): boolean {
  const t = url.trim();
  if (!t) return false;
  if (/^(javascript|vbscript|file|data:text\/html)/i.test(t)) return false;
  return (
    t.startsWith("/") ||
    t.startsWith("#") ||
    t.startsWith("mailto:") ||
    /^https?:\/\//i.test(t)
  );
}

export function escapeHtmlAttr(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
