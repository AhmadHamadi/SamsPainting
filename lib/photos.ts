// ---------------------------------------------------------------------------
// Verified photo catalogue.
//
// EVERY entry below was downloaded, OPENED AND VISUALLY INSPECTED before being
// assigned to a page. The `alt` text describes what is actually in the frame,
// not what the filename or the stock-site slug claimed. Two candidates were
// rejected at this stage and replaced: one exterior shot had palm trees in it
// (wrong region for a Hamilton painter) and its replacement showed painters in
// a competitor's branded uniform.
//
// `width` and `height` are the real intrinsic pixel dimensions of the files in
// /public/images/photos, read off the images themselves. They are rendered as
// width/height attributes so the browser reserves the right box and CLS stays
// at zero.
//
// All images are self-hosted. Nothing here depends on a third-party CDN at
// runtime. Licensing: Unsplash and Pexels, both free for commercial use with
// no attribution required.
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
    alt: 'Two painters at work inside a home, one in an orange hard hat rolling fresh paint onto a hallway wall with the floors covered in protective paper',
    width: 1600,
    height: 1067,
  },
  interior: {
    src: '/images/photos/interior.jpg',
    alt: 'Freshly painted cream and beige living room with a linen sofa, round rattan mirrors and a pale neutral wall finish',
    width: 1600,
    height: 1172,
  },
  exterior: {
    src: '/images/photos/exterior.jpg',
    alt: 'Painter in a red hooded top rolling teal exterior paint across horizontal wood siding, part-way through covering the bare boards',
    width: 1600,
    height: 1050,
  },
  cabinets: {
    src: '/images/photos/cabinets.jpg',
    alt: 'Repainted white shaker kitchen cabinets with brushed gold bar pulls, a marble backsplash and a light wood floor',
    width: 1600,
    height: 1067,
  },
  ceiling: {
    src: '/images/photos/ceiling.jpg',
    alt: 'Painter rolling white ceiling paint overhead using a long extension pole in an empty room',
    width: 1600,
    height: 2397,
  },
  trim: {
    src: '/images/photos/trim.jpg',
    alt: 'Painter in overalls brushing white enamel onto a window sill and trim above a radiator in a grey-green room',
    width: 1600,
    height: 2396,
  },
  'front-door': {
    src: '/images/photos/front-door.jpg',
    alt: 'Freshly painted pale grey front door with a white portico on a red brick house, framed by clipped box hedges',
    width: 1600,
    height: 1079,
  },
  door: {
    src: '/images/photos/door.jpg',
    alt: 'Bright yellow six-panel front door with a brass knob and letterplate set into a red brick arched surround',
    width: 1600,
    height: 2812,
  },
  deck: {
    src: '/images/photos/deck.jpg',
    alt: 'Freshly stained light wooden deck with a timber table and chairs, overlooking a pine forest',
    width: 1600,
    height: 1076,
  },
  stain: {
    src: '/images/photos/stain.jpg',
    alt: 'Tradesman brushing warm amber wood stain along a wide timber plank, working with the grain',
    width: 1600,
    height: 2400,
  },
  fence: {
    src: '/images/photos/fence.jpg',
    alt: 'Close-up of a block brush applying reddish-brown stain to a wooden fence post',
    width: 1600,
    height: 2133,
  },
  wallpaper: {
    src: '/images/photos/wallpaper.jpg',
    alt: 'Wall part-way through wallpaper removal, with blue patterned paper stripped back to expose bare plaster underneath',
    width: 1600,
    height: 1067,
  },
  drywall: {
    src: '/images/photos/drywall.jpg',
    alt: 'Hands holding a wide taping knife loaded with white joint compound, filling and smoothing a drywall repair',
    width: 1600,
    height: 1067,
  },
  prep: {
    src: '/images/photos/prep.jpg',
    alt: 'Hand holding a compound-covered scraper flat against a wall, preparing the surface before painting',
    width: 1600,
    height: 2400,
  },
  'pressure-wash': {
    src: '/images/photos/pressure-wash.jpg',
    alt: 'Worker in a yellow rain jacket and face shield pressure washing the lap siding of a house',
    width: 1600,
    height: 2133,
  },
  spray: {
    src: '/images/photos/spray.jpg',
    alt: 'Gloved hand in white coveralls holding an airless spray gun, laying down an even fan of blue paint on a wall',
    width: 1600,
    height: 1067,
  },
  epoxy: {
    src: '/images/photos/epoxy.jpg',
    alt: 'Glossy light grey epoxy-coated concrete floor in a large garage, reflecting the overhead lighting',
    width: 1600,
    height: 1067,
  },
  garage: {
    src: '/images/photos/garage.jpg',
    alt: 'Row of residential garages with white sectional doors and tan siding, seen from the street',
    width: 1600,
    height: 1067,
  },
  stairs: {
    src: '/images/photos/stairs.jpg',
    alt: 'Curved staircase with slim white painted spindles, a dark polished handrail and sage green walls',
    width: 1600,
    height: 2133,
  },
  colour: {
    src: '/images/photos/colour.jpg',
    alt: 'Paint colour sample cards fanned into a full circle, spanning the whole spectrum, laid on a grey surface',
    width: 1600,
    height: 974,
  },
  supplies: {
    src: '/images/photos/supplies.jpg',
    alt: 'Flat lay of painting supplies: a roller tray with roller, two wooden-handled brushes and open paint cans',
    width: 1600,
    height: 1067,
  },
  'empty-room': {
    src: '/images/photos/empty-room.jpg',
    alt: 'Empty room prepared for painting, with a wooden stepladder, roller on a pole, masking tape along the baseboard and drop cloths covering the floor',
    width: 1600,
    height: 1067,
  },
  crew: {
    src: '/images/photos/crew.jpg',
    alt: 'Two painters in white work uniforms and protective gear finishing the walls of a bare room, one working from stilts',
    width: 1600,
    height: 2400,
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
