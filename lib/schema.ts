// ---------------------------------------------------------------------------
// JSON-LD builders. Centralised so NAP is byte-identical in every graph on the
// site and matches lib/site.ts, the footer and llms.txt exactly.
//
// ⚠️ NO AggregateRating OR Review NODE EXISTS IN THIS FILE, DELIBERATELY.
// Sam has no verified review figures yet. Publishing invented ratings is a
// direct breach of Google's structured-data policy and the most reliable way
// to earn a manual action. When real Google Business Profile numbers exist,
// add aggregateRating to businessSchema() ONLY — on the homepage graph, not on
// every page.
//
// Likewise there is no Offer/PriceSpecification anywhere: the figures in
// lib/pricing.ts are third-party market ranges, not Sam's own prices.
// ---------------------------------------------------------------------------

import { site, abs } from './site';
import { cities, type City } from './areas';
import { services, serviceHref, type Service } from './services';
import type { FaqItem, Crumb } from './types';

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;

const LOGO = `${site.url}/images/brand/sams-painting-logo-512.png`;

const areaServed = cities.map((c) => ({
  '@type': 'City',
  name: `${c.name}, Ontario, Canada`,
}));

const openingHoursSpecification = site.hours
  .filter((h) => h.open !== 'closed')
  .map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.open,
    closes: h.close,
  }));

/** Core painting-business entity, referenced by @id from every other graph. */
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['PaintingContractor', 'HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    telephone: site.phone,
    email: site.email,
    image: LOGO,
    logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
    description: site.description,
    slogan: site.tagline,
    priceRange: '$$',
    currenciesAccepted: 'CAD',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed,
    // 50 km covers Hamilton out to St. Catharines and Milton, matching the
    // city list above rather than overclaiming a province-wide radius.
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      geoRadius: '50000',
    },
    openingHoursSpecification,
    founder: { '@type': 'Person', name: site.owner.firstName, jobTitle: site.owner.role },
    knowsAbout: [
      'Interior painting',
      'Exterior painting',
      'Kitchen cabinet refinishing',
      'Deck and fence staining',
      'Drywall repair',
      'Wallpaper removal',
      'Epoxy floor coating',
      'Surface preparation and priming',
      'Lead-safe paint removal practices',
      'Colour consultation',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Painting services',
      itemListElement: services
        .filter((s) => !s.parent)
        .map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, url: abs(serviceHref(s)) },
        })),
    },
    ...(Object.keys(site.social).length ? { sameAs: Object.values(site.social) } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-CA',
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

/**
 * FAQPage. The `faqs` array passed here is the SAME array rendered visibly on
 * the page, so schema text and on-page text can never diverge.
 */
export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.excerpt,
    provider: { '@id': BUSINESS_ID },
    areaServed,
    url: abs(serviceHref(service)),
  };
}

/** Service scoped to a single city — used on /service-areas/[city]/[service]/. */
export function cityServiceSchema(city: City, service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${city.name}, Ontario`,
    serviceType: service.name,
    description: `${service.excerpt} Serving ${city.name} and the surrounding ${city.region} area.`,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: `${city.name}, Ontario, Canada` },
    url: abs(`/service-areas/${city.slug}/${service.slug}/`),
  };
}

/** LocalBusiness scoped to one city, with that city's real coordinates. */
export function cityBusinessSchema(city: City) {
  return {
    '@context': 'https://schema.org',
    '@type': ['PaintingContractor', 'LocalBusiness'],
    '@id': `${abs(`/service-areas/${city.slug}/`)}#business`,
    name: `${site.name} — ${city.name}`,
    parentOrganization: { '@id': BUSINESS_ID },
    url: abs(`/service-areas/${city.slug}/`),
    telephone: site.phone,
    email: site.email,
    image: LOGO,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
    areaServed: { '@type': 'City', name: `${city.name}, Ontario, Canada` },
    openingHoursSpecification,
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  authorRole: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: { '@id': BUSINESS_ID },
    },
    publisher: { '@id': BUSINESS_ID },
    mainEntityOfPage: abs(`/blog/${post.slug}/`),
    inLanguage: 'en-CA',
  };
}

/** HowTo, used on the /solutions/ pages that describe a repeatable fix. */
export function howToSchema(name: string, description: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
