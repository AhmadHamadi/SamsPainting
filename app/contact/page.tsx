import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import QuoteForm from '@/components/QuoteForm';
import { Breadcrumbs, SectionHead, FaqSection, CTABand } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { cities } from '@/lib/areas';
import { contactFaqs } from '@/lib/faqs';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "Contact Sam's Painting | Free Quote in Hamilton",
  description:
    'Get a free written painting estimate in Hamilton and surrounding areas. Call 289-700-8051 or send the form — we reply within one business day.',
  path: '/contact/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact/' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(contactFaqs)]} />
      <Breadcrumbs items={crumbs} />

      <section className="band">
        <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Free estimate</p>
            <h1 className="mt-2">Get Your Free Painting Quote</h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-dark">
              Tell us roughly what you need and we will arrange a time to come and look at it. The
              estimate is free, written, and lists every surface and repair included — no deposit,
              no obligation.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-xl border border-navy/10 bg-white p-4 shadow-card transition-colors hover:border-gold"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                  <Icon name="phone" size={21} />
                </span>
                <span>
                  <span className="block text-[0.72rem] font-bold uppercase tracking-wider text-gold-dark">
                    Call or text
                  </span>
                  <span className="block font-display text-xl font-bold text-navy-900">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-4 rounded-xl border border-navy/10 bg-white p-4 shadow-card transition-colors hover:border-gold"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                  <Icon name="mail" size={21} />
                </span>
                <span>
                  <span className="block text-[0.72rem] font-bold uppercase tracking-wider text-gold-dark">
                    Email
                  </span>
                  <span className="block font-semibold text-navy-900">{site.email}</span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-navy/10 bg-bone p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                  <Icon name="clock" size={21} />
                </span>
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-wider text-gold-dark">
                    Hours
                  </p>
                  <ul className="mt-1 space-y-0.5 text-[0.88rem] text-slate-dark">
                    <li>Monday to Friday — 7:00am to 6:00pm</li>
                    <li>Saturday — 8:00am to 4:00pm</li>
                    <li>Sunday — closed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[0.72rem] font-bold uppercase tracking-wider text-gold-dark">
                Areas we cover
              </p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-slate-dark">
                {cities.map((c) => c.name).join(' · ')}
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <QuoteForm id="quote" title="Request Your Free Quote" />
          </div>
        </div>
      </section>

      <FaqSection faqs={contactFaqs} title="Getting in touch" />
      <CTABand title="Rather just call?" text="You will speak to Sam directly, not an answering service." />
    </>
  );
}
