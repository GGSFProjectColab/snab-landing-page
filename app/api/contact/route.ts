import { NextRequest, NextResponse } from "next/server";
import { getInsforge } from "@/lib/insforge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
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

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!trimmedPhone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
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
        { error: error.message || "Failed to save contact inquiry." },
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
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
