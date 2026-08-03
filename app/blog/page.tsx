import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import { Breadcrumbs, PageHero, CTABand, FaqSection } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { posts, AUTHOR } from '@/lib/blog';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: "Painting Advice & Guides | Sam's Painting Hamilton",
  description:
    'Practical painting guides for Ontario homeowners: exterior season timing, cabinet painting vs refacing, paint finishes, primer, and how often to repaint.',
  path: '/blog/',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog/' },
];

const hubFaqs: FaqItem[] = [
  {
    q: 'Who writes these guides?',
    a: 'Sam, the owner and lead painter, writes them from what actually comes up on jobs. They are not rewritten manufacturer marketing — where a guide cites a figure or a specification, the source is named so you can check it.',
  },
  {
    q: 'Will these guides help me do the work myself?',
    a: 'Some of them will, and that is fine. Knowing when you need a real primer or which finish belongs in a bathroom is useful whether you hire us or not. We would rather be the painter people trust than the one hiding basic information.',
  },
  {
    q: 'Why is there no pricing in the blog?',
    a: 'Pricing lives on our costs pages, where it belongs, with full tables and sources. Keeping the two separate means each page answers one question properly rather than half-answering two.',
  },
];

export default function BlogHub() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(hubFaqs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Advice & guides"
        h1="Painting Advice for Ontario Homeowners"
        intro="Practical guides on timing, materials and method — written from what actually comes up on jobs around Hamilton."
        photo="supplies"
        priority
      />

      <section className="band">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="card-hover flex flex-col overflow-hidden">
              <Link href={`/blog/${p.slug}/`} className="block">
                <Img
                  name={p.photo}
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="h-44 w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-gold-dark">
                  {new Date(p.date).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })} ·{' '}
                  {p.readMinutes} min read
                </p>
                <h2 className="mt-2 !text-[1.05rem] leading-snug">
                  <Link href={`/blog/${p.slug}/`} className="hover:text-gold-dark">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-slate">{p.excerpt}</p>
                <p className="mt-4 text-[0.75rem] text-slate">By {AUTHOR.name} — {AUTHOR.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FaqSection faqs={hubFaqs} title="About these guides" />
      <CTABand />
    </>
  );
}
