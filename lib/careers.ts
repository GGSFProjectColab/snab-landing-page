import { getInsforge } from "./insforge";

export type JobStatus = "draft" | "published" | "closed" | "deleted";

export type CareerJob = {
  id: string;
  slug: string;
  title: string;
  department: string;
  employment_type: string;
  work_mode: string;
  location: string;
  experience_level: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_have: string[];
  status: JobStatus;
  featured: boolean;
  posted_at: string | null;
  closes_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "offer"
  | "hired"
  | "rejected"
  | "archived";

export type CareerApplication = {
  id: string;
  application_type: "job" | "general";
  job_id: string | null;
  job_title: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string;
  linkedin_url: string | null;
  portfolio_url: string | null;
  years_experience: string | null;
  current_company: string | null;
  current_title: string | null;
  notice_period: string | null;
  preferred_role: string | null;
  cover_note: string;
  resume_url: string;
  resume_key: string;
  resume_name: string;
  resume_size: number;
  resume_type: string;
  consent: boolean;
  status: ApplicationStatus;
  source: string;
  created_at: string;
  updated_at: string;
};

export function isCareerJobOpen(job: Pick<CareerJob, "status" | "closes_at">) {
  return job.status === "published" && (!job.closes_at || new Date(job.closes_at).getTime() > Date.now());
}

export async function getPublishedJobs(): Promise<CareerJob[]> {
  const { data, error } = await getInsforge().database
    .from("career_jobs")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("posted_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Could not load open roles.");
  }

  return ((data ?? []) as CareerJob[]).filter(isCareerJobOpen);
}

export async function getPublishedJobBySlug(slug: string): Promise<CareerJob | null> {
  const { data, error } = await getInsforge().database
    .from("career_jobs")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Could not load this role.");
  }

  const job = (data as CareerJob | null) ?? null;
  return job && isCareerJobOpen(job) ? job : null;
}
