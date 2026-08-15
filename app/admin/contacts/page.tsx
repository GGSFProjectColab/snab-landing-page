import type { Metadata } from "next";
import { AdminContacts } from "./AdminContacts";

export const metadata: Metadata = {
  title: "Contacts Management | SNAB Admin",
  description: "View and manage incoming contact inquiries and messages from the SNAB website.",
  robots: { index: false, follow: false },
};

export default function AdminContactsPage() {
  return <AdminContacts />;
}
