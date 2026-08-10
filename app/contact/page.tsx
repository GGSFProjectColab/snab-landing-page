import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "../Footer";
import { LazyContactMap } from "./LazyContactMap";
import { ContactForm } from "./ContactForm";
import "../legacy.css";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Our AI & Software Product Team",
  description:
    "Contact SNAB Innovations in Nashik to plan an AI product, workflow automation, website, app, or custom software project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-grid" aria-hidden="true" />

        <div className="contact-title-row">
          <div>
            <p className="contact-kicker">Nashik, India</p>
            <h1 id="contact-title">Let&apos;s Build Something Intelligent.</h1>
          </div>
          <p className="contact-intro">
            Tell us what you are trying to improve, automate, or launch. We
            will help shape the right product and a practical path to
            production.
          </p>
        </div>

        <div className="contact-details" aria-label="Contact details">
          <article className="contact-detail">
            <MapPin aria-hidden="true" />
            <p className="contact-detail-label">Studio</p>
            <h2>Address</h2>
            <p>
              Nashik, Maharashtra
              <br />
              India 422005
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nashik%2C%20Maharashtra"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>

          <article className="contact-detail">
            <Mail aria-hidden="true" />
            <p className="contact-detail-label">New projects</p>
            <h2>Email</h2>
            <p>
              Product, automation,
              <br />
              and consulting enquiries
            </p>
            <a href="mailto:info.snabinnovations@gmail.com">
              info.snabinnovations@gmail.com <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>

          <article className="contact-detail">
            <Phone aria-hidden="true" />
            <p className="contact-detail-label">Conversation</p>
            <h2>Calls</h2>
            <p>
              Start with a focused
              <br />
              project discovery call
            </p>
            <a href="mailto:hello@snab.ai?subject=Book%20a%20project%20call">
              Book a call <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="contact-content-section">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <p className="contact-form-kicker">Send us a message</p>
            <h2>Get In Touch</h2>
          </div>
          <ContactForm />
        </div>

        <div className="contact-map-container">
          <div className="contact-map-heading">
            <p>Based in Maharashtra</p>
            <h2>Find Us</h2>
          </div>
          <div className="contact-map-frame">
            <div className="contact-map-label">
              <span aria-hidden="true" />
              Nashik / MH / IN
            </div>
            <LazyContactMap />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
