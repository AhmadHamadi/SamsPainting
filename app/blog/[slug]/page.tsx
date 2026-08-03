import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import { Breadcrumbs, CTABand, FaqSection, DirectAnswer } from '@/components/sections';
import { buildMetadata } from '@/lib/seo';
import { posts, postBySlug, AUTHOR } from '@/lib/blog';
import { photos } from '@/lib/photos';
import { breadcrumbSchema, faqSchema, articleSchema } from '@/lib/schema';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = postBySlug[params.slug];
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} | Sam's Painting`,
    description: p.excerpt,
    path: `/blog/${p.slug}/`,
    image: photos[p.photo].src,
    imageAlt: photos[p.photo].alt,
    type: 'article',
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
  });
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const p = postBySlug[params.slug];
  if (!p) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: p.title, href: `/blog/${p.slug}/` },
  ];

  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema({
            title: p.title,
            excerpt: p.excerpt,
            slug: p.slug,
            date: p.date,
            updated: p.updated,
            author: AUTHOR.name,
            authorRole: AUTHOR.role,
            image: photos[p.photo].src,
          }),
          faqSchema(p.faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <article>
        <header className="border-b border-navy/10 bg-bone">
          <div className="shell max-w-3xl py-12 sm:py-16">
            <p className="eyebrow">Guide</p>
            <h1 className="mt-3">{p.title}</h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-dark">{p.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-slate">
              <span className="font-semibold text-navy-900">
                By {AUTHOR.name} — {AUTHOR.role}
              </span>
              <time dateTime={p.date}>
                Published{' '}
                {new Date(p.date).toLocaleDateString('en-CA', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              {p.updated && p.updated !== p.date && (
                <time dateTime={p.updated}>
                  Updated{' '}
                  {new Date(p.updated).toLocaleDateString('en-CA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              )}
              <span>{p.readMinutes} min read</span>
            </div>
          </div>
        </header>

        <div className="shell max-w-3xl py-12">
          <Img
            name={p.photo}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="mb-9 w-full rounded-2xl object-cover shadow-card"
          />

          <DirectAnswer>{p.answer}</DirectAnswer>

          {p.sections.map((sec) => (
            <section key={sec.h2} className="mt-10">
              <h2>{sec.h2}</h2>
              <div className="prose-local mt-4">
                {sec.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <FaqSection faqs={p.faqs} title="Related questions" />

      <section className="band">
        <div className="shell">
          <h2 className="mb-7">More painting guides</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}/`} className="card-hover overflow-hidden">
                <Img name={o.photo} sizes="320px" className="h-36 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-[0.95rem] leading-snug">{o.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
