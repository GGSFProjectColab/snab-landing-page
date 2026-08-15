"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form. Please try again.");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-2 text-teal">
          <CheckCircle2 size={18} className="shrink-0" />
          <p className="text-button font-medium">
            Message sent successfully! We&apos;ll get back to you soon.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="self-start font-mono text-caption uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
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
          disabled={isSubmitting}
        />
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
          disabled={isSubmitting}
        />
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
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 self-start bg-foreground text-background font-mono text-caption uppercase tracking-wider px-5 py-2.5 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send size={14} aria-hidden="true" />
          </>
        )}
      </button>

      {errorMessage && (
        <div className="flex items-center gap-2 text-red-500 text-button">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}
