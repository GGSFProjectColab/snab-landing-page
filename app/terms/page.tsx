import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { Footer } from "../Footer";
import "../legal.css";
import "../legacy.css";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms & Conditions for using SNAB Innovations services and website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-grid-plane" aria-hidden="true" />
      
      <div className="legal-container">
        <header className="legal-header">
          <p className="legal-kicker">
            <span aria-hidden="true" /> Governance &amp; Agreement
          </p>
          <h1>Terms &amp; Conditions</h1>
          <p className="legal-updated">Last updated: July 17, 2026</p>
        </header>

        <article className="legal-content">
          <p>
            Welcome to SNAB Innovations. By accessing our website (<a href="https://snab.co.in">snab.co.in</a>) and using our services, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website or services.
          </p>

          <h2>1. Services Provided</h2>
          <p>
            SNAB Innovations provides AI product engineering, workflow automation, web platforms, custom application development, and consulting services. All services are subject to specific agreements signed between SNAB Innovations and its clients.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            Unless otherwise stated in a separate written agreement, all materials on this website, including design, code, graphics, and text, are the intellectual property of SNAB Innovations and are protected by applicable copyright and trademark laws.
          </p>

          <h2>3. Website Use</h2>
          <p>
            You agree to use this website only for lawful purposes. You must not:
          </p>
          <ul>
            <li>Use the website in any way that causes, or may cause, damage to the website or impairment of its availability.</li>
            <li>Attempt to gain unauthorized access to any part of the website or our server systems.</li>
            <li>Use the website to copy, store, host, transmit, send, use, publish or distribute any malicious software.</li>
          </ul>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall SNAB Innovations, nor any of its officers, directors, and employees, be liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise. SNAB Innovations shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
          </p>

          <h2>5. Indemnification</h2>
          <p>
            You hereby indemnify to the fullest extent SNAB Innovations from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
          </p>

          <h2>6. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms will be governed by and construed in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Nashik, Maharashtra, India for the resolution of any disputes.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to revise these Terms &amp; Conditions at any time. By using this website, you are expected to review these Terms on a regular basis to ensure you understand all terms and conditions governing the use of this website.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms &amp; Conditions, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:info.snabinnovations@gmail.com">info.snabinnovations@gmail.com</a></li>
            <li>Address: Nashik, Maharashtra, 422005, India</li>
          </ul>
        </article>
      </div>
      
      <Footer />
    </main>
  );
}
