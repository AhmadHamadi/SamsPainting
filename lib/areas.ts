// ---------------------------------------------------------------------------
// Service-area data — the engine behind every city and city x service page.
//
// SOURCING RULE: every fact below was verified during research (municipal
// sources, Statistics Canada 2021 Census, the Ontario Heritage Act e-Register,
// city heritage pages). Claims that could not be verified were DROPPED rather
// than guessed — notably siding-material prevalence, housing-age percentages,
// freeze-thaw counts and precise drive times, none of which have a citable
// source for these municipalities.
//
// Heritage note that applies site-wide: under the Ontario Heritage Act a permit
// is only ever triggered on a Part IV individually designated property or a
// Part V property inside a designated Heritage Conservation District. Merely
// being "listed" on a municipal register triggers nothing. For the vast
// majority of homes in every city below, repainting needs no permit at all —
// and each page says so plainly, because it is both true and reassuring.
// ---------------------------------------------------------------------------

export type City = {
  slug: string;
  name: string;
  /** Used in prose: "across Halton Region", "in Niagara Region". */
  region: string;
  /** Governing municipality for heritage/by-law purposes. */
  authority: string;
  lat: number;
  lng: number;
  /** 2021 Census unless noted. Omitted where no reliable figure exists. */
  population?: string;
  populationNote?: string;
  driveTime: string;
  /** Real, named neighbourhoods and communities. Never invented. */
  neighbourhoods: string[];
  /** One distinctive sentence — the city's character in Sam's voice. */
  angle: string;
  /** Housing stock and architecture. Unique per city. */
  housing: string;
  /** What that housing means for a painting job here specifically. */
  conditions: string;
  /** Heritage / permit reality, honestly stated. */
  permits: string;
  /** Official heritage or planning page for that municipality. */
  permitUrl: string;
  landmarks: string[];
  roads: string[];
};

