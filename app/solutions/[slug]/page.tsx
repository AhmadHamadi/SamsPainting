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
import { solutions, solutionBySlug } from '@/lib/solutions';
import { serviceBySlug, serviceHref } from '@/lib/services';
import { breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const s = solutionBySlug[params.slug];
  if (!s) return {};
  return buildMetadata({
    title: `${s.title} | Sam's Painting`,
    description: s.answer,
    path: `/solutions/${s.slug}/`,
  });
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const s = solutionBySlug[params.slug];
  if (!s) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions/' },
    { name: s.title, href: `/solutions/${s.slug}/` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          howToSchema(s.title, s.answer, s.steps),
          faqSchema(s.faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow="Common problem" h1={s.title} intro={s.problem} photo="prep" priority />

      <section className="band">
        <div className="shell max-w-4xl">
          <DirectAnswer>{s.answer}</DirectAnswer>

          <h2 className="mt-12">What causes it</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {s.causes.map((c) => (
              <div key={c.name} className="rounded-xl border border-navy/10 bg-white p-5 shadow-card">
                <h3 className="text-[0.98rem]">{c.name}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-dark">{c.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12">How it gets fixed properly</h2>
          <ol className="mt-5 space-y-4">
            {s.steps.map((step, i) => (
              <li key={step.name} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[1rem]">{step.name}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-slate-dark">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-2xl border border-navy/10 bg-bone p-6">
            <h2 className="!text-xl">Services that solve this</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.related.map((slug) => {
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

      <FaqSection faqs={s.faqs} title="Questions about this problem" />
      <QuoteBand
        title="Get it diagnosed properly"
        points={[
          'We identify the actual cause rather than coating over the symptom.',
          'Free written estimate covering the repair and the finish.',
          'Honest advice when the fix is something other than paint.',
          'Licensed, insured and certified.',
        ]}
      />
      <CTABand />
    </>
  );
}
