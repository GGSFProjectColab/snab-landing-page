import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import { AdminLogin } from "./AdminLogin";

export const metadata: Metadata = {
  title: "Admin | SNAB Innovations",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (isAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/careers");
  return <AdminLogin />;
}
