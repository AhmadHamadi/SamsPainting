// ---------------------------------------------------------------------------
// Published market price ranges — RESEARCHED, SOURCED, AND ATTRIBUTED.
//
// ⚠️ READ THIS BEFORE EDITING ⚠️
// These are NOT Sam's Painting's prices. Sam has not supplied a rate card, and
// inventing one would be dishonest to homeowners and a liability for the
// client. Every figure below is a THIRD-PARTY PUBLISHED RANGE for the Ontario /
// Hamilton market, each carrying the URL it came from, and every page that
// renders them says so plainly and points the reader to a free written quote.
//
// For the same reason NONE of this is emitted as schema.org Offer or
// PriceSpecification markup. Google's structured-data policy expects price
// markup to be the business's own actual prices; publishing market averages as
// if they were Sam's would risk a manual action.
//
// When Sam supplies a real rate card: replace these ranges, keep the sourcing
// discipline, and only then consider adding Offer markup.
// ---------------------------------------------------------------------------

export type PriceRow = {
  item: string;
  low: number;
  high: number;
  unit: string;
  note?: string;
};

export type Source = {
  label: string;
  url: string;
};

export type PriceTable = {
  caption: string;
  rows: PriceRow[];
  sources: Source[];
};

export const fmt = (n: number) =>
  `$${n.toLocaleString('en-CA', { maximumFractionDigits: n < 20 ? 2 : 0 })}`;

export const range = (r: PriceRow) =>
  `${fmt(r.low)}–${fmt(r.high)}${r.unit ? ` ${r.unit}` : ''}`;

// ── Sources, declared once and reused ──────────────────────────────────────
const S = {
  renonext: { label: 'RenoNext — Hamilton painting costs', url: 'https://renonext.com/costs/painting/hamilton' },
  bwd: { label: 'BWD Painting — house painting cost, Hamilton ON', url: 'https://bwdpainting.com/house-painting-cost-hamilton-ontario/' },
  mila: { label: 'Mila 4 Renovation — Ontario interior painting cost 2026', url: 'https://mila4renovation.ca/interior-painting-cost-ontario-2026/' },
  hpp: { label: 'Home Painters Pro — cost to paint a house, Toronto', url: 'https://www.homepainterspro.ca/blogs/cost-to-paint-a-house-toronto/' },
  hppTrim: { label: 'Home Painters Pro — trim & baseboard painting cost', url: 'https://www.homepainterspro.ca/blogs/trim-baseboard-door-painting-cost-toronto/' },
  hppPaper: { label: 'Home Painters Pro — wallpaper removal cost', url: 'https://www.homepainterspro.ca/blogs/wallpaper-removal-cost-toronto/' },
  hppRepaint: { label: 'Home Painters Pro — how often to repaint', url: 'https://www.homepainterspro.ca/blogs/how-often-to-repaint-house-toronto/' },
  urbantasker: { label: 'UrbanTasker — deck painting & staining cost, Ontario', url: 'https://urbantasker.com/blog/deck-painting-and-staining-cost-guide-in-ontario-canada-how-much-does-it-cost' },
  protasker: { label: 'ProTasker — drywall repair cost, Ontario 2026', url: 'https://www.protasker.ca/blog/drywall-repair-cost-ontario-2026' },
  gli: { label: 'GLI Epoxy Flooring — garage floor coating cost, Ontario', url: 'https://gliepoxyflooring.com/blog/garage-floor-coating-cost-ontario/' },
  ccs: { label: 'Canadian Concrete Surfaces — epoxy flooring cost, Ontario', url: 'https://canadianconcretesurfaces.ca/epoxy-flooring-cost-in-ontario/' },
  cabinets: { label: 'Cabinets Painting — kitchen cabinet painting cost, Toronto', url: 'https://cabinetspainting.ca/kitchen-cabinet-painting-cost-toronto/' },
  renoquotes: { label: 'RenoQuotes — kitchen cabinet refacing cost in Canada 2026', url: 'https://renoquotes.com/en/blog/kitchen-cabinet-refacing-cost-in-canada-in-2026-complete-price-guide' },
  ddh: { label: 'DD Home Services — pressure washing cost, Ontario', url: 'https://ddhomeservices.ca/blog/pressure-washing-cost-ontario' },
  gmco: { label: 'GMCO — popcorn ceiling removal costs, GTA 2025', url: 'https://gmco.ca/2025-popcorn-ceiling-removal-costs-gta/' },
  moderntouch: { label: 'Modern Touch GTA — ceiling painting prices', url: 'https://moderntouchgta.ca/budget-friendly-ceiling-painting-toronto-prices/' },
  enviro: { label: 'Enviro Painting — siding painting costs in Ontario', url: 'https://enviro-painting.com/siding-painting-costs-in-ontario-explained/' },
  hpDoors: { label: 'Home Painters Toronto — cost to paint exterior doors', url: 'https://www.homepainterstoronto.com/2021/04/13/cost-to-paint-exterior-doors/' },
  jobbank: { label: 'Government of Canada Job Bank — painter wages, Ontario', url: 'https://www.jobbank.gc.ca/marketreport/wages-occupation/6521/ON' },
  homelight: { label: 'HomeLight — Top Agent Insights, pre-listing ROI', url: 'https://www.homepainterspro.ca/blogs/paint-my-condo-before-listing-toronto/' },
} satisfies Record<string, Source>;

