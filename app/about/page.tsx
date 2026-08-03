import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import { Breadcrumbs, PageHero, SectionHead, CheckList, CTABand, FaqSection, Prose } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { aboutFaqs } from '@/lib/faqs';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "About Sam's Painting | Hamilton Painting Contractor",
  description:
    'Sam’s Painting is a locally owned, licensed and insured painting contractor in Hamilton, Ontario. Meet Sam, see how we work, and what we will and won’t claim.',
  path: '/about/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(aboutFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="About us"
        h1="A Hamilton Painter, Not a Franchise"
        intro="Sam’s Painting is locally owned and run. The person who quotes your job is the person on site doing it."
        photo="crew"
        priority
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="space-y-8">
            <Prose
              heading={`Meet ${site.owner.firstName}`}
              paragraphs={[
                `${site.owner.firstName} is the owner and lead painter, and the person who comes out to look at your job. There is no sales rep, no call centre and no handoff to a subcontractor you have never met after you sign.`,
                'That matters more than it sounds. In this trade the gap between a quote and the finished work is usually a communication gap — the person who promised something was not the person holding the brush. Here they are the same person.',
              ]}
            />
            <Prose
              heading="How we work"
              paragraphs={[
                'Every job starts with a visit and a written fixed-price estimate listing every surface being coated and every repair being made. That document is what protects you: it makes quotes comparable and it makes change orders unnecessary.',
                'Preparation is quoted honestly rather than hidden. Washing, filling, sanding, caulking and priming regularly take more hours than the painting does, and they are the single biggest difference between a finish that lasts three years and one that lasts ten. A quote that looks cheap is very often a quote with the preparation left out.',
                'We work across Hamilton and twelve surrounding towns, and we pay attention to what each one actually needs. Pre-1960 lower-city brick is a different job from a 2005 build in Binbrook, and treating them the same is how out-of-town crews get preparation wrong.',
              ]}
            />
            <Prose
              heading="What we won’t do"
              paragraphs={[
                'We do not publish invented review counts or star ratings. Plenty of contractor sites carry a glowing rating with no verifiable source behind it, and we would rather have nothing there than something made up.',
                'We do not publish a fake price list either. The cost pages on this site carry researched third-party market ranges with their sources named, clearly labelled as market data rather than our rates, so you can judge any quote you receive.',
                'And we will tell you when a job does not need doing, or when the real problem is a gutter rather than the paint. That costs us the odd job and earns the ones worth having.',
              ]}
            />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <Img name="interior" sizes="(max-width: 1024px) 100vw, 400px" className="w-full rounded-2xl object-cover shadow-card" />
            <CheckList
              title="Credentials"
              items={[
                'Licensed painting contractor',
                'Fully insured — certificates available before work begins',
                'Certified painters, not casual labour',
                'Established and working in the Hamilton area for multiple years',
                'Lead-safe practices on pre-1960 properties',
              ]}
            />
            <div className="rounded-2xl border border-navy/10 bg-bone p-6">
              <h3 className="font-display text-lg">Get in touch</h3>
              <p className="mt-2 text-[0.9rem] text-slate-dark">
                Call {site.owner.firstName} directly on{' '}
                <a href={site.phoneHref} className="font-bold text-navy underline">
                  {site.phoneDisplay}
                </a>
                , or send the quote form and we will reply within one business day.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection faqs={aboutFaqs} title="About Sam’s Painting" />
      <CTABand />
    </>
  );
}
