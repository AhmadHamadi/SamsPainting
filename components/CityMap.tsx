import type { City } from '@/lib/areas';

/**
 * Google Maps embed for a service area.
 *
 * Uses the keyless `output=embed` form, so there is no API key to leak and no
 * billing account required. `loading="lazy"` keeps it off the critical path —
 * an eagerly-loaded map iframe is one of the most common causes of a poor LCP
 * on local-business pages.
 *
 * The heading and surrounding copy carry the local relevance; the map itself is
 * a trust and orientation signal for visitors rather than a ranking factor.
 */
export default function CityMap({ city }: { city: City }) {
  const query = encodeURIComponent(`${city.name}, Ontario, Canada`);
  const src = `https://www.google.com/maps?q=${query}&z=12&output=embed`;

  return (
    <section aria-labelledby={`map-${city.slug}`} className="mt-10">
      <h2 id={`map-${city.slug}`} className="mb-3 !text-xl">
        Where we work in {city.name}
      </h2>
      <p className="mb-4 text-[0.95rem] leading-relaxed text-slate-dark">
        Sam&rsquo;s Painting covers all of {city.name} and the surrounding {city.region} area,{' '}
        {city.driveTime} from our Hamilton base. There is no travel surcharge anywhere inside our
        service area.
      </p>
      <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-card">
        <iframe
          src={src}
          title={`Map of ${city.name}, Ontario — the area served by Sam's Painting`}
          width="100%"
          height="320"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
        />
      </div>
      <p className="mt-2.5 text-[0.75rem] text-slate">
        Serving {city.name} and nearby communities. Call{' '}
        <a href="tel:+12897008051" className="font-semibold text-navy underline">
          289-700-8051
        </a>{' '}
        for a free written estimate.
      </p>
    </section>
  );
}
