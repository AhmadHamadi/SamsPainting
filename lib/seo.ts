// ---------------------------------------------------------------------------
// Metadata builder. Every indexable page goes through buildMetadata() so that
// titles, descriptions, canonicals and social tags are produced one way only.
//
// Canonical rule: absolute https, the single chosen host, always with a
// trailing slash — matching next.config.mjs `trailingSlash: true`.
// ---------------------------------------------------------------------------

import type { Metadata } from 'next';
import { site, abs } from './site';

const OG_IMAGE = '/images/brand/og-default.png';

type BuildArgs = {
  title: string; // full <title>, brand included
  description: string;
  path: string; // '/services/interior-painting/'
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** /thank-you/, /message-received/ and /lp/* must not be indexed. */
  noindex?: boolean;
};

/**
 * Keep <title> inside the ~60-character SERP limit without chopping a word in
 * half. Drops to the short brand first, then trims the descriptive part while
 * leaving the brand intact.
 */
export function metaTitle(s: string): string {
  const MAX = 60;
  if (s.length <= MAX) return s;

  const sep = ' | Sam’s Painting';
  if (s.includes(sep)) {
    const head = s.split(sep)[0];
    const room = MAX - sep.length;
    if (room > 12) {
      const trimmed = head.slice(0, room);
      const clean = trimmed.slice(0, trimmed.lastIndexOf(' ')) || trimmed;
      return clean.trimEnd() + sep;
    }
  }
  const cut = s.slice(0, MAX);
  return (cut.slice(0, cut.lastIndexOf(' ')) || cut).trimEnd();
}

/** Trim a description toward the ~155-character sweet spot on a word boundary. */
export function metaDescription(s: string): string {
  const MAX = 160;
  if (s.length <= MAX) return s;
  const cut = s.slice(0, MAX - 1);
  return `${(cut.slice(0, cut.lastIndexOf(' ')) || cut).trimEnd()}…`;
}

export function buildMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}: BuildArgs): Metadata {
  const url = abs(path);
  const finalTitle = metaTitle(title);
  const finalDescription = metaDescription(description);
  const ogUrl = image.startsWith('http') ? image : `${site.url}${image}`;

  return {
    // `absolute` stops the root layout's title template appending the brand a
    // second time — our titles already carry it.
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: site.name,
      locale: 'en_CA',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [{ url: ogUrl, width: 1200, height: 630, alt: imageAlt ?? finalTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogUrl],
    },
  };
}
