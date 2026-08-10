import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { Footer } from "../Footer";
import "../legal.css";
import "../legacy.css";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for SNAB Innovations, detailing how we collect, use, and protect your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-grid-plane" aria-hidden="true" />
      
      <div className="legal-container">
        <header className="legal-header">
          <p className="legal-kicker">
            <span aria-hidden="true" /> Compliance &amp; Trust
          </p>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: July 17, 2026</p>
        </header>

        <article className="legal-content">
          <p>
            At SNAB Innovations, accessible from <a href="https://snab.co.in">snab.co.in</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SNAB Innovations and how we use it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you fill out contact forms, apply for careers, or communicate with us. This may include:
          </p>
          <ul>
            <li>Contact details (name, email address, phone number).</li>
            <li>Professional details (resume/CV, LinkedIn profile, work experience).</li>
            <li>Any other information you choose to provide.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate, maintain, and improve our services, including:
          </p>
          <ul>
            <li>To respond to your inquiries and support requests.</li>
            <li>To process job applications and contact you regarding careers.</li>
            <li>To analyze usage patterns and improve website performance.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>3. Log Files</h2>
          <p>
            SNAB Innovations follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2>5. Information Security</h2>
          <p>
            We implement commercially reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete the data we hold about you. To exercise these rights, please contact us.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
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
