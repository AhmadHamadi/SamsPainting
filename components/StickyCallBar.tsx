import Link from 'next/link';
import Icon from './Icon';
import { site } from '@/lib/site';

/**
 * Mobile-only fixed action bar. Most local-trade traffic is on a phone, and the
 * single biggest conversion lever is making "call now" reachable at any scroll
 * position without hunting for the header.
 *
 * The body carries matching bottom padding so this never covers page content.
 */
export default function StickyCallBar() {
  return (
    // NOTE: use a valid Tailwind opacity step. `/97` generates no class at all,
    // which left this bar transparent and made the outlined button's white text
    // invisible against page content.
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-950/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a href={site.phoneHref} className="btn-gold !py-3 text-[0.82rem]">
          <Icon name="phone" size={17} /> Call Now
        </a>
        <Link
          href="/contact/"
          className="btn !py-3 border-2 border-gold/50 text-[0.82rem] font-bold text-white hover:bg-white/10"
        >
          Free Quote
        </Link>
      </div>
    </div>
  );
}
