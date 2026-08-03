// ---------------------------------------------------------------------------
// Service catalogue — the spine of the site.
//
// ONE primary keyword per service, deliberately non-overlapping, so no two
// pages compete for the same query. Where two offerings would target the same
// intent (e.g. "wall painting" vs "interior painting") the narrower one is
// re-scoped to a genuinely distinct query ("accent wall painting") or nested as
// a sub-service instead of getting its own competing page.
//
// Every field here feeds page copy, schema and the city x service generator, so
// the richer and more service-specific these fields are, the less the generated
// pages resemble one another.
// ---------------------------------------------------------------------------

import type { IconName } from '@/components/Icon';
import type { PhotoKey } from './photos';

export type ServiceCategory = 'interior' | 'exterior' | 'specialty' | 'prep' | 'colour';

export type Service = {
  slug: string;
  name: string; // H1 subject / card title
  navName: string; // short label for menus
  keyword: string; // THE primary query this page owns
  excerpt: string; // one-line benefit, used on cards + meta
  icon: IconName;
  photo: PhotoKey;
  category: ServiceCategory;
  /** Included in the city x service matrix (only services with real local demand). */
  matrix: boolean;
  /** Nested under this parent slug, e.g. /services/exterior-painting/siding-painting/ */
  parent?: string;
  timeline: string; // realistic duration, service-specific
  /** What the job actually involves — drives the "what's included" list. */
  includes: string[];
  /** Preparation steps unique to this surface. Never repeated across services. */
  prep: string[];
  /** Product/material notes specific to this service. */
  materials: string;
  /** A concrete, quotable fact used to seed unique FAQ answers. */
  detail: string;
};

