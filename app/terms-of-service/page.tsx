import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Sam's Painting",
  description:
    'The terms covering use of the Sam’s Painting website, our estimates, published cost information and scope of work.',
  path: '/terms-of-service/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Terms of Service', href: '/terms-of-service/' },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <section className="band">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2">Terms of Service</h1>
          <p className="mt-3 text-[0.85rem] text-slate">Last updated 3 August 2026</p>

          <div className="prose-local mt-8 space-y-6">
            <div>
              <h2 className="!text-xl">About this website</h2>
              <p>
                This website is operated by {site.name}, a residential painting contractor based in{' '}
                {site.address.locality}, {site.address.regionName}. Using the site means you accept
                the terms set out on this page.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Estimates are not binding until issued in writing</h2>
              <p>
                Nothing on this website is a quotation or an offer to contract. A price becomes
                binding only once we have inspected the property and issued a written estimate
                describing the scope of work. Estimates are typically valid for 30 days.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Published cost information</h2>
              <p>
                The figures shown on our cost pages are third-party published market ranges for the
                Ontario and Hamilton area, attributed to the sources they came from. They are
                provided for general guidance only. <strong>They are not our price list</strong>,
                they are not a quotation, and they may not reflect current market conditions or the
                specifics of your property.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Guidance and advice on this site</h2>
              <p>
                Our guides and problem pages describe general good practice. They are not a
                substitute for a professional inspection of your specific property. Information on
                permits, heritage rules and regulations was accurate to the best of our knowledge
                when written, but municipal requirements change — always confirm the current
                position with the relevant municipality before acting on it.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Workmanship</h2>
              <p>
                Work is carried out to the scope described in your written estimate. Where a
                condition is discovered that was not visible at the time of quoting, we will tell
                you before proceeding and agree any change with you in writing first.
              </p>
            </div>
            <div>
              <h2 className="!text-xl">Contact</h2>
              <p>
                Questions about these terms can go to{' '}
                <a href={site.emailHref} className="font-semibold text-navy underline">
                  {site.email}
                </a>{' '}
                or{' '}
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
