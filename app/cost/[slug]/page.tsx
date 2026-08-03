import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import {
  Breadcrumbs,
  PageHero,
  CTABand,
  FaqSection,
  QuoteBand,
  DirectAnswer,
} from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { costPages, costBySlug } from '@/lib/costs';
import { range } from '@/lib/pricing';
import { serviceBySlug, serviceHref } from '@/lib/services';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export function generateStaticParams() {
  return costPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = costBySlug[params.slug];
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} | Sam's Painting`,
    description: p.answer,
    path: `/cost/${p.slug}/`,
  });
}

export default function CostPage({ params }: { params: { slug: string } }) {
  const p = costBySlug[params.slug];
  if (!p) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Costs', href: '/cost/' },
    { name: p.title, href: `/cost/${p.slug}/` },
  ];

  return (
    <>
      {/* No Offer or PriceSpecification schema here by design — these are
          third-party market ranges, not this business's own prices. */}
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(p.faqs)]} />
      <Breadcrumbs items={crumbs} />
      {/* The colour-swatch photo turns magenta under the navy scrim, so cost
          pages use a neutral, equally relevant image instead. */}
      <PageHero
        eyebrow="Painting costs"
        h1={p.title}
        intro={p.intro.split('. ')[0] + '.'}
        photo={p.icon === 'cabinet' ? 'cabinets' : 'supplies'}
        priority
      />

      <section className="band">
        <div className="shell max-w-4xl">
          <DirectAnswer>{p.answer}</DirectAnswer>

          <p className="prose-local mt-7">{p.intro}</p>

          <div className="mt-6 rounded-xl border-l-4 border-navy bg-bone p-4">
            <p className="text-[0.85rem] leading-relaxed text-slate-dark">
              <strong className="text-navy-900">Important:</strong> the figures below are published
              third-party market ranges for the Ontario and Hamilton area, shown with their sources.
              They are <em>not</em> Sam&rsquo;s Painting&rsquo;s price list. Every job is quoted
              individually after we have seen it, and the estimate is free.
            </p>
          </div>

          {p.tables.map((table) => (
            <div key={table.caption} className="mt-10">
              <h2 className="!text-xl">{table.caption}</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
                <table className="table-local">
                  <caption className="sr-only">{table.caption}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Published range</th>
                      <th scope="col">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((r) => (
                      <tr key={r.item}>
                        <th scope="row" className="!bg-transparent !border-b !border-navy/10 !font-semibold">
                          {r.item}
                        </th>
                        <td className="whitespace-nowrap font-semibold text-navy-900">{range(r)}</td>
                        <td className="text-slate">{r.note ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2.5 text-[0.75rem] text-slate">
                Sources:{' '}
                {table.sources.map((s, i) => (
                  <span key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-gold-dark hover:underline">
                      {s.label}
                    </a>
                    {i < table.sources.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </div>
          ))}

          <h2 className="mt-12">What moves the price</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {p.drivers.map((d) => (
              <div key={d.name} className="rounded-xl border border-navy/10 bg-white p-5 shadow-card">
                <h3 className="text-[0.98rem]">{d.name}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-dark">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-navy/10 bg-bone p-6">
            <h2 className="!text-xl">Related services</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.related.map((slug) => {
                const svc = serviceBySlug[slug];
                if (!svc) return null;
                return (
                  <Link
                    key={slug}
                    href={serviceHref(svc)}
                    className="inline-flex items-center gap-2 rounded-lg border border-navy/15 bg-white px-3.5 py-2 text-[0.85rem] font-semibold text-navy-900 hover:border-gold hover:bg-gold/5"
                  >
                    <Icon name={svc.icon} size={16} className="text-gold-dark" />
                    {svc.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={p.faqs} title="Cost questions" />
      <QuoteBand
        title="Get a real figure for your property"
        points={[
          'Free written estimate with a fixed price, not an hourly rate.',
          'Every surface and repair listed so you can compare quotes fairly.',
          'The product and number of coats stated in writing.',
          'No deposit required to get a quote.',
        ]}
      />
      <CTABand />
    </>
  );
}