export const services: Service[] = [
  // ── Interior ────────────────────────────────────────────────────────────
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    navName: 'Interior Painting',
    keyword: 'interior painting',
    excerpt: 'Clean, straight-lined walls and ceilings with your rooms put back the same day.',
    icon: 'roller',
    photo: 'interior',
    category: 'interior',
    matrix: true,
    timeline: '1–2 days for a single room, 4–7 days for a full main floor',
    includes: [
      'Furniture moved to the centre and covered, floors fully drop-sheeted',
      'Nail holes, dents and hairline cracks filled and sanded flush',
      'Edges cut in by hand rather than taped where a steadier line results',
      'Two finish coats as standard, with a bonding primer over problem areas',
      'Switch plates and hardware removed, then refitted at the end',
    ],
    prep: [
      'Wash grease and hand-marks off walls so the paint bonds instead of sitting on residue',
      'Spot-prime patched areas so they do not flash through the finish coat',
      'Sand previous brush ridges and roller stipple back to a flat surface',
    ],
    materials:
      'Scrubbable acrylic latex in matte or eggshell for living areas, and a moisture-tolerant finish in bathrooms and kitchens.',
    detail:
      'A standard 12 x 12 bedroom takes roughly a day including prep, and the room is usable the same evening.',
  },
  {
    slug: 'ceiling-painting',
    name: 'Ceiling Painting',
    navName: 'Ceilings',
    keyword: 'ceiling painting',
    excerpt: 'Flat, shadow-free ceilings with no roller lines and no spatter on your walls.',
    icon: 'ceiling',
    photo: 'ceiling',
    category: 'interior',
    matrix: true,
    timeline: 'Half a day per room, a full day if stains need sealing first',
    includes: [
      'Water stains sealed with a dedicated stain-blocking primer before painting',
      'Ceilings rolled in a single wet pass so no lap marks show under daylight',
      'Flat ceiling white used specifically to hide surface unevenness',
      'Full floor and wall masking to keep spatter off finished surfaces',
    ],
    prep: [
      'Identify and stop the source of any water staining before coating over it',
      'Scrape flaking areas and feather the edges so repairs disappear under paint',
      'Cut in tight to the wall line so no ceiling paint bleeds down the wall',
    ],
    materials:
      'Dead-flat ceiling paint, which diffuses light and hides the minor undulation every ceiling has.',
    detail:
      'Ceilings show every flaw because light rakes across them, so they are rolled in one continuous wet edge rather than in sections.',
  },
  {
    slug: 'accent-wall-painting',
    name: 'Accent Wall Painting',
    navName: 'Accent Walls',
    keyword: 'accent wall painting',
    excerpt: 'One wall, one strong colour, and a crisp edge where it meets everything else.',
    icon: 'wall',
    photo: 'colour',
    category: 'interior',
    matrix: false,
    timeline: 'Half a day, occasionally a full day for deep or saturated colours',
    includes: [
      'Colour laid out against your existing furnishings and light before committing',
      'A tinted primer under deep colours so fewer finish coats are needed',
      'Razor-sharp corner lines where the accent meets the adjacent wall',
      'Extra coats on reds, deep blues and blacks, which cover poorly by nature',
    ],
    prep: [
      'Check the wall for surface flaws, because saturated colour exaggerates every one',
      'Prime any patched areas twice, as dark tints reveal repairs more readily',
    ],
    materials:
      'A tinted grey-scale primer under strong tints, cutting the number of finish coats from four to two.',
    detail:
      'Deep reds and true blacks routinely need three or four coats over plain white, which is why they cost more than a standard wall colour.',
  },
  {
    slug: 'trim-and-baseboard-painting',
    name: 'Trim & Baseboard Painting',
    navName: 'Trim & Baseboards',
    keyword: 'trim and baseboard painting',
    excerpt: 'Hard-wearing, glass-smooth trim without brush marks or paint on your floors.',
    icon: 'trim',
    photo: 'trim',
    category: 'interior',
    matrix: true,
    timeline: '1–2 days for a main floor, depending on how much moulding there is',
    includes: [
      'Baseboards, casings, crown moulding and window stools all coated',
      'Caulking renewed where trim meets wall so the line reads as one piece',
      'A hard enamel finish that resists scuffs from vacuums, shoes and pets',
      'Floors protected at the baseboard line with low-tack tape and sheeting',
    ],
    prep: [
      'De-gloss existing oil-based trim so new coatings grip rather than peel',
      'Fill nail holes and open mitre joints, then sand level before coating',
      'Scrape old, cracked caulk out completely instead of caulking over it',
    ],
    materials:
      'Waterborne alkyd enamel, which levels out like oil paint but dries without the yellowing.',
    detail:
      'Older Hamilton trim is often original oil-based paint, and skipping the de-gloss step is the single most common reason repainted trim peels within a year.',
  },
  {
    slug: 'door-and-window-frame-painting',
    name: 'Door & Window Frame Painting',
    navName: 'Doors & Frames',
    keyword: 'door and window frame painting',
    excerpt: 'Doors and frames that close cleanly and do not stick to the jamb afterwards.',
    icon: 'window',
    photo: 'door',
    category: 'interior',
    matrix: false,
    timeline: 'A day for six to eight interior doors including both faces',
    includes: [
      'Hinges and handles removed rather than painted around',
      'Both faces plus the top and bottom edges sealed against moisture',
      'Doors left open and blocked until fully hardened so they cannot stick',
      'Panel mouldings brushed, flat sections rolled with a fine foam roller',
    ],
    prep: [
      'Sand the leading edge where years of opening has worn the finish through',
      'Fill old strike-plate and hardware holes when handles are being changed',
    ],
    materials:
      'A fast-recoat enamel that hardens quickly, so doors can be rehung the same day.',
    detail:
      'Paint reaches full hardness days after it feels dry, which is why freshly painted doors are wedged open rather than latched shut.',
  },
  {
    slug: 'stair-and-railing-painting',
    name: 'Stair & Railing Painting',
    navName: 'Stairs & Railings',
    keyword: 'stair and railing painting',
    excerpt: 'Spindles, stringers and handrails finished evenly, with the stairs still usable.',
    icon: 'stairs',
    photo: 'stairs',
    category: 'interior',
    matrix: false,
    timeline: '2–4 days, because each component needs to harden between coats',
    includes: [
      'Spindles coated on all faces, including the back edge people never see',
      'Risers painted and treads left bare or stained to your preference',
      'Handrails finished in a tougher coating that resists constant hand contact',
      'Work staged so at least one route upstairs stays open throughout',
    ],
    prep: [
      'Re-secure loose spindles and squeaking treads before any coating goes on',
      'Sand handrails back to bare wood where the finish has worn through',
    ],
    materials:
      'A urethane-modified enamel on handrails, chosen for how it stands up to skin oils and constant contact.',
    detail:
      'A typical straight staircase has around thirty separate spindle faces, which is why stairs take longer than the square footage suggests.',
  },
  {
    slug: 'wallpaper-removal',
    name: 'Wallpaper Removal',
    navName: 'Wallpaper Removal',
    keyword: 'wallpaper removal',
    excerpt: 'Old paper and glue taken right back to a sound wall, ready to paint properly.',
    icon: 'wallpaper',
    photo: 'wallpaper',
    category: 'prep',
    matrix: true,
    timeline: '1–3 days depending on how many layers are on the wall',
    includes: [
      'Paper and backing steamed or scored and soaked rather than dry-ripped',
      'All residual adhesive washed off, since paint will not bond over glue',
      'Torn drywall paper sealed and skim-coated back to a flat surface',
      'Walls primed with a sealing primer before any colour is applied',
    ],
    prep: [
      'Test a small area first to establish how many layers are involved',
      'Protect floors and outlets heavily, because the process is genuinely wet',
    ],
    materials:
      'An oil or shellac-based sealing primer, which locks down any adhesive residue that washing cannot lift.',
    detail:
      'Wallpaper hung directly onto unprimed drywall tears the paper face off when removed, and that damage must be skim-coated before painting.',
  },
  {
    slug: 'drywall-repair',
    name: 'Drywall Repair',
    navName: 'Drywall Repair',
    keyword: 'drywall repair',
    excerpt: 'Cracks, holes and popped nails made invisible before a drop of paint goes on.',
    icon: 'drywall',
    photo: 'drywall',
    category: 'prep',
    matrix: true,
    timeline: '1–2 days, as compound must dry fully between coats',
    includes: [
      'Holes patched with backing and mesh rather than filled with compound alone',
      'Three thin coats of compound, each sanded, instead of one thick pass',
      'Popped screws and nails reset and re-covered so they stay put',
      'Repairs feathered wide so no halo shows once the wall is painted',
    ],
    prep: [
      'Establish why a crack keeps returning before patching it again',
      'Match the existing wall texture so the repair blends under raking light',
    ],
    materials:
      'Setting-type compound for the first fill because it shrinks far less than a lightweight all-purpose mud.',
    detail:
      'Cracks that reappear above door and window corners are usually seasonal movement, so they are taped rather than simply filled.',
  },
  {
    slug: 'touch-up-painting',
    name: 'Touch-Up Painting',
    navName: 'Touch-Ups',
    keyword: 'touch up painting',
    excerpt: 'Scuffs and marks blended out without repainting the entire room.',
    icon: 'touchup',
    photo: 'supplies',
    category: 'interior',
    matrix: false,
    timeline: 'A few hours, usually a single visit',
    includes: [
      'Existing colour matched from a chip if the original tin is long gone',
      'Touch-ups feathered from the centre out so the repair fades into the wall',
      'An honest assessment of where a full wall recoat is the only clean answer',
    ],
    prep: [
      'Clean the area first, since touching up over a dirty wall shows every edge',
      'Apply with the same tool as the original, because roller and brush textures differ',
    ],
    materials:
      'Leftover original paint where available, as even a perfect colour match ages differently from paint already on the wall.',
    detail:
      'Touch-ups blend reliably on flat and matte paint, but on eggshell and satin the sheen difference usually shows, so the wall is recoated corner to corner.',
  },
  {
    slug: 'move-in-move-out-painting',
    name: 'Move-In & Move-Out Painting',
    navName: 'Move-In / Move-Out',
    keyword: 'move in move out painting',
    excerpt: 'A whole empty property repainted fast, between tenants or before you unpack.',
    icon: 'boxes',
    photo: 'empty-room',
    category: 'interior',
    matrix: false,
    timeline: '2–5 days for a typical empty two or three bedroom home',
    includes: [
      'Whole-property scheduling built around your closing or tenancy date',
      'Faster progress throughout because the rooms are empty of furniture',
      'Wall repairs, nail holes and picture anchors all made good',
      'A neutral, durable palette that suits resale or re-letting',
    ],
    prep: [
      'Walk the property first and list every repair so nothing surfaces mid-job',
      'Confirm the handover date so the work finishes with time in hand',
    ],
    materials:
      'A hard-wearing eggshell throughout, which cleans up between tenancies far better than a flat finish.',
    detail:
      'An empty house paints considerably faster than an occupied one, so booking the work in the gap between possession dates is the cheapest way to buy it.',
  },

  // ── Exterior ────────────────────────────────────────────────────────────
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    navName: 'Exterior Painting',
    keyword: 'exterior painting',
    excerpt: 'A finish built to survive Ontario freeze-thaw, not just to look good in July.',
    icon: 'house',
    photo: 'exterior',
    category: 'exterior',
    matrix: true,
    timeline: '4–8 days for an average detached home, weather permitting',
    includes: [
      'The whole envelope washed down and left to dry before anything is coated',
      'Failing paint scraped back to a sound edge and spot-primed',
      'Open joints and gaps sealed with an exterior-grade flexible sealant',
      'Two finish coats applied within the temperature window on the tin',
      'Landscaping, walkways and windows sheeted throughout',
    ],
    prep: [
      'Check the forecast for the full cure window, not just the day of application',
      'Follow the sun round the house so no surface is coated while it is baking',
      'Replace rotten trim sections rather than painting over soft wood',
    ],
    materials:
      '100% acrylic exterior coatings, which stay flexible enough to move with the substrate through freeze-thaw cycles instead of cracking.',
    detail:
      'Most exterior paints need surface and overnight temperatures above about 10°C to cure properly, which in the Hamilton area realistically means mid-May to early October.',
  },
  {
    slug: 'siding-painting',
    name: 'Siding Painting',
    navName: 'Siding',
    keyword: 'siding painting',
    parent: 'exterior-painting',
    excerpt: 'Aluminium, vinyl and wood siding recoated without warping or peeling.',
    icon: 'house',
    photo: 'exterior',
    category: 'exterior',
    matrix: false,
    timeline: '3–6 days for a full house of siding',
    includes: [
      'Chalky oxidation washed off aluminium siding before any primer',
      'A bonding primer used where the existing surface is slick or previously coated',
      'Heat-reflective colours chosen for vinyl so panels do not warp',
      'Coating applied by sprayer and back-brushed into the board profile',
    ],
    prep: [
      'Rub the siding to test for chalking, which stops paint from bonding entirely',
      'Check vinyl for existing warping before quoting, as paint will not correct it',
    ],
    materials:
      'Vinyl-safe acrylic formulated to stay within the substrate light-reflectance limit, so panels do not absorb enough heat to buckle.',
    detail:
      'Painting vinyl siding a darker colour than the original can make the panels expand and warp, so colour choice on vinyl is a structural decision rather than only an aesthetic one.',
  },
  {
    slug: 'brick-and-stucco-painting',
    name: 'Brick & Stucco Painting',
    navName: 'Brick & Stucco',
    keyword: 'brick and stucco painting',
    parent: 'exterior-painting',
    excerpt: 'Masonry coated in a breathable finish that lets trapped moisture escape.',
    icon: 'wall',
    photo: 'exterior',
    category: 'exterior',
    matrix: false,
    timeline: '4–7 days including masonry repairs and full cure time',
    includes: [
      'Failed mortar joints repointed before any coating is applied',
      'Hairline stucco cracks bridged with an elastomeric patching compound',
      'A masonry primer that tolerates the high alkalinity of brick and render',
      'Breathable topcoats so moisture can escape rather than pushing paint off',
    ],
    prep: [
      'Confirm the masonry is fully dry, since trapped water is what blows coatings off brick',
      'Test a small area on painted brick to check what is already on the surface',
    ],
    materials:
      'Vapour-permeable mineral or elastomeric masonry coatings, which let the wall breathe rather than sealing water inside it.',
    detail:
      'Painting brick is effectively permanent, because stripping it later is expensive and rarely fully successful, so it is worth being certain before starting.',
  },
  {
    slug: 'front-door-painting',
    name: 'Front Door Painting',
    navName: 'Front Doors',
    keyword: 'front door painting',
    excerpt: 'The cheapest visible upgrade your house has, done in a single day.',
    icon: 'door',
    photo: 'front-door',
    category: 'exterior',
    matrix: true,
    timeline: 'One day, with the door secured and usable the same night',
    includes: [
      'Door left on its hinges so your home is never open to the street',
      'Hardware, knocker and letterplate removed rather than cut around',
      'Weatherstripping protected so the seal still works afterwards',
      'A hard exterior enamel that resists sun-fade on south-facing doors',
    ],
    prep: [
      'Sand back any sun-blistered areas, typically along the top rail',
      'Prime bare fibreglass and steel with the primer matched to that substrate',
    ],
    materials:
      'A UV-resistant exterior door enamel, since south and west-facing doors take the heaviest fading in the Hamilton area.',
    detail:
      'A front door is repainted on its hinges and left to harden overnight before the weatherstripping touches it, so the house is never left insecure.',
  },
  {
    slug: 'garage-door-refinishing',
    name: 'Garage Door Refinishing',
    navName: 'Garage Doors',
    keyword: 'garage door refinishing',
    excerpt: 'Faded, chalky garage doors brought back without the cost of replacing them.',
    icon: 'garage',
    photo: 'garage',
    category: 'exterior',
    matrix: false,
    timeline: 'One to two days per door including cure time',
    includes: [
      'Chalked oxidation scrubbed off before any coating',
      'Panel recesses brushed out so no thin spots are left in the profile',
      'Rust on steel doors treated and primed rather than painted over',
      'The door left open to harden so panels do not stick shut',
    ],
    prep: [
      'Check the door balance and rollers, since paint adds a little weight',
      'Mask the weather seal and the concrete apron before spraying',
    ],
    materials:
      'A direct-to-metal acrylic that flexes with the panels as the door rolls, instead of cracking along the hinge lines.',
    detail:
      'A refinished garage door costs a fraction of a replacement and, being the largest single element on most façades, changes the look of the house more than any other repaint.',
  },
  {
    slug: 'deck-and-fence-staining',
    name: 'Deck & Fence Staining',
    navName: 'Decks & Fences',
    keyword: 'deck and fence staining',
    excerpt: 'Stain that soaks into the wood rather than sitting on top waiting to peel.',
    icon: 'deck',
    photo: 'deck',
    category: 'exterior',
    matrix: true,
    timeline: '2–4 days including washing and full drying time',
    includes: [
      'Deck cleaned and brightened to reopen the grain before staining',
      'Protruding nails and screws reset, split boards flagged for replacement',
      'Stain worked into the end grain, where rot always starts',
      'Railings, spindles and the fascia coated, not just the walking surface',
    ],
    prep: [
      'Allow the wood to dry for two or three clear days after washing',
      'Sprinkle-test the boards: if water beads, the wood cannot absorb stain yet',
    ],
    materials:
      'Penetrating semi-transparent stain, which wears away gradually instead of peeling in sheets the way a film-forming coating does.',
    detail:
      'Pressure-treated lumber needs to weather for several months before it will accept stain, so a brand-new deck is usually left a season before its first coat.',
  },
  {
    slug: 'wood-staining',
    name: 'Wood Staining',
    navName: 'Wood Staining',
    keyword: 'wood staining',
    excerpt: 'Grain brought out evenly, without the blotching that ruins softwoods.',
    icon: 'stain',
    photo: 'stain',
    category: 'specialty',
    matrix: false,
    timeline: '2–3 days depending on the number of coats and the topcoat used',
    includes: [
      'Conditioner applied to pine and maple to stop blotchy absorption',
      'Colour tested on an offcut or a hidden area before committing',
      'Stain wiped back by hand for an even, controlled depth of colour',
      'A clear protective topcoat over the finished stain',
    ],
    prep: [
      'Sand progressively through the grits, since stain magnifies every scratch',
      'Remove all sanding dust, because trapped dust shows as dark speckling',
    ],
    materials:
      'Oil-based penetrating stain under a waterborne clear coat, giving the depth of oil with a topcoat that will not yellow.',
    detail:
      'Softwoods like pine absorb stain unevenly unless a pre-stain conditioner is used first, which is the difference between rich grain and a blotchy finish.',
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    navName: 'Pressure Washing',
    keyword: 'pressure washing',
    excerpt: 'Dirt, chalk and green growth off the house, driveway, deck and fence.',
    icon: 'washer',
    photo: 'pressure-wash',
    category: 'prep',
    matrix: true,
    timeline: 'Half a day to a full day for a typical property',
    includes: [
      'House siding, soffits, walkways, driveway, deck and fence all covered',
      'Pressure dialled to the substrate so soft wood and mortar are not gouged',
      'A cleaning solution used on algae and mildew, which water alone leaves behind',
      'Plants soaked before and rinsed after so runoff does not burn them',
    ],
    prep: [
      'Close windows and check for gaps where water could be driven inside',
      'Cover exterior outlets and light fittings before starting',
    ],
    materials:
      'A low-pressure soft-wash with a cleaning solution on siding, keeping the water out from behind the boards.',
    detail:
      'Green and black growth on a north-facing wall is algae rather than dirt, and it grows back within a season unless it is treated with a solution instead of blasted off with water.',
  },
  {
    slug: 'weatherproof-coatings',
    name: 'Weatherproof Protective Coatings',
    navName: 'Protective Coatings',
    keyword: 'weatherproof protective coatings',
    excerpt: 'An extra defensive layer on the elevations that take the worst weather.',
    icon: 'shield',
    photo: 'exterior',
    category: 'exterior',
    matrix: false,
    timeline: '3–5 days including surface repairs and cure time',
    includes: [
      'Elastomeric coatings that bridge hairline cracks as the wall moves',
      'Extra build on the south and west elevations, which weather fastest',
      'Water-repellent treatment on exposed masonry and parapets',
      'Sealant renewed at every penetration, joint and transition',
    ],
    prep: [
      'Find and fix the water entry point first, since coatings are not a cure for a leak',
      'Confirm the substrate is dry all the way through before sealing it',
    ],
    materials:
      'High-build elastomeric coatings, which are many times thicker than standard paint and stay flexible through the freeze-thaw cycle.',
    detail:
      'A protective coating manages weather exposure; it will not stop an active leak, so the source is always repaired before the coating goes on.',
  },
  {
    slug: 'rust-removal-and-treatment',
    name: 'Rust Removal & Treatment',
    navName: 'Rust Treatment',
    keyword: 'rust removal and treatment',
    excerpt: 'Railings, posts and metalwork stripped back and sealed so rust stops spreading.',
    icon: 'rust',
    photo: 'prep',
    category: 'specialty',
    matrix: false,
    timeline: '1–3 days depending on how far the corrosion has gone',
    includes: [
      'Loose scale wire-brushed or ground back to sound, bright metal',
      'A rust-converting primer applied to any pitting that cannot be removed',
      'Direct-to-metal topcoats that seal the surface against moisture',
      'Honest advice when a railing is too far gone to be worth saving',
    ],
    prep: [
      'Prime bare metal the same day it is cleaned, before flash rust forms',
      'Check the base of posts, since corrosion starts where they meet concrete',
    ],
    materials:
      'A rust-converting primer that chemically stabilises residual corrosion, plus a direct-to-metal acrylic topcoat.',
    detail:
      'Painting over active rust simply hides it while it keeps spreading underneath, so every loose scale is removed before a primer is applied.',
  },

  // ── Specialty ───────────────────────────────────────────────────────────
  {
    slug: 'cabinet-painting',
    name: 'Cabinet Painting & Refinishing',
    navName: 'Cabinets',
    keyword: 'kitchen cabinet painting',
    excerpt: 'A factory-smooth kitchen for a fraction of what replacing the boxes costs.',
    icon: 'cabinet',
    photo: 'cabinets',
    category: 'specialty',
    matrix: true,
    timeline: '4–7 days, with the kitchen usable for most of it',
    includes: [
      'Doors and drawer fronts numbered, removed and sprayed off-site or in a booth',
      'Boxes and face frames finished in place with the same coating system',
      'Every surface degreased twice, because kitchen grease defeats adhesion',
      'A bonding primer suited to melamine, thermofoil or solid wood',
      'Hardware refitted and doors realigned on rehanging',
    ],
    prep: [
      'Scuff-sand every face so the primer has a mechanical key to grip',
      'Identify the door material first, as melamine and oak need different primers',
    ],
    materials:
      'A catalysed or urethane-modified cabinet enamel that cures genuinely hard, so doors do not stick or mark under fingernails.',
    detail:
      'Cabinet coatings keep hardening for two to three weeks after the job, so doors are handled gently and left slightly ajar for the first few days.',
  },
  {
    slug: 'spray-painting',
    name: 'Spray Painting',
    navName: 'Spray Finishing',
    keyword: 'spray painting',
    excerpt: 'A dead-flat sprayed finish with no brush or roller texture anywhere.',
    icon: 'spray',
    photo: 'spray',
    category: 'specialty',
    matrix: false,
    timeline: '1–3 days, most of it masking rather than spraying',
    includes: [
      'Wholesale masking of floors, windows, fittings and anything left in place',
      'Back-rolling on walls where a little texture actually helps hide flaws',
      'Best suited to empty rooms, cabinetry, doors, railings and trim',
      'Overspray contained with sheeting and controlled airflow',
    ],
    prep: [
      'Seal off adjoining rooms completely, since fine overspray travels',
      'Strain and thin the coating correctly so the gun does not spit or tail',
    ],
    materials:
      'Airless spray equipment with the tip size matched to the coating, which is what determines the fan pattern and film build.',
    detail:
      'Spraying is faster to apply but far slower to mask, so it wins on empty rooms, cabinets and trim and rarely pays on a single furnished bedroom.',
  },
  {
    slug: 'epoxy-floor-coating',
    name: 'Epoxy Floor Coating',
    navName: 'Epoxy Floors',
    keyword: 'epoxy floor coating',
    excerpt: 'A sealed garage or basement floor that shrugs off road salt and oil.',
    icon: 'epoxy',
    photo: 'epoxy',
    category: 'specialty',
    matrix: true,
    timeline: '2–3 days, plus several more before vehicles can go back on it',
    includes: [
      'Concrete mechanically ground or acid-etched to open the surface',
      'Oil spots and stains degreased and neutralised before coating',
      'Cracks and pits filled with an epoxy patching compound',
      'Optional decorative flake broadcast, then locked in with a clear topcoat',
    ],
    prep: [
      'Moisture-test the slab, because epoxy will not bond to concrete pushing damp',
      'Allow new concrete a full 28 days to cure before any coating',
    ],
    materials:
      'A two-part epoxy build coat under a polyaspartic or urethane topcoat, which is what gives the surface its resistance to road salt and UV.',
    detail:
      'Epoxy needs about 24 hours before foot traffic and closer to 72 before a car returns, and driving on it early leaves permanent tyre marks.',
  },
  {
    slug: 'cosmetic-repairs',
    name: 'Minor Cosmetic Repairs',
    navName: 'Cosmetic Repairs',
    keyword: 'minor cosmetic repairs',
    excerpt: 'The small fixes that have to happen before paint can look right.',
    icon: 'ruler',
    photo: 'drywall',
    category: 'prep',
    matrix: false,
    timeline: 'Usually folded into the painting schedule at no separate visit',
    includes: [
      'Loose trim re-secured and open mitre joints closed up',
      'Small rotten trim sections cut out and replaced',
      'Door and window stops adjusted where they have been painted shut',
      'Sagging closet shelving and loose hardware refitted',
    ],
    prep: [
      'Walk the property and list every small defect before the quote is issued',
      'Flag anything structural for a specialist rather than covering it with filler',
    ],
    materials:
      'Exterior-grade epoxy wood filler on rot repairs, which stays put through freeze-thaw instead of shrinking out.',
    detail:
      'Small repairs are quoted with the painting rather than as a separate call-out, because doing them while the crew is already on site costs a fraction of a return visit.',
  },
  {
    slug: 'maintenance-painting',
    name: 'Maintenance Painting',
    navName: 'Maintenance',
    keyword: 'maintenance painting',
    excerpt: 'Scheduled upkeep that stops small failures turning into full repaints.',
    icon: 'calendar',
    photo: 'supplies',
    category: 'exterior',
    matrix: false,
    timeline: 'One to two days a year for a typical property',
    includes: [
      'An annual walk-round noting where coatings are starting to fail',
      'Sealant renewed at joints before water can get behind it',
      'South and west elevations recoated on their own shorter cycle',
      'A written record so you can budget ahead rather than react',
    ],
    prep: [
      'Catch failures at the hairline stage, well before the substrate is exposed',
      'Clear growth back off walls and fences to slow moisture damage',
    ],
    materials:
      'The same coating system used originally, so recoats bond properly and colours still match.',
    detail:
      'Recoating an exterior before the paint film breaks costs far less than the strip-and-prime work needed once bare wood has been exposed to a winter.',
  },

  // ── Preparation (nested under surface preparation) ──────────────────────
  {
    slug: 'surface-preparation',
    name: 'Surface Preparation',
    navName: 'Surface Prep',
    keyword: 'surface preparation for painting',
    excerpt: 'The unglamorous work that decides whether a paint job lasts three years or ten.',
    icon: 'sand',
    photo: 'prep',
    category: 'prep',
    matrix: false,
    timeline: 'Typically 40–60% of the total hours on any job',
    includes: [
      'Washing, sanding, filling, caulking and priming as one coherent system',
      'Failed coatings taken back to a sound, feathered edge',
      'Glossy surfaces de-glossed so new coatings can key into them',
      'Bare substrate primed with the primer matched to that material',
    ],
    prep: [
      'Diagnose why the previous coating failed before repeating the same system',
      'Confirm the surface is dry and clean, the two things paint cannot forgive',
    ],
    materials:
      'Primers selected per substrate — latex on new drywall, shellac on stains and odours, and oil or bonding primer on chalky or glossy surfaces.',
    detail:
      'Preparation regularly takes more hours than painting itself, and it is the single largest difference between a quote that looks cheap and a finish that lasts.',
  },
  {
    slug: 'sanding',
    name: 'Sanding',
    navName: 'Sanding',
    keyword: 'sanding before painting',
    parent: 'surface-preparation',
    excerpt: 'Flat, keyed surfaces without filling your house with dust.',
    icon: 'sand',
    photo: 'prep',
    category: 'prep',
    matrix: false,
    timeline: 'Half a day to two days depending on the area and its condition',
    includes: [
      'Vacuum-assisted sanders used to keep airborne dust down indoors',
      'Grit sequence stepped up rather than jumping straight to a fine paper',
      'Old brush ridges and roller stipple taken back flat',
      'All dust removed before priming, because paint will not stick to it',
    ],
    prep: [
      'Treat any pre-1980 coating as possible lead paint and test before sanding',
      'Seal doorways and cover vents to stop dust travelling through the house',
    ],
    materials:
      'HEPA-filtered vacuum extraction on the sander, which keeps fine dust out of the air rather than redistributing it.',
    detail:
      'Homes built before 1960 may have lead-based paint, and disturbing it by dry sanding is a genuine health risk, so those surfaces are tested and handled wet.',
  },
  {
    slug: 'caulking-and-crack-filling',
    name: 'Caulking & Crack Filling',
    navName: 'Caulking',
    keyword: 'caulking and crack filling',
    parent: 'surface-preparation',
    excerpt: 'Sealed joints and filled cracks, so the finished lines read as one surface.',
    icon: 'caulk',
    photo: 'prep',
    category: 'prep',
    matrix: false,
    timeline: 'Half a day to a day on a typical interior',
    includes: [
      'Old, split caulk cut out completely rather than sealed over',
      'Trim-to-wall joints, mitres and window casings all sealed',
      'A paintable sealant used, since silicone will not accept paint',
      'Beads tooled by hand for a clean, consistent line',
    ],
    prep: [
      'Clean and dry the joint first, as sealant will not adhere to dust',
      'Use backer rod in any gap deeper than about 6 mm instead of overfilling it',
    ],
    materials:
      'Paintable siliconised acrylic indoors and a flexible polyurethane sealant on exterior joints that move seasonally.',
    detail:
      'Pure silicone sealant cannot be painted over — paint beads up and peels off it — so only paintable acrylic or polyurethane sealants are used on surfaces due for coating.',
  },
  {
    slug: 'priming',
    name: 'Priming',
    navName: 'Priming',
    keyword: 'priming before painting',
    parent: 'surface-preparation',
    excerpt: 'The right primer for the surface, which is what stops paint peeling later.',
    icon: 'primer',
    photo: 'prep',
    category: 'prep',
    matrix: false,
    timeline: 'Half a day to a day, ahead of the finish coats',
    includes: [
      'New drywall sealed so the finish coat does not flash at the joints',
      'Water stains and smoke damage locked in with a shellac-based primer',
      'Bare wood knots sealed so resin cannot bleed through the finish',
      'Bonding primer on glossy, chalky or previously oil-painted surfaces',
    ],
    prep: [
      'Match the primer to the substrate and the problem, not to the topcoat brand',
      'Let the primer cure for the stated time rather than coating over it early',
    ],
    materials:
      'Shellac-based primer for stains and odours, latex for new drywall, and a bonding primer for slick or chalky substrates.',
    detail:
      'Paint-and-primer-in-one products are finish paints with better adhesion, not real primers, and they will not seal a water stain or lock down a chalky surface.',
  },

  // ── Colour ──────────────────────────────────────────────────────────────
  {
    slug: 'colour-consultation',
    name: 'Colour Consultation',
    navName: 'Colour Consultation',
    keyword: 'colour consultation',
    excerpt: 'Colours chosen against your actual light, floors and furniture — not a catalogue.',
    icon: 'palette',
    photo: 'colour',
    category: 'colour',
    matrix: false,
    timeline: 'A one to two hour visit, usually before the quote is finalised',
    includes: [
      'Large sample boards viewed in your own rooms at different times of day',
      'Undertones checked against flooring, cabinetry and fixed finishes',
      'A whole-home palette that flows between connected rooms',
      'Sheen chosen per room, which matters as much as the colour itself',
    ],
    prep: [
      'Look at samples in morning and evening light before deciding',
      'Test on more than one wall, since orientation changes how a colour reads',
    ],
    materials:
      'Large movable sample boards rather than small patches painted on the wall, so a colour can be judged against each surface in turn.',
    detail:
      'North-facing Hamilton rooms take a cool cast for most of the day, which pushes grey paints noticeably blue, so undertone matters more than the swatch name.',
  },
  {
    slug: 'colour-matching',
    name: 'Colour Matching',
    navName: 'Colour Matching',
    keyword: 'paint colour matching',
    excerpt: 'An existing colour reproduced when the original tin is long gone.',
    icon: 'swatch',
    photo: 'colour',
    category: 'colour',
    matrix: false,
    timeline: 'Same day in most cases',
    includes: [
      'A chip taken from an inconspicuous area and read on a spectrophotometer',
      'The match checked on your wall in daylight, not just under shop lighting',
      'Sheen matched as well as colour, since gloss level changes perception',
      'An honest call when a full wall recoat will look better than a patch',
    ],
    prep: [
      'Take the sample from a clean, unfaded area for an accurate reading',
      'Bring a piece large enough for the scanner to read reliably',
    ],
    materials:
      'Spectrophotometer matching from a physical chip, which is far more accurate than matching from a photograph or a colour name.',
    detail:
      'A scanner matches the paint as it is today, including years of fading, so a matched patch can still show against the rest of a sun-exposed wall.',
  },

  // ── Whole-property ──────────────────────────────────────────────────────
  {
    slug: 'residential-painting',
    name: 'Residential Painting',
    navName: 'Residential Painting',
    keyword: 'residential house painters',
    excerpt: 'One crew for the whole house, inside and out, on a single schedule.',
    icon: 'house',
    photo: 'crew',
    category: 'interior',
    matrix: true,
    timeline: '1–3 weeks for a whole-home interior and exterior package',
    includes: [
      'Interior and exterior sequenced so the weather-dependent work leads',
      'One point of contact and one quote covering the entire property',
      'Rooms handed back in stages so you are never without usable space',
      'A written scope listing every room, surface and colour before starting',
    ],
    prep: [
      'Walk every room and elevation together and agree the scope in writing',
      'Book exterior work inside the paintable season and interiors around it',
    ],
    materials:
      'A consistent coating system across the property, so touch-ups years later still match.',
    detail:
      'Booking interior and exterior together lets the exterior take the good weather while interior rooms fill the rain days, which usually shortens the overall schedule.',
  },
];

// ── Derived lookups ────────────────────────────────────────────────────────

export const serviceSlugs = services.map((s) => s.slug);

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<
  string,
  Service
>;

/** Top-level services (those without a parent) — what the /services/ hub lists. */
export const topServices = services.filter((s) => !s.parent);

/** Services that get a page in every city — chosen for real local search demand. */
export const matrixServices = services.filter((s) => s.matrix);

export const childrenOf = (slug: string) => services.filter((s) => s.parent === slug);

export const categoryLabels: Record<ServiceCategory, string> = {
  interior: 'Interior Painting',
  exterior: 'Exterior Painting',
  specialty: 'Specialty Finishes',
  prep: 'Preparation & Repair',
  colour: 'Colour Services',
};

/** URL for a service, respecting nesting. Always trailing-slashed. */
export function serviceHref(s: Service): string {
  return s.parent ? `/services/${s.parent}/${s.slug}/` : `/services/${s.slug}/`;
}
