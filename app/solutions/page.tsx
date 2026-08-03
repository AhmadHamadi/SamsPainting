import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs, PageHero, SectionHead, LinkCard, CTABand, FaqSection } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { solutions } from '@/lib/solutions';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: "Common Paint Problems & Fixes | Sam's Painting",
  description:
    'Why paint peels, blisters or lets stains bleed through — and how each problem gets fixed permanently. Practical diagnosis from a Hamilton painting contractor.',
  path: '/solutions/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions/' },
];

const hubFaqs: FaqItem[] = [
  {
    q: 'Can most paint problems be fixed without repainting everything?',
    a: 'Often, yes. A localised failure with a clear cause can usually be repaired and blended. What forces a full recoat is widespread failure, or a sheen level like satin where a patch will always show against the surrounding wall.',
  },
  {
    q: 'Should I fix the cause or just repaint over it?',
    a: 'Fix the cause, every time. Almost every recurring paint failure is a moisture or adhesion problem, and coating over it buys a season at most. Diagnosing properly costs less than painting the same wall twice.',
  },
  {
    q: 'Will you tell me if a job does not need doing?',
    a: 'Yes, and we do regularly. Sometimes the honest answer is that a surface has years left, or that the real problem is a gutter rather than the paint. We would rather say so than sell work that will not solve anything.',
  },
  {
    q: 'Do you charge to diagnose a paint problem?',
    a: 'No. Coming out to look at what is going wrong is part of the free estimate. You get a straight explanation of the cause and what fixing it properly involves, whether or not you book the work with us.',
  },
];

export default function SolutionsHub() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(hubFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Diagnosis & fixes"
        h1="Common Paint Problems and How to Fix Them"
        intro="Paint rarely fails for no reason. Each guide below explains what actually causes the problem, and what a permanent fix involves rather than a cosmetic one."
        photo="wallpaper"
        priority
      />

      <section className="band">
        <div className="shell">
          <SectionHead
            eyebrow="Pick your problem"
            title="What is your paint doing?"
            intro="Written for homeowners, not contractors. If none of these match what you are seeing, call and describe it."
            center
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <LinkCard
                key={s.slug}
                href={`/solutions/${s.slug}/`}
                icon={s.icon}
                title={s.title}
                text={s.problem}
              />
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={hubFaqs} title="Diagnosing paint problems" />
      <CTABand title="Not sure what you're looking at?" text="Send a photo or call and describe it. Diagnosis is part of the free estimate." />
    </>
  );
}
