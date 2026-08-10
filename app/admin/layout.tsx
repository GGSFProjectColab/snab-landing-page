import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../legacy.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
