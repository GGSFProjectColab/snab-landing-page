import { MessageSquare } from "lucide-react";
import { homeFaqs } from "@/lib/faqs";

export function FAQSection() {
  return (
    <section className="faq-section full-bleed-border-t" id="faq" aria-labelledby="faq-title">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <div>
            <h2 id="faq-title" className="faq-title text-heading font-normal">
              Frequently Asked Questions
            </h2>
            <div className="faq-list mt-10">
              {homeFaqs.map((faq, index) => (
                <div className="faq-item" key={faq.question}>
                  <span className="text-caption text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <details>
                    <summary className="faq-question-row">
                      <span className="faq-question">{faq.question}</span>
                    </summary>
                    <div className="faq-answer">{faq.answer}</div>
                  </details>
                </div>
              ))}
            </div>
          </div>

          <div className="faq-right-col">
            <div className="faq-more-card rounded-2xl border border-dotted bg-card p-8 lg:sticky lg:top-24">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border" aria-hidden="true">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-title font-normal">Do you have more questions?</h3>
              <p className="mt-3 text-body leading-relaxed text-muted-foreground">
                Tell us about the product or workflow you want to improve. We&apos;ll
                help you identify a practical route from idea to production.
              </p>
              <a className="faq-btn mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-button font-normal text-background transition-opacity hover:opacity-85" href="/contact">
                Ask us directly
              </a>
            </div>
          </div>
        </div>
        <div className="bottom-rail mt-20 bg-edge" aria-hidden="true" />
      </div>
    </section>
  );
}