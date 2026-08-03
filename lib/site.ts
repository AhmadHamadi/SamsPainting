// ---------------------------------------------------------------------------
// Central site / business configuration (NAP + brand).
// This file is the single source of truth for the business's Name, Address and
// Phone. Schema, footer, header, llms.txt and every metadata block read from
// here, so NAP stays byte-identical site-wide (a real local-ranking signal).
// Keep it in exact sync with the Google Business Profile once that exists.
// ---------------------------------------------------------------------------

// ⚠️ TODO BEFORE LAUNCH — the client has not supplied these two yet.
// 1. `url` below: swap to the real domain. It is the ONLY place the domain is
//    written; every canonical, OG url, sitemap entry and llms.txt line derives
//    from it, so this one edit re-points the whole site.
// 2. `LEAD_TO` in app/api/quote/route.ts: the inbox that receives form leads.
// Nothing else needs touching. See README.md § "Before you deploy".
const DOMAIN_PLACEHOLDER = 'https://www.samspaintinghamilton.ca';

export const site = {
  name: "Sam's Painting",
  legalName: "Sam's Painting",
  shortName: "Sam's Painting",
  tagline: 'Interior • Exterior • Cabinets',
  url: DOMAIN_PLACEHOLDER,
  description:
    "Sam's Painting is a licensed and insured residential painting contractor based in Hamilton, Ontario. We handle interior and exterior painting, cabinet refinishing, deck and fence staining, drywall repair and wallpaper removal for homeowners across Hamilton, Stoney Creek, Ancaster, Dundas, Waterdown, Burlington and the surrounding Golden Horseshoe.",

  // --- NAP (Name / Address / Phone) — must match GBP exactly ---
  phone: '289-700-8051',
  phoneHref: 'tel:+12897008051',
  phoneDisplay: '(289) 700-8051',
  phoneE164: '+12897008051',
  sms: 'sms:+12897008051',

  // ⚠️ TODO: replace with the client's real inbox when supplied (see above).
  email: 'info@samspaintinghamilton.ca',
  emailHref: 'mailto:info@samspaintinghamilton.ca',

  // Empty = the quote form posts to /api/quote, which emails the lead via
  // Resend. A mailto fallback runs if that send ever fails, so no lead is lost.
  formEndpoint: '',

  address: {
    // Service-area business run out of Hamilton. No street address is published
    // until the client confirms one that matches their Google Business Profile.
    locality: 'Hamilton',
    region: 'ON',
    regionName: 'Ontario',
    postalCode: '',
    country: 'CA',
  },
  geo: { lat: 43.2557, lng: -79.8711 }, // Hamilton, ON city centre

  hours: [
    { day: 'Monday', open: '07:00', close: '18:00' },
    { day: 'Tuesday', open: '07:00', close: '18:00' },
    { day: 'Wednesday', open: '07:00', close: '18:00' },
    { day: 'Thursday', open: '07:00', close: '18:00' },
    { day: 'Friday', open: '07:00', close: '18:00' },
    { day: 'Saturday', open: '08:00', close: '16:00' },
    { day: 'Sunday', open: 'closed', close: 'closed' },
  ],

  owner: {
    firstName: 'Sam',
    // Displayed on /about/ and used as `founder` in LocalBusiness schema.
    role: 'Owner & Lead Painter',
  },

  // --- Trust / proof ---
  // Only claims the client has confirmed appear here. There is deliberately NO
  // review rating or review count: none have been verified, and inventing them
  // would breach Google's structured-data policy. Add them (and re-enable
  // AggregateRating in lib/schema.ts) once real GBP figures exist.
  trust: {
    insured: true,
    certified: true,
    freeEstimates: true,
  },

  badges: [
    'Licensed & Insured',
    'Certified Painters',
    'Free Written Estimates',
    'Locally Owned in Hamilton',
  ],

  // Profiles are omitted from `sameAs` until they exist — linking to a bare
  // facebook.com homepage is a negative trust signal, not a positive one.
  social: {} as Record<string, string>,
};

export type Site = typeof site;

/** Absolute URL for any site path. Guarantees exactly one trailing slash. */
export function abs(path: string): string {
  if (path === '/') return `${site.url}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${site.url}${clean.endsWith('/') ? clean : `${clean}/`}`;
}
