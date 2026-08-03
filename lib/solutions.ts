// ---------------------------------------------------------------------------
// Problem / solution pages.
//
// Competitor research found NOBODY in the Hamilton market organises content by
// the homeowner's PROBLEM — every competitor organises by service. These pages
// target "why is my paint doing X" and "how do I fix Y" intent, which is
// question-shaped, voice-friendly, and essentially uncontested locally.
//
// Each page owns one distinct problem query. None overlaps a service page,
// which sells the solution rather than diagnosing the cause.
// ---------------------------------------------------------------------------

import type { IconName } from '@/components/Icon';
import type { FaqItem } from './types';

export type Solution = {
  slug: string;
  title: string; // H1
  keyword: string; // the one query this page owns
  problem: string; // the symptom, in the homeowner's words
  icon: IconName;
  /** Direct answer, front-loaded for AEO. ~40–55 words. */
  answer: string;
  causes: { name: string; text: string }[];
  /** Rendered as HowTo schema. */
  steps: { name: string; text: string }[];
  faqs: FaqItem[];
  related: string[]; // service slugs
};

export const solutions: Solution[] = [
  {
    slug: 'peeling-exterior-paint',
    title: 'Why Exterior Paint Peels, and How to Fix It Properly',
    keyword: 'peeling exterior paint',
    problem: 'Sheets or flakes of paint lifting off siding, trim or soffit.',
    icon: 'house',
    answer:
      'Exterior paint peels because moisture got behind the film or because it was applied over a surface it could not bond to. Patching the visible area only moves the problem along the wall. The permanent fix is finding the moisture path, scraping back to a sound edge, priming the bare substrate, then recoating.',
    causes: [
      { name: 'Moisture from behind', text: 'Failed caulking, a leaking gutter or unvented interior humidity pushes water outward through the wall, and the paint film is what gives way first.' },
      { name: 'Painting over a dirty or chalky surface', text: 'Older coatings oxidise into a chalky powder. Paint applied straight over it bonds to the powder rather than the substrate, and takes the powder with it when it fails.' },
      { name: 'Skipped primer on bare wood', text: 'Bare wood needs a primer to seal it. A finish coat alone soaks in unevenly and loses grip through the first freeze-thaw season.' },
      { name: 'Painting outside the temperature window', text: 'A warm afternoon followed by a near-freezing night stops the film coalescing. It looks fine for a season, then lets go in sheets.' },
    ],
    steps: [
      { name: 'Find the water', text: 'Check gutters, downspouts, flashing, failed caulk joints and any interior humidity source before touching the paint. Coating over an active moisture path guarantees a repeat.' },
      { name: 'Scrape back to a sound edge', text: 'Remove everything loose and feather the remaining edge so the repair does not telegraph through the new finish. On pre-1960 homes, treat the coating as lead-presumptive and work wet with dust control.' },
      { name: 'Repair the substrate', text: 'Replace rotten trim sections rather than filling them. Use an exterior-grade epoxy wood filler on smaller defects so the repair moves with the wood through freeze-thaw.' },
      { name: 'Prime every bare area', text: 'Spot-prime bare wood and any chalky sections with a bonding primer suited to the substrate, not a paint-and-primer-in-one.' },
      { name: 'Recoat within the window', text: 'Apply two finish coats of 100% acrylic with surface and overnight temperatures above roughly 10°C, following the sun round the house so nothing is coated while it is baking.' },
    ],
    faqs: [
      { q: 'Can I just paint over peeling exterior paint?', a: 'No. New paint bonds only as well as the layer beneath it, so coating over a failing film simply buys a season before the whole assembly lifts together. The loose material has to come off and the bare substrate has to be primed.' },
      { q: 'Why does paint keep peeling in the same spot on my house?', a: 'A recurring peel in one location is almost always a moisture path rather than a paint fault. Look directly above it for a gutter overflow, failed flashing or a caulk joint that has split, and fix that before recoating.' },
      { q: 'How much of the old paint has to come off?', a: 'Everything that is loose, plus enough beyond it to feather a smooth edge. Paint that is still firmly bonded can stay — full removal is only necessary when the coating is failing broadly or has built up too thick to feather.' },
      { q: 'Is peeling paint on an older Hamilton home dangerous?', a: 'It can be. Homes built before 1960 probably contain lead-based paint, and scraping or sanding it releases lead dust. Those surfaces should be tested rather than assumed, then handled wet with proper dust control.' },
    ],
    related: ['exterior-painting', 'surface-preparation', 'siding-painting'],
  },
  {
    slug: 'water-stains-on-ceiling',
    title: 'How to Cover a Water Stain on a Ceiling So It Stays Covered',
    keyword: 'water stain on ceiling',
    problem: 'A brown or yellow ring on the ceiling that keeps coming back through fresh paint.',
    icon: 'ceiling',
    answer:
      'A water stain bleeds back because the discolouration is a soluble tannin that ordinary latex paint cannot block. Two more coats will not fix it. It needs a dedicated stain-blocking primer, usually shellac-based, applied over a fully dry surface once the leak itself has been stopped.',
    causes: [
      { name: 'An active or historic roof leak', text: 'The most common source. If the stain is still damp or growing, the roof is still letting water in and painting is premature.' },
      { name: 'A plumbing leak from above', text: 'A supply line, waste pipe or a failed shower pan on the floor above will produce a stain that reappears within days of being painted.' },
      { name: 'Condensation in an unvented space', text: 'Warm moist air meeting a cold surface in an attic or bathroom ceiling produces staining that looks like a leak but has no single source.' },
      { name: 'The wrong primer', text: 'Water-based primers dilute and re-dissolve tannin staining rather than sealing it, so the stain migrates straight back through the finish coat.' },
    ],
    steps: [
      { name: 'Stop the water first', text: 'Find and repair the source. Painting over an active leak wastes the work and hides a problem that is still damaging the ceiling structure.' },
      { name: 'Let it dry completely', text: 'Allow the area to dry right through, not just at the surface. Sealing damp plaster or drywall traps the moisture and causes the primer itself to blister.' },
      { name: 'Scrape and make good', text: 'Remove any flaking, and where the drywall paper has swollen or delaminated, cut it back and skim-coat flat before priming.' },
      { name: 'Seal with a stain-blocking primer', text: 'Apply a shellac-based or dedicated stain-blocking primer over the whole stain and slightly beyond it. This is the step that actually does the work.' },
      { name: 'Repaint the full ceiling', text: 'Coat corner to corner in a dead-flat ceiling white, rolled in one continuous wet edge. Spot-painting a ceiling almost always shows as a sheen difference under daylight.' },
    ],
    faqs: [
      { q: 'Why does my ceiling stain keep coming back after painting?', a: 'Because latex paint cannot seal tannin. The discolouration dissolves into each new coat and migrates to the surface. Only a dedicated stain-blocking primer, typically shellac-based, will lock it down permanently.' },
      { q: 'Can I paint over a water stain if the leak is fixed?', a: 'Yes, once the area is completely dry through its full thickness. Surface-dry is not enough — sealing trapped moisture causes the new primer and paint to blister within weeks.' },
      { q: 'Do I have to repaint the whole ceiling?', a: 'Usually yes. Ceilings show every sheen and colour variation because light rakes across them, so a primed patch tends to read as a visible square. Coating corner to corner is the reliable result.' },
      { q: 'How do I know if a ceiling stain is still active?', a: 'Press it gently with a fingertip and check whether it feels cool or damp, and mark the outline in pencil. If the stain grows past the pencil line over a week or two, water is still getting in.' },
    ],
    related: ['ceiling-painting', 'drywall-repair', 'priming'],
  },
  {
    slug: 'lead-paint-in-older-homes',
    title: 'Lead Paint in Pre-1960 Hamilton Homes: What Owners Should Know',
    keyword: 'lead paint older homes Ontario',
    problem: 'An older home due for repainting, with uncertainty about what is under the existing coats.',
    icon: 'shield',
    answer:
      'Health Canada advises that homes built before 1960 probably contain lead-based paint, with pre-1960 coatings running 30 to 50 percent pure lead. Canada did not cap paint at 0.5 percent lead until 1976. Intact paint is not the hazard — disturbing it by dry sanding or scraping is.',
    causes: [
      { name: 'Hamilton’s lower city is almost entirely pre-1960', text: 'Durand, Kirkendall, Corktown, Strathcona, Crown Point and the North End are overwhelmingly pre-war, so lead should be presumed rather than ruled out.' },
      { name: 'Exteriors stayed leaded longer', text: 'Homes built between 1960 and 1990 can still carry lead in their exterior coatings, so a mid-century build date does not automatically clear a house.' },
      { name: 'Dry sanding is the real risk', text: 'Lead in an intact film is largely inert. Power-sanding, dry-scraping or heat-stripping it turns it into airborne dust, which is how it gets into a household.' },
      { name: 'Renovation dust travels', text: 'Fine dust moves through a house on air currents and settles in carpets and soft furnishings well away from the work area.' },
    ],
    steps: [
      { name: 'Establish the build date', text: 'Anything pre-1960 is presumed leaded until tested. For 1960 to 1990 properties, treat exterior coatings with the same caution.' },
      { name: 'Test rather than assume', text: 'A paint chip sent for laboratory analysis gives a definitive answer. Under the EACO guideline, coatings at or below 0.1 percent lead disturbed non-aggressively with adequate dust control do not require respiratory protection.' },
      { name: 'Contain the work area', text: 'Seal doorways, cover and remove furnishings, shut down forced-air systems, and sheet the floor well beyond the immediate work zone.' },
      { name: 'Work wet, never dry', text: 'Wet-scrape and wet-sand, or use HEPA-filtered vacuum extraction on the sander. This is the single most important control.' },
      { name: 'Clean up properly', text: 'HEPA-vacuum and wet-wipe all surfaces, then dispose of sheeting and debris as contaminated waste rather than in household refuse.' },
    ],
    faqs: [
      { q: 'How do I know if my Hamilton home has lead paint?', a: 'Build date is the first indicator: Health Canada advises pre-1960 homes probably contain it. The only definitive answer is a laboratory test on a paint chip, which is inexpensive and worth doing before any significant scraping or sanding.' },
      { q: 'Is it safe to live in a house with lead paint?', a: 'Generally yes, provided the paint is intact and undisturbed. Lead in a sound film is largely inert. The risk arises when it is chipping, chalking or being sanded, which releases lead into household dust.' },
      { q: 'Can lead paint just be painted over?', a: 'Encapsulating sound lead paint under a new coating is a recognised approach and avoids generating dust. It only works where the existing film is genuinely stable — anything loose still has to come off first, using wet methods.' },
      { q: 'Does Sam’s Painting handle lead-safe preparation?', a: 'Yes. On pre-1960 properties we treat the existing coating as lead-presumptive, test rather than guess, and follow the recognised Ontario guidance — wet methods, HEPA extraction and proper containment instead of dry sanding.' },
    ],
    related: ['surface-preparation', 'sanding', 'exterior-painting'],
  },
  {
    slug: 'paint-bubbling-and-blistering',
    title: 'Paint Bubbling or Blistering: What Causes It and How to Stop It',
    keyword: 'paint bubbling blistering',
    problem: 'Small raised bubbles or larger blisters appearing in a finish that was fine when it went on.',
    icon: 'roller',
    answer:
      'Blisters form when something lifts the paint film away from the surface underneath — usually moisture, heat, or a coat applied over a damp or contaminated substrate. The fix depends on how deep it goes: if bare substrate shows inside a burst blister, moisture is the cause.',
    causes: [
      { name: 'Painting over a damp surface', text: 'Moisture trapped under a fresh film expands and pushes the paint off as it tries to escape, often within days of application.' },
      { name: 'Heat and direct sun', text: 'Coating a surface that is baking in direct sun skins the film before the solvent underneath has left, and the trapped vapour forms bubbles.' },
      { name: 'High interior humidity', text: 'Bathrooms and kitchens without adequate ventilation push moisture through walls from the inside, blistering the exterior or interior finish.' },
      { name: 'A contaminated surface', text: 'Grease, soap residue or dust prevents the film bonding at all in that spot, and the unbonded area lifts into a blister.' },
    ],
    steps: [
      { name: 'Burst one and look inside', text: 'If you can see bare substrate, moisture is the cause. If there is another coat of paint underneath, the problem is adhesion between coats.' },
      { name: 'Deal with the moisture source', text: 'Improve ventilation, fix the leak, or let the substrate dry out fully. Recoating before this is done simply repeats the failure.' },
      { name: 'Scrape and sand back', text: 'Remove all blistered material and feather the edges so the repair is invisible under the finish coat.' },
      { name: 'Clean and prime', text: 'Degrease the area, let it dry, and apply the primer suited to that substrate before any finish coat goes near it.' },
      { name: 'Recoat in the right conditions', text: 'Avoid painting in direct sun or on a surface warm to the touch, and keep within the temperature and humidity range on the product data sheet.' },
    ],
    faqs: [
      { q: 'Why did my paint bubble immediately after painting?', a: 'Almost always a damp or contaminated surface, or painting in direct sun. The film skins over before what is underneath can escape, and the trapped moisture or solvent lifts it into bubbles within hours.' },
      { q: 'Will paint blisters go away on their own as they dry?', a: 'No. Small blisters occasionally settle back slightly, but the bond in that area is already broken. They need scraping back, priming and recoating to give a finish that will hold.' },
      { q: 'What causes bubbling on a bathroom ceiling specifically?', a: 'Shower humidity with nowhere to go. Without an adequately sized and properly vented extractor fan, moisture condenses on the cold ceiling and works behind the paint film. Improving ventilation matters more than the paint you choose.' },
      { q: 'Can humidity ruin a fresh coat of paint indoors?', a: 'It can. High humidity dramatically extends drying and recoat times and can leave a soft, easily marked film. Keeping indoor humidity around 40 to 50 percent while painting gives a far more reliable cure.' },
    ],
    related: ['surface-preparation', 'priming', 'interior-painting'],
  },
  {
    slug: 'painting-over-wallpaper',
    title: 'Painting Over Wallpaper: When It Works and When It Backfires',
    keyword: 'painting over wallpaper',
    problem: 'Rooms full of dated wallpaper, and a decision about whether to strip it or just paint it.',
    icon: 'wallpaper',
    answer:
      'Painting over wallpaper works only when the paper is fully bonded, unembossed and in sound condition. Paint reintroduces moisture that loosens old adhesive, so on anything lifting, seamed or textured the result is bubbling and telegraphed joints. Removal and sealing is usually the cheaper outcome.',
    causes: [
      { name: 'Water in the paint reactivates the adhesive', text: 'Wallpaper paste is water-soluble. A wet coat of paint softens it and the paper lifts, taking the new finish with it.' },
      { name: 'Seams and texture telegraph', text: 'Every joint and embossed pattern stays visible under paint, and often becomes more obvious once a uniform colour removes the pattern that disguised it.' },
      { name: 'Multiple layers', text: 'Where paper has been hung over paper, the assembly is already marginal and adding a wet coat frequently brings the whole lot away.' },
      { name: 'Paper hung on unprimed drywall', text: 'This is the difficult case. Removing it tears the drywall paper face off, which then needs sealing and skim-coating before painting.' },
    ],
    steps: [
      { name: 'Test a small area first', text: 'Lift a corner in an inconspicuous spot to see how many layers there are and how well the paper is stuck. That decides the whole approach.' },
      { name: 'Steam or score and soak', text: 'Where removal is right, steam the paper or score and soak it rather than dry-ripping, which is what damages the wall underneath.' },
      { name: 'Wash off all adhesive residue', text: 'Paint will not bond over glue. Every trace has to be washed off, and this is the step most often skipped.' },
      { name: 'Repair torn drywall face', text: 'Seal any torn paper face, then skim-coat and sand flat so no patching shows through the finish.' },
      { name: 'Seal before colour', text: 'Apply an oil or shellac-based sealing primer to lock down any residual adhesive that washing could not lift, then paint normally.' },
    ],
    faqs: [
      { q: 'When is it acceptable to paint over wallpaper?', a: 'When the paper is a single layer, completely bonded with no lifting seams, smooth rather than embossed, and in good condition. Sealing it with an oil-based primer first stops the paint reactivating the adhesive underneath.' },
      { q: 'What happens if you paint over wallpaper that is peeling?', a: 'The moisture in the paint softens the adhesive further and the paper lifts, usually within days. You end up removing the paper anyway, only now with a coat of paint bonded to it making removal considerably harder.' },
      { q: 'Is it cheaper to remove wallpaper or paint over it?', a: 'Painting over looks cheaper on the quote and frequently is not, because the failure rate is high and the remedial work costs more than doing it properly first time. Removal is the predictable option.' },
      { q: 'Why does wallpaper removal sometimes damage the wall?', a: 'Because the paper was hung directly onto unprimed drywall. Without a primer between them, the adhesive bonds to the drywall’s paper face, and stripping the wallpaper pulls that face away with it.' },
    ],
    related: ['wallpaper-removal', 'drywall-repair', 'priming'],
  },
  {
    slug: 'cabinet-paint-chipping',
    title: 'Why Painted Kitchen Cabinets Chip, and How to Get a Finish That Lasts',
    keyword: 'painted cabinets chipping',
    problem: 'Cabinet doors chipping at the edges or marking under a fingernail months after being painted.',
    icon: 'cabinet',
    answer:
      'Cabinets chip when the coating never achieved a mechanical bond or never fully cured. Kitchen grease defeats adhesion, and wall paint on a cabinet door will not harden enough to survive daily use. A durable result needs degreasing, scuff-sanding, a bonding primer and a genuine cabinet enamel.',
    causes: [
      { name: 'Grease left on the surface', text: 'Kitchen cabinets carry a film of cooking grease that ordinary cleaning does not remove. Paint applied over it bonds to grease, not to the door.' },
      { name: 'No scuff-sanding', text: 'A factory finish is slick by design. Without abrading it, the primer has nothing mechanical to key into.' },
      { name: 'Wall paint used on cabinetry', text: 'Standard interior latex never cures hard enough for a surface that gets opened, closed and knocked all day. It stays soft and marks permanently.' },
      { name: 'Put back into service too early', text: 'Cabinet coatings keep hardening for two to three weeks. Doors closed and loaded within days of painting will block, stick and mark at the contact points.' },
    ],
    steps: [
      { name: 'Degrease twice', text: 'Clean every face with a degreaser, then again. This is not optional and it is the step that decides whether the finish holds.' },
      { name: 'Identify the door material', text: 'Solid wood, melamine and thermofoil each need a different primer. Getting this wrong guarantees adhesion failure regardless of what goes on top.' },
      { name: 'Scuff-sand every surface', text: 'Abrade all faces so the primer has a key. Doors and drawer fronts come off, get numbered, and are finished flat rather than hanging.' },
      { name: 'Use a bonding primer and a real cabinet enamel', text: 'A catalysed or urethane-modified enamel cures genuinely hard. This is the difference between a kitchen that lasts and one that chips within a year.' },
      { name: 'Respect the cure time', text: 'Handle doors gently and leave them slightly ajar for the first few days. Full hardness arrives two to three weeks after the last coat.' },
    ],
    faqs: [
      { q: 'How long do painted kitchen cabinets last?', a: 'Properly prepared and finished in a genuine cabinet enamel, a repaint should hold up for many years of normal kitchen use. Poorly prepared work — skipped degreasing, no scuff-sand, wall paint instead of enamel — often starts chipping within a year.' },
      { q: 'Can you paint laminate or thermofoil cabinet doors?', a: 'Yes, but only with the right primer. Those surfaces are non-porous, so they need a bonding primer specifically rated for them. Standard primer will lift off in sheets no matter how carefully the topcoat is applied.' },
      { q: 'How soon can I use my kitchen after cabinet painting?', a: 'The kitchen stays usable through most of the job. The coating continues hardening for two to three weeks afterwards, so doors should be handled gently and left slightly ajar for the first few days to avoid sticking.' },
      { q: 'Is painting cabinets cheaper than replacing them?', a: 'Substantially, and it is why the service exists. Published Ontario figures put cabinet painting at a fraction of full replacement for a comparable kitchen. Our costs pages set out the market ranges with their sources.' },
    ],
    related: ['cabinet-painting', 'spray-painting', 'surface-preparation'],
  },
];

export const solutionSlugs = solutions.map((s) => s.slug);
export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s])) as Record<
  string,
  Solution
>;