export const cities: City[] = [
  {
    slug: 'hamilton',
    name: 'Hamilton',
    region: 'Hamilton',
    authority: 'City of Hamilton',
    lat: 43.2557,
    lng: -79.8711,
    population: '569,353',
    driveTime: 'our home base',
    neighbourhoods: [
      'Westdale', 'Durand', 'Kirkendall', 'Strathcona', 'Corktown', 'Stinson',
      'Ainslie Wood', 'Crown Point', 'Stipeley', 'Gibson', 'Landsdale', 'Rosedale',
      'Riverdale', 'North End', 'Bruleville', 'Inch Park', 'Concession Street',
      'Templemead', 'Hampton Heights', "Ryckman's Corners", 'Falkirk', 'Mohawk',
    ],
    angle:
      'The Escarpment splits Hamilton into two entirely different painting markets, and a crew that only knows one of them will get the other wrong.',
    housing:
      'Below the Escarpment you are almost always working on pre-1940 brick — late-Victorian and Edwardian in Durand and Kirkendall, 1920s Garden City planning and Tudor Revival in Westdale, and tight 19th-century worker housing through Corktown, Strathcona and the North End. Above it, the Mountain is overwhelmingly post-war: 1950s and 60s bungalows and side-splits through Bruleville, Inch Park and Macassa, 1970s and 80s in Templemead and Hampton Heights, and 1990s-onward subdivisions south of the LINC.',
    conditions:
      'Health Canada advises that homes built before 1960 probably contain lead-based paint, and pre-1960 coatings ran 30–50% pure lead. Canada did not cap paint at 0.5% lead until 1976. Hamilton’s lower city is almost entirely pre-1960, so every exterior scrape down there is treated as lead-presumptive unless it is tested, and handled under the EACO lead guideline with dust control rather than dry-sanded. Pre-1950 interiors are lath-and-plaster, which means skim-coating and crack-bridging are routine scope in Durand, Corktown and Crown Point rather than an extra. North-end and east-end exteriors also carry genuine industrial soiling, so they need a proper degreasing washdown before primer instead of a rinse.',
    permits:
      'Hamilton has seven Heritage Conservation Districts: Durand-Markland, MacNab-Charles, St. Clair Avenue, St. Clair Boulevard and Hamilton Beach in the city, Cross-Melville in Dundas, and Mill Street in Waterdown. Inside those, exterior alterations need a Heritage Permit, though there is no fee and interior work is exempt under Part V. Outside them, and that is well over 99% of Hamilton homes including the entire Mountain, repainting needs no permit whatsoever. Worth knowing: Hamilton’s Property Standards By-law 10-221 actually requires exterior walls to be maintained "by painting, restoring or repairing".',
    permitUrl: 'https://www.hamilton.ca/build-invest-grow/planning-development/heritage-properties/heritage-permits',
    landmarks: ['the Niagara Escarpment', 'Gage Park', 'Locke Street South', 'Ottawa Street North', 'James Street North', 'Dundurn Castle', 'Bayfront Park', 'Albion Falls'],
    roads: ['the QEW', 'Highway 403', 'the Lincoln Alexander Parkway', 'the Red Hill Valley Parkway', 'Upper James Street'],
  },
  {
    slug: 'stoney-creek',
    name: 'Stoney Creek',
    region: 'Hamilton',
    authority: 'City of Hamilton',
    lat: 43.2164,
    lng: -79.755,
    population: '76,382',
    driveTime: 'about 15–20 minutes east of downtown Hamilton',
    neighbourhoods: [
      'Stoney Creek village core', 'Winona', 'Winona Park', 'Fruitland',
      'Community Beach', 'Fifty Point', 'Stoney Creek Mountain', 'Heritage Green',
      'Elfrida', 'Vincent',
    ],
    angle:
      'Stoney Creek runs from the lakeshore up over the brow, and the houses at the two ends were built forty years and one whole construction era apart.',
    housing:
      'This was fruit-growing country before it was suburb, and it shows in the layering. The old village core holds 19th-century stock, then a very large subdivision band went in across the lower city through the 1970s and 80s, and the mountain side above the brow filled in from the 1990s onward with brick veneer and stucco accents. Plenty of the township is still farmland.',
    conditions:
      'The 1970s and 80s lower-city cohort is the interesting one: that generation of siding is now decades into weathering, and a proper chalk test plus a bonding primer turns a repaint into a genuine alternative to replacement. Properties out at Community Beach and Fifty Point sit directly on Lake Ontario, so they take wind-driven rain and sustained humidity, though being fresh water there is no salt in it. The 1990s-onward mountain builds are simply past the life of their original builder finish. Lead paint is confined to the pre-1960 village core.',
    permits:
      'Stoney Creek amalgamated into the City of Hamilton on 1 January 2001, so Hamilton’s heritage rules apply. There is no Heritage Conservation District anywhere in Stoney Creek. A handful of individually designated properties exist, Battlefield House among them, but for every ordinary house here repainting needs no permit at all.',
    permitUrl: 'https://www.hamilton.ca/build-invest-grow/planning-development/heritage-properties',
    landmarks: ['Battlefield House and Monument', 'the Devil’s Punchbowl', 'Fifty Point Conservation Area', 'the Erland Lee Museum', 'Eramosa Karst'],
    roads: ['the QEW', 'Highway 8', 'Centennial Parkway', 'Green Mountain Road', 'the Red Hill Valley Parkway'],
  },
  {
    slug: 'ancaster',
    name: 'Ancaster',
    region: 'Hamilton',
    authority: 'City of Hamilton',
    lat: 43.22556,
    lng: -79.97667,
    population: '40,557',
    driveTime: 'about 15 minutes from downtown Hamilton',
    neighbourhoods: [
      'Ancaster Village', 'The Meadowlands', 'Ancaster Heights', 'Sulphur Springs',
      'the Wilson Street corridor', "Duff's Corners", 'Lime Kiln', 'Old Dundas Road',
    ],
    angle:
      'Ancaster asks for two completely different trades in one town: pre-1900 stone in the village, and 3,000-square-foot executive elevations out in the Meadowlands.',
    housing:
      'Founded in 1792 as Wilson’s Mills, Ancaster was Upper Canada’s largest industrial centre by 1823 and second only to Kingston in population. That left a genuinely old village core of stone and brick, some of the oldest domestic architecture in the region. Everything else is newer: the town expanded hard eastward, above all into the Meadowlands between the LINC and Garner Road, which filled with large-format 1980s-to-2000s executive housing.',
    conditions:
      'The village core brings pre-1900 realities: lead-presumptive coatings, lath-and-plaster walls, original wood sash that needs glazing attention as much as paint, and soft historic masonry that must never be aggressively blasted. The Meadowlands is the opposite problem, and it is a scale problem — two-storey elevations, tall open foyers and stairwells, and builder finishes now twenty to thirty years old. Ancaster’s ravine and escarpment-edge lots also mean plenty of treed north elevations that hold moisture and grow algae.',
    permits:
      'Ancaster is part of the City of Hamilton and has no Heritage Conservation District, despite a village core study having been discussed over the years. Individually designated properties include the Ancaster Old Mill, Griffin House and the Hermitage ruins. For every other Ancaster home, inside or out, repainting requires no municipal permit.',
    permitUrl: 'https://www.hamilton.ca/build-invest-grow/planning-development/heritage-properties',
    landmarks: ['the Ancaster Mill', 'Griffin House', 'Tiffany Falls', 'Sherman Falls', 'the Dundas Valley Conservation Area', 'Wilson Street'],
    roads: ['Highway 403', 'the Lincoln Alexander Parkway', 'Wilson Street', 'Garner Road', 'Golf Links Road'],
  },
  {
    slug: 'dundas',
    name: 'Dundas',
    region: 'Hamilton',
    authority: 'City of Hamilton',
    lat: 43.26611,
    lng: -79.95472,
    population: '24,285',
    populationNote: '2016 figure — the most recent published for Dundas specifically',
    driveTime: 'about 12–15 minutes from downtown Hamilton',
    neighbourhoods: [
      'downtown Dundas', 'the Cross-Melville district', 'Pleasant Valley', 'Greensville',
      'Sydenham Hill', 'University Gardens', 'the Governor’s Road corridor',
    ],
    angle:
      'They call it the Valley Town for a reason, and that valley is the single biggest factor in how paint behaves here.',
    housing:
      'Dundas holds one of the most intact 19th-century downtowns in Ontario, intact enough that film crews use it regularly. The Collins Hotel of 1841 claims to be the province’s longest-running hotel. Housing runs to mid and late 19th-century brick and stone, Ontario Cottage and Gothic Revival forms, with post-war and 1960s-to-80s infill filling the valley slopes above.',
    conditions:
      'Dundas carries the heaviest humidity load of any Hamilton community. It sits on a valley floor at the base of the Escarpment with Spencer Creek running through it and Cootes Paradise downstream, which means cold-air drainage, slower drying and a real mildew and algae risk on north and treed elevations. Recoat windows genuinely run longer here than they do on the Mountain. Lead-paint probability in the core is very high, interiors are plaster, and the historic soft brick and stone must not be pressure-blasted — nor, in most cases, painted at all if it has never been painted before.',
    permits:
      'The Cross-Melville Heritage Conservation District, by-law 90-3899, covers 38 properties on Cross, Victoria and Melville Streets. Exterior alterations inside it need a Heritage Permit, which carries no fee, while interior work is exempt. A Melville-Park West district plan existed in final-draft form in early 2026, so anyone near that boundary should check its current status. Everywhere else in Dundas, repainting needs no permit.',
    permitUrl: 'https://www.hamilton.ca/build-invest-grow/planning-development/heritage-properties/heritage-permits',
    landmarks: ['Webster’s Falls', 'Tew’s Falls', 'Dundas Peak', 'Spencer Gorge', 'the Dundas Valley School of Art', 'the Collins Hotel'],
    roads: ['King Street West', 'Governor’s Road', 'Cootes Drive', 'Highway 5', 'Highway 403'],
  },
  {
    slug: 'waterdown',
    name: 'Waterdown',
    region: 'Hamilton',
    authority: 'City of Hamilton',
    lat: 43.33333,
    lng: -79.88333,
    population: 'about 24,400',
    driveTime: 'about 15–20 minutes from downtown Hamilton',
    neighbourhoods: [
      'the Mill Street village core', 'Waterdown South', 'Waterdown North',
      'Smokey Hollow', 'Clappison’s Corners', 'the Grindstone Creek valley',
      'Parkside Drive', 'Mountain Brow Road',
    ],
    angle:
      'Waterdown sits on top of the Escarpment, which sounds like a detail until you realise it shortens the exterior painting season at both ends.',
    housing:
      'Ebenezer Culver Griffin bought out half of Alexander Brown’s property in 1823 and had it surveyed into village lots by 1830, which is why there is a dense pre-1900 stone-and-brick core here at all. Everything around it is new: the population grew almost 29% between 1996 and 2001 and has kept going, making Waterdown one of the most new-build-dominant communities in the Hamilton radius.',
    conditions:
      'Being up on the Escarpment brow means colder nights, more wind and longer freezing legs than the sheltered lower city, so Waterdown genuinely loses paintable days at both ends of the season compared with downtown Hamilton. That matters for scheduling more than for technique. The subdivision ring is straightforward modern work: drywall, brick veneer with stucco and fibre-cement accents, builder finishes hitting the ten-to-twenty-year mark, and a large cohort of cedar decks and fences reaching the end of their first stain cycle. The village core is the opposite, with lead-presumptive coatings and wood sash.',
    permits:
      'The Mill Street Heritage Conservation District, by-law 96-34-H, is the largest of Hamilton’s seven at roughly 130 properties, covering Mill Street North and South, Elgin Street and Dundas Street East. Exterior alterations there need a Heritage Permit and the local heritage committee asks to be consulted first. Every Waterdown home outside that boundary, which is the overwhelming majority, can be repainted with no permit.',
    permitUrl: 'https://www.hamilton.ca/build-invest-grow/planning-development/heritage-properties/heritage-permits',
    landmarks: ['the Great Falls at Smokey Hollow', 'Grindstone Creek', 'the Mill Street heritage streetscape', 'Memorial Hall', 'the Bruce Trail'],
    roads: ['Highway 6', 'Dundas Street', 'Waterdown Road', 'Parkside Drive', 'Clappison’s Cut'],
  },
  {
    slug: 'binbrook',
    name: 'Binbrook',
    region: 'Hamilton',
    authority: 'City of Hamilton',
    lat: 43.1217,
    lng: -79.8045,
    population: '10,791',
    driveTime: 'about 25 minutes from downtown Hamilton',
    neighbourhoods: [
      'the Binbrook village core', 'Fairgrounds', 'Binbrook Heights',
      'the Hall Road corridor', 'Southbrook', 'the White Church Road rural fringe',
    ],
    angle:
      'Binbrook is the cleanest new-build repaint market we work in — no lead, no plaster, no surprises behind the walls.',
    housing:
      'Surveyed in 1791 and named in 1792 after a town in Lincolnshire, Binbrook merged into Glanbrook in 1974 and into Hamilton in 2001. Glanbrook was Hamilton’s fastest-growing area through the 2000s, so the housing here is overwhelmingly recent: detached two-storeys and freehold townhomes from the 2000s onward, brick veneer at the front with vinyl or stucco down the sides and rear, wrapped around a small 19th-century agricultural village.',
    conditions:
      'The work here is refreshingly predictable. Builder-grade wall paint that has done its ten to twenty years, oversized open-concept foyers and two-storey stairwells that need proper staging rather than a ladder, and a large cohort of cedar decks and fences installed through the late 2000s now needing strip-and-restain rather than a top-up. What Binbrook does have is exposure: this is flat open farmland south of the Escarpment with very little tree cover, so wind loading is real, west elevations take wind-driven rain, and spray days need genuinely calm weather.',
    permits:
      'Binbrook is part of the City of Hamilton and has no Heritage Conservation District. There is no permit of any kind required to repaint a home here, inside or out.',
    permitUrl: 'https://www.hamilton.ca/build-invest-grow/planning-development/heritage-properties',
    landmarks: ['Binbrook Conservation Area and Lake Niapenco', 'the Binbrook Fair, one of North America’s oldest', 'the Agricultural Hall', 'Binbrook Little Theatre'],
    roads: ['Highway 56', 'Binbrook Road', 'Fletcher Road', 'Upper James Street', 'the Lincoln Alexander Parkway'],
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    region: 'Halton Region',
    authority: 'City of Burlington',
    lat: 43.37,
    lng: -79.81417,
    population: '186,948',
    driveTime: 'about 15–20 minutes from Hamilton',
    neighbourhoods: [
      'Aldershot', 'Roseland', 'Tyandaga', 'Millcroft', 'Headon Forest', 'The Orchard',
      'Alton Village', 'Brant Hills', 'Shoreacres', 'Mountainside', 'Dynes',
      'downtown Burlington', 'Wellington Square', 'Port Nelson',
    ],
    angle:
      'Burlington is the largest single market outside Hamilton we serve, and it spans everything from 1950s Roseland bungalows to houses finished last year.',
    housing:
      'Aldershot, annexed from East Flamborough Township in 1958, runs to post-war bungalows and mid-century homes with newer townhouses and condos near the GO station. Roseland picked back up in the late 1940s with smaller houses on large lots, then filled in through the 1960s and 70s with bungalows, split-levels and two-storeys under a mature canopy, and is now a heavy custom-rebuild area. Headon Forest is 1980s and 90s two-storeys, Millcroft is a 1990s-to-2000s golf-course community, and The Orchard began in the late 1990s and runs to more than 3,800 neo-colonial homes.',
    conditions:
      'The pre-1960 lead-paint band covers Aldershot, Roseland, Mountainside, Dynes and downtown, and exteriors built as late as 1990 can still carry lead, so age alone does not clear a house. Knob-and-tube era construction is standard in the early-1900s-to-1940s pockets, which usually signals plaster behind the walls. North Burlington runs up against the Escarpment at Mount Nemo and gets meaningfully more wind. Lakeshore Road properties take humidity and onshore wind, though Lake Ontario is fresh water so there is no salt in the spray.',
    permits:
      'This one surprises people: Burlington has no designated Heritage Conservation Districts at all. There is a single study area on Burlington Avenue and Ontario Street under by-law 02-2024 covering 33 properties. Burlington does not publish a painting-specific rule, so on an individually designated property it is worth a call to the heritage planner before changing colour. For the overwhelming majority of Burlington homes, repainting needs no permit of any kind.',
    permitUrl: 'https://www.burlington.ca/en/planning-and-development/heritage-conservation-planning.aspx',
    landmarks: ['Spencer Smith Park', 'the Brant Street Pier', 'the Royal Botanical Gardens', 'Mount Nemo Conservation Area', 'the Burlington Bay Skyway'],
    roads: ['the QEW', 'Highway 403', 'Dundas Street', 'Plains Road', 'Brant Street', 'Appleby Line', 'Guelph Line'],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    region: 'Halton Region',
    authority: 'Town of Oakville',
    lat: 43.45639,
    lng: -79.71389,
    population: '213,759',
    driveTime: 'about 25–35 minutes from Hamilton',
    neighbourhoods: [
      'Old Oakville', 'Kerr Village', 'Bronte', 'Eastlake', 'Clearview', 'College Park',
      'Iroquois Ridge North', 'Iroquois Ridge South', 'Glen Abbey', 'Palermo',
      'River Oaks', 'Uptown Core', 'West Oak Trails', 'Joshua Creek', 'Westmount',
    ],
    angle:
      'Few places hold finish work to a higher standard than Oakville, and with four heritage districts the town keeps everyone honest about it.',
    housing:
      'The Old Oakville district alone covers 162 primarily single-family 19th-century residences. Bronte was established in 1834 as a shipbuilding and stonehooking port on Twelve Mile Creek — not Sixteen Mile Creek, which is the downtown harbour — and its historic homes are largely late 19th century. Wedgewood Creek went up through the mid-to-late 1980s, Joshua Creek through the 1990s and early 2000s, and Westmount and Bronte Creek are the newest, still finishing out into the 2010s.',
    conditions:
      'Old Oakville and Bronte bring pre-1900 stock, so lead paint is highly probable, interiors are lath-and-plaster, and original wood trim, soffit, fascia and sash make exterior work prep-heavy rather than coverage-heavy. The 1980s-to-2000s neighbourhoods are a different job entirely: drywall, brick veneer with stucco accents, and builder finishes now twenty to thirty-five years old. Owners in Uptown Core, Joshua Creek and Westmount who hold a condo or freehold-townhome title should check approved colours with their property manager first, because front doors are usually a common element under section 98 of the Condominium Act.',
    permits:
      'Oakville has four Heritage Conservation Districts covering 418 properties: Old Oakville, First and Second Street, Trafalgar Road and Downtown Oakville. Kerr Village, despite what you will read elsewhere, is a neighbourhood and a BIA, not a heritage district. The Town does not publish a painting-specific rule, so on a designated property or inside a district the honest answer is to speak with the heritage planner before changing colour. Outside those, no permit is needed.',
    permitUrl: 'https://www.oakville.ca/business-development/planning-development/heritage-planning/heritage-districts-properties/',
    landmarks: ['Sixteen Mile Creek and Oakville Harbour', 'Bronte Harbour on Twelve Mile Creek', 'Bronte Creek Provincial Park', 'Glen Abbey Golf Club', 'Lakeshore Road'],
    roads: ['the QEW', 'Highway 403', 'the 407 ETR', 'Trafalgar Road', 'Dundas Street', 'Bronte Road'],
  },
  {
    slug: 'milton',
    name: 'Milton',
    region: 'Halton Region',
    authority: 'Town of Milton',
    lat: 43.50833,
    lng: -79.88333,
    population: '132,979',
    driveTime: 'about 30–35 minutes from Hamilton',
    neighbourhoods: [
      'Old Milton', 'Hawthorne Village', 'Beaty', 'Clarke', 'Coates', 'Dempsey',
      'Ford', 'Harrison', 'Scott', 'Timberlea', 'Willmott', 'Bronte Meadows',
      'Milton Heights', 'Campbellville',
    ],
    angle:
      'Milton was the fastest-growing municipality in Canada from 2001 to 2011, which means an enormous single cohort of houses all hitting their repaint window at once.',
    housing:
      'The growth figures here are genuinely unusual: up 71.4% between 2001 and 2006, then another 56.5% to 2011. That produced one very large, very uniform cohort of homes built in the 2000s. Hawthorne Village, established in 1999, is the emblem of it — Mattamy pioneered prefabricated construction there, pre-installing cabinetry, fixtures, electrical and plumbing to finish about 70 days faster than site-built. Old Milton, bounded by Bronte, Steeles, Ontario and Laurier, is the 19th-century core, and Campbellville is a rural hamlet in the old Nassagaweya township.',
    conditions:
      'That 2001-to-2011 cohort now dominates the work: drywall, brick veneer at the front with stucco and siding down the sides, original builder finishes fifteen to twenty-five years old, and cedar decks and fences at the end of their first life. Lead paint and knob-and-tube apply only to Old Milton and Campbellville’s pre-1950 stock; the new subdivisions have neither. Escarpment-side properties near Rattlesnake Point and Kelso take noticeably more wind than the rest of town.',
    permits:
      'Milton has no Heritage Conservation Districts at all, confirmed in the Town’s own downtown cultural heritage report. What Milton does do, uniquely clearly, is name painting explicitly: the Town lists "painting the exterior" among the alterations that require a heritage permit on a designated property. So if your home is individually designated, budget for that step. For every non-designated Milton home, which includes all of Hawthorne Village, Beaty, Ford, Coates, Scott and Harrison, no permit is required to repaint.',
    permitUrl: 'https://www.milton.ca/en/business-and-development/alter-a-heritage-property.aspx',
    landmarks: ['Rattlesnake Point', 'Kelso Conservation Area and Glen Eden', 'the Niagara Escarpment', 'Mill Pond', 'Campbellville'],
    roads: ['Highway 401', 'the 407 ETR', 'Highway 25', 'Steeles Avenue', 'Derry Road', 'James Snow Parkway'],
  },
  {
    slug: 'grimsby',
    name: 'Grimsby',
    region: 'Niagara Region',
    authority: 'Town of Grimsby',
    lat: 43.2,
    lng: -79.55,
    population: '28,883',
    driveTime: 'about 25–30 minutes from Hamilton',
    neighbourhoods: [
      'Grimsby Beach', 'Grimsby-on-the-Lake', 'the Casablanca Boulevard district',
      'the Main Street East historic core', 'Nelles Estates', 'the Escarpment area above Ridge Road',
      'the west end toward Winona',
    ],
    angle:
      'Grimsby is pinched into a narrow strip between Lake Ontario and the Escarpment, and the Beach cottages are some of the most prep-heavy exteriors anywhere in Niagara.',
    housing:
      'A Loyalist settlement at Forty Mile Creek from the 1780s, named Grimsby in 1816. The Beach is the story here: an 1859 Methodist camp-meeting ground where canvas tents became wooden "permanent tents" by the 1870s, peaking above 50,000 visitors in 1884, then an amusement park until around 1950. Worth being accurate about — the cottages there are a genuine mix of 19th-century campground originals and post-1950 rebuilds on the former park land, not uniformly Victorian. Main Street East is the historic residential core, and Grimsby-on-the-Lake at Casablanca is 1990s-to-2020s subdivision and mid-rise.',
    conditions:
      'The Beach "Painted Ladies" are cut-in work, not coverage work. Scroll-sawn trim, spindles, brackets and verandah posts in multi-colour schemes mean the hours go into brushwork and masking, and quoting them by square footage gets it badly wrong. Pre-1960 Beach and Main Street stock should be treated as lead-presumptive on exterior wood. Geographically Grimsby is squeezed: lakeshore properties take direct onshore wind and wind-driven rain on north elevations, while houses at the base of the Escarpment sit in cold-air drainage with high humidity and slower drying.',
    permits:
      'Grimsby has no designated Heritage Conservation District. A Main Street East district is at the plan phase and the Town has been explicit that no decision has been made on whether it will proceed. There are 88 individually designated heritage properties town-wide. For any non-designated Grimsby home, repainting needs no permit.',
    permitUrl: 'https://www.grimsby.ca/parks-recreation-and-culture/history-and-heritage/heritage-properties/',
    landmarks: ['Grimsby Beach and its Painted Ladies', 'Forty Mile Creek', 'the Niagara Escarpment', 'Casablanca Waterfront Park', 'the Peach King Centre'],
    roads: ['the QEW with three interchanges', 'Main Street West and East', 'Casablanca Boulevard', 'Ontario Street'],
  },
  {
    slug: 'caledonia',
    name: 'Caledonia',
    region: 'Haldimand County',
    authority: 'Haldimand County',
    lat: 43.06475,
    lng: -79.95508,
    population: '12,179',
    driveTime: 'about 25–30 minutes south of Hamilton',
    neighbourhoods: [
      'the Argyle Street core', 'Caledonia Heights', 'the Highway 6 corridor subdivisions',
      'the Seneca and Oneida riverbank', 'the McClung Road area', 'the Haldimand Road rural fringe',
    ],
    angle:
      'Caledonia grew 23.9% in five years, the fastest of anywhere we serve, so there is a big new-build cohort sitting right alongside a Victorian mill town.',
    housing:
      'The town was formed by the 1853 merger of the Oneida and Seneca villages and grew as a mill town after dams went in through 1834 and 1835. That gives a genuine mid-19th-century core of brick and frame housing along Argyle Street. Against it sits a very large recent growth band — the 2016-to-2021 jump was the sharpest in the region, so a whole cohort of houses is now approaching its first repaint.',
    conditions:
      'The Grand River is the defining local factor. Riverbank and low-lying properties carry elevated basement and lower-level moisture, which shows up as efflorescence on masonry and as recurring failure on below-grade coatings if the source is not dealt with first. The pre-1960 core brings lead paint, plaster and knob-and-tube-era construction; the new subdivisions bring none of that but do sit on open, flat, exposed land south of the Escarpment where wind is a real scheduling factor.',
    permits:
      'Caledonia is governed by Haldimand County as a single tier. There are more than 40 designated heritage properties county-wide and no Heritage Conservation District at all. Heritage Haldimand must approve work affecting a designated building. Haldimand does not publish a painting-specific rule either way, so on a designated property it is worth confirming. Every other Caledonia home can be repainted with no permit.',
    permitUrl: 'https://www.haldimandcounty.ca/recreation-culture-community/heritage-and-culture/heritage-designated-properties/',
    landmarks: ['the Grand River', 'the 1927 nine-span bridge, the only one of its kind in Canada', 'Kinsmen Park', 'the Caledonia Fair', 'Edinburgh Square'],
    roads: ['Highway 6 and the Caledonia Bypass', 'Argyle Street', 'Caithness Street', 'Highway 54 along the Grand'],
  },
  {
    slug: 'brantford',
    name: 'Brantford',
    region: 'Brant',
    authority: 'City of Brantford',
    lat: 43.15694,
    lng: -80.2575,
    population: '104,688',
    driveTime: 'about 35–45 minutes from Hamilton',
    neighbourhoods: [
      'Eagle Place', 'Echo Place', 'Terrace Hill', 'West Brant', 'Holmedale',
      'Greenbrier', 'Lynden Hills', 'Brier Park', 'Myrtleville', 'Branlyn', 'North End',
    ],
    angle:
      'Brantford was once Canada’s third-ranked city for exported manufactured goods, and the worker housing that boom built is exactly what we spend our time on here.',
    housing:
      'The Brant Avenue heritage district alone covers 132 properties, mostly residential and built between 1870 and 1889 — the densest concentration of pre-1890 stock in the city. Terrace Hill is predominantly pre-1960 detached character housing with original brickwork. The Massey-Harris and Cockshutt Plow era built out Eagle Place, Holmedale and Echo Place in the late-Victorian through interwar range, and that industry’s collapse through the 1980s and 90s is why the stock is so intact. West Brant along Shellard Lane is modern brick-veneer and vinyl subdivision.',
    conditions:
      'Lead risk is high across Terrace Hill and the entire Brant Avenue district. The bigger local factor is the Grand River: the conservation authority names Brantford among the communities with a history of ice jams and maintains dikes protecting low-lying areas here. Flooding happens in every season — spring melt, summer and autumn rainstorms, winter ice jams. On the Holmedale, Eagle Place and Echo Place river flats that means elevated lower-level moisture, efflorescence and shorter repaint cycles unless the moisture path is addressed.',
    permits:
      'Brantford has two Heritage Conservation Districts: Brant Avenue, designated under by-law 239-88 in 1988, and Victoria Park Square. Helpfully, the City states plainly that maintenance projects such as repainting wood trim are typically straightforward, and directs owners to confirm whether work is exempt. On a non-designated Brantford property, repainting needs no permit at all. Inside the districts, repainting already-painted trim is treated as routine — but confirm first before painting previously unpainted brick or stone.',
    permitUrl: 'https://www.buildbrantford.ca/planning-and-development-services/heritage-planning/',
    landmarks: ['the Grand River', 'the Bell Homestead National Historic Site', 'the Sanderson Centre', 'Victoria Park', 'the Lorne Bridge'],
    roads: ['Highway 403', 'Highway 24', 'Colborne Street', 'Brant Avenue', 'the Wayne Gretzky Parkway'],
  },
  {
    slug: 'st-catharines',
    name: 'St. Catharines',
    region: 'Niagara Region',
    authority: 'City of St. Catharines',
    lat: 43.15833,
    lng: -79.24583,
    population: '136,803',
    driveTime: 'about 45 minutes from Hamilton',
    neighbourhoods: [
      'Port Dalhousie', 'Merritton', 'Western Hill', 'Facer', 'Grantham',
      'Secord Woods', 'Martindale Heights', 'Glenridge', 'Power Glen', 'Port Weller',
      'downtown', 'the North End', 'Vansickle', 'Lakeshore', 'Fitzgerald',
    ],
    angle:
      'St. Catharines has the largest absolute lead-paint exposure of anywhere we work, because the canal-era core and a huge post-war band overlap.',
    housing:
      'A Loyalist settlement from 1779 on Twelve Mile Creek, grown by the Welland Canal and the flour milling and canal industry around it. The defining fact is explosive post-war growth: large tracts of 1945-to-1970 bungalows, side-splits and back-splits across Grantham, Facer, Secord Woods, Martindale Heights, Fitzgerald and the North End. Merritton was an independent industrial town until it amalgamated in 1961 and still holds its mill-worker housing. Port Dalhousie has the best-preserved 19th-century canal village stock in Canada, including the entry locks of the first three Welland Canals.',
    conditions:
      'Two lead-paint populations overlap here, which is unusual: the pre-1960 canal-era and Merritton worker housing, plus an enormous 1945-to-1975 band whose exteriors may still carry lead given Canada only capped it in 1976. The plaster-to-drywall inflection runs straight through the city’s housing, so plaster repair and skim-coating are routine scope on anything pre-1955. Aluminium siding is very common on the 1950s-to-70s stock, and with degreasing, chalk removal and a bonding primer it repaints well rather than needing replacement. Port Dalhousie and Port Weller take lakeshore exposure; Glenridge and Power Glen sit under the Escarpment brow.',
    permits:
      'St. Catharines has four Heritage Conservation Districts: Port Dalhousie, Power Glen, Queen Street and Yates Street. There is no Queenston Street district, whatever you may read elsewhere. The City is refreshingly direct about the rest: if you are doing routine maintenance or interior changes, you rarely need a heritage permit, and since January 2026 most heritage permit applications carry no fee. Outside the four districts — which is most of Grantham, Facer, Secord Woods, Martindale Heights, Vansickle, Glenridge, Western Hill and Merritton — no permit is needed to repaint.',
    permitUrl: 'https://www.stcatharines.ca/en/building-and-renovating/heritage-permits.aspx',
    landmarks: ['the Welland Canal', 'Montebello Park, designed by Frederick Law Olmsted in 1887', 'Lakeside Park and its carousel', 'Martindale Pond and the Henley course', 'Brock University'],
    roads: ['the QEW', 'Highway 406', 'Highway 58', 'St. Paul Street', 'Lakeport Road'],
  },
];

// ── Derived lookups ────────────────────────────────────────────────────────

export const citySlugs = cities.map((c) => c.slug);

export const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c])) as Record<string, City>;

/** Hamilton first, then everything else — the order used in nav and footers. */
export const primaryCity = cities[0];

export const cityHref = (c: City) => `/service-areas/${c.slug}/`;

/** Grouped for the service-areas hub. */
export function citiesByRegion(): { region: string; cities: City[] }[] {
  const order = ['Hamilton', 'Halton Region', 'Niagara Region', 'Brant', 'Haldimand County'];
  return order
    .map((region) => ({ region, cities: cities.filter((c) => c.region === region) }))
    .filter((g) => g.cities.length > 0);
}
