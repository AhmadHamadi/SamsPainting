import type { MetadataRoute } from 'next';
import { abs } from '@/lib/site';
import { services, serviceHref, matrixServices } from '@/lib/services';
import { cities } from '@/lib/areas';
import { solutions } from '@/lib/solutions';
import { costPages } from '@/lib/costs';
import { posts } from '@/lib/blog';
import { photos } from '@/lib/photos';

// Single build date for lastmod. Deliberately a constant rather than new Date()
// so a rebuild without content changes does not claim everything was updated.
const LAST_MOD = '2026-08-03';

/**
 * Indexable URLs only. /thank-you/ and /message-received/ are noindex and are
 * intentionally excluded, as any /lp/ landing pages would be.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: abs(path), lastModified: LAST_MOD, changeFrequency, priority });

  return [
    entry('/', 1.0, 'weekly'),
    entry('/services/', 0.9),
    entry('/service-areas/', 0.9),
    entry('/cost/', 0.9),
    entry('/solutions/', 0.8),
    entry('/blog/', 0.7, 'weekly'),
    entry('/about/', 0.6),
    entry('/contact/', 0.8),
    entry('/faq/', 0.6),
    entry('/sitemap/', 0.3),
    entry('/privacy/', 0.2, 'yearly'),
    entry('/terms-of-service/', 0.2, 'yearly'),

    // Images are declared separately in app/image-sitemap.xml/route.ts —
    // Next 14 ignores an `images` field here, so putting them in this file
    // would be dead config that looks like it works.
    ...services.map((s) => entry(serviceHref(s), s.parent ? 0.7 : 0.85)),
    ...cities.map((c) => entry(`/service-areas/${c.slug}/`, 0.85)),
    ...cities.flatMap((c) =>
      matrixServices.map((s) => entry(`/service-areas/${c.slug}/${s.slug}/`, 0.7)),
    ),
    ...solutions.map((s) => entry(`/solutions/${s.slug}/`, 0.7)),
    ...costPages.map((p) => entry(`/cost/${p.slug}/`, 0.8)),
    ...posts.map((p) => ({
      url: abs(`/blog/${p.slug}/`),
      lastModified: p.updated ?? p.date,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
