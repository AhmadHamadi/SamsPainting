import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import FAQAccordion from '@/components/FAQAccordion';
import { Breadcrumbs, PageHero, CTABand, QuoteBand } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { faqPageFaqs } from '@/lib/faqs';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "Painting FAQ | Sam's Painting Hamilton",
  description:
    'Answers to the practical questions homeowners ask before booking a painter: coats, furniture, drying times, wallpaper, paint supply, finishes and deposits.',
  path: '/faq/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq/' },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqPageFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Questions"
        h1="Painting Questions, Answered Plainly"
        intro="The practical things people ask before booking. If your question is not here, call and ask — we will give you a straight answer either way."
        photo="empty-room"
        priority
      />
      <section className="band">
        <div className="shell max-w-3xl">
          <FAQAccordion faqs={faqPageFaqs} />
        </div>
      </section>
      <QuoteBand
        title="Still deciding?"
        points={[
          'The estimate is free and there is no obligation attached to it.',
          'We will tell you honestly if work does not need doing yet.',
          'Every quote is fixed-price and in writing.',
          'No deposit is required to get a quote.',
        ]}
      />
      <CTABand />
    </>
  );
}
