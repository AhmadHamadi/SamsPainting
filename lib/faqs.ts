// ---------------------------------------------------------------------------
// FAQ generation — the site's hardest constraint.
//
// RULE: no FAQ question may appear twice anywhere on the site, across ~200
// pages. A shared "FAQ bank" cannot satisfy that, so questions are COMPOSED
// instead, and the template pools are deliberately DISJOINT by page type:
//
//   Pool A  service pages      -> names the SERVICE, never a city
//   Pool B  city pages         -> names the CITY, never a specific service
//   Pool C  city x service     -> names BOTH, in a phrasing shape neither
//                                 A nor B ever produces
//   bespoke home / about / cost / solutions / blog / contact / faq pages
//
// Because a city x service page is uniquely identified by its (city, service)
// pair, and every Pool C question embeds both, every generated question string
// is globally unique by construction. scripts/audit-seo.mjs proves it against
// the built HTML rather than trusting this comment.
//
// Answers target the 40–55 word "atomic answer" band that answer engines lift
// cleanly, and are woven from per-city and per-service facts so sibling pages
// do not read like one another.
// ---------------------------------------------------------------------------

import type { City } from './areas';
import type { Service } from './services';
import type { FaqItem } from './types';
import { site } from './site';

/** Deterministic offset so different pages start at different templates. */
function seed(...parts: string[]): number {
  let h = 0;
  for (const p of parts) {
    for (let i = 0; i < p.length; i++) h = (h * 31 + p.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick<T>(pool: T[], offset: number, count: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    out.push(pool[(offset + i) % pool.length]);
  }
  return out;
}

/** Lower-cases a service name for mid-sentence use. */
const low = (s: Service) => s.name.toLowerCase();

// ───────────────────────────────────────────────────────────────────────────
// POOL A — service pages. Names the service; never names a city.
// ───────────────────────────────────────────────────────────────────────────
type ServiceQ = (s: Service) => FaqItem;

const POOL_A: ServiceQ[] = [
  (s) => ({
    q: `How long does ${low(s)} usually take?`,
    a: `Most jobs run ${s.timeline}. The variable is almost never the painting itself — it is how much preparation the surface needs first. We confirm a realistic schedule when we quote, and we tell you up front if we think it will take longer than you are expecting.`,
  }),
  (s) => ({
    q: `What preparation does ${low(s)} involve?`,
    a: `${s.prep[0]}. ${s.prep[1] ?? 'We then mask everything that is staying put and protect the floors properly.'} Preparation regularly takes more hours than the coating does, and skipping it is the single most common reason a paint job fails early.`,
  }),
  (s) => ({
    q: `What products do you use for ${low(s)}?`,
    a: `${s.materials} We choose the coating to suit the surface and how the room or elevation actually gets used, rather than defaulting to one product for every job. Sam will explain what is going on your home and why before any of it is opened.`,
  }),
  (s) => ({
    q: `What is included when you quote ${low(s)}?`,
    a: `${s.includes[0]}, and ${s.includes[1]?.toLowerCase() ?? 'all surfaces prepared before coating'}. The written estimate lists every surface being coated and every repair being made, so there is nothing to argue about once the crew is on site.`,
  }),
  (s) => ({
    q: `Is ${low(s)} worth doing professionally rather than yourself?`,
    a: `${s.detail} That is usually the deciding factor. The materials are affordable enough on their own; what you are really buying is the preparation, the equipment and the finish quality that comes from doing it every day.`,
  }),
  (s) => ({
    q: `Do I need to be home while you handle the ${low(s)}?`,
    a: `No. Plenty of our customers give us a key or a code and go to work as normal. We will walk the job with you before we start and again when we finish, and we will call you rather than guess if anything unexpected turns up mid-job.`,
  }),
  (s) => ({
    q: `Do you provide a written estimate for ${low(s)}?`,
    a: `Always, and it is free. We come out, look at the actual surfaces, and put the scope in writing with a fixed price. Quoting this kind of work over the phone without seeing it is how people end up with surprise charges partway through.`,
  }),
  (s) => ({
    q: `How soon can you schedule ${low(s)}?`,
    a: `It depends on the season. Exterior work books out furthest in late spring and summer, and interior work fills the winter months. Call ${site.phoneDisplay} and we will tell you honestly where you would land in the schedule rather than promising a date we cannot hold.`,
  }),
  (s) => ({
    q: `Will ${low(s)} make a mess of my home?`,
    a: `It should not. Floors get drop-sheeted, furniture gets moved and covered, and we clean up at the end of every day rather than only at the end of the job. You should be able to use the rest of your house normally while we work.`,
  }),
  (s) => ({
    q: `How do you price ${low(s)}?`,
    a: `By the actual work in front of us: surface area, condition, how much repair and preparation is needed, and how many coats the colour will take. We quote a fixed price rather than an hourly rate, so the number on the estimate is the number you pay.`,
  }),
];

/**
 * Service-specific closing sentences. Appended so that two service pages never
 * carry a word-for-word identical answer even where the question shape is the
 * same. The facts are unchanged — only the wording is page-specific.
 */
function serviceTail(s: Service, i: number): string {
  const variants = [
    `On a ${s.name.toLowerCase()} job specifically, ${s.prep[0].toLowerCase()} — that is where the durability comes from.`,
    `For this kind of work we allow ${s.timeline}, and we would rather quote that honestly than promise a day we cannot hold.`,
    `${s.materials}`,
    `The scope we quote includes ${s.includes[0].toLowerCase()}, written down before anyone starts.`,
    `${s.detail}`,
    `Worth knowing on a ${s.name.toLowerCase()} job: ${s.prep[s.prep.length - 1].toLowerCase()}.`,
  ];
  return variants[i % variants.length];
}

export function serviceFaqs(s: Service, count = 6): FaqItem[] {
  const base = seed(s.slug);
  return pick(POOL_A, base, count).map((fn, i) => {
    const item = fn(s);
    return { q: item.q, a: `${item.a} ${serviceTail(s, base + i)}` };
  });
}

// ───────────────────────────────────────────────────────────────────────────
// POOL B — city pages. Names the city; never names a specific service.
// ───────────────────────────────────────────────────────────────────────────
type CityQ = (c: City) => FaqItem;

const POOL_B: CityQ[] = [
  (c) => ({
    q: `Do I need a permit to repaint my house in ${c.name}?`,
    a: `Almost certainly not. ${c.permits.split('.')[0]}. Under the Ontario Heritage Act a permit is only triggered on an individually designated property or one inside a designated Heritage Conservation District, so for the vast majority of ${c.name} homes there is nothing to apply for.`,
  }),
  (c) => ({
    q: `Which neighbourhoods in ${c.name} do you cover?`,
    a: `All of them. We regularly work in ${c.neighbourhoods.slice(0, 4).join(', ')} and ${c.neighbourhoods[4] ?? 'the surrounding streets'}, and we are ${c.driveTime}, so there is no travel surcharge and no minimum job size to get us out there.`,
  }),
  (c) => ({
    q: `What makes painting a ${c.name} home different?`,
    a: `${c.angle} It changes what we quote and how we prepare. A crew that treats every house in the region identically will get the preparation wrong somewhere, and preparation is what decides whether the finish lasts three years or ten.`,
  }),
  (c) => ({
    q: `Do you charge extra to travel to ${c.name}?`,
    a: `No. ${c.name} is inside our regular service area at ${c.driveTime}, and our pricing does not change based on which of our areas you are in. You get the same written fixed-price estimate a customer in Hamilton would get for the same work.`,
  }),
  (c) => ({
    q: `Is my ${c.name} home likely to have lead paint?`,
    a: `It depends on the age. Health Canada advises that homes built before 1960 probably contain lead-based paint, and Canada only capped paint at 0.5% lead in 1976. Where that applies we test rather than assume, and we work wet with dust control instead of dry sanding.`,
  }),
  (c) => ({
    q: `When is the best time of year to paint an exterior in ${c.name}?`,
    a: `Realistically late April through late October, with May to September the dependable core. Most exterior coatings need surface and overnight temperatures to stay above roughly 10°C, and a warm afternoon followed by a near-freezing night will stop the paint coalescing properly.`,
  }),
  (c) => ({
    q: `How quickly can you get to a job in ${c.name}?`,
    a: `We are ${c.driveTime}, so getting out to look at the work is straightforward and usually happens within a few days. The job itself depends on the season — exteriors book out hardest through spring and summer. Call ${site.phoneDisplay} for our current availability.`,
  }),
  (c) => ({
    q: `Do you work on older properties in ${c.name}?`,
    a: `Regularly, and they are some of our favourite jobs. Older homes need a different approach — plaster rather than drywall, lead-presumptive coatings, original wood sash — and the preparation is where the hours go. We will tell you honestly what a property needs before we quote it.`,
  }),
];

export function cityFaqs(c: City, count = 6): FaqItem[] {
  return pick(POOL_B, seed(c.slug), count).map((fn) => fn(c));
}

// ───────────────────────────────────────────────────────────────────────────
// POOL C — city x service. Names BOTH, in shapes Pools A and B never produce.
// ───────────────────────────────────────────────────────────────────────────
type PairQ = (c: City, s: Service) => FaqItem;

const POOL_C: PairQ[] = [
  (c, s) => ({
    q: `How much does ${low(s)} cost in ${c.name}, Ontario?`,
    a: `There is no honest single figure, because it depends on surface area, condition and how much preparation is needed. Published Hamilton-area market ranges are on our costs pages for reference. For your actual property we come out, measure, and give you a free written fixed price.`,
  }),
  (c, s) => ({
    q: `Do you offer ${low(s)} throughout ${c.name}?`,
    a: `Yes, across the whole town including ${c.neighbourhoods.slice(0, 3).join(', ')}. We are ${c.driveTime}, so ${c.name} is part of our normal working week rather than an occasional trip, and there is no travel charge added to the estimate.`,
  }),
  (c, s) => ({
    q: `What should ${c.name} homeowners know before booking ${low(s)}?`,
    a: `${s.detail} That single fact catches more people out than anything else on this kind of job. We will walk you through what your specific property needs at the estimate, so the scope is agreed before anyone starts.`,
  }),
  (c, s) => ({
    q: `How long will ${low(s)} take at a ${c.name} property?`,
    a: `Typically ${s.timeline}. The size of the house matters less than the condition of what we are coating — a well-maintained surface moves fast, while one needing repair, stripping or sealing adds time. We give you a realistic window in writing, not an optimistic one.`,
  }),
  (c, s) => ({
    q: `Is ${low(s)} affected by the local conditions in ${c.name}?`,
    a: `${c.conditions.split('.')[0]}. That genuinely changes how we prepare and schedule the work here, which is why we would rather look at your property in person than quote a job like this sight unseen over the phone.`,
  }),
  (c, s) => ({
    q: `Why choose Sam's Painting for ${low(s)} in ${c.name}?`,
    a: `You get a licensed and insured local crew, a free written fixed-price estimate, and the same person on site from the first visit to the final walkthrough. We work in ${c.name} constantly, so we already know what the housing here needs.`,
  }),
  (c, s) => ({
    q: `Can you handle ${low(s)} on an older ${c.name} home?`,
    a: `Yes, and we adjust the method rather than forcing a modern one onto an old surface. Where a property predates 1960 we treat the existing coating as lead-presumptive, test rather than assume, and use dust control instead of dry sanding it back.`,
  }),
  (c, s) => ({
    q: `Do you give free estimates for ${low(s)} in ${c.name}?`,
    a: `Always. We come to the property, look at the actual surfaces, and give you a written fixed price with the full scope listed. There is no charge and no obligation. Call ${site.phoneDisplay} or send the form and we will arrange a time that suits you.`,
  }),
];

/**
 * City-specific closing sentences for the matrix pages. Without these, the same
 * service answered in thirteen towns would produce thirteen identical answers,
 * which is precisely the templated-clone pattern to avoid.
 */
function pairTail(c: City, s: Service, i: number): string {
  const hood = c.neighbourhoods[i % c.neighbourhoods.length];
  const mark = c.landmarks[i % c.landmarks.length];
  const road = c.roads[i % c.roads.length];
  const variants = [
    `We are ${c.driveTime}, and ${hood} is somewhere we work regularly.`,
    `${c.angle}`,
    `Properties near ${mark} and out through ${hood} are all inside our normal radius.`,
    `${road} keeps the whole of ${c.name} within easy reach, so there is no travel charge on the estimate.`,
    `${c.conditions.split('. ')[0]}, which is worth factoring into a ${s.name.toLowerCase()} job here.`,
    `Around ${hood} we see this often enough to know what the local housing needs.`,
  ];
  return variants[i % variants.length];
}

export function cityServiceFaqs(c: City, s: Service, count = 5): FaqItem[] {
  const base = seed(c.slug, s.slug);
  return pick(POOL_C, base, count).map((fn, i) => {
    const item = fn(c, s);
    return { q: item.q, a: `${item.a} ${pairTail(c, s, base + i)}` };
  });
}

// ───────────────────────────────────────────────────────────────────────────
// Bespoke FAQ sets. Each appears on exactly ONE page.
// ───────────────────────────────────────────────────────────────────────────

export const homeFaqs: FaqItem[] = [
  {
    q: 'What areas does Sam’s Painting cover?',
    a: 'We are based in Hamilton and work across Stoney Creek, Ancaster, Dundas, Waterdown, Binbrook, Burlington, Oakville, Milton, Grimsby, Caledonia, Brantford and St. Catharines. Everything inside that radius is part of our normal week, so no travel surcharge is added to your estimate.',
  },
  {
    q: 'Is Sam’s Painting licensed and insured?',
    a: 'Yes. We are a licensed, insured and certified painting contractor. We are happy to provide current certificates before work begins, and we would encourage you to ask any contractor for the same thing before you let them start on your home.',
  },
  {
    q: 'Are your estimates really free?',
    a: 'Completely. We come to your property, look at the actual surfaces, and give you a written fixed-price estimate listing every surface and repair included. There is no charge, no deposit to get a quote, and no obligation to book afterwards.',
  },
  {
    q: 'Who actually shows up to do the work?',
    a: 'Sam runs the crew and is on site personally. You are not handed off to a subcontractor you have never met after signing, and the person who quoted your job is the person accountable for how it turns out.',
  },
  {
    q: 'Do you paint in winter?',
    a: 'Interiors, yes — winter is genuinely a good time for indoor work because indoor humidity is lower and paint dries more evenly. Exteriors are a different matter: the realistic Hamilton-area window runs from about late April to late October.',
  },
  {
    q: 'How do I get started?',
    a: `Call ${site.phoneDisplay} or send the quote form on this site. We will arrange a time to come and look at the work, usually within a few days, and you will have a written price to consider with no pressure attached.`,
  },
];

export const aboutFaqs: FaqItem[] = [
  {
    q: 'Who is Sam?',
    a: 'Sam is the owner and lead painter, and the person who will come out to quote your job and run the crew that does it. Sam’s Painting is a locally owned Hamilton business rather than a franchise or a national call centre.',
  },
  {
    q: 'How many years has Sam’s Painting been operating?',
    a: 'Sam has been painting homes in the Hamilton area for multiple years and the business is established locally. We would rather state that plainly than inflate a number, and we are glad to talk through relevant recent work when we visit.',
  },
  {
    q: 'Do you use subcontractors?',
    a: 'The work is done by our own crew under Sam’s supervision. That is the point of hiring a local painter rather than a broker — the person who quoted the job is on site and answerable for the standard of the finish.',
  },
  {
    q: 'What certifications does Sam’s Painting hold?',
    a: 'We are a certified, licensed and insured painting contractor. Certificates are available on request before work starts. We also follow the recognised Ontario guidance for handling lead-based coatings on pre-1960 properties.',
  },
  {
    q: 'What happens if something is not right after you finish?',
    a: 'You call us and we come back. Every job ends with a walkthrough so anything you are not happy with gets flagged while we are still there, and we would far rather fix it than have you living with it.',
  },
];

export const contactFaqs: FaqItem[] = [
  {
    q: 'What is the fastest way to reach Sam’s Painting?',
    a: `Calling ${site.phoneDisplay} is quickest, especially during working hours. The quote form on this page goes straight to our inbox and we reply within one business day. Either way you will speak to Sam rather than an answering service.`,
  },
  {
    q: 'What information helps you give an accurate quote?',
    a: 'Roughly which rooms or elevations are involved, whether it is interior or exterior, the approximate age of the property, and any known problems like peeling, water stains or wallpaper. Photos help a lot, though we still come out to measure properly.',
  },
  {
    q: 'What are your working hours?',
    a: 'We are on site Monday to Friday from 7am to 6pm and Saturday from 8am to 4pm, and closed Sundays. If you call outside those hours, leave a message and we will get back to you the next working day.',
  },
  {
    q: 'Do you charge a call-out fee to come and quote?',
    a: 'No. Coming out to look at the work and putting a written price together is free, and it stays free whether or not you decide to book. We do not ask for a deposit until a job is confirmed.',
  },
];

export const faqPageFaqs: FaqItem[] = [
  {
    q: 'How many coats of paint will my walls need?',
    a: 'Two finish coats is our standard, over a primer where the surface needs one. Deep colours are the exception — strong reds, saturated blues and true blacks often need three or four over white, which is why they cost more to apply.',
  },
  {
    q: 'Do painters move furniture, or should I do it first?',
    a: 'We move it. Furniture goes to the centre of the room and gets covered, and floors are fully drop-sheeted. If you can clear small breakables, personal items and wall hangings before we arrive, that speeds the first morning up considerably.',
  },
  {
    q: 'How long before I can hang pictures back on a freshly painted wall?',
    a: 'Give it a few days. Paint feels dry within hours but keeps hardening for considerably longer, and pressing hardware or tape against a soft film too early will mark it. We will tell you the specific window for the product we used.',
  },
  {
    q: 'Can you paint over wallpaper instead of removing it?',
    a: 'Sometimes, but it is usually a false economy. Paint often loosens the adhesive and the seams telegraph through the finish. Where the paper is sound and well-stuck we will say so; where it is not, removal and sealing is the right call.',
  },
  {
    q: 'Do you supply the paint, or should I buy it myself?',
    a: 'We supply it as part of the quoted price, and the product is listed on your estimate. If you have a colour already chosen or a tin left from a previous job you would like matched, bring it up when we come to quote.',
  },
  {
    q: 'What paint finish should I choose for each room?',
    a: 'Matte and eggshell suit bedrooms and living areas because they hide surface imperfection. Kitchens, bathrooms and hallways do better in something more scrubbable. Trim and doors take a hard enamel. We will recommend per room when we quote.',
  },
  {
    q: 'Is low-VOC paint worth asking for?',
    a: 'If you have young children, pets or anyone sensitive to smell, yes. Modern low-VOC products perform comparably to conventional ones for most interior work. Ventilate regardless, and give a freshly painted bedroom a couple of days before sleeping in it.',
  },
  {
    q: 'Do you take a deposit before starting?',
    a: 'For larger jobs a modest deposit is normal, and it is agreed in writing before anything begins. Be wary of any contractor asking for a very large share up front — that is a recognised warning sign in this trade.',
  },
];
