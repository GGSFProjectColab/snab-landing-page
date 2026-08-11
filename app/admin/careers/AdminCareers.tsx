"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminCareersSkeleton } from "./AdminCareersSkeleton";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  ChevronRight,
  FileText,
  LoaderCircle,
  LogOut,
  Mail,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import type {
  ApplicationStatus,
  CareerApplication,
  CareerJob,
  JobStatus,
} from "@/lib/careers";
import { BrandLogo } from "@/app/BrandLogo";

const applicationStatuses: ApplicationStatus[] = [
  "new",
  "reviewing",
  "shortlisted",
  "interview",
  "offer",
  "hired",
  "rejected",
  "archived",
];
const blankJob = {
  title: "",
  slug: "",
  department: "",
  employment_type: "Full-time",
  work_mode: "Hybrid",
  location: "",
  experience_level: "",
  summary: "",
  description: "",
  responsibilities: "",
  requirements: "",
  nice_to_have: "",
  closes_at: "",
  status: "draft" as JobStatus,
  featured: false,
};
type JobDraft = typeof blankJob & { id?: string };

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}
function isExpired(job: CareerJob) {
  return Boolean(
    job.closes_at && new Date(job.closes_at).getTime() <= Date.now()
  );
}
function deadlineLabel(job: CareerJob) {
  if (!job.closes_at) return "Open until filled";
  return `${isExpired(job) ? "Expired" : "Closes"} ${formatDate(job.closes_at)}`;
}

