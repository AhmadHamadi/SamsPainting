import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import { Breadcrumbs, PageHero, SectionHead, CTABand, FaqSection } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { citiesByRegion } from '@/lib/areas';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: "Painting Service Areas | Sam's Painting Hamilton",
  description:
    'Sam’s Painting serves Hamilton, Stoney Creek, Ancaster, Dundas, Waterdown, Binbrook, Burlington, Oakville, Milton, Grimsby, Caledonia, Brantford and St. Catharines. No travel charge.',
  path: '/service-areas/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/service-areas/' },
];

const hubFaqs: FaqItem[] = [
  {
    q: 'How far does Sam’s Painting travel?',
    a: 'Roughly a 50 kilometre radius from Hamilton, which takes in everything from Brantford in the west to St. Catharines in the east and Milton to the north. If you are just outside that, call and ask rather than assuming.',
  },
  {
    q: 'Is there a travel surcharge for towns outside Hamilton?',
    a: 'No. Every town listed on this page is part of our normal working week, and pricing does not change based on which one you are in. A quote in Grimsby is built the same way as a quote in Westdale.',
  },
  {
    q: 'Do you know the local rules in each municipality?',
    a: 'Yes, and they genuinely differ. Milton explicitly lists exterior painting as needing a heritage permit on a designated property, while Burlington has no heritage districts at all. Each area page sets out the position for that town.',
  },
  {
    q: 'Which areas do you get to most often?',
    a: 'Hamilton, Stoney Creek, Ancaster, Dundas and Burlington are where we work most weeks, simply because they are closest. That said, every town on this list is somewhere we work regularly rather than occasionally.',
  },
  {
    q: 'Can you quote a property before I own it?',
    a: 'Often yes, if you can arrange access. Booking painting for the gap between closing and moving in is the cheapest way to buy the work, because an empty house paints considerably faster than a furnished one.',
  },
];

export default function ServiceAreasHub() {
  const groups = citiesByRegion();

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(hubFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Where we work"
        h1="Painting Service Areas Across the Golden Horseshoe"
        intro="Based in Hamilton and working across thirteen towns and cities. Each area page covers the local housing stock, the conditions that affect a paint job there, and whether you need a permit."
        photo="front-door"
        priority
      />

      <section className="band">
        <div className="shell space-y-12">
          {groups.map((group, i) => (
            <div key={group.region}>
              <SectionHead eyebrow={`Region 0${i + 1}`} title={group.region} />
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((c) => (
                  <Link key={c.slug} href={`/service-areas/${c.slug}/`} className="card-hover group p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy-950">
                        <Icon name="pin" size={17} />
                      </span>
                      <h3 className="text-[1.02rem]">Painters in {c.name}</h3>
                    </div>
                    <p className="mt-3 text-[0.85rem] leading-relaxed text-slate">{c.angle}</p>
                    <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-wide text-gold-dark">
                      {c.driveTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FaqSection faqs={hubFaqs} title="About our service areas" />
      <CTABand />
    </>
  );
}
