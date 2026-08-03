import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * The supplied logo is a mark only (navy house + gold brush sweep) with no
 * wordmark, so the business name is set in type beside it. Dimensions are the
 * real intrinsic pixel size of the source file, which keeps CLS at zero.
 */
export default function Logo({
  className = '',
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <img
        src="/images/brand/sams-painting-logo.png"
        alt={`${site.name} logo — a house outlined by a paintbrush stroke`}
        width={192}
        height={192}
        className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-bold tracking-tight sm:text-[1.3rem] ${
            onDark ? 'text-white' : 'text-navy-900'
          }`}
        >
          Sam&rsquo;s Painting
        </span>
        <span
          className={`mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${
            onDark ? 'text-gold-light' : 'text-gold-dark'
          }`}
        >
          Hamilton, Ontario
        </span>
      </span>
    </Link>
  );
}
