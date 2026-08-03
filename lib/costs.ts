// ---------------------------------------------------------------------------
// Cost pages — the single biggest ranking gap found in competitor research.
//
// Only two local competitors publish cost content at all, and the strongest of
// those is ~1,200 words with no FAQ, no price table and no schema, dating from
// 2021. Directories are eating those SERPs by default.
//
// HONESTY CONSTRAINT: every figure shown comes from lib/pricing.ts, which holds
// THIRD-PARTY PUBLISHED MARKET RANGES with their sources — not Sam's rate card.
// Each page states that plainly and routes the reader to a free written quote.
// No Offer or PriceSpecification schema is emitted anywhere.
// ---------------------------------------------------------------------------

import type { IconName } from '@/components/Icon';
import type { FaqItem } from './types';
import type { PriceTable } from './pricing';
import {
  interiorByRoom,
  interiorWholeHome,
  exteriorWholeHome,
  cabinetPricing,
  deckFencePricing,
  prepRepairPricing,
  detailPricing,
} from './pricing';

export type CostPage = {
  slug: string;
  title: string;
  keyword: string;
  icon: IconName;
  /** Front-loaded direct answer with a real number. ~40–55 words. */
  answer: string;
  intro: string;
  tables: PriceTable[];
  /** What moves the price up or down on a real job. */
  drivers: { name: string; text: string }[];
  faqs: FaqItem[];
  related: string[]; // service slugs
};

