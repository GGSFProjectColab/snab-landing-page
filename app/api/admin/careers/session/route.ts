import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSessionValue, isAdminPassword } from "@/lib/admin-auth";

// Best-effort in-memory login throttle (per-instance). Preserves behavior for
// normal logins; only slows brute force. Serverless may reset counts —
// password remains required regardless.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 20;

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 100);
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const key = getClientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const body = await request.json().catch(() => ({}));
  if (!isAdminPassword(String(body.password || ""))) {
    return NextResponse.json({ error: "Incorrect admin password." }, { status: 401 });
  }

  let sessionValue: string;
  try {
    sessionValue = createAdminSessionValue();
  } catch {
    return NextResponse.json({ error: "Missing admin configuration." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionValue, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "strict", maxAge: 0, path: "/" });
  return response;
}

