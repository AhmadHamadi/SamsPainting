import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

// noindex: this is a conversion confirmation page, not a search landing page.
// It is excluded from sitemap.xml for the same reason.
export const metadata: Metadata = buildMetadata({
  title: "Thank You | Sam's Painting",
  description: 'Your quote request has been received. We reply within one business day.',
  path: '/thank-you/',
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="band">
      <div className="shell max-w-2xl text-center">
        {/*
          This page is reached ONLY after the server confirms a real lead was
          sent. Honeypot hits and filtered solicitations are routed to
          /message-received/ instead, so spam can never fire the conversion.
          Add the analytics conversion event here.
        */}
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold-dark">
          <Icon name="check" size={34} strokeWidth={2.4} />
        </div>
        <h1 className="mt-6">Thanks — your request is in</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-dark">
          We have received your details and will get back to you within one business day to arrange
          a time to come and look at the work. Your written estimate is free and there is no
          obligation attached to it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={site.phoneHref} className="btn-gold">
            <Icon name="phone" size={18} /> Call {site.phoneDisplay}
          </a>
          <Link href="/" className="btn-ghost">
            Back to homepage
          </Link>
        </div>
        <div className="mt-10 rounded-2xl border border-navy/10 bg-bone p-6 text-left">
          <h2 className="!text-lg">While you wait</h2>
          <ul className="mt-3 space-y-2 text-[0.92rem] text-slate-dark">
            <li>
              <Link href="/cost/" className="font-semibold text-navy underline">
                See researched Hamilton-area cost ranges
              </Link>{' '}
              so you can judge the quote when it arrives.
            </li>
            <li>
              <Link href="/blog/how-to-prepare-your-home-for-painters/" className="font-semibold text-navy underline">
                How to prepare your home before we arrive
              </Link>{' '}
              — twenty minutes that saves an hour on the first morning.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
