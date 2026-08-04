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
  CheckList,
  CTABand,
  FaqSection,
  QuoteBand,
  DirectAnswer,
} from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { cities, cityBySlug } from '@/lib/areas';
import { matrixServices, serviceBySlug, serviceHref } from '@/lib/services';
import { cityServiceFaqs } from '@/lib/faqs';
import { cityServiceBody, cityServiceMeta, cityServiceTitle, rotateFor, localNote } from '@/lib/content';
import { breadcrumbSchema, faqSchema, cityServiceSchema } from '@/lib/schema';

// The city x service matrix — the biggest local-SEO lever on the site, and the
// layer competitor research found essentially uncontested in this region.
export function generateStaticParams() {
  return cities.flatMap((c) => matrixServices.map((s) => ({ city: c.slug, service: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string; service: string };
}): Promise<Metadata> {
  const city = cityBySlug[params.city];
  const service = serviceBySlug[params.service];
  if (!city || !service || !service.matrix) return {};
  return buildMetadata({
    title: `${cityServiceTitle(city, service)} | Sam's Painting`,
    description: cityServiceMeta(city, service, site.phoneDisplay),
    path: `/service-areas/${city.slug}/${service.slug}/`,
    image: `/images/photos/${service.photo}.jpg`,
    imageAlt: `${service.name} in ${city.name}, Ontario by Sam's Painting`,
  });
}

export default function CityServicePage({
  params,
}: {
  params: { city: string; service: string };
}) {
  const city = cityBySlug[params.city];
  const service = serviceBySlug[params.service];
  if (!city || !service || !service.matrix) notFound();

  const faqs = cityServiceFaqs(city, service);
  const body = cityServiceBody(city, service);
  const h1 = cityServiceTitle(city, service);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: city.name, href: `/service-areas/${city.slug}/` },
    { name: service.name, href: `/service-areas/${city.slug}/${service.slug}/` },
  ];

  const siblings = matrixServices.filter((s) => s.slug !== service.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(crumbs), cityServiceSchema(city, service), faqSchema(faqs)]}
      />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow={`${service.name} · ${city.name}`}
        h1={h1}
        intro={service.excerpt}
        photo={service.photo}
        priority
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <div>
            <DirectAnswer>
              Sam&rsquo;s Painting provides {service.name.toLowerCase()} throughout {city.name},{' '}
              {city.driveTime}, with no travel surcharge. {service.detail}
            </DirectAnswer>

            <div className="prose-local mt-8">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Rotated per city so the same service does not present an
                identical bullet list in all thirteen towns. */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <CheckList
                title={`What's included in ${city.name}`}
                items={rotateFor(service.includes, city, service, 4)}
              />
              <CheckList
                title="How we prepare the surface"
                items={rotateFor(service.prep, city, service, 3)}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-navy/10 bg-bone p-6">
              <h2 className="!text-xl">Working in {city.name}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-dark">
                {localNote(city, service)}
              </p>
              {/* The full permit position lives on the city page and is linked
                  rather than repeated here — reproducing it across all twelve
                  of a city's service pages is near-duplicate content. */}
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-dark">
                For the full picture on {city.name} housing stock, local conditions and whether a
                heritage permit applies to your property, see our{' '}
                <Link href={`/service-areas/${city.slug}/`} className="font-semibold text-navy underline">
                  {city.name} painting page
                </Link>
                .
              </p>
            </div>

            <CityMap city={city} />

            {/* Internal navigation, marked up as such. */}
            <nav aria-label={`Other services in ${city.name}`} className="mt-10">
              <h2 className="mb-4">Other work we do in {city.name}</h2>
              <div className="flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/service-areas/${city.slug}/${s.slug}/`}
                    className="rounded-lg border border-navy/15 bg-white px-3 py-2 text-[0.82rem] font-semibold text-navy-900 hover:border-gold hover:bg-gold/5"
                  >
                    {s.navName}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-[0.88rem] text-slate">
                See everything we cover in{' '}
                <Link href={`/service-areas/${city.slug}/`} className="font-semibold text-navy underline">
                  {city.name}
                </Link>
                , or read more about{' '}
                <Link href={serviceHref(service)} className="font-semibold text-navy underline">
                  {service.name.toLowerCase()}
                </Link>{' '}
                generally.
              </p>
            </nav>
          </div>

          <aside className="lg:sticky lg:top-28">
            <Img
              name={service.photo}
              sizes="(max-width: 1024px) 100vw, 400px"
              className="mb-5 w-full rounded-2xl object-cover shadow-card"
            />
            <div className="rounded-2xl border border-navy/10 bg-bone p-6">
              <h3 className="font-display text-lg">{service.name} in {city.name}</h3>
              <dl className="mt-4 space-y-3 text-[0.88rem]">
                <div className="flex justify-between gap-4 border-b border-navy/10 pb-2">
                  <dt className="text-slate">Typical timeline</dt>
                  <dd className="text-right font-semibold text-navy-900">{service.timeline}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-navy/10 pb-2">
                  <dt className="text-slate">Travel from Hamilton</dt>
                  <dd className="text-right font-semibold text-navy-900">{city.driveTime}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate">Estimate</dt>
                  <dd className="text-right font-semibold text-navy-900">Free &amp; written</dd>
                </div>
              </dl>
              <Link href="/contact/" className="btn-gold mt-5 w-full !py-3 text-[0.82rem]">
                Get My Free Quote
              </Link>
              <a href={site.phoneHref} className="btn-ghost mt-2.5 w-full !py-3 text-[0.82rem]">
                <Icon name="phone" size={15} /> {site.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection
        faqs={faqs}
        title={`${service.name} in ${city.name} — questions`}
      />
      <QuoteBand
        title={`Book ${service.name.toLowerCase()} in ${city.name}`}
        points={[
          `Covering all of ${city.name}, including ${city.neighbourhoods.slice(0, 3).join(', ')}.`,
          'Fixed written price with the whole scope listed up front.',
          `Typical timeline: ${service.timeline}.`,
          'Licensed, insured and certified — certificates available before we start.',
        ]}
        defaultService={service.name}
        defaultCity={city.name}
      />
      <CTABand />
    </>
  );
}