export const sources = S;

// ── Tables, one per cost page ──────────────────────────────────────────────

export const interiorByRoom: PriceTable = {
  caption: 'Published Hamilton-area interior painting ranges, by room',
  rows: [
    { item: 'Powder room', low: 350, high: 800, unit: '', note: 'Small area, but heavy cutting-in' },
    { item: 'Standard bedroom', low: 450, high: 1100, unit: '', note: 'Hamilton runs roughly 8–12% under the Ontario baseline' },
    { item: 'Primary bedroom', low: 550, high: 1400, unit: '' },
    { item: 'Bathroom', low: 400, high: 950, unit: '', note: 'Moisture-resistant finish' },
    { item: 'Kitchen (walls only)', low: 400, high: 1000, unit: '' },
    { item: 'Living room', low: 600, high: 1600, unit: '' },
    { item: 'Dining room', low: 500, high: 1400, unit: '' },
    { item: 'Hallway & stairwell', low: 600, high: 1800, unit: '', note: 'Height and access drive the cost' },
    { item: 'Open concept, 400–600 sq ft', low: 1200, high: 3200, unit: '' },
  ],
  sources: [S.mila, S.renonext, S.bwd],
};

export const interiorWholeHome: PriceTable = {
  caption: 'Whole-home interior painting, by floor area',
  rows: [
    { item: '1,200 sq ft', low: 3500, high: 9500, unit: '' },
    { item: '1,500 sq ft', low: 4500, high: 11500, unit: '' },
    { item: '2,000 sq ft', low: 5500, high: 14500, unit: '' },
    { item: '2,500 sq ft', low: 6500, high: 17500, unit: '' },
    { item: '3,000+ sq ft', low: 8000, high: 22000, unit: '' },
  ],
  sources: [S.mila, S.bwd],
};

export const exteriorWholeHome: PriceTable = {
  caption: 'Exterior painting ranges by house type',
  rows: [
    { item: 'Bungalow', low: 4000, high: 7500, unit: '' },
    { item: 'Semi-detached', low: 5500, high: 9500, unit: '' },
    { item: 'Two-storey detached', low: 8500, high: 15000, unit: '' },
    { item: 'Large two-storey', low: 13000, high: 19000, unit: '' },
    { item: 'Aluminium siding', low: 2, high: 4.5, unit: 'per sq ft' },
    { item: 'Stucco', low: 3.5, high: 6, unit: 'per sq ft' },
    { item: 'Brick', low: 2.5, high: 5.5, unit: 'per sq ft', note: 'Sources conflict materially — some quote $8–$15/sq ft' },
  ],
  sources: [S.hpp, S.enviro, S.bwd],
};

export const cabinetPricing: PriceTable = {
  caption: 'Kitchen cabinet painting, by kitchen size',
  rows: [
    { item: 'Small kitchen, 15–18 doors & drawers', low: 3000, high: 4500, unit: '' },
    { item: 'Medium kitchen, 20–25 pieces', low: 4500, high: 6500, unit: '' },
    { item: 'Large kitchen, 28–35 pieces', low: 6500, high: 8500, unit: '' },
    { item: 'Two-tone finish (add-on)', low: 180, high: 900, unit: '' },
    { item: 'Cabinet refacing (for comparison)', low: 2500, high: 8500, unit: '' },
    { item: 'Full replacement (for comparison)', low: 15000, high: 25000, unit: '' },
  ],
  sources: [S.cabinets, S.renoquotes, S.bwd],
};