export const costPages: CostPage[] = [
  {
    slug: 'interior-painting-cost-hamilton',
    title: 'How Much Does Interior Painting Cost in Hamilton?',
    keyword: 'interior painting cost Hamilton',
    icon: 'roller',
    answer:
      'Published market ranges put a standard Hamilton bedroom at roughly $450 to $1,100 and a whole 1,500 sq ft home at about $4,500 to $11,500. Hamilton runs roughly 8 to 12 percent below the Ontario baseline and about 13 percent under Toronto labour rates.',
    intro:
      'Interior painting is priced on surface area, surface condition and how many coats the colour needs — not on the number of rooms alone. The figures below are published market ranges for the Hamilton area, gathered from named third-party sources, so you can sanity-check any quote you receive. They are not our rate card: for a real number on your home we come out, measure, and put a fixed price in writing at no charge.',
    tables: [interiorByRoom, interiorWholeHome],
    drivers: [
      { name: 'Ceiling height and stairwells', text: 'Two-storey foyers and stairwells need staging rather than a ladder, which adds hours before a brush touches the wall.' },
      { name: 'Colour change severity', text: 'Going dark-to-light or applying a saturated red, blue or black routinely needs three or four coats instead of two.' },
      { name: 'Wall condition', text: 'Nail pops, cracks and old wallpaper adhesive all add preparation time. Published add-ons run about $2 to $4 per sq ft for drywall repair.' },
      { name: 'Trim and ceilings included or not', text: 'Walls-only sits at the bottom of every range quoted here. Adding ceilings and trim typically moves a room toward the upper end.' },
      { name: 'Occupied versus empty', text: 'An empty house paints considerably faster, which is why booking between possession dates is the cheapest way to buy the work.' },
    ],
    faqs: [
      { q: 'How much does it cost to paint one room in Hamilton?', a: 'Published Hamilton-area ranges put a standard bedroom around $450 to $1,100 and a living room around $600 to $1,600, depending on whether ceilings and trim are included. A powder room sits lower, roughly $350 to $800, despite the heavy cutting-in.' },
      { q: 'Is painting cheaper in Hamilton than Toronto?', a: 'Yes, measurably. One published regional index puts Hamilton interior painting roughly 8 to 12 percent below the Ontario baseline and about 13 percent under Toronto labour rates, with Toronto running 20 to 30 percent above the same baseline.' },
      { q: 'Do painters charge by the hour or by the job?', a: 'Reputable residential painters quote a fixed price for the job. Ontario painter wages published by the federal Job Bank run roughly $20.00 to $34.80 an hour, but an hourly quote leaves you carrying the risk if the work runs long.' },
      { q: 'Does the price include the paint?', a: 'It should, and ours does. Ask any quote to state the product and the number of coats explicitly. Contractor-grade paint runs roughly $35 to $45 a gallon against $70 to $90 for premium, and that difference shows in coverage and durability.' },
      { q: 'Why are two quotes for the same job so far apart?', a: 'Usually scope rather than greed. Check whether each includes ceilings, trim, doors, wall repair, priming and two full coats. The cheaper quote very often excludes the preparation that determines how long the finish lasts.' },
    ],
    related: ['interior-painting', 'ceiling-painting', 'trim-and-baseboard-painting'],
  },
  {
    slug: 'exterior-painting-cost-hamilton',
    title: 'Exterior Painting Cost in Hamilton and the Golden Horseshoe',
    keyword: 'exterior painting cost Hamilton',
    icon: 'house',
    answer:
      'Published ranges put a bungalow exterior at roughly $4,000 to $7,500 and a two-storey detached home at about $8,500 to $15,000. Substrate matters: aluminium siding runs around $2.00 to $4.50 per square foot and stucco about $3.50 to $6.00.',
    intro:
      'Exterior pricing turns on substrate, height and how much of the existing coating has failed. A house needing only a wash and two coats sits at the bottom of these ranges; one needing scraping, rot repair and spot-priming across the whole envelope sits at the top. These are published third-party market figures for the region, given so you can judge a quote — not our price list.',
    tables: [exteriorWholeHome],
    drivers: [
      { name: 'How much scraping is needed', text: 'This is the single biggest variable. Failed paint has to come back to a sound, feathered edge, and on a pre-1960 home it must be handled as lead-presumptive.' },
      { name: 'Substrate type', text: 'Aluminium needs chalk removal and a bonding primer, vinyl restricts you to heat-reflective colours, and masonry needs a breathable system.' },
      { name: 'Height and access', text: 'Three storeys, steep grades and tight side yards all mean staging instead of ladders.' },
      { name: 'Rot and trim replacement', text: 'Soft wood must be replaced rather than filled. Painting over rot hides it for one season.' },
      { name: 'Season and weather window', text: 'Exteriors need surface and overnight temperatures above roughly 10°C, so the realistic local window is late April to late October.' },
    ],
    faqs: [
      { q: 'How much does it cost to paint the outside of a house in Ontario?', a: 'Published ranges put a bungalow at roughly $4,000 to $7,500, a semi at $5,500 to $9,500 and a two-storey detached home at $8,500 to $15,000. Condition of the existing coating moves a given house within that band more than size does.' },
      { q: 'Is it cheaper to paint aluminium siding than replace it?', a: 'Considerably. Published Ontario figures put aluminium siding painting at roughly $2.00 to $4.50 per square foot, which is a fraction of replacement. Provided the panels are sound, degreasing, chalk removal and a bonding primer give a genuinely long-lasting result.' },
      { q: 'How much does it cost to paint brick?', a: 'Sources conflict materially here, from about $2.50 to $5.50 per square foot at one end to $8 to $15 at the other, so treat any single figure with caution. Painting brick is also effectively permanent, which matters more than the price.' },
      { q: 'How often will an exterior need repainting?', a: 'Published guidance suggests exterior wood every three to seven years, stucco every five to ten, and properly painted brick every eight to fifteen. The Toronto area averages around 61.9 freeze-thaw cycles a year, which drives moisture into any hairline crack.' },
      { q: 'Does pressure washing add to the cost?', a: 'It is normally included in exterior preparation rather than billed separately. As a standalone service, published Ontario ranges run about $400 to $900 for a typical property.' },
    ],
    related: ['exterior-painting', 'siding-painting', 'pressure-washing'],
  },
  {
    slug: 'kitchen-cabinet-painting-cost',
    title: 'Kitchen Cabinet Painting Cost in Ontario: Real Numbers',
    keyword: 'kitchen cabinet painting cost',
    icon: 'cabinet',
    answer:
      'Published Ontario ranges put a small kitchen of 15 to 18 doors and drawers at roughly $3,000 to $4,500, and a large kitchen of 28 to 35 pieces at about $6,500 to $8,500. Full replacement of a standard kitchen runs $15,000 to $25,000.',
    intro:
      'Cabinet painting is priced per door and drawer front rather than by kitchen size, because each piece is removed, prepared, coated on both faces and rehung. That is also why it costs a fraction of replacement while changing the room just as much. The figures below are published Ontario market ranges with sources, shown alongside refacing and replacement so you can compare the three fairly.',
    tables: [cabinetPricing],
    drivers: [
      { name: 'Number of doors and drawer fronts', text: 'The piece count drives the labour far more than the floor area of the kitchen does.' },
      { name: 'Door material', text: 'Solid wood, melamine and thermofoil each need a different bonding primer, and getting it wrong causes adhesion failure regardless of topcoat.' },
      { name: 'Oak grain', text: 'Open oak grain telegraphs through paint unless it is grain-filled first, which adds a full stage to the process.' },
      { name: 'Two-tone finishes', text: 'A contrasting island or lower run adds published amounts of roughly $180 to $900.' },
      { name: 'Spray versus brush', text: 'A sprayed finish has no brush texture but requires far more masking, which is why it suits cabinetry and rarely suits a single furnished room.' },
    ],
    faqs: [
      { q: 'Is it cheaper to paint or replace kitchen cabinets?', a: 'Painting is dramatically cheaper. Published Ontario figures put cabinet painting at roughly $3,000 to $8,500 depending on size, against $15,000 to $25,000 for full replacement of a standard kitchen. Refacing sits between them at about $2,500 to $8,500.' },
      { q: 'Is cabinet painting or refacing better value?', a: 'Painting costs less and changes the colour completely but keeps the existing door profile. Refacing replaces the doors and drawer fronts, so it changes the style too. Published figures put refacing at a saving of roughly 30 to 50 percent against replacement.' },
      { q: 'Can you paint oak cabinets without the grain showing?', a: 'Yes, but it requires grain-filling before priming, which adds a stage and therefore cost. Without it the open oak grain reads clearly through the finish, which some owners like and others do not expect.' },
      { q: 'How long does cabinet painting take?', a: 'Typically four to seven days, and the kitchen stays usable for most of that. Doors and drawer fronts come off to be finished flat, while boxes and face frames are coated in place with the same system.' },
      { q: 'Do painted cabinets hold up to daily use?', a: 'When finished in a genuine catalysed or urethane-modified cabinet enamel, yes. That coating cures far harder than wall paint. The failures people hear about almost always trace back to skipped degreasing or ordinary latex used on a cabinet door.' },
    ],
    related: ['cabinet-painting', 'spray-painting', 'colour-consultation'],
  },
  {
    slug: 'deck-and-fence-staining-cost',
    title: 'Deck and Fence Staining Cost in Ontario',
    keyword: 'deck staining cost Ontario',
    icon: 'deck',
    answer:
      'Published Ontario ranges put deck staining at roughly $2.25 to $4.00 per square foot and deck painting at $3.00 to $5.00. A mid-sized 200 to 400 sq ft deck runs about $1,495 to $3,000. Stain typically holds two to three years in this climate.',
    intro:
      'Deck and fence work is priced by area for decks and by linear foot for fences, with the condition of the existing finish deciding where in the range a job lands. A deck needing only a wash and a fresh coat is straightforward; one with a failing film-forming coating that must be stripped first is a different job entirely. Figures below are published Ontario market ranges with sources.',
    tables: [deckFencePricing],
    drivers: [
      { name: 'Stripping an old coating', text: 'A previously painted or solid-stained deck that is peeling has to be stripped back, and published figures for strip-and-restain start around $5,000.' },
      { name: 'Wood condition and age', text: 'Split, cupped or rotten boards need replacing before finishing, and new pressure-treated lumber must weather for months before it will accept stain.' },
      { name: 'Railings and spindles', text: 'These are brushwork, not roller work. A deck with elaborate railings takes far longer than its floor area suggests.' },
      { name: 'Stain type', text: 'Penetrating semi-transparent stain wears away gradually; solid and film-forming coatings look opaque but peel when they fail.' },
      { name: 'Drying window', text: 'Wood must dry two or three clear days after washing. If water still beads on the boards, they cannot absorb stain.' },
    ],
    faqs: [
      { q: 'How much does it cost to stain a deck in Ontario?', a: 'Published ranges put staining at roughly $2.25 to $4.00 per square foot, so a small deck under 200 sq ft runs about $550 to $1,100 and a mid-sized 200 to 400 sq ft deck about $1,495 to $3,000. Pressure washing alone runs $250 to $600.' },
      { q: 'How often should a deck be restained in Ontario?', a: 'Published guidance puts stain life at two to three years in this climate. Horizontal surfaces take sun and standing water, so they wear faster than railings. Recoating on schedule is far cheaper than stripping a failed finish later.' },
      { q: 'Should a deck be stained or painted?', a: 'Stain, in almost every case. Penetrating stain soaks into the wood and wears away gradually, while paint forms a film on top that eventually peels in sheets and then requires full stripping. Paint costs more per square foot too.' },
      { q: 'How much does fence painting cost per linear foot?', a: 'Published Toronto-area figures put fence painting or staining at roughly $5 to $12 per linear foot. Note that widely-quoted lower per-foot numbers come from US sources and do not reflect Ontario labour rates.' },
      { q: 'Can a brand new deck be stained right away?', a: 'No. Pressure-treated lumber needs to weather for several months before it will accept stain, so a new deck is normally left a season before its first coat. Staining too early gives a patchy finish that fails quickly.' },
    ],
    related: ['deck-and-fence-staining', 'wood-staining', 'pressure-washing'],
  },
  {
    slug: 'drywall-repair-and-wallpaper-removal-cost',
    title: 'Drywall Repair and Wallpaper Removal Costs in Ontario',
    keyword: 'drywall repair cost Ontario',
    icon: 'drywall',
    answer:
      'Published Ontario ranges put drywall repair at about $2 to $4 per square foot, a small patch under four inches at $145 to $245, and wallpaper removal from $3 to $8 per square foot for strippable vinyl rising to $8 to $15 where it has been painted over.',
    intro:
      'This is the work that happens before painting, and it is where quotes most often diverge. Two estimates for the same room can differ by thousands purely because one includes proper repair and the other plans to paint over the problem. The published ranges below let you see what that preparation actually costs in the Ontario market.',
    tables: [prepRepairPricing],
    drivers: [
      { name: 'Number of layers of wallpaper', text: 'Single strippable vinyl is straightforward. Multiple layers, especially painted over, sit at the very top of the range.' },
      { name: 'Whether the drywall face tore', text: 'Paper hung on unprimed drywall tears the face off on removal, and that damage needs sealing and skim-coating.' },
      { name: 'Plaster versus drywall', text: 'Pre-1955 homes are lath-and-plaster, and published figures for plaster repair in older properties run well above standard drywall patching.' },
      { name: 'Ceiling versus wall', text: 'Ceiling repairs are published at roughly 25 to 40 percent more than the equivalent wall repair.' },
      { name: 'Asbestos testing on popcorn ceilings', text: 'Pre-1990 textured ceilings should be tested before removal, adding a published $400 to $800.' },
    ],
    faqs: [
      { q: 'How much does drywall repair cost in Ontario?', a: 'Published 2026 Ontario figures run roughly $2 to $4 per square foot, with a small patch under four inches at $145 to $245, medium at $245 to $385 and large at $345 to $585. Nail pops run $25 to $45 each, usually in a minimum batch.' },
      { q: 'How much does wallpaper removal cost?', a: 'Published ranges start around $3 to $8 per square foot for clean strippable vinyl and rise to $8 to $15 where paper has been painted over. Per room that is roughly $400 to $800 at the easy end and $1,500 to $2,800 at the difficult end.' },
      { q: 'Is repairing drywall included in a painting quote?', a: 'Ours lists it explicitly so you can see it. Be cautious of any quote that does not mention repair at all — filling and sanding takes real hours, and a price that omits it is not comparable to one that includes it.' },
      { q: 'How much does popcorn ceiling removal cost?', a: 'Published GTA figures run about $1.75 to $3.75 per square foot for basic removal, with other sources quoting $3 to $7 once prep and finishing are included. Testing a pre-1990 ceiling for asbestos first adds roughly $400 to $800.' },
      { q: 'Why does plaster repair cost more than drywall?', a: 'Plaster is a different material and a different skill. It cracks in ways drywall does not, repairs must be keyed into sound lath, and matching the existing surface texture takes time. Published figures for plaster work in pre-1960 homes reflect that.' },
    ],
    related: ['drywall-repair', 'wallpaper-removal', 'surface-preparation'],
  },
  {
    slug: 'doors-trim-and-epoxy-floor-cost',
    title: 'Doors, Trim, Ceilings and Epoxy Floor Costs in Ontario',
    keyword: 'cost to paint doors trim epoxy floor Ontario',
    icon: 'door',
    answer:
      'Published ranges put a front door repaint at roughly $300 to $600, a single garage door including frame at $695 to $985, trim at $1 to $3 per linear foot, and an epoxy coating for a standard 400 sq ft two-car garage at about $1,600 to $3,200.',
    intro:
      'These are the smaller, high-impact jobs — the ones that change how a house looks without a whole-property repaint. A front door and a garage door together cover most of what people see from the street. The figures below are published Ontario and GTA market ranges with sources, provided so you can weigh what is worth doing first.',
    tables: [detailPricing],
    drivers: [
      { name: 'Repaint versus full refinish', text: 'Repainting a sound door is inexpensive. Stripping a sun-damaged door back and refinishing it is published at several times that.' },
      { name: 'Linear feet of trim', text: 'Trim is priced by run, so a house with crown moulding throughout costs considerably more than one with baseboards only.' },
      { name: 'Ceiling area and height', text: 'Ceilings are published at 20 to 40 percent more per square foot than walls, because everything is overhead work.' },
      { name: 'Concrete condition for epoxy', text: 'The slab must be ground or etched and be dry. Surface preparation is published as adding $1 to $3 per square foot.' },
      { name: 'Coating system chosen', text: 'Published figures show solid epoxy at the low end, flake systems mid-range and metallic finishes highest.' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a front door?', a: 'Published GTA figures put a standard front door repaint at roughly $300 to $600. A full strip-and-refinish including the frame is a much bigger job, published at $1,795 to $3,895 and typically taking two to three days.' },
      { q: 'How much does it cost to paint a garage door?', a: 'Published GTA ranges put a single garage door including its frame at about $695 to $985 and a double at $795 to $1,150. Since the garage door is usually the largest single element on a façade, it changes the look of a house more than anything else at that price.' },
      { q: 'How much does an epoxy garage floor cost in Ontario?', a: 'Published Ontario figures run roughly $4 to $8 per square foot, so a standard 400 sq ft two-car garage lands around $1,600 to $3,200. Surface preparation adds $1 to $3 per square foot where the slab needs grinding.' },
      { q: 'How long before I can park on a new epoxy floor?', a: 'Published guidance is around 24 hours for foot traffic and closer to 72 before a vehicle returns. Driving on it early leaves permanent tyre marks, so the waiting period is not padding.' },
      { q: 'How much does trim and baseboard painting cost?', a: 'Published Ontario figures put trim at roughly $1 to $3 per linear foot, about $150 to $400 for one room, or $1,500 to $4,000 for a whole 1,500 to 2,000 sq ft home. Existing oil-based trim needs de-glossing first, which adds time.' },
    ],
    related: ['front-door-painting', 'garage-door-refinishing', 'epoxy-floor-coating'],
  },
];

export const costSlugs = costPages.map((p) => p.slug);
export const costBySlug = Object.fromEntries(costPages.map((p) => [p.slug, p])) as Record<
  string,
  CostPage
>;
