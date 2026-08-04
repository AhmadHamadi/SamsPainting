'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Icon from './Icon';
import { site } from '@/lib/site';
import { topServices, categoryLabels, serviceHref, type ServiceCategory } from '@/lib/services';
import { cities } from '@/lib/areas';

const GROUPS: ServiceCategory[] = ['interior', 'exterior', 'specialty', 'prep', 'colour'];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<'services' | 'areas' | null>(null);
  const pathname = usePathname();

  // Close everything on navigation so the menu never persists across pages.
  useEffect(() => {
    setOpen(false);
    setPanel(null);
  }, [pathname]);

  // Lock background scrolling while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      {/* Top bar: credentials + click-to-call */}
      <div className="bg-navy-950 text-white">
        <div className="shell flex h-9 items-center justify-between gap-4 text-[0.72rem] sm:text-xs">
          <p className="flex items-center gap-2 truncate">
            <Icon name="shield" size={14} className="shrink-0 text-gold" />
            <span className="truncate">Licensed &amp; insured · Certified painters · Free written estimates</span>
          </p>
          <a
            href={site.phoneHref}
            className="flex shrink-0 items-center gap-1.5 font-semibold text-gold-light hover:text-white"
          >
            <Icon name="phone" size={13} />
            <span className="hidden sm:inline">Call</span> {site.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        {/* Height is tied to the logo size in components/Logo.tsx. If the logo
            changes, the drawer and mega-panel offsets below must follow. */}
        <div className="shell flex h-20 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <DropdownButton
              label="Services"
              open={panel === 'services'}
              onToggle={() => setPanel(panel === 'services' ? null : 'services')}
              active={isActive('/services')}
            />
            <DropdownButton
              label="Service Areas"
              open={panel === 'areas'}
              onToggle={() => setPanel(panel === 'areas' ? null : 'areas')}
              active={isActive('/service-areas')}
            />
            <NavLink href="/cost/" label="Costs" active={isActive('/cost')} />
            <NavLink href="/solutions/" label="Solutions" active={isActive('/solutions')} />
            <NavLink href="/blog/" label="Blog" active={isActive('/blog')} />
            <NavLink href="/about/" label="About" active={isActive('/about')} />
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={site.phoneHref} className="btn-ghost !px-4 !py-2.5 text-[0.82rem]">
              <Icon name="phone" size={16} /> {site.phoneDisplay}
            </a>
            <Link href="/contact/" className="btn-gold !px-5 !py-2.5 text-[0.82rem]">
              Free Quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-navy/15 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {/* Desktop mega panels */}
        {panel === 'services' && (
          <MegaPanel onClose={() => setPanel(null)}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 xl:grid-cols-4">
              {GROUPS.map((group) => {
                const inGroup = topServices.filter((s) => s.category === group);
                if (!inGroup.length) return null;
                return (
                  <div key={group}>
                    <p className="mb-2.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold-dark">
                      {categoryLabels[group]}
                    </p>
                    <ul className="space-y-1.5">
                      {inGroup.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={serviceHref(s)}
                            className="text-[0.85rem] text-slate-dark hover:text-navy hover:underline"
                          >
                            {s.navName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <PanelFooter href="/services/" label="View all painting services" />
          </MegaPanel>
        )}

        {panel === 'areas' && (
          <MegaPanel onClose={() => setPanel(null)}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 xl:grid-cols-4">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-areas/${c.slug}/`}
                  className="flex items-center gap-2 py-1 text-[0.85rem] text-slate-dark hover:text-navy hover:underline"
                >
                  <Icon name="pin" size={13} className="shrink-0 text-gold-dark" />
                  {c.name}
                </Link>
              ))}
            </div>
            <PanelFooter href="/service-areas/" label="See every area we cover" />
          </MegaPanel>
        )}
      </header>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[7.25rem] z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="shell space-y-6 py-6 pb-28">
            <Link href="/contact/" className="btn-gold w-full">
              Get My Free Quote
            </Link>
            <a href={site.phoneHref} className="btn-navy w-full">
              <Icon name="phone" size={18} /> Call {site.phoneDisplay}
            </a>

            <MobileGroup title="Services" href="/services/">
              {topServices.map((s) => (
                <MobileLink key={s.slug} href={serviceHref(s)} label={s.navName} />
              ))}
            </MobileGroup>

            <MobileGroup title="Service Areas" href="/service-areas/">
              {cities.map((c) => (
                <MobileLink key={c.slug} href={`/service-areas/${c.slug}/`} label={c.name} />
              ))}
            </MobileGroup>

            <div className="space-y-1 border-t border-navy/10 pt-5">
              {[
                ['/cost/', 'Painting Costs'],
                ['/solutions/', 'Common Problems'],
                ['/blog/', 'Advice & Guides'],
                ['/about/', 'About Sam’s Painting'],
                ['/faq/', 'FAQ'],
                ['/contact/', 'Contact'],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="block rounded-lg px-3 py-2.5 font-semibold text-navy-900 hover:bg-navy/5"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

// ── Small presentational pieces ────────────────────────────────────────────

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-[0.85rem] font-semibold transition-colors ${
        active ? 'text-gold-dark' : 'text-navy-900 hover:text-gold-dark'
      }`}
    >
      {label}
    </Link>
  );
}

function DropdownButton({
  label,
  open,
  onToggle,
  active,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.85rem] font-semibold transition-colors ${
        active || open ? 'text-gold-dark' : 'text-navy-900 hover:text-gold-dark'
      }`}
    >
      {label}
      <Icon
        name="chevron"
        size={12}
        className={`transition-transform duration-200 ${open ? '-rotate-90' : 'rotate-90'}`}
      />
    </button>
  );
}

function MegaPanel({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 top-[7.25rem] z-30 hidden bg-navy-950/20 lg:block" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-x-0 top-full z-40 hidden border-b border-navy/10 bg-white shadow-lift lg:block">
        <div className="shell py-7">{children}</div>
      </div>
    </>
  );
}

function PanelFooter({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-6 border-t border-navy/10 pt-4">
      <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-dark hover:underline">
        {label} <Icon name="arrow" size={15} />
      </Link>
    </div>
  );
}

function MobileGroup({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <details className="border-t border-navy/10 pt-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold text-navy-900">
        {title}
        <Icon name="chevron" size={14} className="rotate-90" />
      </summary>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">{children}</div>
      <Link href={href} className="mt-3 inline-block text-sm font-bold text-gold-dark hover:underline">
        View all →
      </Link>
    </details>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block py-1.5 text-[0.85rem] text-slate-dark hover:text-navy">
      {label}
    </Link>
  );
}
