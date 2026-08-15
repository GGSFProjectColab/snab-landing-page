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

const inputClass =
  "w-full border border-dotted border-edge bg-foreground/[0.02] text-foreground px-4 py-3 text-button outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-foreground focus:bg-foreground/[0.04]";

function FieldLabel({
  label,
  required,
  optional,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1 font-mono text-caption uppercase tracking-wider text-muted-foreground mb-2"
    >
      <span>{label}</span>
      {required && <span className="text-destructive">*</span>}
      {optional && (
        <span className="text-muted-foreground/60 text-[11px] normal-case tracking-normal ml-1">
          (Optional)
        </span>
      )}
    </label>
  );
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
      <div className="text-center py-16 px-4" role="status">
        <div className="inline-flex items-center justify-center w-14 h-14 border border-dotted border-edge bg-foreground/[0.03] mb-6">
          <Check size={22} className="text-foreground" />
        </div>
        <p className="font-mono text-caption uppercase tracking-wider text-muted-foreground mb-2">
          Application received
        </p>
        <h2 className="text-title font-normal text-foreground">
          Thank you for reaching out.
        </h2>
        <p className="text-body text-muted-foreground mt-2 max-w-md mx-auto">
          We&apos;ll review your submission and contact you if there&apos;s a suitable match.
        </p>
        <a
          href="/careers"
          className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 border border-dotted border-edge text-button font-normal text-foreground hover:bg-foreground/[0.04] transition-colors"
        >
          Back to careers <ArrowRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <form className="application-form w-full flex flex-col gap-10" onSubmit={handleSubmit} noValidate={false}>
      {/* Group 1: Personal Details */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FieldLabel label="Full Name" required htmlFor="full_name" />
            <input
              id="full_name"
              name="full_name"
              autoComplete="name"
              required
              className={inputClass}
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <FieldLabel label="Email Address" required htmlFor="email" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FieldLabel label="Phone Number" optional htmlFor="phone" />
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <FieldLabel label="Location" required htmlFor="location" />
            <input
              id="location"
              name="location"
              autoComplete="address-level2"
              required
              className={inputClass}
              placeholder="e.g. Nashik, Maharashtra"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dotted border-edge" />

      {/* Group 2: Profiles & Role */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FieldLabel label="LinkedIn Profile" optional htmlFor="linkedin_url" />
            <input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              inputMode="url"
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <FieldLabel label="Portfolio / GitHub" optional htmlFor="portfolio_url" />
            <input
              id="portfolio_url"
              name="portfolio_url"
              type="url"
              inputMode="url"
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        {!job && (
          <div>
            <FieldLabel label="Role or domain you are interested in" required htmlFor="preferred_role" />
            <input
              id="preferred_role"
              name="preferred_role"
              required
              className={inputClass}
              placeholder="e.g. Full-stack engineering, AI/ML research, Systems architecture"
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-dotted border-edge" />

      {/* Group 3: Note / Message */}
      <div>
        <FieldLabel
          label={job ? "Why this role?" : "Tell us about what you build and what you enjoy working on"}
          required
          htmlFor="cover_note"
        />
        <textarea
          id="cover_note"
          name="cover_note"
          rows={5}
          maxLength={1800}
          required
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="A brief note about your background, technical interests, or problems you like to solve."
        />
      </div>

      {/* Divider */}
      <div className="border-t border-dotted border-edge" />

      {/* Group 4: Résumé / CV Upload */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 font-mono text-caption uppercase tracking-wider text-muted-foreground">
            <span>Résumé / CV</span>
            <span className="text-destructive">*</span>
          </div>
          <span className="font-mono text-caption text-muted-foreground/60">
            PDF, DOC, DOCX · Max 5MB
          </span>
        </div>

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
          <div className="flex items-center justify-between gap-4 border border-dotted border-edge p-4 bg-foreground/[0.02]">
            <div className="flex items-center gap-3 min-w-0">
              <FileText size={20} className="text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-button text-foreground truncate font-medium">{file.name}</p>
                <p className="font-mono text-caption text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              aria-label="Remove résumé"
              className="text-muted-foreground hover:text-foreground transition-colors p-1.5 border border-dotted border-edge hover:border-foreground shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="resume"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 border border-dotted border-edge p-6 sm:p-8 bg-foreground/[0.015] cursor-pointer hover:bg-foreground/[0.03] transition-colors group text-center"
          >
            <div className="w-10 h-10 border border-dotted border-edge flex items-center justify-center group-hover:border-foreground transition-colors">
              <Upload size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div>
              <p className="text-button text-foreground">Click to upload your résumé</p>
              <p className="font-mono text-caption text-muted-foreground mt-0.5">Drag and drop or browse files</p>
            </div>
          </label>
        )}
      </div>

      {/* Honeypot */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Divider */}
      <div className="border-t border-dotted border-edge" />

      {/* Group 5: Consent & Actions */}
      <div className="space-y-6">
        <label className="flex items-start gap-3 text-button text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 accent-foreground shrink-0"
          />
          <span className="text-caption text-muted-foreground leading-relaxed">
            I agree that SNAB Innovations may process my details to evaluate this application and communicate with me.
            <span className="text-destructive ml-0.5">*</span>
          </span>
        </label>

        {error && (
          <p className="text-button text-destructive" role="alert">
            {error}
          </p>
        )}

        <div>
          <button
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-dotted border-edge bg-foreground text-background text-button font-normal cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="spin" size={16} />
                Submitting application...
              </>
            ) : (
              <>
                Submit application
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
