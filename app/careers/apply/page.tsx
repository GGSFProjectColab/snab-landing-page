import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../../Footer";
import { ApplicationForm } from "../ApplicationForm";
import { createPageMetadata } from "@/lib/site";
import "../careers.css";
import "../../legacy.css";

export const metadata: Metadata = createPageMetadata({
  title: "Open Application",
  description: "Introduce yourself to the team at SNAB Innovations.",
  path: "/careers/apply",
  noIndex: true,
});

export default function GeneralApplicationPage() {
  return <main className="careers-page application-page">
    <section className="application-layout">
      <aside className="application-context">
        <Link href="/careers"><ArrowLeft size={16} /> Back to careers</Link>
        <p className="careers-kicker"><span /> Open application</p>
        <h1>Make a thoughtful introduction.</h1>
        <p>If you don&apos;t see the right opening, tell us where you do your best work. Specific examples are more useful than a formal cover letter.</p>
        <div className="application-context-note"><strong>Good to include</strong><span>The problems you enjoy, work you&apos;re proud of, and what you&apos;d like to learn next.</span></div>
      </aside>
      <div className="application-form-shell"><ApplicationForm /></div>
    </section>
    <Footer />
  </main>;
}
