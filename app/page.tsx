import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Img from '@/components/Img';
import JsonLd from '@/components/JsonLd';
import { TrustBar, FaqSection, CTABand, QuoteBand, SectionHead, LinkCard } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { topServices, serviceHref } from '@/lib/services';
import { cities } from '@/lib/areas';
import { solutions } from '@/lib/solutions';
import { costPages } from '@/lib/costs';
import { homeFaqs } from '@/lib/faqs';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "Painters in Hamilton, Ontario | Sam's Painting",
  description:
    'Licensed, insured painters in Hamilton, Ontario. Interior and exterior painting, cabinet refinishing, drywall repair and deck staining. Free written estimates. Call 289-700-8051.',
  path: '/',
  imageAlt: "Sam's Painting — painters in Hamilton, Ontario",
});

// Featured on the homepage grid. The full list lives on /services/.
const FEATURED = [
  'interior-painting',
  'exterior-painting',
  'cabinet-painting',
  'deck-and-fence-staining',
  'drywall-repair',
  'wallpaper-removal',
  'ceiling-painting',
  'epoxy-floor-coating',
  'pressure-washing',
];

export default function HomePage() {
  const featured = FEATURED.map((slug) => topServices.find((s) => s.slug === slug)!).filter(Boolean);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Img
          name="hero"
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.55]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40"
        />
        <div className="shell py-16 sm:py-24 lg:py-28">
          <p className="eyebrow !text-gold-light">Hamilton, Ontario &amp; surrounding areas</p>
          <h1 className="mt-3 max-w-3xl !text-white text-shadow-hero">
            Painters in Hamilton who prepare properly and finish on time
          </h1>
          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-slate-light/90">
            Interior and exterior painting, cabinet refinishing, drywall repair and deck staining
            for homeowners across Hamilton and the Golden Horseshoe. Sam runs every job personally,
            and every estimate is free and in writing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact/" className="btn-gold">
              Get a Free Quote <Icon name="arrow" size={18} />
            </Link>
            <a href={site.phoneHref} className="btn-outline">
              <Icon name="phone" size={17} /> Call {site.phoneDisplay}
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
            {site.badges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[0.82rem] font-semibold text-slate-light/85">
                <Icon name="check" size={15} className="text-gold" strokeWidth={2.6} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TrustBar />

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <SectionHead
            eyebrow="What we do"
            title="Painting services for Hamilton homes"
            intro="From a single room to a whole exterior. Every job is quoted at a fixed price with the full scope written down before we start."
            center
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <LinkCard
                key={s.slug}
                href={serviceHref(s)}
                icon={s.icon}
                title={s.name}
                text={s.excerpt}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services/" className="btn-ghost">
              View all painting services <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why us + quote form ──────────────────────────────────── */}
      <QuoteBand
        title="Why homeowners here call Sam"
        points={[
          'Preparation is quoted and done properly — washing, filling, sanding, caulking and priming, which is what decides whether a finish lasts three years or ten.',
          'You get a fixed written price listing every surface and repair, so there are no change orders halfway through.',
          'Sam is on site personally. The person who quotes your job is the person accountable for how it turns out.',
          'We know the local housing: pre-1960 lower-city brick needs a different approach from a 2005 build in Binbrook or Waterdown.',
          'Licensed, insured and certified, with certificates available before work begins.',
        ]}
      />

      {/* ── Service areas ────────────────────────────────────────── */}
      <section className="band bg-bone">
        <div className="shell">
          <SectionHead
            eyebrow="Where we work"
            title="Serving Hamilton and the Golden Horseshoe"
            intro="Everywhere below is inside our normal working week, so there is no travel surcharge on your estimate."
            center
          />
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}/`}
                className="card-hover flex items-center gap-2.5 px-4 py-3.5"
              >
                <Icon name="pin" size={16} className="shrink-0 text-gold-dark" />
                <span className="text-[0.88rem] font-semibold text-navy-900">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Costs + problems ─────────────────────────────────────── */}
      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHead
              eyebrow="Straight answers"
              title="What painting actually costs around here"
              intro="We publish researched Hamilton-area market ranges with their sources, so you can judge any quote you receive — including ours."
            />
            <ul className="mt-6 space-y-2.5">
              {costPages.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/cost/${p.slug}/`}
                    className="flex items-start gap-2.5 text-[0.95rem] text-slate-dark hover:text-navy"
                  >
                    <Icon name="arrow" size={16} className="mt-1 shrink-0 text-gold-dark" />
                    <span className="hover:underline">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/cost/" className="btn-ghost mt-6">
              All painting costs <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div>
            <SectionHead
              eyebrow="Common problems"
              title="Paint doing something it shouldn’t?"
              intro="Peeling, blistering, stains bleeding back through. Here is what causes each one and how it gets fixed permanently."
            />
            <ul className="mt-6 space-y-2.5">
              {solutions.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}/`}
                    className="flex items-start gap-2.5 text-[0.95rem] text-slate-dark hover:text-navy"
                  >
                    <Icon name="arrow" size={16} className="mt-1 shrink-0 text-gold-dark" />
                    <span className="hover:underline">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/solutions/" className="btn-ghost mt-6">
              All common problems <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection faqs={homeFaqs} title="Questions homeowners ask us first" />
      <CTABand />
    </>
  );
}
