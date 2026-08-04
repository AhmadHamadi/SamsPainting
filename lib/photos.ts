// ---------------------------------------------------------------------------
// Verified photo catalogue.
//
// EVERY entry below was downloaded, OPENED AND VISUALLY INSPECTED before being
// assigned to a page. The `alt` text describes what is actually in the frame,
// not what the filename or stock-site slug claimed.
//
// Rejected during review, for the record: an exterior shot with palm trees
// (wrong hemisphere for a Hamilton painter), its replacement showing painters
// in a competitor's branded uniform, wood siding standing in for painted brick,
// a scraper on drywall standing in for rust, and a wood-staining shot with a
// visible face.
//
// NO IDENTIFIABLE FACES. A photograph on a small owner-operated site reads as
// "this is the crew", so a stock face implies someone who is not Sam. Hands,
// forearms and backs-of-people only.
//
// `width` and `height` are the true intrinsic pixel dimensions of the files in
// /public/images/photos, read off the images themselves, so the browser
// reserves the right box and CLS stays at zero.
//
// All images self-hosted. Licensing: Unsplash and Pexels, free for commercial
// use with no attribution required.
// ---------------------------------------------------------------------------

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const photos = {
  hero: {
    src: '/images/photos/hero.jpg',
    alt: 'Paint roller on an extension pole laying a coat of soft blue paint over a white interior wall, leaving a crisp straight cut line',
    width: 1800,
    height: 1257,
  },

  // ── Interiors ────────────────────────────────────────────────────────────
  interior: {
    src: '/images/photos/interior.jpg',
    alt: 'Freshly painted living room with white board-and-batten wall panelling, built-in shelving and a cream sofa beside tall white-trimmed windows',
    width: 1800,
    height: 1180,
  },
  bedroom: {
    src: '/images/photos/bedroom.jpg',
    alt: 'Bedroom with a deep sage painted wall and crisp applied panel moulding behind the bed, brass pendant lights and a white painted ceiling',
    width: 1800,
    height: 1180,
  },
  'empty-room': {
    src: '/images/photos/empty-room.jpg',
    alt: 'Empty room prepared for painting, with a wooden stepladder, roller on a pole, masking tape along the baseboard and drop cloths covering the floor',
    width: 1600,
    height: 1067,
  },
  ceiling: {
    src: '/images/photos/ceiling.jpg',
    alt: 'White paint roller on a long extension pole worked across a clean ceiling, with no lap marks in the finish',
    width: 1800,
    height: 2695,
  },
  trim: {
    src: '/images/photos/trim.jpg',
    alt: 'Hand cutting in a straight line with a brush along the edge of a wall beside crisp white door casing',
    width: 1800,
    height: 1180,
  },
  door: {
    src: '/images/photos/door.jpg',
    alt: 'Freshly painted white panelled interior door and full casing set into white wall panelling above a dark walnut floor',
    width: 1800,
    height: 1180,
  },
  stairs: {
    src: '/images/photos/stairs.jpg',
    alt: 'Staircase with crisp white painted spindles, handrail and fluted newel post against a deep olive wall',
    width: 1800,
    height: 2700,
  },

  // ── Kitchens ─────────────────────────────────────────────────────────────
  cabinets: {
    src: '/images/photos/cabinets.jpg',
    alt: 'Repainted white shaker kitchen cabinets with slim brushed-brass bar pulls, a white painted chimney hood and a dark waterfall island',
    width: 1800,
    height: 1180,
  },
  'cabinets-navy': {
    src: '/images/photos/cabinets-navy.jpg',
    alt: 'Kitchen with deep navy painted shaker base cabinets and white painted uppers, brass hardware and a white subway tile backsplash',
    width: 1800,
    height: 1180,
  },

  // ── Exteriors ────────────────────────────────────────────────────────────
  exterior: {
    src: '/images/photos/exterior.jpg',
    alt: 'Painter rolling teal exterior paint across horizontal wood siding, part-way through covering the bare boards',
    width: 1600,
    height: 1050,
  },
  'exterior-work': {
    src: '/images/photos/exterior-work.jpg',
    alt: 'Two-storey house part-way through an exterior repaint, with a boom lift raised to the upper storey and drop sheets laid along the kerb',
    width: 1800,
    height: 1180,
  },
  brick: {
    src: '/images/photos/brick.jpg',
    alt: 'White-painted brick house with black shutters and a black front door, the brick courses and mortar lines still reading through the paint',
    width: 1800,
    height: 1180,
  },
  stucco: {
    src: '/images/photos/stucco.jpg',
    alt: 'Contemporary cream stucco house with a bold gable and dark-framed windows against a clear blue sky',
    width: 1800,
    height: 1180,
  },
  siding: {
    src: '/images/photos/siding.jpg',
    alt: 'Craftsman-style home clad in sage-green horizontal siding with white trim, a brick skirt and a covered front porch',
    width: 1800,
    height: 1180,
  },
  'front-door': {
    src: '/images/photos/front-door.jpg',
    alt: 'Contemporary entrance with a freshly painted terracotta front door framed by dry-stack stone and sage board-and-batten cladding',
    width: 1800,
    height: 1180,
  },
  garage: {
    src: '/images/photos/garage.jpg',
    alt: 'Detached residential garage with a white sectional door and clean concrete driveway',
    width: 1600,
    height: 1067,
  },

  // ── Wood & outdoor ───────────────────────────────────────────────────────
  deck: {
    src: '/images/photos/deck.jpg',
    alt: 'Freshly stained honey-toned timber deck wrapping a modern home, with a black steel pergola and outdoor dining set',
    width: 1800,
    height: 1180,
  },
  stain: {
    src: '/images/photos/stain.jpg',
    alt: 'Hands brushing warm honey wood stain along a timber plank, the wet coat contrasting against the dry bare wood',
    width: 1800,
    height: 1180,
  },
  fence: {
    src: '/images/photos/fence.jpg',
    alt: 'Block brush drawing reddish-brown stain down a wooden fence picket, the freshly coated board standing out against the raw ones',
    width: 1600,
    height: 2133,
  },
  'pressure-wash': {
    src: '/images/photos/pressure-wash.jpg',
    alt: 'Worker in a yellow rain jacket pressure washing the lap siding of a two-storey house',
    width: 1600,
    height: 2133,
  },

  // ── Preparation & repair ─────────────────────────────────────────────────
  drywall: {
    src: '/images/photos/drywall.jpg',
    alt: 'Hands working white joint compound into a wall with a taping knife, smoothing a drywall repair flat',
    width: 1800,
    height: 2696,
  },
  prep: {
    src: '/images/photos/prep.jpg',
    alt: 'Hand working a sanding block into a drywall corner, keying the surface flat before priming',
    width: 1800,
    height: 2696,
  },
  caulk: {
    src: '/images/photos/caulk.jpg',
    alt: 'Gloved hand running a bead of sealant along the joint between a window frame and the surrounding framing',
    width: 1600,
    height: 1050,
  },
  rust: {
    src: '/images/photos/rust.jpg',
    alt: 'Painted metal fence posts with orange rust bleeding through and the coating blistering away at the joints and bolt brackets',
    width: 1600,
    height: 1050,
  },
  wallpaper: {
    src: '/images/photos/wallpaper.jpg',
    alt: 'Wall part-way through wallpaper removal, with patterned paper stripped back to expose the bare plaster underneath',
    width: 1600,
    height: 1067,
  },

  // ── Specialty & colour ───────────────────────────────────────────────────
  spray: {
    src: '/images/photos/spray.jpg',
    alt: 'Gloved hand gripping an airless spray gun with an orange reversible tip, hose curving away across a prepared wall',
    width: 1800,
    height: 2700,
  },
  epoxy: {
    src: '/images/photos/epoxy.jpg',
    alt: 'Glossy light grey epoxy-coated concrete floor reflecting the overhead lighting',
    width: 1600,
    height: 1067,
  },
  colour: {
    src: '/images/photos/colour.jpg',
    alt: 'Overhead flat lay of paint colour sample cards in cream, taupe, charcoal and warm brown scattered across an ochre background',
    width: 1800,
    height: 1180,
  },
  supplies: {
    src: '/images/photos/supplies.jpg',
    alt: 'Flat lay of painting supplies: a roller tray with roller, wooden-handled brushes and open paint cans',
    width: 1600,
    height: 1067,
  },
  crew: {
    src: '/images/photos/crew.jpg',
    alt: 'Painter in white work overalls and protective gear finishing the walls of a bare room from stilts',
    width: 1600,
    height: 2400,
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
