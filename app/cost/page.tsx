import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs, PageHero, SectionHead, LinkCard, CTABand, FaqSection, DirectAnswer } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { costPages } from '@/lib/costs';
import { marketFacts } from '@/lib/pricing';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: "Painting Costs in Hamilton, Ontario | Sam's Painting",
  description:
    'Researched Hamilton-area painting cost ranges with sources: interior, exterior, cabinets, decks, drywall repair and epoxy floors. Published so you can judge any quote.',
  path: '/cost/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Costs', href: '/cost/' },
];

const hubFaqs: FaqItem[] = [
  {
    q: 'Are these Sam’s Painting’s prices?',
    a: 'No, and we say so on every page. These are published third-party market ranges for the Ontario and Hamilton area, each carrying the source it came from. They exist so you can sanity-check any quote. For your property we give a free written fixed price.',
  },
  {
    q: 'Why won’t you publish a fixed price list?',
    a: 'Because painting is priced on surface area, condition and preparation, and a price list would be misleading for most homes. Anyone publishing a flat per-room rate is either padding it heavily or planning to revise it once they see the job.',
  },
  {
    q: 'Where do these figures come from?',
    a: 'Named, published Canadian sources — cost guides, contractor rate pages and the federal Job Bank for labour rates. Each table lists its sources beneath it so you can check them yourself rather than taking our word for it.',
  },
  {
    q: 'Is painting really cheaper in Hamilton than Toronto?',
    a: 'The published data says yes. One regional index puts Hamilton interior painting roughly 8 to 12 percent below the Ontario baseline and about 13 percent under Toronto labour rates, with Toronto running 20 to 30 percent above that baseline.',
  },
  {
    q: 'Does HST apply on top of these figures?',
    a: 'Ontario’s 13 percent HST applies to painting labour and materials. Some published sources quote figures including it and some exclude it, so always check which a quote is using before comparing two of them.',
  },
];

export default function CostHub() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(hubFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Straight answers on price"
        h1="What Painting Costs in Hamilton, Ontario"
        intro="Most painters will not put numbers on a website. We publish researched market ranges with their sources, so you can judge any quote you receive — including ours."
        photo="colour"
        priority
      />

      <section className="band">
        <div className="shell">
          <DirectAnswer>
            Published market ranges put a standard Hamilton bedroom at roughly $450 to $1,100, a
            whole 1,500 sq ft home interior at about $4,500 to $11,500, and a two-storey exterior at
            $8,500 to $15,000. These are third-party market figures, not our rate card — your
            written estimate is free.
          </DirectAnswer>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {costPages.map((p) => (
              <LinkCard key={p.slug} href={`/cost/${p.slug}/`} icon={p.icon} title={p.title} text={p.answer.slice(0, 130) + '…'} />
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-bone">
        <div className="shell">
          <SectionHead
            eyebrow="Useful figures"
            title="Researched facts worth knowing"
            intro="Each of these comes from a named published source, linked so you can check it."
            center
          />
          <ul className="mx-auto mt-8 max-w-3xl space-y-3">
            {marketFacts.map((f) => (
              <li key={f.fact} className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
                <p className="text-[0.95rem] leading-relaxed text-slate-dark">{f.fact}</p>
                <a
                  href={f.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[0.75rem] font-semibold text-gold-dark hover:underline"
                >
                  Source: {f.source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection faqs={hubFaqs} title="About these cost figures" />
      <CTABand title="Want a real number for your home?" text="The estimate is free, written, and lists every surface included." />
    </>
  );
}
