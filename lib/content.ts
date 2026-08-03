// ---------------------------------------------------------------------------
// Composed body copy for city x service pages.
//
// The measurable goal is low overlap: 5-word-shingle Jaccard similarity below
// ~15% between any two same-type pages (scripts/audit-seo.mjs enforces it).
//
// Two things get us there. First, large template pools selected by DIFFERENT
// hash mixes, so two pages sharing a city rarely share a sentence shape and two
// sharing a service never do either. Second, and more importantly, the bulk of
// each page's prose is drawn from genuinely different source facts — the city's
// own housing stock, conditions and permit position, and the service's own
// preparation, materials and timeline. Templating varies the phrasing; the
// underlying facts are what actually make the pages different.
// ---------------------------------------------------------------------------

import type { City } from './areas';
import type { Service } from './services';

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const low = (s: Service) => s.name.toLowerCase();

/** Rotate a window of neighbourhoods so sibling pages name different streets. */
function hoods(city: City, offset: number, n = 3): string {
  const list = city.neighbourhoods;
  if (list.length <= n) return list.join(', ');
  const start = offset % list.length;
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(list[(start + i) % list.length]);
  return `${out.slice(0, -1).join(', ')} and ${out[out.length - 1]}`;
}

/**
 * Four composed paragraphs, unique per (city, service).
 * Each paragraph pool is indexed by a different hash mix, so the combination
 * of four shapes repeats far less often than any single pool would suggest.
 */
export function cityServiceBody(city: City, service: Service): string[] {
  const a = hash(city.slug + service.slug);
  const b = hash(service.slug + city.slug);
  const c = hash(`${city.slug}|${service.slug}`);
  const d = hash(`${service.slug}~${city.slug}`);
  const sName = low(service);

  // ── P1: opener — service + city + neighbourhoods ──
  const p1 = [
    `${service.name} is one of the jobs ${city.name} homeowners call us about most often, and it is easy to see why: done properly it changes how the place feels every day. We work on it for families in ${hoods(city, a)}, and right across the rest of ${city.name}.`,
    `If you have been looking for ${service.keyword} in ${city.name}, you are probably after two things — work that lasts and a crew that actually turns up when it says it will. Sam's Painting brings both to homes in ${hoods(city, a + 1)} and the surrounding streets.`,
    `Good ${sName} starts well before anyone opens a tin. In ${city.name} that means understanding the property, what is already on the surface, and what the local conditions will do to it afterwards. We do exactly that for homeowners in ${hoods(city, a + 2)}.`,
    `A ${sName} project quietly transforms a ${city.name} home, and it is one of the few improvements that pays back both in how the house looks and in what it is worth. We handle it end to end for properties in ${hoods(city, a + 3)} and nearby.`,
    `When ${city.name} homeowners want ${sName} handled by one accountable crew rather than a rotating cast of subcontractors, they call us. Sam runs the job personally, from the first measurement through to the final walkthrough, right across ${hoods(city, a + 4)}.`,
    `There is a right way and a fast way to approach ${sName}, and in ${city.name} the two are rarely the same. We take the first. That is as true on a job in ${hoods(city, a + 5)} as it is anywhere else in town.`,
  ];

  // ── P2: the local angle.
  // Deliberately draws only ONE sentence of shared city data and pairs it with
  // service-specific wording. Quoting several sentences of city text here would
  // make all twelve of a city's service pages near-identical to one another.
  const p2 = [
    `${city.angle} That shapes how we approach ${sName} here specifically, right down to how much preparation we allow for in the quote.`,
    `${city.housing.split('. ')[0]}. Which means ${sName} in ${city.name} is rarely a one-size job — we price what is actually in front of us.`,
    `${city.conditions.split('. ')[0]}. For ${sName} that is not a footnote; it changes the preparation rather than just the finish.`,
    `${city.angle} So we do not price ${city.name} work off a template. We look at the property, work out what the surface genuinely needs for ${sName}, and quote that.`,
    `Local knowledge earns its keep on a job like this. ${city.conditions.split('. ')[0]}, and allowing for it up front is the difference between a lasting finish and a callback.`,
    `${city.housing.split('. ')[0]}. Understanding that is half of getting ${sName} right here, and it is where crews from outside the area most often come unstuck.`,
  ];

  // ── P3: the craft — service-specific prep and materials ──
  const p3 = [
    `On the ${sName} itself, the preparation is where the hours go. ${service.prep[0]}. ${service.materials} ${service.detail}`,
    `${service.detail} That is why our approach to ${sName} starts with the surface rather than the colour. ${service.prep[0]}, and only then does anything get coated. ${service.materials}`,
    `${service.materials} It is a deliberate choice rather than whatever is nearest on the shelf. Before any of it goes on, ${service.prep[0].toLowerCase()}. ${service.detail}`,
    `The part customers rarely see is the part that decides how long this lasts. ${service.prep[0]}, ${service.prep[1] ? service.prep[1].toLowerCase() : 'and every surface is left clean and sound before coating'}. ${service.materials}`,
  ];

  // ── P4: reassurance — permits, warranty, process ──
  const p4 = [
    `Every ${city.name} job is quoted at a fixed price in writing, with the full scope listed so there is nothing to argue about later. ${city.permits.split('. ')[0]}. Expect the work itself to take ${service.timeline}.`,
    `You get one point of contact, a written fixed-price estimate, and a realistic schedule — typically ${service.timeline} for this kind of work. On the paperwork side, ${city.permits.split('. ')[0].toLowerCase()}.`,
    `No disappearing crews, no surprise change orders. We quote your ${city.name} ${sName} at a fixed price, keep you posted as we go, and finish with a walkthrough so anything you are unhappy with gets sorted while we are still on site.`,
    `From the first visit to the final clean-up you deal with one crew that owns the result. The job is quoted fixed-price, usually runs ${service.timeline}, and we leave the site tidy at the end of every day rather than only at the end of the week.`,
  ];

  return [
    p1[a % p1.length],
    p2[b % p2.length],
    p3[c % p3.length],
    p4[d % p4.length],
  ];
}

