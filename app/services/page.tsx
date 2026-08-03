import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import { Breadcrumbs, PageHero, SectionHead, LinkCard, CTABand, FaqSection } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { topServices, childrenOf, serviceHref, categoryLabels, type ServiceCategory } from '@/lib/services';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: "Painting Services in Hamilton | Sam's Painting",
  description:
    'Every painting service we offer in Hamilton: interior, exterior, cabinets, ceilings, trim, decks, drywall repair, wallpaper removal, epoxy floors and more. Free written estimates.',
  path: '/services/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services/' },
];

// Unique to this hub — no other page asks these.
const hubFaqs: FaqItem[] = [
  {
    q: 'Do you take on small painting jobs, or only whole houses?',
    a: 'Both. A single feature wall, one front door or a hallway is perfectly welcome alongside full interior and exterior packages. There is no minimum job size, though very small jobs are easier to schedule if you are flexible on the week.',
  },
  {
    q: 'Can you combine several services into one visit?',
    a: 'Yes, and it is usually cheaper that way. Drywall repair, caulking and small trim fixes cost a fraction when the crew is already on site compared with booking them as a separate call-out later.',
  },
  {
    q: 'Which services are best booked in summer versus winter?',
    a: 'Anything exterior — painting, deck and fence staining, pressure washing — needs the late-April to late-October window. Interior work, cabinets and drywall repair are all-year, and winter is genuinely a good time for them.',
  },
  {
    q: 'Do you do commercial painting as well as homes?',
    a: 'Our focus is residential, and that is where our experience is deepest. We do take on small commercial work such as an office, a clinic reception or a rental turnover, so it is worth asking if that is what you have.',
  },
  {
    q: 'What if I am not sure which service I actually need?',
    a: 'Describe the problem rather than the service and we will work it out. Plenty of people call about repainting and turn out to need drywall repair or a moisture issue resolved first. The estimate visit is free either way.',
  },
];

const GROUPS: ServiceCategory[] = ['interior', 'exterior', 'specialty', 'prep', 'colour'];

export default function ServicesHub() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(hubFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Painting services"
        h1="Painting Services in Hamilton, Ontario"
        intro="Everything we do, grouped by the kind of work involved. Every service is available across Hamilton, Burlington, Ancaster, Stoney Creek, Dundas, Waterdown and the rest of our area."
        photo="supplies"
        priority
      />

      {GROUPS.map((group, gi) => {
        const inGroup = topServices.filter((s) => s.category === group);
        if (!inGroup.length) return null;
        return (
          <section key={group} className={`band ${gi % 2 === 1 ? 'bg-bone' : ''}`}>
            <div className="shell">
              <SectionHead eyebrow={`0${gi + 1}`} title={categoryLabels[group]} />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {inGroup.map((s) => {
                  const kids = childrenOf(s.slug);
                  return (
                    <div key={s.slug} className="flex flex-col">
                      <LinkCard href={serviceHref(s)} icon={s.icon} title={s.name} text={s.excerpt} />
                      {kids.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 px-5">
                          {kids.map((k) => (
                            <li key={k.slug}>
                              <Link
                                href={serviceHref(k)}
                                className="text-[0.78rem] text-slate hover:text-navy hover:underline"
                              >
                                <Icon name="chevron" size={9} className="inline" /> {k.navName}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <FaqSection faqs={hubFaqs} title="About our painting services" />
      <CTABand />
    </>
  );
}
