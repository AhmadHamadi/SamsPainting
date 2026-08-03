import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Sam's Painting",
  description:
    'How Sam’s Painting collects, uses and protects the personal information you submit through this website. Compliant with Canadian privacy law (PIPEDA).',
  path: '/privacy/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy', href: '/privacy/' },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <section className="band">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2">Privacy Policy</h1>
          <p className="mt-3 text-[0.85rem] text-slate">Last updated 3 August 2026</p>

          <div className="prose-local mt-8 space-y-6">
            <div>
              <h2 className="!text-xl">What we collect</h2>
              <p>
                When you submit the quote form we collect your name, phone number, email address,
                the city you are in, the service you are asking about, and whatever you write in the
                message field. That is the whole list. We do not ask for payment details, and we
                never will through this website.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Why we collect it</h2>
              <p>
                Solely to respond to your enquiry and prepare your estimate. We do not sell, rent or
                trade your information to anyone, and we do not add you to a marketing list without
                you asking us to.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">How it reaches us</h2>
              <p>
                Form submissions are delivered by email through Resend, a third-party email delivery
                service, to the business inbox for {site.name}. The message is transmitted over an
                encrypted connection. Submissions identified as automated or as unsolicited business
                marketing are discarded rather than delivered.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">How long we keep it</h2>
              <p>
                Enquiry emails are kept for as long as needed to quote and complete the work, and
                for a reasonable period afterwards for warranty and record-keeping purposes. You can
                ask us to delete your information at any time.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Cookies and tracking</h2>
              <p>
                This website does not set advertising or tracking cookies, and it does not run
                third-party advertising scripts. Fonts and images are served from this site&rsquo;s
                own domain rather than a third-party CDN.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Your rights</h2>
              <p>
                Under Canadian privacy law you may request access to the personal information we
                hold about you, ask for it to be corrected, or ask us to delete it. Contact us at{' '}
                <a href={site.emailHref} className="font-semibold text-navy underline">
                  {site.email}
                </a>{' '}
                or call{' '}
                <a href={site.phoneHref} className="font-semibold text-navy underline">
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
