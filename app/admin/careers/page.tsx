import type { Metadata } from "next";
import { AdminCareers } from "./AdminCareers";

export const metadata: Metadata = { title: "Careers Admin | SNAB Innovations", robots: { index: false, follow: false } };

export default async function CareersAdminPage({ searchParams }: { searchParams: Promise<{ view?: string; job?: string }> }) {
  const params = await searchParams;
  return (
    <AdminCareers
      initialView={params.view === "jobs" ? "jobs" : "applications"}
      initialJobFilter={params.job || null}
    />
  );
}
