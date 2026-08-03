import Link from 'next/link';
import Icon from '@/components/Icon';
import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="band">
      <div className="shell max-w-2xl text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-2">We couldn&rsquo;t find that page</h1>
        <p className="mt-4 text-[1.05rem] text-slate-dark">
          The page may have moved. Try our services, service areas, or just call and ask.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/services/" className="btn-navy">
            Painting services
          </Link>
          <Link href="/service-areas/" className="btn-ghost">
            Service areas
          </Link>
          <a href={site.phoneHref} className="btn-gold">
            <Icon name="phone" size={17} /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
