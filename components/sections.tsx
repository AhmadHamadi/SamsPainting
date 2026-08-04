import Link from 'next/link';
import Icon, { type IconName } from './Icon';
import Img from './Img';
import FAQAccordion from './FAQAccordion';
import QuoteForm from './QuoteForm';
// QuoteForm is a client component; rendering it from these server components
// is fine and keeps the form interactive without making the page client-side.
import { site } from '@/lib/site';
import type { FaqItem, Crumb } from '@/lib/types';
import type { PhotoKey } from '@/lib/photos';

/** Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD on every page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-navy/10 bg-bone">
      <ol className="shell flex flex-wrap items-center gap-1.5 py-3 text-[0.78rem] text-slate">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevron" size={10} className="text-slate-mid" />}
            {i === items.length - 1 ? (
              <span className="font-semibold text-navy-900">{it.name}</span>
            ) : (
              <Link href={it.href} className="hover:text-navy hover:underline">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Standard interior-page hero: photo background, navy scrim for contrast, one
 * H1, and an above-the-fold CTA pair on every page.
 */
export function PageHero({
  eyebrow,
  h1,
  intro,
  photo,
  priority = false,
  withForm = false,
  defaultService,
  defaultCity,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  photo: PhotoKey;
  priority?: boolean;
  /** Renders the quote form alongside the copy — used on commercial-intent pages. */
  withForm?: boolean;
  defaultService?: string;
  defaultCity?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Img
        name={photo}
        priority={priority}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
      />
      {/* Scrim is heaviest behind the text column and lifts sharply toward the
          right, so most of the photograph reads at full strength while the H1
          still clears AA contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/45 to-navy-950/10"
      />

      {withForm ? (
        <div className="shell grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_400px] lg:gap-12">
          <div>
            <p className="eyebrow !text-gold-light">{eyebrow}</p>
            <h1 className="mt-3 !text-white text-shadow-hero">{h1}</h1>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate-light/95 text-shadow-hero">
              {intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3" data-boilerplate="1">
              <a href={site.phoneHref} className="btn-gold">
                <Icon name="phone" size={17} /> Call {site.phoneDisplay}
              </a>
              <Link href="/services/" className="btn-outline">
                All services <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
          <div className="w-full lg:justify-self-end">
            <QuoteForm compact defaultService={defaultService} defaultCity={defaultCity} />
          </div>
        </div>
      ) : (
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow !text-gold-light">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl !text-white text-shadow-hero">{h1}</h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-slate-light/90">{intro}</p>
          <div className="mt-7 flex flex-wrap gap-3" data-boilerplate="1">
            <Link href="/contact/" className="btn-gold">
              Get a Free Quote <Icon name="arrow" size={18} />
            </Link>
            <a href={site.phoneHref} className="btn-outline">
              <Icon name="phone" size={17} /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2">{title}</h2>
      {intro && <p className="mt-3 text-[1.02rem] leading-relaxed text-slate-dark">{intro}</p>}
    </div>
  );
}

/** The "atomic answer" block — a quotable direct answer for AI engines. */
export function DirectAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-gold bg-bone p-5 sm:p-6">
      <p className="text-[1.05rem] font-medium leading-relaxed text-navy-900">{children}</p>
    </div>
  );
}

export function TrustBar() {
  const items: { icon: IconName; label: string; sub: string }[] = [
    { icon: 'shield', label: 'Licensed & Insured', sub: 'Certificates on request' },
    { icon: 'check', label: 'Certified Painters', sub: 'Trained, not casual labour' },
    { icon: 'ruler', label: 'Free Written Estimates', sub: 'Fixed price, full scope listed' },
    { icon: 'pin', label: 'Locally Owned', sub: 'Based in Hamilton' },
  ];
  return (
    <section className="border-y border-navy/10 bg-bone">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-7 py-9 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-gold">
              <Icon name={it.icon} size={20} />
            </span>
            <div>
              <p className="font-display text-[0.95rem] font-bold leading-tight text-navy-900">
                {it.label}
              </p>
              <p className="mt-0.5 text-[0.78rem] text-slate">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSection({
  faqs,
  title = 'Frequently Asked Questions',
  intro,
}: {
  faqs: FaqItem[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="band bg-bone">
      <div className="shell">
        <SectionHead eyebrow="Questions" title={title} intro={intro} center />
        <div className="mx-auto mt-9 max-w-3xl">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

export function CTABand({
  title = 'Ready for a fresh coat?',
  text = 'Free written estimate, fixed pricing and a crew that turns up when it says it will.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    // data-boilerplate marks repeated UI chrome so scripts/audit-seo.mjs
    // excludes it when measuring how similar two pages' CONTENT is.
    <section className="bg-navy-radial" data-boilerplate="1">
      <div className="shell flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-xl">
          <h2 className="!text-white">{title}</h2>
          <p className="mt-2.5 text-slate-light/85">{text}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href="/contact/" className="btn-gold">
            Get My Free Quote <Icon name="arrow" size={18} />
          </Link>
          <a href={site.phoneHref} className="btn-outline">
            <Icon name="phone" size={17} /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Two-column band: prose on the left, the quote form on the right. */
export function QuoteBand({
  title,
  points,
  defaultService,
  defaultCity,
}: {
  title: string;
  points: string[];
  defaultService?: string;
  defaultCity?: string;
}) {
  return (
    // Repeated conversion module — same class of chrome as the CTA band, so it
    // is excluded from the content-similarity measurement.
    <section className="band" data-boilerplate="1">
      <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHead eyebrow="Free estimate" title={title} />
          <ul className="mt-6 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-dark">
                  <Icon name="check" size={14} strokeWidth={2.6} />
                </span>
                <span className="text-[0.98rem] leading-relaxed text-slate-dark">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-navy/10 bg-bone p-5">
            <p className="text-sm text-slate-dark">
              Prefer to talk it through?{' '}
              <a href={site.phoneHref} className="font-bold text-navy underline">
                Call {site.phoneDisplay}
              </a>{' '}
              — you will speak to Sam, not a call centre.
            </p>
          </div>
        </div>
        <QuoteForm defaultService={defaultService} defaultCity={defaultCity} />
      </div>
    </section>
  );
}

/** Generic linked card used by every hub page. */
export function LinkCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: IconName;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="card-hover group flex flex-col p-5">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy-950">
        <Icon name={icon} size={22} />
      </span>
      <h3 className="mt-4 text-[1.02rem] leading-snug">{title}</h3>
      <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-slate">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-gold-dark">
        Learn more <Icon name="arrow" size={14} />
      </span>
    </Link>
  );
}

/**
 * Photo-led service grid.
 *
 * Deliberately framed as "the work we do" rather than a portfolio: these are
 * illustrative photographs of each service, not photographs of Sam's completed
 * jobs. Presenting stock imagery as a project gallery would misrepresent the
 * business's own work, so the heading and caption keep it honest. Swap in real
 * job photos and this becomes a genuine gallery with no code changes.
 */
export function PhotoGrid({
  items,
}: {
  items: { href: string; photo: PhotoKey; title: string; caption: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="group relative isolate overflow-hidden rounded-2xl shadow-card"
        >
          <Img
            name={it.photo}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent"
          />
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="block font-display text-lg font-bold text-white">{it.title}</span>
            <span className="mt-1 block text-[0.82rem] leading-snug text-slate-light/85">
              {it.caption}
            </span>
            <span className="mt-2.5 inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-gold-light">
              View service <Icon name="arrow" size={14} />
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/** Prose block with a heading — used across service, city and solution pages. */
export function Prose({ heading, paragraphs }: { heading?: string; paragraphs: string[] }) {
  return (
    <div>
      {heading && <h2 className="mb-4">{heading}</h2>}
      <div className="prose-local">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

/** Checklist rendered as a bordered panel. */
export function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
      <h3 className="font-display text-lg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-dark">
              <Icon name="check" size={12} strokeWidth={2.8} />
            </span>
            <span className="text-[0.9rem] leading-relaxed text-slate-dark">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
