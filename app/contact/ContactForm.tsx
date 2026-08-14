"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [state, handleSubmit] = useForm("mrengaww");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (state.succeeded) {
    return (
      <p className="text-button font-medium text-green-500" role="status">
        Message sent successfully! We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label
          className="font-mono text-caption uppercase tracking-widest text-muted-foreground"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="border-0 border-b border-edge bg-transparent text-button text-foreground py-2 outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="font-mono text-caption uppercase tracking-widest text-muted-foreground"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border-0 border-b border-edge bg-transparent text-button text-foreground py-2 outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="font-mono text-caption uppercase tracking-widest text-muted-foreground"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="border-0 border-b border-edge bg-transparent text-button text-foreground py-2 outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground resize-none min-h-[80px]"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={3}
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 self-start bg-foreground text-background font-mono text-caption uppercase tracking-wider px-5 py-2.5 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={state.submitting}
      >
        {state.submitting ? "Sending..." : "Send Message"}
        <Send size={14} aria-hidden="true" />
      </button>

      {state.errors && (
        <p className="text-button font-medium text-red-500">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
