import type { FaqItem } from '@/lib/types';

/**
 * FAQ list built on <details>/<summary>: keyboard accessible and fully
 * crawlable with zero JavaScript, so the answer text is in the served HTML
 * where answer engines can lift it.
 *
 * The visible text here and the FAQPage JSON-LD are rendered from the SAME
 * array on every page, so they can never drift apart.
 */
export default function FAQAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card">
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900 transition-colors hover:bg-gold/[0.07] sm:px-6 sm:py-5">
            <span className="text-[0.98rem] sm:text-base">{faq.q}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-navy/20 text-navy transition-transform duration-200 group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate-dark sm:px-6 sm:pb-6">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}
