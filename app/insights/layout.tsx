import type { ReactNode } from "react";
import { Footer } from "../Footer";
import "../legacy.css";

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="insights-site">
      {children}
      <Footer />
    </main>
  );
}
