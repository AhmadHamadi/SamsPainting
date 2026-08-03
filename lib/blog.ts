// ---------------------------------------------------------------------------
// Blog — buyer-guide and comparison content.
//
// Scope is deliberately fenced off from /cost/ so the two hubs never compete:
// COST pages own "how much does X cost" queries and carry the price tables.
// BLOG posts own comparison, timing and how-it-works queries and carry NO
// pricing tables. That separation is what keeps them from cannibalising.
//
// Author-attributed for E-E-A-T. Sam is a real person and the named author.
// ---------------------------------------------------------------------------

import type { PhotoKey } from './photos';
import type { FaqItem } from './types';

export type Post = {
  slug: string;
  title: string;
  keyword: string;
  excerpt: string;
  date: string;
  updated?: string;
  photo: PhotoKey;
  readMinutes: number;
  /** Front-loaded direct answer for AEO. */
  answer: string;
  sections: { h2: string; body: string[] }[];
  faqs: FaqItem[];
};

export const AUTHOR = { name: 'Sam', role: 'Owner & Lead Painter, Sam’s Painting' };

export const posts: Post[] = [
  {
    slug: 'best-time-to-paint-exterior-ontario',
    title: 'The Best Time of Year to Paint a House Exterior in Ontario',
    keyword: 'best time to paint exterior Ontario',
    excerpt:
      'The realistic exterior painting window in the Hamilton area runs from about late April to late October — and the shoulder months carry a specific failure mode worth understanding.',
    date: '2026-03-12',
    updated: '2026-08-03',
    photo: 'exterior',
    readMinutes: 6,
    answer:
      'The dependable exterior painting season in the Hamilton area runs from mid-May to mid-September, with a workable margin from late April to late October. Most coatings need air, surface and overnight temperatures above roughly 10°C, and manufacturers warn against applying when temperatures may drop near freezing within 48 hours.',
    sections: [
      {
        h2: 'What the paint manufacturers actually specify',
        body: [
          'Conventional exterior products and most primers require air, surface and material temperatures of at least 10°C. Some modern formulations are rated down to about 1.7°C, but even those carry a hard condition: do not apply when air or surface temperatures may drop below that within 48 hours.',
          'There is a second condition people miss entirely. The surface has to stay at least 5°F above the dew point, not just above the minimum temperature. That is the number that quietly shortens an autumn working day.',
        ],
      },
      {
        h2: 'The shoulder-season trap',
        body: [
          'Here is the classic failure, and manufacturers describe it in their own literature. Daytime temperatures climb above 10°C, the paint goes on beautifully, and then the overnight low drops toward freezing. The film stops coalescing partway through. It looks perfectly fine for a season, sometimes two, and then lets go in sheets.',
          'The related problem is dew. Dew forms on almost everything as soon as the sun sets and seeps into uncured paint. When that moisture evaporates it draws certain ingredients to the surface, which is what causes the streaky staining known as surfactant leaching.',
        ],
      },
      {
        h2: 'How the season splits across the Hamilton area',
        body: [
          'Mid-May through mid-September is the prime window. Both standard and low-temperature systems are fully in spec, the working day is long, and recoat times are short.',
          'Late April to mid-May works with low-temperature-rated products only, because overnight lows still dip near freezing. Mid-September to mid-October is workable but the daily window compresses sharply — morning dew has to burn off first, and by mid-afternoon you are running out of time before it returns. In practice that means roughly 10am to 4pm.',
          'Local geography matters more than people expect. Hamilton’s lower city is meaningfully more sheltered and milder than the Mountain. Escarpment-top communities like Waterdown, Flamborough, Ancaster and Binbrook’s open farmland genuinely lose days at both ends of the season compared with the sheltered lower city.',
        ],
      },
      {
        h2: 'Why winter is a good time to book interior work',
        body: [
          'Interiors are the other half of the year, and winter genuinely suits them. Indoor humidity is lower in the heating season, which helps paint dry evenly. Keeping indoor humidity around 40 to 50 percent and the room between 15 and 21°C gives a reliable cure — cold air can double recoat times.',
          'It is also the sensible time to book spring exterior work. Exterior schedules fill hardest from March onward, so a January conversation usually gets a better slot than an April one.',
        ],
      },
    ],
    faqs: [
      { q: 'Can you paint a house exterior in winter in Ontario?', a: 'Realistically no. From mid-November to mid-April, overnight temperatures in the Hamilton area sit below what exterior coatings need to cure, and the 48-hour rule after application rules out most of the days that look warm enough at midday.' },
      { q: 'What is the coldest temperature you can paint outside in?', a: 'Conventional exterior paints and most primers need at least 10°C. Some modern formulations are rated to about 1.7°C, but only if temperatures will not fall below that within 48 hours of application — which is the condition that rules out most Ontario shoulder-season days.' },
      { q: 'Is it bad to paint in direct sunlight?', a: 'Yes, and product data sheets say so explicitly. A surface baking in the sun skins the film before what is underneath can escape, which causes blistering and poor adhesion. The right approach is to follow the sun around the house and paint the shaded elevations.' },
      { q: 'How long after rain can you paint an exterior?', a: 'Allow at least a full day after heavy rain, and longer for porous substrates like wood or masonry that hold water below the surface. Painting a damp surface is one of the most reliable ways to cause blistering within weeks.' },
    ],
  },
  {
    slug: 'cabinet-painting-vs-refacing-vs-replacing',
    title: 'Cabinet Painting vs Refacing vs Replacing: An Honest Comparison',
    keyword: 'cabinet painting vs refacing',
    excerpt:
      'Three ways to change a kitchen, at three very different price points. Which one is right depends almost entirely on the condition of the boxes behind the doors.',
    date: '2026-04-08',
    updated: '2026-08-03',
    photo: 'cabinets',
    readMinutes: 7,
    answer:
      'Painting keeps your existing doors and changes only the colour. Refacing replaces doors and drawer fronts over the existing boxes, changing the style too. Replacement changes everything including the layout. If the cabinet boxes are structurally sound, painting delivers the biggest visual change per dollar by a wide margin.',
    sections: [
      {
        h2: 'Start with the boxes, not the doors',
        body: [
          'The single question that decides this is whether the carcasses are sound. Open a door and look at the shelves, the back panel and the bottom of the sink cabinet. If the boxes are solid and the layout works, painting or refacing both make sense. If they are swollen, sagging or water-damaged, no finish is going to fix that and replacement is the honest answer.',
          'Layout is the other deciding factor. Painting and refacing keep your kitchen exactly where it is. If the problem is that the kitchen does not work rather than that it looks tired, no amount of finish will solve it.',
        ],
      },
      {
        h2: 'What painting actually involves',
        body: [
          'Doors and drawer fronts are numbered, removed and finished flat, while the boxes and face frames are coated in place with the same system. Every surface is degreased twice, because kitchen grease is the number one cause of adhesion failure, then scuff-sanded so the primer has something to key into.',
          'The coating matters as much as the preparation. A genuine catalysed or urethane-modified cabinet enamel cures far harder than wall paint, which is what stops doors marking under a fingernail. It also keeps hardening for two to three weeks after the job, so doors get handled gently at first.',
        ],
      },
      {
        h2: 'Where refacing wins',
        body: [
          'Refacing replaces the doors and drawer fronts entirely and veneers the visible box faces, so it changes the door profile as well as the colour. If you have dated raised-panel oak doors and you want flat shaker, painting will change the colour but leave the profile — refacing changes both.',
          'Published Canadian figures put refacing at a saving of roughly 30 to 50 percent against full replacement. It sits between painting and replacement on cost, and it is the right call when you like the layout but genuinely dislike the doors.',
        ],
      },
      {
        h2: 'The oak grain question',
        body: [
          'This catches people out. Oak has an open grain, and paint does not fill it. Painted oak cabinets read as painted oak — you still see the grain texture through the finish. Some owners like that; others are expecting a smooth modern slab and are disappointed.',
          'It can be grain-filled first, which adds a full stage to the process and therefore cost. Worth deciding up front rather than discovering it at the end.',
        ],
      },
    ],
    faqs: [
      { q: 'Do painted kitchen cabinets look cheap?', a: 'Not when they are done properly. A sprayed, correctly primed cabinet enamel gives a smooth factory-like finish. What looks cheap is brush-marked wall paint over an unprepared door, which is a preparation and product failure rather than a limitation of painting itself.' },
      { q: 'How long does cabinet painting take from start to finish?', a: 'Typically four to seven days on site, and the kitchen remains usable for most of that. The coating then continues hardening for another two to three weeks, during which doors should be handled gently and left slightly ajar.' },
      { q: 'Can you change from dark to white cabinets?', a: 'Yes, and it is one of the most common requests. Dark stained wood needs a stain-blocking bonding primer so tannin cannot bleed through the white finish, and it usually needs an extra coat. Both are normal parts of a properly quoted job.' },
      { q: 'What if I only want to paint the lower cabinets?', a: 'Two-tone kitchens are popular and entirely straightforward. Published Ontario figures put the add-on for a two-tone finish at roughly $180 to $900 depending on kitchen size, since it means a second colour setup rather than double the work.' },
    ],
  },
  {
    slug: 'how-to-prepare-your-home-for-painters',
    title: 'How to Prepare Your Home Before the Painters Arrive',
    keyword: 'how to prepare home for painters',
    excerpt:
      'A short, practical list. Do these things before the first morning and the job runs faster, cleaner and with less disruption to your week.',
    date: '2026-05-20',
    photo: 'empty-room',
    readMinutes: 5,
    answer:
      'Clear small breakables, personal items and wall hangings from the rooms being painted, and make sure we can reach the walls. We move and cover the furniture ourselves. Twenty minutes of clearing the night before typically saves an hour on the first morning.',
    sections: [
      {
        h2: 'What we handle, and what genuinely helps if you do',
        body: [
          'Moving furniture to the centre of the room, covering it, drop-sheeting the floors, removing switch plates and masking is all our work. You do not need to move a sofa or empty a room.',
          'What helps is the small stuff: ornaments, photo frames, electronics, anything on a windowsill, and the contents of shelves in the rooms we are working in. Those take a professional crew a surprisingly long time to handle carefully, and you know where they go.',
        ],
      },
      {
        h2: 'Take pictures and mirrors down yourself',
        body: [
          'Wall hangings come down, and it is worth doing it yourself so you can decide what goes back and where. If you want the existing anchors and holes filled and painted over, tell us — otherwise we will fill them, which means rehanging in new positions.',
          'Curtains and blinds are worth taking down too if the trim around the windows is being painted.',
        ],
      },
      {
        h2: 'Access, parking and pets',
        body: [
          'Let us know where to park and which entrance to use, especially in older Hamilton neighbourhoods where street parking is tight and permits apply.',
          'Pets are the thing most worth planning for. Doors are propped open, there are wet surfaces and tools at ground level, and even a calm animal gets unsettled. Somewhere quiet away from the work, or a day out, is best for everyone.',
        ],
      },
      {
        h2: 'Decide colours before we start, not during',
        body: [
          'Look at large sample boards in the actual room at different times of day. North-facing Hamilton rooms take a cool cast for most of the day, which pushes grey paints noticeably blue — undertone matters far more than the name on the swatch.',
          'Changing a colour after the first coat is on means extra coats and extra cost. Deciding a day early costs nothing.',
        ],
      },
    ],
    faqs: [
      { q: 'Do I need to empty the room before painters arrive?', a: 'No. We move furniture to the centre and cover it, and we drop-sheet the floors. Clearing small breakables, electronics, shelf contents and wall hangings is the part that genuinely speeds things up and keeps your belongings safest.' },
      { q: 'Should I wash the walls before painting?', a: 'Leave it to us. Washing is part of preparation and we do it where the surface needs it, particularly kitchens and high-touch areas where grease and hand marks would otherwise stop the paint bonding properly.' },
      { q: 'Can I stay in the house while it is being painted?', a: 'In most cases yes. We work room by room so you keep usable space, and modern low-VOC products make that far more comfortable than it once was. For a whole-house repaint some people prefer to be out for the busiest days.' },
      { q: 'How long before furniture can go back against a freshly painted wall?', a: 'Give it a few days. Paint feels dry within hours but keeps hardening well beyond that, and pushing furniture against a soft film leaves marks or can stick to it. We will tell you the specific window for the product used.' },
    ],
  },
  {
    slug: 'paint-finishes-explained',
    title: 'Flat, Eggshell, Satin or Semi-Gloss: Choosing a Paint Finish',
    keyword: 'flat vs eggshell vs satin paint finish',
    excerpt:
      'Sheen affects durability, cleanability and how much of your wall’s imperfection you can see. Here is where each one genuinely belongs.',
    date: '2026-06-15',
    photo: 'colour',
    readMinutes: 5,
    answer:
      'Flat and matte hide surface flaws but are hard to clean, so they suit ceilings and low-traffic rooms. Eggshell is the everyday choice for living areas. Satin suits kitchens, bathrooms and hallways. Semi-gloss and enamel belong on trim, doors and cabinetry.',
    sections: [
      {
        h2: 'The trade-off in one sentence',
        body: [
          'The more sheen a paint has, the tougher and more washable it is — and the more of your wall’s imperfections it shows. Everything else follows from that.',
          'A flat ceiling paint diffuses light and hides the minor undulation every ceiling has. Put a satin on the same ceiling and every ripple appears.',
        ],
      },
      {
        h2: 'Room by room',
        body: [
          'Ceilings take dead-flat, always. Bedrooms and living rooms do well in matte or eggshell, which is forgiving of older plaster walls while still being wipeable.',
          'Kitchens, bathrooms, hallways and stairwells need something more scrubbable — satin, or a moisture-tolerant finish in a bathroom. These are the surfaces that get touched, splashed and cleaned.',
          'Trim, baseboards, doors and cabinetry take a hard enamel. A waterborne alkyd levels out like oil paint but dries without the yellowing, which is why it has largely replaced traditional oil on interior trim.',
        ],
      },
      {
        h2: 'The touch-up consequence nobody mentions',
        body: [
          'Sheen decides whether you can ever touch up a wall invisibly. On flat and matte paint, a touch-up blends reliably. On eggshell and satin, the touched-up area almost always shows as a sheen difference under raking light, so the wall has to be recoated corner to corner.',
          'If you have children or pets and expect to be touching up regularly, that is a real argument for a flatter finish in the rooms most likely to get marked.',
        ],
      },
    ],
    faqs: [
      { q: 'What paint finish is best for a bathroom?', a: 'Something moisture-tolerant with a bit of sheen, typically satin. Bathrooms combine humidity with frequent cleaning, and a flat finish will neither shed moisture nor survive being wiped down. Ventilation still matters more than the paint you choose.' },
      { q: 'Should trim be a different finish from the walls?', a: 'Yes, almost always. Trim takes knocks, shoes and vacuum cleaners, so it needs a hard enamel rather than wall paint. The sheen contrast between eggshell walls and enamel trim is also what makes the trim read as a deliberate detail.' },
      { q: 'Is flat paint a bad choice for a family home?', a: 'Not necessarily. Modern matte paints are considerably more scrubbable than flat paints used to be, and they hide wall imperfection far better than satin. In older Hamilton homes with plaster walls, that forgiveness is often worth more than maximum washability.' },
      { q: 'Can I use the same paint on walls and ceiling?', a: 'You can, but the result is usually worse. Ceiling paint is formulated dead-flat specifically to diffuse light and hide unevenness. Wall paint on a ceiling reflects more light and reveals every ripple and roller line.' },
    ],
  },
  {
    slug: 'how-often-should-you-repaint',
    title: 'How Often Should You Repaint? Interior and Exterior Intervals',
    keyword: 'how often should you repaint your house',
    excerpt:
      'Published guidance puts interior walls at five to seven years and exterior wood at three to seven — but the number that matters is what your surfaces are telling you.',
    date: '2026-07-02',
    photo: 'interior',
    readMinutes: 5,
    answer:
      'Published guidance suggests interior walls every five to seven years, high-traffic areas every three to five, and ceilings every eight to ten. Outside, expect wood every three to seven years, stucco every five to ten, and properly painted brick every eight to fifteen.',
    sections: [
      {
        h2: 'Interior intervals and why they vary so much',
        body: [
          'Bedrooms and formal rooms get very little wear and can go a decade looking acceptable. Hallways, stairwells, kitchens and bathrooms take constant contact, moisture and cleaning, and published guidance puts those at three to five years.',
          'Ceilings are the outlier at eight to ten years, simply because nothing touches them. They usually get repainted because of a water stain or because the walls around them have been done and the contrast has become obvious.',
        ],
      },
      {
        h2: 'Exterior intervals and the freeze-thaw factor',
        body: [
          'Exterior life depends far more on substrate and exposure than on the paint itself. South and west elevations take the most sun and weather, and it is normal for those to need attention on a shorter cycle than the north side of the same house.',
          'Freeze-thaw is the local driver. The Toronto area averages around 61.9 freeze-thaw cycles a year, and each one drives moisture into any hairline crack in the coating and then expands it. That is why a coating that is merely tired should be recoated before it breaks.',
        ],
      },
      {
        h2: 'Recoat before the film fails, not after',
        body: [
          'This is the single most useful thing on this page. Recoating an exterior while the paint film is still intact means washing, light sanding and two coats. Waiting until it has broken and bare wood has been through a winter means scraping, rot repair and priming first.',
          'The difference in cost between those two jobs is substantial, and it is entirely decided by timing.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I know if my house needs repainting?', a: 'Look for chalking when you rub the surface, hairline cracking in the film, fading that is uneven between elevations, and any place where the coating has lost its edge. Any of those means the paint is at the end of its service life, even if nothing has peeled yet.' },
      { q: 'Does repainting actually add value when selling?', a: 'HomeLight’s 2024 Top Agent Insights report ranks interior painting the number one pre-listing improvement by return, recovering roughly 55 to 107 percent of its cost at sale. It is consistently among the highest-return things you can do before listing.' },
      { q: 'How long should a good exterior paint job last?', a: 'On wood, published guidance is three to seven years, and the range is wide because exposure and preparation matter more than product. A properly prepared, primed and two-coated exterior on a sheltered elevation can comfortably exceed the top of that range.' },
      { q: 'Should I repaint before or after selling?', a: 'Before, if you are doing it for return. The value is in how the property shows to buyers, and neutral, freshly painted rooms photograph and present far better. After you have an offer, the incentive largely disappears.' },
    ],
  },
  {
    slug: 'do-i-need-primer',
    title: 'Do I Actually Need Primer? What Paint-and-Primer-in-One Won’t Do',
    keyword: 'do I need primer before painting',
    excerpt:
      'Paint-and-primer-in-one products are finish paints with better adhesion. They are not real primers, and there are specific jobs they cannot do.',
    date: '2026-07-24',
    photo: 'prep',
    readMinutes: 5,
    answer:
      'You need a real primer on bare substrate, over stains, over glossy or chalky surfaces, and when making a drastic colour change. Paint-and-primer-in-one is a finish paint with improved adhesion — it will not seal a water stain or lock down a chalky surface.',
    sections: [
      {
        h2: 'What a primer actually does',
        body: [
          'A primer is not just a first coat. It seals porous substrate so the finish coat does not soak in unevenly, it creates adhesion on surfaces the topcoat could not grip, and it blocks staining that would otherwise bleed through.',
          'Different problems need different primers, which is the part that gets skipped. Shellac-based for water stains, smoke damage and odour. Latex for new drywall. A bonding primer for glossy, chalky or previously oil-painted surfaces.',
        ],
      },
      {
        h2: 'The jobs paint-and-primer-in-one cannot do',
        body: [
          'It will not seal a water stain. Tannin dissolves into each new coat and migrates back to the surface, which is why a ceiling ring reappears no matter how many coats go over it.',
          'It will not lock down a chalky exterior. Rub an older painted surface and if a powder comes off on your hand, anything applied over it is bonding to powder rather than to the wall.',
          'It will not reliably grip previously oil-painted trim without de-glossing. That is the single most common reason repainted trim peels within a year.',
        ],
      },
      {
        h2: 'When you genuinely can skip it',
        body: [
          'Repainting a sound, clean, previously painted interior wall in a similar colour is the case where a quality paint-and-primer-in-one is perfectly adequate. That is a large share of ordinary interior work, and there is no need to over-specify it.',
          'The rule is simple: if the surface is bare, stained, glossy, chalky, or you are making a drastic colour change, prime it properly first.',
        ],
      },
    ],
    faqs: [
      { q: 'Is paint-and-primer-in-one good enough for new drywall?', a: 'No. New drywall needs a dedicated drywall primer to seal the paper and the joint compound evenly. Without it the compound absorbs differently from the paper and the joints flash through the finish coat as visible bands.' },
      { q: 'Do I need to prime before painting over dark walls?', a: 'A tinted grey-scale primer is worth it. Going dark to light otherwise takes three or four finish coats, and a single primer coat plus two finish coats is both cheaper and gives a more even result.' },
      { q: 'Can you paint over glossy paint without sanding?', a: 'Only with a bonding primer specifically made for slick surfaces, and even then de-glossing gives a better result. Paint applied straight onto a gloss finish has nothing to key into and will peel in sheets when knocked.' },
      { q: 'How long should primer dry before painting?', a: 'Follow the recoat time on the product, which is typically a few hours but extends considerably in cold or humid conditions. Coating over primer before it has cured traps solvent and undermines the adhesion the primer was there to provide.' },
    ],
  },
];

export const postSlugs = posts.map((p) => p.slug);
export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p])) as Record<string, Post>;