/**
 * Rotate and trim a list so the same service shown in two different cities
 * does not present an identical bullet list. The facts stay identical — only
 * which subset appears, and in what order, changes by city.
 */
export function rotateFor(items: string[], city: City, service: Service, keep = 4): string[] {
  if (items.length <= 1) return items;
  const start = hash(city.slug + service.slug + 'rot') % items.length;
  const out: string[] = [];
  for (let i = 0; i < Math.min(keep, items.length); i++) {
    out.push(items[(start + i) % items.length]);
  }
  return out;
}

/** A short, city-specific sentence tying the service to local geography. */
export function localNote(city: City, service: Service): string {
  const i = hash(service.slug + city.slug + 'note');
  const hood = city.neighbourhoods[i % city.neighbourhoods.length];
  const mark = city.landmarks[i % city.landmarks.length];
  const road = city.roads[i % city.roads.length];
  const variants = [
    `We are in ${hood} most weeks, and ${road} puts the rest of ${city.name} within easy reach, so scheduling a ${service.name.toLowerCase()} visit here is straightforward.`,
    `Whether your property sits near ${mark} or out toward ${hood}, ${city.name} is part of our regular working week rather than an occasional trip.`,
    `From ${hood} across to ${mark}, we cover ${city.name} using ${road}, which means no travel surcharge lands on your ${service.name.toLowerCase()} estimate.`,
    `${hood} and the streets around ${mark} are familiar ground for us, and ${road} keeps the whole of ${city.name} inside our normal service radius.`,
  ];
  return variants[i % variants.length];
}

/** Varied meta description so the matrix does not ship one repeated template. */
export function cityServiceMeta(city: City, service: Service, phone: string): string {
  const i = hash(city.slug + service.slug + 'meta');
  const variants = [
    `Looking for ${service.keyword} in ${city.name}? Sam's Painting is a licensed, insured local crew. Free written estimates, fixed pricing, no travel charge. Call ${phone}.`,
    `${service.name} in ${city.name}, Ontario by Sam's Painting. Proper surface prep, honest advice and a free written quote for ${city.name} homeowners. Call ${phone}.`,
    `Need ${service.keyword} in ${city.name}? Get a fixed written price from a local Hamilton-area painter who knows the housing here. Free estimates. Call ${phone}.`,
    `Sam's Painting provides ${service.name.toLowerCase()} across ${city.name}. Licensed, insured, certified. Free no-obligation written estimate. Call ${phone} today.`,
  ];
  return variants[i % variants.length];
}

/** Varied H1 so titles across the matrix are not one shape. */
export function cityServiceTitle(city: City, service: Service): string {
  const i = hash(service.slug + city.slug + 'title');
  const variants = [
    `${service.name} in ${city.name}, Ontario`,
    `${city.name} ${service.name}`,
    `${service.name} Services in ${city.name}`,
    `Professional ${service.name} in ${city.name}`,
  ];
  return variants[i % variants.length];
}