export function AdminCareers({ initialView = "applications", initialJobFilter = null }: { initialView?: "applications" | "jobs"; initialJobFilter?: string | null }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [activeView, setActiveView] = useState<"applications" | "jobs">(
    initialView
  );
  const [typeFilter, setTypeFilter] = useState<"all" | "job" | "general">(
    initialJobFilter ? "job" : "general"
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | ApplicationStatus
  >("all");
  const [jobFilter, setJobFilter] = useState(initialJobFilter || "all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CareerApplication | null>(null);
  const [jobDraft, setJobDraft] = useState<JobDraft | null>(null);
  const [jobToDelete, setJobToDelete] = useState<CareerJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState<"active" | "inactive">("active");

  useEffect(() => {
    setActiveView(initialView);
  }, [initialView]);

  useEffect(() => {
    if (initialJobFilter) {
      setJobFilter(initialJobFilter);
      setTypeFilter("job");
      setActiveView("applications");
    } else if (initialView === "applications") {
      setJobFilter("all");
      setTypeFilter("general");
    }
  }, [initialJobFilter, initialView]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/careers", { cache: "no-store" });
    if (response.status === 401) {
      setLoading(false);
      router.replace("/admin");
      return;
    }
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not load careers data.");
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    setApplications(toArray(payload.applications) as CareerApplication[]);
    setJobs(toArray(payload.jobs) as CareerJob[]);
    setAuthenticated(true);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const filtered = useMemo(
    () =>
      applications.filter((application) => {
        if (typeFilter !== "all" && application.application_type !== typeFilter)
          return false;
        if (statusFilter !== "all" && application.status !== statusFilter)
          return false;
        if (jobFilter !== "all" && application.job_id !== jobFilter)
          return false;
        const needle = query.trim().toLowerCase();
        return (
          !needle ||
          `${application.first_name} ${application.last_name} ${application.email} ${application.job_title || application.preferred_role || ""}`
            .toLowerCase()
            .includes(needle)
        );
      }),
    [applications, jobFilter, query, statusFilter, typeFilter]
  );

  async function logout() {
    await fetch("/api/admin/careers/session", { method: "DELETE" });
    router.replace("/admin");
  }

  async function updateStatus(
    application: CareerApplication,
    status: ApplicationStatus
  ) {
    setError("");
    const response = await fetch("/api/admin/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_application_status",
        applicationId: application.id,
        status,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not update status.");
      return;
    }
    setApplications((current) =>
      current.map((item) =>
        item.id === application.id ? { ...item, status } : item
      )
    );
    setSelected((current) =>
      current?.id === application.id ? { ...current, status } : current
    );
  }

  function editJob(job: CareerJob) {
    setJobDraft({
      ...job,
      closes_at: toDateTimeLocal(job.closes_at),
      responsibilities: job.responsibilities.join("\n"),
      requirements: job.requirements.join("\n"),
      nice_to_have: job.nice_to_have.join("\n"),
    });
  }

  async function saveJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!jobDraft) return;
    setLoading(true);
    setError("");
    const lines = (value: string) =>
      value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    const payloadJob = {
      ...jobDraft,
      closes_at: jobDraft.closes_at
        ? new Date(jobDraft.closes_at).toISOString()
        : null,
      responsibilities: lines(jobDraft.responsibilities),
      requirements: lines(jobDraft.requirements),
      nice_to_have: lines(jobDraft.nice_to_have),
    };
    const response = await fetch("/api/admin/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save_job", job: payloadJob }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not save job.");
      setLoading(false);
      return;
    }
    setJobDraft(null);
    await loadData();
  }

  async function deleteJob() {
    if (!jobToDelete) return;
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete_job",
        jobId: jobToDelete.id,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not delete this posting.");
      setLoading(false);
      return;
    }
    setJobToDelete(null);
    await loadData();
  }

  if (authenticated === null || (loading && authenticated === null))
    return <AdminCareersSkeleton />;
  if (!authenticated)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-muted-foreground">
        <LoaderCircle className="animate-spin" />
        <span className="font-pixelify text-xs uppercase tracking-wider">
          Redirecting to admin login
        </span>
      </div>
    );

  const newCount = applications.filter((item) => item.status === "new").length;
  const generalCount = applications.filter(
    (item) => item.application_type === "general"
  ).length;

  const viewingJobApplicants = activeView === "applications" && jobFilter !== "all";
  const viewedJob = viewingJobApplicants ? jobs.find((j) => j.id === jobFilter) : null;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            {viewingJobApplicants ? (
              <button
                onClick={() => {
                  setJobFilter("all");
                  setTypeFilter("general");
                  router.push("/admin/careers?view=applications");
                }}
                className="mb-2 flex items-center gap-1.5 text-xs font-pixelify uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={12} />
                All applications
              </button>
            ) : (
              <p className="mb-2 text-xs font-pixelify uppercase tracking-wider text-[#ff5a16]">
                Recruiting / {activeView}
              </p>
            )}
            <h1 className="font-pixelify text-4xl uppercase tracking-tight text-foreground md:text-5xl">
              {viewingJobApplicants
                ? `${viewedJob?.title || "Job"} applicants`
                : activeView === "applications"
                  ? "Open applications"
                  : "Job postings"}
            </h1>
          </div>
          {activeView === "jobs" ? (
            <button
              onClick={() => setJobDraft({ ...blankJob })}
              className="flex min-h-[42px] items-center gap-2 border border-dotted border-[#ff5a16] bg-[#ff5a16] px-5 font-pixelify text-xs uppercase tracking-wider text-background transition-opacity hover:opacity-90"
            >
              <Plus size={15} />
              New job
            </button>
          ) : null}
        </div>

        {activeView === "jobs" && !viewingJobApplicants && (
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setJobStatusFilter("active")}
              className={`border border-dotted px-4 py-2 font-pixelify text-[9px] uppercase tracking-wider transition-colors ${
                jobStatusFilter === "active"
                  ? "border-[#ff5a16] bg-[#ff5a16] text-background"
                  : "border-edge bg-transparent text-muted-foreground hover:border-[#ff5a16] hover:text-[#ff5a16]"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setJobStatusFilter("inactive")}
              className={`border border-dotted px-4 py-2 font-pixelify text-[9px] uppercase tracking-wider transition-colors ${
                jobStatusFilter === "inactive"
                  ? "border-[#ff5a16] bg-[#ff5a16] text-background"
                  : "border-edge bg-transparent text-muted-foreground hover:border-[#ff5a16] hover:text-[#ff5a16]"
              }`}
            >
              Expired / Deleted
            </button>
          </div>
        )}

        {error ? (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-5 border-l-[3px] border-destructive bg-destructive/10 px-4 py-3 text-destructive text-xs"
          >
            {error}
            <button onClick={() => setError("")}>
              <X size={14} />
            </button>
          </div>
        ) : null}

        {activeView === "applications" ? (
          <>
            <section className="mb-6 grid grid-cols-3 gap-px border border-dotted border-edge bg-edge">
              <article className="relative grid gap-2 bg-background p-5">
                <span className="text-[10px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  {viewingJobApplicants ? "Job applicants" : "Total candidates"}
                </span>
                <strong className="font-pixelify text-3xl font-normal text-foreground">
                  {viewingJobApplicants
                    ? applications.filter((a) => a.job_id === jobFilter).length
                    : applications.filter((a) => a.application_type === "general").length}
                </strong>
                <Users
                  size={17}
                  className="absolute right-5 top-5 text-[#ff5a16]"
                />
              </article>
              <article className="relative grid gap-2 bg-background p-5">
                <span className="text-[10px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  New to review
                </span>
                <strong className="font-pixelify text-3xl font-normal text-foreground">
                  {viewingJobApplicants
                    ? applications.filter((a) => a.job_id === jobFilter && a.status === "new").length
                    : applications.filter((a) => a.application_type === "general" && a.status === "new").length}
                </strong>
                <FileText
                  size={17}
                  className="absolute right-5 top-5 text-[#ff5a16]"
                />
              </article>
              <article className="relative grid gap-2 bg-background p-5">
                <span className="text-[10px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  {viewingJobApplicants ? "Shortlisted" : "General applications"}
                </span>
                <strong className="font-pixelify text-3xl font-normal text-foreground">
                  {viewingJobApplicants
                    ? applications.filter((a) => a.job_id === jobFilter && a.status === "shortlisted").length
                    : applications.filter((a) => a.application_type === "general").length}
                </strong>
                <Mail
                  size={17}
                  className="absolute right-5 top-5 text-[#ff5a16]"
                />
              </article>
            </section>

            <section className={`mb-4 grid gap-2.5 ${viewingJobApplicants ? "grid-cols-[minmax(240px,1fr)_minmax(145px,auto)]" : "grid-cols-[minmax(240px,1fr)_repeat(3,minmax(145px,auto))]"}`}>
              <div className="flex items-center gap-2 border border-dotted border-edge bg-background px-3">
                <Search size={14} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search candidate, email, or role"
                  className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              {!viewingJobApplicants && (
                <>
                  <select
                    value={typeFilter}
                    onChange={(event) =>
                      setTypeFilter(event.target.value as typeof typeFilter)
                    }
                    className="border border-dotted border-edge bg-background px-3 text-sm text-muted-foreground outline-none focus:border-[#ff5a16]"
                  >
                    <option value="all">All application types</option>
                    <option value="job">Job-specific</option>
                    <option value="general">General applications</option>
                  </select>
                  <select
                    value={jobFilter}
                    onChange={(event) => setJobFilter(event.target.value)}
                    className="border border-dotted border-edge bg-background px-3 text-sm text-muted-foreground outline-none focus:border-[#ff5a16]"
                  >
                    <option value="all">All roles</option>
                    {jobs.map((job) => (
                      <option value={job.id} key={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as typeof statusFilter)
                }
                className="border border-dotted border-edge bg-background px-3 text-sm text-muted-foreground outline-none focus:border-[#ff5a16]"
              >
                <option value="all">All stages</option>
                {applicationStatuses.map((status) => (
                  <option value={status} key={status}>
                    {status}
                  </option>
                ))}
              </select>
            </section>

            <section className="min-w-[850px] border-t border-dotted border-edge">
              <div className="grid grid-cols-[minmax(210px,1.2fr)_minmax(170px,1fr)_minmax(135px,0.75fr)_145px_100px_20px] items-center gap-5 py-3 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                <span>Candidate</span>
                <span>Application</span>
                <span>Location</span>
                <span>Received</span>
                <span>Stage</span>
                <span />
              </div>
              {filtered.length ? (
                filtered.map((application) => (
                  <button
                    className="grid w-full grid-cols-[minmax(210px,1.2fr)_minmax(170px,1fr)_minmax(135px,0.75fr)_145px_100px_20px] items-center gap-5 border-t border-dotted border-edge bg-transparent py-5 text-left text-muted-foreground transition-colors hover:bg-muted/50"
                    key={application.id}
                    onClick={() => setSelected(application)}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <i className="grid h-9 w-9 flex-shrink-0 place-items-center bg-muted font-pixelify text-xs text-[#ff5a16] not-italic">
                        {application.first_name[0]}
                        {application.last_name[0]}
                      </i>
                      <b className="min-w-0 overflow-hidden text-sm font-normal text-foreground text-ellipsis whitespace-nowrap">
                        {application.first_name} {application.last_name}
                        <small className="mt-1 block overflow-hidden text-ellipsis whitespace-nowrap text-[9px] text-muted-foreground">
                          {application.email}
                        </small>
                      </b>
                    </span>
                    <span className="min-w-0 text-xs">
                      <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-foreground">
                        {application.application_type === "job"
                          ? application.job_title
                          : application.preferred_role}
                      </strong>
                      <small className="mt-1 block text-[9px] text-muted-foreground">
                        {application.application_type === "job"
                          ? "Job-specific"
                          : "General application"}
                      </small>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <MapPin size={12} />
                      {application.location}
                    </span>
                    <span className="text-xs">
                      {formatDate(application.created_at)}
                    </span>
                    <span
                      className={`inline-flex w-max border border-dotted px-2 py-1 text-[9px] font-pixelify uppercase ${
                        application.status === "new" ||
                        application.status === "shortlisted" ||
                        application.status === "offer"
                          ? "border-[#ff5a16]/50 text-[#ff5a16]"
                          : application.status === "hired"
                            ? "border-[#3b7a50] text-[#66c082]"
                            : application.status === "rejected"
                              ? "border-[#8a4037] text-[#d56a5d]"
                              : "border-edge text-muted-foreground"
                      }`}
                    >
                      {application.status}
                    </span>
                    <ChevronRight size={15} className="text-muted-foreground" />
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-muted-foreground text-sm">
                  No applications match these filters.
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="grid gap-3">
            {jobs.filter((job) => {
              const expired = isExpired(job);
              const isActive = job.status === "published" && !expired;
              const isInactive = job.status === "deleted" || expired || job.status === "closed";
              return jobStatusFilter === "active" ? isActive : isInactive;
            }).map((job) => {
              const expired = isExpired(job);
              const displayStatus =
                expired && job.status === "published" ? "expired" : job.status;
              return (
                <article
                  key={job.id}
                  className={`grid grid-cols-[1fr_130px_auto] items-center gap-7 border border-dotted border-edge bg-card p-6 ${job.status === "deleted" ? "opacity-60" : ""}`}
                >
                  <div>
                    <span
                      className={`inline-flex border border-dotted px-2 py-1 text-[9px] font-pixelify uppercase ${
                        displayStatus === "published"
                          ? "border-[#ff5a16]/50 text-[#ff5a16]"
                          : displayStatus === "expired"
                            ? "border-[#6b473f] text-[#b36f65]"
                            : displayStatus === "deleted"
                              ? "border-[#463b39] text-[#8f7771]"
                              : "border-edge text-muted-foreground"
                      }`}
                    >
                      {displayStatus}
                    </span>
                    <p className="ml-2.5 inline-block text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                      {job.department}
                    </p>
                    <h2 className="mt-4 mb-2 font-pixelify text-2xl font-normal uppercase tracking-tight text-foreground">
                      {job.title}
                    </h2>
                    <small className="text-muted-foreground">
                      {job.location} · {job.work_mode} · {job.employment_type}
                    </small>
                    <span
                      className={`mt-2.5 flex items-center gap-1.5 text-[9px] font-pixelify uppercase tracking-wider ${expired ? "text-[#b36f65]" : "text-muted-foreground"}`}
                    >
                      <CalendarClock size={12} className="text-[#ff5a16]" />
                      {deadlineLabel(job)}
                    </span>
                  </div>
                  <div className="grid justify-items-center border-x border-dotted border-edge px-3">
                    <strong className="font-pixelify text-2xl font-normal text-foreground">
                      {applications.filter((item) => item.job_id === job.id)
                        .length}
                    </strong>
                    <span className="text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                      applications
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {job.status !== "deleted" ? (
                      <>
                        <button
                          onClick={() => {
                            setJobFilter(job.id);
                            setTypeFilter("job");
                            setActiveView("applications");
                            router.push(`/admin/careers?view=applications&job=${job.id}`);
                          }}
                          className="inline-flex items-center gap-1.5 border border-dotted border-edge bg-transparent px-3 py-2 font-pixelify text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-[#ff5a16] hover:text-[#ff5a16]"
                        >
                          <Users size={12} />
                          View applicants
                        </button>
                        <button
                          onClick={() => editJob(job)}
                          className="inline-flex items-center gap-1.5 border border-dotted border-edge bg-transparent px-3 py-2 font-pixelify text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-[#ff5a16] hover:text-[#ff5a16]"
                        >
                          Edit posting
                        </button>
                        <button
                          onClick={() => setJobToDelete(job)}
                          className="inline-flex items-center gap-1.5 border border-dotted border-edge bg-transparent px-3 py-2 font-pixelify text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-[#b24f43] hover:text-[#d56a5d]"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Removed from careers
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <aside className="h-full w-full max-w-[540px] overflow-y-auto border-l border-dotted border-edge bg-background p-8 shadow-[-20px_0_70px_rgba(0,0,0,0.4)]">
            <button
              onClick={() => setSelected(null)}
              className="ml-auto grid h-9 w-9 place-items-center border border-dotted border-edge bg-transparent text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={16} />
            </button>

            <div className="mb-6 border-b border-dotted border-edge pb-6">
              <div className="mb-5 grid h-14 w-14 place-items-center bg-[#ff5a16] font-pixelify text-sm text-background">
                {selected.first_name[0]}
                {selected.last_name[0]}
              </div>
              <p className="mb-2 text-[9px] font-pixelify uppercase tracking-wider text-[#ff5a16]">
                {selected.application_type === "job"
                  ? selected.job_title
                  : "General application"}
              </p>
              <h2 className="mb-2 font-pixelify text-3xl font-normal uppercase tracking-tight text-foreground">
                {selected.first_name} {selected.last_name}
              </h2>
              <small className="text-muted-foreground">
                Applied {formatDate(selected.created_at)}
              </small>
            </div>

            <label className="mb-6 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
              Hiring stage
              <select
                value={selected.status}
                onChange={(event) =>
                  updateStatus(selected, event.target.value as ApplicationStatus)
                }
                className="border border-dotted border-edge bg-muted px-3 py-3 text-sm capitalize text-foreground outline-none"
              >
                {applicationStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <section className="border-t border-dotted border-edge py-5">
              <h3 className="mb-4 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                Contact
              </h3>
              <a
                href={`mailto:${selected.email}`}
                className="mb-2 block text-sm text-foreground transition-colors hover:text-[#ff5a16]"
              >
                {selected.email}
              </a>
              {selected.phone ? (
                <a
                  href={`tel:${selected.phone}`}
                  className="mb-2 block text-sm text-foreground transition-colors hover:text-[#ff5a16]"
                >
                  {selected.phone}
                </a>
              ) : null}
              <p className="text-sm text-muted-foreground">
                {selected.location}
              </p>
            </section>

            <section className="border-t border-dotted border-edge py-5">
              <h3 className="mb-4 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                Professional profile
              </h3>
              <dl className="grid grid-cols-3 gap-3">
                <div>
                  <dt className="mb-1 text-[8px] font-pixelify uppercase tracking-wider text-muted-foreground">
                    Experience
                  </dt>
                  <dd className="text-sm text-foreground">
                    {selected.years_experience || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-[8px] font-pixelify uppercase tracking-wider text-muted-foreground">
                    Current role
                  </dt>
                  <dd className="text-sm text-foreground">
                    {[selected.current_title, selected.current_company]
                      .filter(Boolean)
                      .join(" at ") || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-[8px] font-pixelify uppercase tracking-wider text-muted-foreground">
                    Availability
                  </dt>
                  <dd className="text-sm text-foreground">
                    {selected.notice_period || "—"}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex gap-3">
                {selected.linkedin_url ? (
                  <a
                    href={selected.linkedin_url}
                    target="_blank"
                    className="flex items-center gap-1 border border-dotted border-edge px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[#ff5a16] hover:text-[#ff5a16]"
                  >
                    LinkedIn <ArrowUpRight size={12} />
                  </a>
                ) : null}
                {selected.portfolio_url ? (
                  <a
                    href={selected.portfolio_url}
                    target="_blank"
                    className="flex items-center gap-1 border border-dotted border-edge px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[#ff5a16] hover:text-[#ff5a16]"
                  >
                    Portfolio / GitHub <ArrowUpRight size={12} />
                  </a>
                ) : null}
              </div>
            </section>

            <section className="border-t border-dotted border-edge py-5">
              <h3 className="mb-4 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                Candidate note
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selected.cover_note}
              </p>
            </section>

            <a
              className="mt-6 flex items-center gap-3 border border-dotted border-edge bg-card p-4 transition-colors hover:border-[#ff5a16]"
              href={selected.resume_url}
              target="_blank"
            >
              <FileText size={18} className="text-[#ff5a16]" />
              <span>
                <strong className="block text-sm font-normal text-foreground">
                  {selected.resume_name}
                </strong>
                <small className="text-[9px] text-muted-foreground">
                  {formatSize(selected.resume_size)}
                </small>
              </span>
              <ArrowUpRight size={14} className="ml-auto text-muted-foreground" />
            </a>
          </aside>
        </div>
      ) : null}

      {jobDraft ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <form
            className="grid max-h-[calc(100vh-48px)] w-full max-w-[850px] grid-rows-[auto_1fr_auto] border border-dotted border-edge bg-background"
            onSubmit={saveJob}
          >
            <header className="flex items-center justify-between border-b border-dotted border-edge px-6 py-5">
              <div>
                <p className="mb-1 text-[8px] font-pixelify uppercase tracking-wider text-[#ff5a16]">
                  Job posting
                </p>
                <h2 className="font-pixelify text-2xl font-normal uppercase tracking-tight text-foreground">
                  {jobDraft.id ? "Edit role" : "Create role"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setJobDraft(null)}
                aria-label="Close editor"
                className="bg-transparent text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={20} />
              </button>
            </header>

            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-5">
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Role title
                  <input
                    value={jobDraft.title}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, title: e.target.value })
                    }
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  URL slug
                  <input
                    value={jobDraft.slug}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, ""),
                      })
                    }
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Department
                  <input
                    value={jobDraft.department}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, department: e.target.value })
                    }
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Experience level
                  <input
                    value={jobDraft.experience_level}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        experience_level: e.target.value,
                      })
                    }
                    placeholder="e.g. 2–5 years"
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Employment type
                  <input
                    value={jobDraft.employment_type}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        employment_type: e.target.value,
                      })
                    }
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Work style
                  <input
                    value={jobDraft.work_mode}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, work_mode: e.target.value })
                    }
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="col-span-2 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Location
                  <input
                    value={jobDraft.location}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, location: e.target.value })
                    }
                    required
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Application deadline{" "}
                  <small className="justify-self-end text-[8px]">
                    Optional
                  </small>
                  <input
                    type="datetime-local"
                    value={jobDraft.closes_at}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, closes_at: e.target.value })
                    }
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Status
                  <select
                    value={jobDraft.status}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        status: e.target.value as JobStatus,
                      })
                    }
                    className="border border-dotted border-edge bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#ff5a16]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>
                <label className="col-span-2 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Short summary
                  <textarea
                    rows={3}
                    value={jobDraft.summary}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, summary: e.target.value })
                    }
                    className="resize-y border border-dotted border-edge bg-muted px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="col-span-2 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Full description
                  <textarea
                    rows={5}
                    value={jobDraft.description}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, description: e.target.value })
                    }
                    className="resize-y border border-dotted border-edge bg-muted px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="col-span-2 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Responsibilities (one per line)
                  <textarea
                    rows={4}
                    value={jobDraft.responsibilities}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        responsibilities: e.target.value,
                      })
                    }
                    className="resize-y border border-dotted border-edge bg-muted px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="col-span-2 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Requirements (one per line)
                  <textarea
                    rows={4}
                    value={jobDraft.requirements}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        requirements: e.target.value,
                      })
                    }
                    className="resize-y border border-dotted border-edge bg-muted px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="col-span-2 grid gap-2 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  Nice to have (one per line)
                  <textarea
                    rows={3}
                    value={jobDraft.nice_to_have}
                    onChange={(e) =>
                      setJobDraft({
                        ...jobDraft,
                        nice_to_have: e.target.value,
                      })
                    }
                    className="resize-y border border-dotted border-edge bg-muted px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none focus:border-[#ff5a16]"
                  />
                </label>
                <label className="col-span-2 flex items-center gap-2.5 pt-5 text-[9px] font-pixelify uppercase tracking-wider text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={jobDraft.featured}
                    onChange={(e) =>
                      setJobDraft({ ...jobDraft, featured: e.target.checked })
                    }
                    className="accent-[#ff5a16]"
                  />
                  Featured job
                </label>
              </div>
            </div>

            <footer className="flex justify-end gap-2.5 border-t border-dotted border-edge px-6 py-4">
              <button
                type="button"
                onClick={() => setJobDraft(null)}
                className="border border-dotted border-edge bg-transparent px-4 py-2.5 font-pixelify text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex min-h-[40px] items-center gap-2 border border-dotted border-[#ff5a16] bg-[#ff5a16] px-5 font-pixelify text-[9px] uppercase tracking-wider text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Saving…" : "Save role"}
              </button>
            </footer>
          </form>
        </div>
      ) : null}

      {jobToDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-job-title"
            className="w-full max-w-[470px] border border-dotted border-edge bg-background p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          >
            <AlertTriangle size={24} className="text-[#d56a5d]" />
            <p className="mt-5 text-xs font-pixelify uppercase tracking-wider text-muted-foreground">
              Delete job posting
            </p>
            <h2
              id="delete-job-title"
              className="mt-5 mb-3 font-pixelify text-2xl font-normal uppercase tracking-tight text-foreground"
            >
              Remove {jobToDelete.title}?
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              This removes the role from the careers site immediately. Existing
              applications and candidate history will remain available in this
              dashboard.
            </p>
            <footer className="mt-7 flex justify-end gap-2.5">
              <button
                onClick={() => setJobToDelete(null)}
                className="border border-dotted border-edge bg-transparent px-3.5 py-2.5 font-pixelify text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                Keep posting
              </button>
              <button
                onClick={deleteJob}
                disabled={loading}
                className="border border-dotted border-[#8a4037] bg-transparent px-3.5 py-2.5 font-pixelify text-[9px] uppercase tracking-wider text-[#d56a5d] transition-colors hover:bg-[#8a4037] hover:text-foreground disabled:opacity-60"
              >
                {loading ? "Deleting…" : "Delete posting"}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </main>
  );
}
