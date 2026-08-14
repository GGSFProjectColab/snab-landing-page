"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { BrandLogo } from "../BrandLogo";

export function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/careers/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: formData.get("password") }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not sign in.");
      setLoading(false);
      return;
    }
    router.replace("/admin/careers");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-6 section-dot-grid">
      <a
        href="/careers"
        className="absolute left-8 top-8 flex items-center gap-2 text-muted-foreground font-pixelify text-xs uppercase tracking-wider transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Careers site
      </a>

      <div className="relative z-10 w-full max-w-md">
        <div className="relative border border-dotted border-edge bg-card p-10">
          <div className="mb-8">
            <BrandLogo className="mb-6 h-16 w-16" priority />
            <p className="mb-2 text-xs font-pixelify uppercase tracking-wider text-[#ff5a16]">
              SNAB / Hiring desk
            </p>
            <h1 className="font-pixelify text-4xl uppercase tracking-tight text-foreground">
              Admin access
            </h1>
          </div>

          <form onSubmit={login} className="space-y-5">
            <label className="grid gap-2 text-xs font-pixelify uppercase tracking-wider text-muted-foreground">
              Password
              <input
                name="password"
                type="password"
                autoFocus
                required
                className="border border-dotted border-edge bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-[#ff5a16]"
              />
            </label>

            {error ? (
              <p className="text-destructive text-xs" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full min-h-[44px] items-center justify-between gap-4 border border-dotted border-[#ff5a16] bg-[#ff5a16] px-4 text-background font-pixelify text-xs uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Checking…" : "Enter dashboard"}
              <ChevronRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
