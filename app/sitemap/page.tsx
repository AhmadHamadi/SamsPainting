import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { services, serviceHref, matrixServices } from '@/lib/services';
import { cities } from '@/lib/areas';
import { solutions } from '@/lib/solutions';
import { costPages } from '@/lib/costs';
import { posts } from '@/lib/blog';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: "Sitemap | Sam's Painting Hamilton",
  description:
    'Every page on the Sam’s Painting website: services, service areas, city painting pages, costs, common problems and guides.',
  path: '/sitemap/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Sitemap', href: '/sitemap/' },
];

function Group({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="!text-lg">{title}</h2>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.88rem] text-slate-dark hover:text-navy hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HtmlSitemap() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <section className="band">
        <div className="shell space-y-10">
          <div>
            <p className="eyebrow">Every page</p>
            <h1 className="mt-2">Sitemap</h1>
          </div>

          <Group
            title="Main pages"
            links={[
              { href: '/', label: 'Home' },
              { href: '/services/', label: 'Painting Services' },
              { href: '/service-areas/', label: 'Service Areas' },
              { href: '/cost/', label: 'Painting Costs' },
              { href: '/solutions/', label: 'Common Paint Problems' },
              { href: '/blog/', label: 'Advice & Guides' },
              { href: '/about/', label: 'About Sam’s Painting' },
              { href: '/contact/', label: 'Contact & Free Quote' },
              { href: '/faq/', label: 'FAQ' },
              { href: '/privacy/', label: 'Privacy Policy' },
              { href: '/terms-of-service/', label: 'Terms of Service' },
            ]}
          />

          <Group
            title="Painting services"
            links={services.map((s) => ({ href: serviceHref(s), label: s.name }))}
          />

          <Group
            title="Service areas"
            links={cities.map((c) => ({
              href: `/service-areas/${c.slug}/`,
              label: `Painters in ${c.name}`,
            }))}
          />

          {cities.map((c) => (
            <Group
              key={c.slug}
              title={`${c.name} services`}
              links={matrixServices.map((s) => ({
                href: `/service-areas/${c.slug}/${s.slug}/`,
                label: `${s.name} in ${c.name}`,
              }))}
            />
          ))}

          <Group
            title="Painting costs"
            links={costPages.map((p) => ({ href: `/cost/${p.slug}/`, label: p.title }))}
          />
          <Group
            title="Common problems"
            links={solutions.map((s) => ({ href: `/solutions/${s.slug}/`, label: s.title }))}
          />
          <Group
            title="Guides"
            links={posts.map((p) => ({ href: `/blog/${p.slug}/`, label: p.title }))}
          />
        </div>
      </section>
    </>
  );
}
