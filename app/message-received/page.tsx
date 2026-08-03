import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

// Neutral end state for submissions the server DROPPED — honeypot hits and
// filtered B2B solicitations. Deliberately NOT /thank-you/, so a bot or an
// agency pitch can never fire the conversion event. noindex, excluded from
// the sitemap.
export const metadata: Metadata = buildMetadata({
  title: "Message Received | Sam's Painting",
  description: 'Your message has been received.',
  path: '/message-received/',
  noindex: true,
});

export default function MessageReceivedPage() {
  return (
    <section className="band">
      <div className="shell max-w-2xl text-center">
        <h1>Message received</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-dark">
          Thanks for getting in touch. If your message was about a painting job and you have not
          heard back within one business day, please call us directly on{' '}
          <a href={site.phoneHref} className="font-bold text-navy underline">
            {site.phoneDisplay}
          </a>{' '}
          — that is always the fastest way to reach us.
        </p>
        <Link href="/" className="btn-ghost mt-8">
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
