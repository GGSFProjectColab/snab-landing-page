"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight, Check, FileText, LoaderCircle, Upload, X } from "lucide-react";
import { getInsforge } from "@/lib/insforge";
import type { CareerJob } from "@/lib/careers";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type ApplicationFormProps = {
  job?: Pick<CareerJob, "id" | "title">;
};

function cleanFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-");
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Your résumé could not be read."));
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.readAsDataURL(file);
  });
}

export function ApplicationForm({ job }: ApplicationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function chooseFile(nextFile?: File) {
    setError("");
    if (!nextFile) return;
    if (!ALLOWED_TYPES.has(nextFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX résumé.");
      return;
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setError("Your résumé must be 5 MB or smaller.");
      return;
    }
    setFile(nextFile);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!file) {
      setError("Please attach your résumé before submitting.");
      fileInputRef.current?.focus();
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("website")) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationId = crypto.randomUUID();
      const resumeBase64 = await fileToBase64(file);

      const optional = (name: string) => {
        const value = String(formData.get(name) || "").trim();
        return value || null;
      };

      const fullName = String(formData.get("full_name") || "").trim();
      const nameParts = fullName.split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const application = {
        id: applicationId,
        application_type: job ? "job" : "general",
        job_id: job?.id ?? null,
        first_name: firstName,
        last_name: lastName,
        email: String(formData.get("email") || "").trim().toLowerCase(),
        phone: optional("phone"),
        location: String(formData.get("location") || "").trim(),
        linkedin_url: optional("linkedin_url"),
        portfolio_url: optional("portfolio_url"),
        years_experience: null,
        current_company: null,
        current_title: null,
        notice_period: null,
        preferred_role: job ? null : String(formData.get("preferred_role") || "").trim(),
        cover_note: String(formData.get("cover_note") || "").trim(),
        resume_name: cleanFileName(file.name),
        resume_size: file.size,
        resume_type: file.type,
        consent: formData.get("consent") === "on",
      };

      const { error: insertError } = await getInsforge().database.rpc("submit_career_application", {
        p_application: application,
        p_resume_base64: resumeBase64,
      });

      if (insertError) throw new Error(insertError.message || "Your application could not be saved.");

      form.reset();
      setFile(null);
      setSubmitted(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-4" role="status">
        <div className="inline-flex items-center justify-center w-12 h-12 border border-dotted border-edge bg-foreground/[0.03] mb-4">
          <Check size={20} className="text-foreground" />
        </div>
        <p className="font-mono text-caption uppercase tracking-wider text-muted-foreground mb-2">
          Application received
        </p>
        <h2 className="text-title font-normal text-foreground">
          Thank you for raising your hand.
        </h2>
        <p className="text-body text-muted-foreground mt-2 max-w-sm mx-auto">
          We&apos;ll review your application. If there&apos;s a match, our team will reach out.
        </p>
        <a
          href="/careers"
          className="inline-flex items-center gap-2 mt-5 text-button font-normal text-foreground hover:text-muted-foreground transition-colors"
        >
          View other roles <ArrowRight size={12} />
        </a>
      </div>
    );
  }

  return (
    <form className="max-w-[520px]" onSubmit={handleSubmit} noValidate={false}>
      <div className="mb-6">
        <h2 className="text-title font-normal text-foreground">
          {job ? `Apply for ${job.title}` : "Join our talent network"}
        </h2>
        <p className="text-body text-muted-foreground mt-1">
          Takes about 3 minutes. No account needed.
        </p>
      </div>

      <fieldset className="border-none p-0 mb-5 border-t border-dotted border-edge pt-4">
        <legend className="font-mono text-caption uppercase tracking-wider text-muted-foreground mb-3">
          About you
        </legend>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-button text-foreground">
            Full name <span className="text-destructive">*</span>
            <input
              name="full_name"
              autoComplete="name"
              required
              className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
              placeholder="Jane Smith"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-button text-foreground">
              Email <span className="text-destructive">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-1 text-button text-foreground">
              Phone <span className="text-muted-foreground text-caption">Optional</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-button text-foreground">
            Location <span className="text-destructive">*</span>
            <input
              name="location"
              autoComplete="address-level2"
              required
              className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
              placeholder="e.g. Nashik, Maharashtra"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="border-none p-0 mb-5 border-t border-dotted border-edge pt-4">
        <legend className="font-mono text-caption uppercase tracking-wider text-muted-foreground mb-3">
          Links
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-button text-foreground">
            LinkedIn <span className="text-muted-foreground text-caption">Optional</span>
            <input
              name="linkedin_url"
              type="url"
              inputMode="url"
              className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
              placeholder="https://linkedin.com/in/..."
            />
          </label>
          <label className="flex flex-col gap-1 text-button text-foreground">
            Portfolio / GitHub <span className="text-muted-foreground text-caption">Optional</span>
            <input
              name="portfolio_url"
              type="url"
              inputMode="url"
              className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
              placeholder="https://"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="border-none p-0 mb-5 border-t border-dotted border-edge pt-4">
        <legend className="font-mono text-caption uppercase tracking-wider text-muted-foreground mb-3">
          Tell us
        </legend>

        {!job && (
          <label className="flex flex-col gap-1 text-button text-foreground mb-3">
            Role you&apos;re interested in <span className="text-destructive">*</span>
            <input
              name="preferred_role"
              required
              className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors"
              placeholder="e.g. Product engineering, AI research"
            />
          </label>
        )}

        <label className="flex flex-col gap-1 text-button text-foreground">
          {job ? "Why this role?" : "What kind of work are you looking to do?"} <span className="text-destructive">*</span>
          <textarea
            name="cover_note"
            rows={3}
            maxLength={1800}
            required
            className="w-full border border-dotted border-edge bg-foreground/[0.03] text-foreground px-3 py-2 text-button outline-none transition-colors resize-none"
            placeholder="A short, honest note is perfect."
          />
        </label>

        <div className="mt-3">
          <p className="text-body text-foreground mb-1">
            Résumé / CV <span className="text-destructive">*</span>
          </p>
          <p className="text-caption text-muted-foreground mb-2">PDF, DOC, or DOCX · Max 5 MB</p>
          <input
            ref={fileInputRef}
            className="visually-hidden-file"
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => chooseFile(event.target.files?.[0])}
            required={!file}
          />
          {file ? (
            <div className="flex items-center gap-3 border border-dotted border-edge px-3 py-2 bg-foreground/[0.02]">
              <FileText size={14} className="text-muted-foreground shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-caption text-foreground truncate">{file.name}</p>
                <p className="text-caption text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                aria-label="Remove résumé"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="resume"
              className="flex items-center justify-center gap-2 border border-dotted border-edge px-4 py-5 bg-foreground/[0.02] cursor-pointer hover:bg-foreground/[0.04] transition-colors text-button text-muted-foreground"
            >
              <Upload size={14} />
              Choose résumé
            </label>
          )}
        </div>
      </fieldset>

      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-2 text-button text-muted-foreground mb-4 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 accent-foreground"
        />
        <span>
          I agree that SNAB Innovations may use my information to evaluate this application and contact me.
          <span className="text-destructive">*</span>
        </span>
      </label>

      {error && (
        <p className="text-button text-destructive mb-3" role="alert">
          {error}
        </p>
      )}

      <button
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-dotted border-edge bg-foreground text-background text-button font-normal cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="spin" size={14} />
            Sending...
          </>
        ) : (
          <>
            Submit application
            <ArrowRight size={14} />
          </>
        )}
      </button>

      <p className="text-caption text-muted-foreground mt-3">
        We only ask for what our hiring team needs. No sensitive personal data.
      </p>
    </form>
  );
}
