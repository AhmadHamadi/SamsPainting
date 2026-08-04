// ---------------------------------------------------------------------------
// Image sitemap.
//
// Next 14's MetadataRoute.Sitemap silently ignores an `images` field (support
// landed in Next 15), so rather than ship dead config we emit the Google image
// sitemap namespace directly here. Referenced from robots.txt alongside the
// main sitemap.
//
// Declaring each page's primary image gives Google Images an explicit crawl
// target with its caption and title, instead of relying on discovery in markup.
// ---------------------------------------------------------------------------
import { abs, site } from '@/lib/site';
import { services, serviceHref, matrixServices } from '@/lib/services';
import { cities } from '@/lib/areas';
import { posts } from '@/lib/blog';
import { photos } from '@/lib/photos';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type Entry = { loc: string; img: string; caption: string; title: string };

function build(): Entry[] {
  const out: Entry[] = [];

  out.push({
    loc: abs('/'),
    img: `${site.url}${photos.hero.src}`,
    caption: photos.hero.alt,
    title: "Painters in Hamilton, Ontario — Sam's Painting",
  });

  for (const s of services) {
    const p = photos[s.photo];
    out.push({
      loc: abs(serviceHref(s)),
      img: `${site.url}${p.src}`,
      caption: p.alt,
      title: `${s.name} in Hamilton, Ontario`,
    });
  }

  for (const c of cities) {
    out.push({
      loc: abs(`/service-areas/${c.slug}/`),
      img: `${site.url}${photos.hero.src}`,
      caption: photos.hero.alt,
      title: `House painters in ${c.name}, Ontario`,
    });
    for (const s of matrixServices) {
      const p = photos[s.photo];
      out.push({
        loc: abs(`/service-areas/${c.slug}/${s.slug}/`),
        img: `${site.url}${p.src}`,
        caption: p.alt,
        title: `${s.name} in ${c.name}, Ontario`,
      });
    }
  }

  for (const post of posts) {
    const p = photos[post.photo];
    out.push({
      loc: abs(`/blog/${post.slug}/`),
      img: `${site.url}${p.src}`,
      caption: p.alt,
      title: post.title,
    });
  }

  return out;
}

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${build()
  .map(
    (e) => `  <url>
    <loc>${esc(e.loc)}</loc>
    <image:image>
      <image:loc>${esc(e.img)}</image:loc>
      <image:title>${esc(e.title)}</image:title>
      <image:caption>${esc(e.caption)}</image:caption>
    </image:image>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
