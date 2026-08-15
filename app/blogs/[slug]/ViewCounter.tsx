"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type ViewCounterProps = {
  slug: string;
  initialCount: number;
};

export function ViewCounter({ slug, initialCount }: ViewCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Fire-and-forget: increment the view count once per page mount
    fetch(`/api/blogs/${slug}/views`, { method: "POST" })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data?.view_count !== undefined) {
          setCount(data.view_count);
        }
      })
      .catch(() => {
        // Silently ignore errors — view count is non-critical
      });
  }, [slug]);

  return (
    <span className="flex items-center gap-1">
      <Eye size={11} />
      {count.toLocaleString()} {count === 1 ? "view" : "views"}
    </span>
  );
}
