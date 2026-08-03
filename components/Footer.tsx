import Link from 'next/link';
import Icon from './Icon';
import { site } from '@/lib/site';
import { topServices, serviceHref } from '@/lib/services';
import { cities } from '@/lib/areas';

const YEAR = 2026; // build-time constant; bump on the annual content refresh

export default function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-navy-950 text-slate-light">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* Brand + NAP */}
        <div>
          <img
            src="/images/brand/sams-painting-logo.png"
            alt="Sam's Painting logo"
            width={192}
            height={192}
            className="h-14 w-14 rounded-lg bg-white p-1"
          />
          <p className="mt-4 font-display text-xl font-bold text-white">Sam&rsquo;s Painting</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-light/75">
            Interior and exterior painting, cabinet refinishing and surface repair for homeowners
            across Hamilton and the Golden Horseshoe. Locally owned, licensed and insured.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2.5 font-semibold text-gold-light hover:text-white">
                <Icon name="phone" size={16} /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex items-center gap-2.5 hover:text-white">
                <Icon name="mail" size={16} className="text-gold" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                Serving {site.address.locality}, {site.address.region} &amp; surrounding areas
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Mon–Fri 7am–6pm · Sat 8am–4pm · Sun closed</span>
            </li>
          </ul>
        </div>

        {/* Services */}
        <nav aria-labelledby="f-services">
          <p id="f-services" className="mb-4 font-display text-base font-bold text-white">
            Painting Services
          </p>
          <ul className="grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {topServices.slice(0, 14).map((s) => (
              <li key={s.slug}>
                <Link href={serviceHref(s)} className="text-slate-light/75 hover:text-gold-light">
                  {s.navName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services/" className="font-semibold text-gold-light hover:text-white">
                All services →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Areas */}
        <nav aria-labelledby="f-areas">
          <p id="f-areas" className="mb-4 font-display text-base font-bold text-white">
            Areas We Serve
          </p>
          <ul className="grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/service-areas/${c.slug}/`}
                  className="text-slate-light/75 hover:text-gold-light"
                >
                  Painters in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company + CTA */}
        <div>
          <p className="mb-4 font-display text-base font-bold text-white">Company</p>
          <ul className="space-y-2 text-sm">
            {[
              ['/about/', 'About Sam’s Painting'],
              ['/cost/', 'Painting Costs'],
              ['/solutions/', 'Common Paint Problems'],
              ['/blog/', 'Advice & Guides'],
              ['/faq/', 'Frequently Asked Questions'],
              ['/contact/', 'Contact & Free Quote'],
              ['/sitemap/', 'Sitemap'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-slate-light/75 hover:text-gold-light">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-gold/25 bg-white/[0.04] p-4">
            <p className="font-display text-base font-bold text-white">Ready for a fresh coat?</p>
            <p className="mt-1 text-xs text-slate-light/70">
              Free written estimate, no pressure.
            </p>
            <Link href="/contact/" className="btn-gold mt-3 w-full !py-2.5 text-xs">
              Get My Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-slate-light/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} Sam&rsquo;s Painting. Licensed &amp; insured painting contractor serving
            Hamilton, Ontario.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy/" className="hover:text-gold-light">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service/" className="hover:text-gold-light">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
