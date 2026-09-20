import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "snab_careers_admin";

function safeEqual(left: string, right: string) {
  try {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);
    return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
  } catch {
    return false;
  }
}

function getSecret(): string | null {
  return process.env.INSFORGE_ADMIN_SECRET || null;
}

export function isAdminPassword(value: string) {
  const expected = process.env.CAREERS_ADMIN_PASSWORD;
  return Boolean(expected && safeEqual(value, expected));
}

export function getAdminCookieValue() {
  const secret = getSecret();
  if (!secret) throw new Error("Missing INSFORGE_ADMIN_SECRET.");
  return createHmac("sha256", secret).update("snab-careers-admin-v1").digest("hex");
}

// Per-login opaque session token: "<randomId>.<hmac(secret, randomId)>".
// Stateless (no DB/in-memory store) so it works on serverless, and each
// login gets a unique value unlike the legacy static HMAC above.
export function createAdminSessionValue() {
  const secret = getSecret();
  if (!secret) throw new Error("Missing INSFORGE_ADMIN_SECRET.");
  const randomId = randomBytes(32).toString("hex");
  const sig = createHmac("sha256", secret).update(`snab-careers-admin-session-v1:${randomId}`).digest("hex");
  return `${randomId}.${sig}`;
}

function isSessionToken(value: string) {
  const secret = getSecret();
  if (!secret) return false;
  const dot = value.indexOf(".");
  if (dot <= 0) return false;
  const randomId = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!/^[0-9a-f]{64}$/.test(randomId) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  const expected = createHmac("sha256", secret)
    .update(`snab-careers-admin-session-v1:${randomId}`)
    .digest("hex");
  return safeEqual(sig, expected);
}

export function isAdminCookie(value?: string) {
  if (!value) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    // Accept new per-session tokens first.
    if (value.includes(".") && isSessionToken(value)) return true;
    // Backward compat: accept legacy static value so existing sessions
    // keep working until next login/secret rotation.
    return safeEqual(value, getAdminCookieValue());
  } catch {
    return false;
  }
}

