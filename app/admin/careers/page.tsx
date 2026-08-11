import type { Metadata } from "next";
import { AdminCareers } from "./AdminCareers";

export const metadata: Metadata = { title: "Careers Admin | SNAB Innovations", robots: { index: false, follow: false } };

export default function CareersAdminPage() { return <AdminCareers />; }

