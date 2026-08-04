import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import Img from '@/components/Img';
import CityMap from '@/components/CityMap';
import {
  Breadcrumbs,
  PageHero,
  SectionHead,
  CTABand,
  FaqSection,
  QuoteBand,
  DirectAnswer,
  Prose,
} from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { cities, cityBySlug } from '@/lib/areas';
import { matrixServices, topServices, serviceHref } from '@/lib/services';
import { cityFaqs } from '@/lib/faqs';
import { breadcrumbSchema, faqSchema, cityBusinessSchema } from '@/lib/schema';

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = cityBySlug[params.city];
  if (!city) return {};
  return buildMetadata({
    // "House Painters in X, ON" rather than "Painters in X, Ontario" — the
    // latter is the homepage title and would collide on the Hamilton page.
    title: `House Painters in ${city.name}, ON | Sam's Painting`,
    description: `Licensed, insured painters serving ${city.name}. Interior, exterior, cabinets and repairs, with no travel charge. Free written estimates — call ${site.phoneDisplay}.`,
    path: `/service-areas/${city.slug}/`,
    imageAlt: `Sam's Painting — painters serving ${city.name}, Ontario`,
  });
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cityBySlug[params.city];
  if (!city) notFound();

  const faqs = cityFaqs(city);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: city.name, href: `/service-areas/${city.slug}/` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), cityBusinessSchema(city), faqSchema(faqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow={`${city.region} · ${city.driveTime}`}
        h1={`Painters in ${city.name}, Ontario`}
        intro={city.angle}
        photo="hero"
        priority
        withForm
        defaultCity={city.name}
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <div className="space-y-9">
            <DirectAnswer>
              Sam&rsquo;s Painting covers all of {city.name}, {city.driveTime}, with no travel
              surcharge. {city.permits.split('. ')[0]}.
            </DirectAnswer>

            <Prose heading={`Housing and architecture in ${city.name}`} paragraphs={[city.housing]} />
            <Prose
              heading={`What that means for painting here`}
              paragraphs={[city.conditions]}
            />
            <Prose
              heading={`Permits and heritage rules in ${city.name}`}
              paragraphs={[city.permits]}
            />
            <p className="text-[0.82rem] text-slate">
              Authority: {city.authority}.{' '}
              <a
                href={city.permitUrl}
                className="font-semibold text-navy underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official heritage information
              </a>
              . Always confirm current requirements before changing colour on a designated property.
            </p>

            <div>
              <h2 className="mb-4">Neighbourhoods we work in</h2>
              <div className="flex flex-wrap gap-2">
                {city.neighbourhoods.map((n) => (
                  <span
                    key={n}
                    className="rounded-lg border border-navy/10 bg-bone px-3 py-1.5 text-[0.82rem] text-slate-dark"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <CityMap city={city} />

            <nav aria-label={`Painting services in ${city.name}`}>
              <h2 className="mb-4">Painting services in {city.name}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {matrixServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/service-areas/${city.slug}/${s.slug}/`}
                    className="card-hover flex items-center gap-3 p-4"
                  >
                    <Icon name={s.icon} size={20} className="shrink-0 text-gold-dark" />
                    <span className="text-[0.9rem] font-semibold text-navy-900">
                      {s.name} in {city.name}
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-[0.88rem] text-slate">
                We also cover{' '}
                {topServices
                  .filter((s) => !s.matrix)
                  .slice(0, 8)
                  .map((s, i, arr) => (
                    <span key={s.slug}>
                      <Link href={serviceHref(s)} className="text-navy hover:underline">
                        {s.navName.toLowerCase()}
                      </Link>
                      {i < arr.length - 1 ? ', ' : ''}
                    </span>
                  ))}{' '}
                and more throughout {city.name}.
              </p>
            </nav>
          </div>

          <aside className="lg:sticky lg:top-28">
            <Img
              name="crew"
              sizes="(max-width: 1024px) 100vw, 400px"
              className="mb-5 w-full rounded-2xl object-cover shadow-card"
            />
            <div className="rounded-2xl border border-navy/10 bg-bone p-6">
              <h3 className="font-display text-lg">{city.name} at a glance</h3>
              <dl className="mt-4 space-y-3 text-[0.88rem]">
                <div className="flex justify-between gap-4 border-b border-navy/10 pb-2">
                  <dt className="text-slate">Municipality</dt>
                  <dd className="text-right font-semibold text-navy-900">{city.authority}</dd>
                </div>
                {city.population && (
                  <div className="flex justify-between gap-4 border-b border-navy/10 pb-2">
                    <dt className="text-slate">Population</dt>
                    <dd className="text-right font-semibold text-navy-900">{city.population}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-b border-navy/10 pb-2">
                  <dt className="text-slate">From Hamilton</dt>
                  <dd className="text-right font-semibold text-navy-900">{city.driveTime}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate">Travel charge</dt>
                  <dd className="text-right font-semibold text-navy-900">None</dd>
                </div>
              </dl>
              {city.populationNote && (
                <p className="mt-3 text-[0.72rem] text-slate">{city.populationNote}.</p>
              )}
              <Link href="/contact/" className="btn-gold mt-5 w-full !py-3 text-[0.82rem]">
                Free {city.name} Quote
              </Link>
              <a href={site.phoneHref} className="btn-ghost mt-2.5 w-full !py-3 text-[0.82rem]">
                <Icon name="phone" size={15} /> {site.phoneDisplay}
              </a>
            </div>

            <div className="mt-5 rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-base">Local landmarks we pass daily</h3>
              <ul className="mt-3 space-y-1.5 text-[0.84rem] text-slate-dark">
                {city.landmarks.slice(0, 5).map((l) => (
                  <li key={l} className="flex gap-2">
                    <Icon name="pin" size={13} className="mt-1 shrink-0 text-gold-dark" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection faqs={faqs} title={`Painting in ${city.name} — common questions`} />
      <QuoteBand
        title={`Free painting quote in ${city.name}`}
        points={[
          `We are ${city.driveTime}, so getting out to look at your job is straightforward.`,
          'A written fixed price with the full scope listed before anything starts.',
          'No travel surcharge and no minimum job size.',
          'Licensed, insured and certified, with certificates available on request.',
        ]}
        defaultCity={city.name}
      />
      <CTABand />
    </>
  );
}
