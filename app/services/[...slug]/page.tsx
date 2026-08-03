import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import Img from '@/components/Img';
import {
  Breadcrumbs,
  PageHero,
  SectionHead,
  CheckList,
  CTABand,
  FaqSection,
  QuoteBand,
  DirectAnswer,
} from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { services, serviceBySlug, serviceHref, childrenOf } from '@/lib/services';
import { cities } from '@/lib/areas';
import { serviceFaqs } from '@/lib/faqs';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

// One route handles both /services/[service]/ and the nested
// /services/[parent]/[child]/ form, so sub-services get a real URL hierarchy
// without duplicating the template.
export function generateStaticParams() {
  return services.map((s) => ({
    slug: s.parent ? [s.parent, s.slug] : [s.slug],
  }));
}

function resolve(slug: string[]) {
  const last = slug[slug.length - 1];
  const service = serviceBySlug[last];
  if (!service) return null;
  // Reject a nested URL whose parent segment does not match the real parent,
  // so the same page cannot be reached at two different URLs.
  if (slug.length === 2 && service.parent !== slug[0]) return null;
  if (slug.length === 1 && service.parent) return null;
  if (slug.length > 2) return null;
  return service;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const service = resolve(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} Hamilton | Sam's Painting`,
    description: `${service.excerpt} ${service.name} across Hamilton and the surrounding area from a licensed, insured local crew. Free written estimate — call ${site.phoneDisplay}.`,
    path: serviceHref(service),
    image: `/images/photos/${service.photo}.jpg`,
    imageAlt: `${service.name} by Sam's Painting in Hamilton, Ontario`,
  });
}

export default function ServicePage({ params }: { params: { slug: string[] } }) {
  const service = resolve(params.slug);
  if (!service) notFound();

  const parent = service.parent ? serviceBySlug[service.parent] : null;
  const kids = childrenOf(service.slug);
  const faqs = serviceFaqs(service);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services/' },
    ...(parent ? [{ name: parent.name, href: serviceHref(parent) }] : []),
    { name: service.name, href: serviceHref(service) },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(service), faqSchema(faqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow={parent ? parent.name : 'Painting service'}
        // Deliberately NOT "<service> in Hamilton, Ontario" — that is exactly
        // what the Hamilton city x service page renders, and two pages must
        // never share an H1.
        h1={`${service.name} in Hamilton & the Golden Horseshoe`}
        intro={service.excerpt}
        photo={service.photo}
        priority
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <DirectAnswer>{service.detail}</DirectAnswer>

            <div className="prose-local mt-8">
              <h2 className="mb-4">What {service.name.toLowerCase()} involves</h2>
              <p>
                {service.materials} Most jobs of this kind run {service.timeline}, though the
                variable is almost never the coating itself — it is how much the surface needs
                doing first.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <CheckList title="What’s included" items={service.includes} />
              <CheckList title="How we prepare" items={service.prep} />
            </div>

            {kids.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4">Related {service.name.toLowerCase()} work</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {kids.map((k) => (
                    <Link key={k.slug} href={serviceHref(k)} className="card-hover flex items-center gap-3 p-4">
                      <Icon name={k.icon} size={20} className="shrink-0 text-gold-dark" />
                      <span>
                        <span className="block text-[0.92rem] font-semibold text-navy-900">{k.name}</span>
                        <span className="block text-[0.78rem] text-slate">{k.excerpt}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {service.matrix && (
              <nav aria-label={`${service.name} by service area`} className="mt-10">
                <h2 className="mb-4">{service.name} by area</h2>
                <p className="mb-4 text-[0.95rem] text-slate-dark">
                  We cover {service.name.toLowerCase()} right across the region. Pick your town for
                  local detail on housing, conditions and permits.
                </p>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/service-areas/${c.slug}/${service.slug}/`}
                      className="rounded-lg border border-navy/15 bg-white px-3 py-2 text-[0.82rem] font-semibold text-navy-900 hover:border-gold hover:bg-gold/5"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </nav>
            )}
          </div>

          <aside className="lg:sticky lg:top-28">
            <Img
              name={service.photo}
              sizes="(max-width: 1024px) 100vw, 400px"
              className="mb-5 w-full rounded-2xl object-cover shadow-card"
            />
            <div className="rounded-2xl border border-navy/10 bg-bone p-6">
              <h3 className="font-display text-lg">Typical timeline</h3>
              <p className="mt-2 text-[0.92rem] text-slate-dark">{service.timeline}</p>
              <Link href="/contact/" className="btn-gold mt-5 w-full !py-3 text-[0.82rem]">
                Get a Free Quote
              </Link>
              <a href={site.phoneHref} className="btn-ghost mt-2.5 w-full !py-3 text-[0.82rem]">
                <Icon name="phone" size={15} /> {site.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection faqs={faqs} title={`${service.name} — your questions answered`} />
      <QuoteBand
        title={`Get a free ${service.name.toLowerCase()} quote`}
        points={[
          'A written fixed price listing every surface and repair included.',
          'No travel charge anywhere in our service area.',
          'Sam comes out personally to look at the work.',
          'No obligation, and no deposit to get a quote.',
        ]}
        defaultService={service.name}
      />
      <CTABand />
    </>
  );
}