export const deckFencePricing: PriceTable = {
  caption: 'Deck, fence and wood staining ranges',
  rows: [
    { item: 'Deck staining', low: 2.25, high: 4, unit: 'per sq ft' },
    { item: 'Deck painting', low: 3, high: 5, unit: 'per sq ft' },
    { item: 'Small deck under 200 sq ft (stain)', low: 550, high: 1100, unit: '' },
    { item: 'Mid-sized deck, 200–400 sq ft', low: 1495, high: 3000, unit: '' },
    { item: 'Strip and full restain', low: 5000, high: 9000, unit: '', note: 'When an old film-forming coating must come off first' },
    { item: 'Fence painting or staining', low: 5, high: 12, unit: 'per linear ft' },
    { item: 'Pressure wash only', low: 250, high: 600, unit: '' },
  ],
  sources: [S.urbantasker, S.hpp],
};

export const prepRepairPricing: PriceTable = {
  caption: 'Preparation and repair work',
  rows: [
    { item: 'Drywall repair', low: 2, high: 4, unit: 'per sq ft' },
    { item: 'Nail pops & pinholes', low: 25, high: 45, unit: 'each', note: 'Usually a minimum batch of 10' },
    { item: 'Small patch, under 4"', low: 145, high: 245, unit: '' },
    { item: 'Medium patch, 4–12"', low: 245, high: 385, unit: '' },
    { item: 'Large patch, 12–24"', low: 345, high: 585, unit: '' },
    { item: 'Wallpaper removal, strippable vinyl', low: 3, high: 8, unit: 'per sq ft' },
    { item: 'Wallpaper removal, painted over', low: 8, high: 15, unit: 'per sq ft', note: 'Multi-layer painted-over paper is the worst case' },
    { item: 'Popcorn ceiling removal', low: 2, high: 5, unit: 'per sq ft', note: 'Asbestos testing on pre-1990 ceilings adds $400–$800' },
  ],
  sources: [S.protasker, S.hppPaper, S.gmco, S.mila],
};

export const detailPricing: PriceTable = {
  caption: 'Doors, trim, ceilings and specialty coatings',
  rows: [
    { item: 'Front door repaint', low: 300, high: 600, unit: '' },
    { item: 'Front door refinishing incl. frame', low: 1795, high: 3895, unit: '', note: 'Full strip-and-refinish, 2–3 days' },
    { item: 'Single garage door incl. frame', low: 695, high: 985, unit: '' },
    { item: 'Double garage door incl. frame', low: 795, high: 1150, unit: '' },
    { item: 'Trim & baseboards', low: 1, high: 3, unit: 'per linear ft' },
    { item: 'Trim, one room', low: 150, high: 400, unit: '' },
    { item: 'Whole-house trim, 1,500–2,000 sq ft', low: 1500, high: 4000, unit: '' },
    { item: 'Ceiling painting', low: 2.5, high: 6.5, unit: 'per sq ft', note: 'Ceilings run 20–40% more per sq ft than walls' },
    { item: 'Epoxy garage floor', low: 4, high: 8, unit: 'per sq ft' },
    { item: 'Epoxy, standard 400 sq ft two-car garage', low: 1600, high: 3200, unit: '' },
    { item: 'Pressure washing, typical property', low: 400, high: 900, unit: '' },
  ],
  sources: [S.hpDoors, S.hppTrim, S.moderntouch, S.gli, S.ccs, S.ddh],
};

// ── Atomic, citable facts (used in FAQs, llms.txt and AEO answers) ─────────
export const marketFacts = [
  {
    fact: 'Hamilton interior painting runs roughly 8–12% below the Ontario baseline and about 13% below Toronto labour rates.',
    source: S.renonext,
  },
  {
    fact: 'Ontario painters earn roughly $20.00–$34.80 per hour, averaging about $27.85.',
    source: S.jobbank,
  },
  {
    fact: 'Interior walls are typically repainted every 5–7 years; high-traffic hallways, stairwells and kitchens every 3–5 years; ceilings every 8–10 years.',
    source: S.hppRepaint,
  },
  {
    fact: 'Exterior wood needs recoating every 3–7 years, stucco every 5–10 years, and properly painted brick every 8–15 years.',
    source: S.hppRepaint,
  },
  {
    fact: 'Deck stain typically holds 2–3 years in Ontario’s climate before it needs refreshing.',
    source: S.urbantasker,
  },
  {
    fact: 'The Toronto area averages about 61.9 freeze-thaw cycles a year, each one driving moisture into hairline cracks in exterior coatings.',
    source: S.hppRepaint,
  },
  {
    fact: 'HomeLight’s 2024 Top Agent Insights report ranks interior painting the number one pre-listing improvement by return, recovering 55%–107% of its cost at sale.',
    source: S.homelight,
  },
] satisfies { fact: string; source: Source }[];
