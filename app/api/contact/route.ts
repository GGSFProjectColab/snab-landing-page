import { NextRequest, NextResponse } from "next/server";
import { getInsforge } from "@/lib/insforge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance throttle to reduce spam/DB fill. Same API shape.
const contactAttempts = new Map<string, { count: number; resetAt: number }>();

function contactRateLimited(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const key = (forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown").slice(0, 100);
  const now = Date.now();
  const entry = contactAttempts.get(key);
  if (!entry || now > entry.resetAt) {
    contactAttempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 30;
}

export async function POST(request: NextRequest) {
  try {
    if (contactRateLimited(request)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, message } = body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }
    if (trimmedName.length > 100) {
      return NextResponse.json({ error: "Name must be 100 characters or less." }, { status: 400 });
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }
    if (trimmedEmail.length > 254) {
      return NextResponse.json({ error: "Email must be 254 characters or less." }, { status: 400 });
    }

    if (!trimmedPhone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }
    if (trimmedPhone.length > 30) {
      return NextResponse.json({ error: "Phone must be 30 characters or less." }, { status: 400 });
    }

    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }
    if (trimmedMessage.length > 5000) {
      return NextResponse.json({ error: "Message must be 5000 characters or less." }, { status: 400 });
    }

    const now = new Date().toISOString();

    const { data, error } = await getInsforge().database
      .from("contacts")
      .insert([
        {
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          message: trimmedMessage,
          status: "unread",
          created_at: now,
          updated_at: now,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to save contact inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
        contact: data,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
