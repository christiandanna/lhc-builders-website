/**
 * ---------------------------------------------------------------------------
 * COMPLETED PROJECTS
 * ---------------------------------------------------------------------------
 * These are LHC Builders' real completed homes, with their own photography,
 * imported from lhcbuildersnola.com.
 *
 * WHAT IS AND IS NOT HERE
 * The source site publishes a street name and a set of photographs for each
 * home — nothing more. No square footage, completion date, budget, architect,
 * client name or project narrative is published anywhere, so none appears here.
 * The `summary` lines below describe only what is visible in the photographs.
 *
 * Alt text was written by looking at each photograph. It describes what is
 * actually in the frame.
 *
 * TO ADD A PROJECT
 *   1. Put photos in /public/images/projects/<slug>/, numbered in display order.
 *   2. Add an entry below. The first image is the cover and the hero.
 *   3. Set `featured: true` to surface it on the home page.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  /** Portrait images get a taller slot in the gallery. */
  portrait?: boolean;
};

export type Project = {
  slug: string;
  /** The street name, exactly as LHC publishes it. */
  title: string;
  /** Short label used on cards. */
  shortTitle: string;
  location: string;
  /** A factual one-liner describing what the photographs show. */
  summary: string;
  images: ProjectImage[];
  featured: boolean;
};

const dir = (slug: string, file: string) => `/images/projects/${slug}/${file}`;

export const projects: Project[] = [
  {
    slug: "413-phosphor",
    title: "413 Phosphor Ave.",
    shortTitle: "413 Phosphor",
    location: "Metairie, Louisiana",
    summary:
      "A two-storey custom home with an open living and kitchen range, marble primary bath, fitted dressing rooms and a covered outdoor kitchen.",
    featured: true,
    images: [
      { src: dir("413-phosphor", "01-01.jpg"), alt: "Front elevation of 413 Phosphor Ave., a two-storey custom home with white painted brick, dark shutters and an attached garage, set behind a clipped lawn" },
      { src: dir("413-phosphor", "02-03.jpg"), alt: "Entry hall with wide-plank oak floors looking through to glazed double doors, lit by a beaded chandelier" },
      { src: dir("413-phosphor", "03-04.jpg"), alt: "Formal sitting room with crown moulding, an arched opening and a brass linear chandelier" },
      { src: dir("413-phosphor", "04-05.jpg"), alt: "Open living space with a fireplace and flanking built-ins, opening to the kitchen beyond" },
      { src: dir("413-phosphor", "05-10.jpg"), alt: "Kitchen with a large island, white cabinetry, integrated refrigeration and woven pendant lights" },
      { src: dir("413-phosphor", "06-11.jpg"), alt: "Kitchen range wall with a professional range, stone counters and a run of glazed cabinetry" },
      { src: dir("413-phosphor", "07-12.jpg"), alt: "Breakfast room wrapped in windows on two sides, with oak floors and a slim pendant" },
      { src: dir("413-phosphor", "08-14.jpg"), alt: "Primary bathroom with a book-matched marble shower surround, freestanding tub and a brass chandelier" },
      { src: dir("413-phosphor", "09-15.jpg"), alt: "Primary bathroom double vanity in painted cabinetry with marble counters and brass fittings" },
      { src: dir("413-phosphor", "10-16.jpg"), alt: "Freestanding soaking tub set against a full-height marble wall beside a timber linen cabinet" },
      { src: dir("413-phosphor", "11-18.jpg"), alt: "Fitted dressing room with open shelving, drawer banks and a built-in vanity desk" },
      { src: dir("413-phosphor", "12-19.jpg"), alt: "Second fitted dressing room with full-height shelving and hanging rails over oak floors" },
      { src: dir("413-phosphor", "13-20.jpg"), alt: "Bedroom with a large window and a sculptural brass ceiling light" },
      { src: dir("413-phosphor", "14-21.jpg"), alt: "Upstairs landing and sitting area with crown moulding and a chandelier" },
      { src: dir("413-phosphor", "15-23.jpg"), alt: "Bathroom with a patterned wave-tile feature wall, brass tapware and a terracotta tiled shower niche" },
      { src: dir("413-phosphor", "16-24.jpg"), alt: "Powder room papered in a large-scale floral print with a marble vanity and brass fittings" },
      { src: dir("413-phosphor", "17-25.jpg"), alt: "Bathroom with a green zellige-tiled shower, a round beaded mirror and a shaker vanity" },
      { src: dir("413-phosphor", "18-26.jpg"), alt: "Bathroom with a timber-slat shower surround, round brass mirror and black hexagon floor tile" },
      { src: dir("413-phosphor", "19-27.jpg"), alt: "Bathroom with a tiled tub surround, a sage painted wall and a timber vanity" },
      { src: dir("413-phosphor", "20-28.jpg"), alt: "Mudroom and laundry with grey cabinetry, a sink run and patterned floor tile" },
      { src: dir("413-phosphor", "21-31.jpg"), alt: "Rear elevation with a covered porch and lawn, seen from the back of the garden" },
      { src: dir("413-phosphor", "22-32.jpg"), alt: "Covered outdoor kitchen with a built-in grill, timber cabinetry and a bluestone floor" },
    ],
  },
  {
    slug: "425-arlington",
    title: "425 Arlington Dr.",
    shortTitle: "425 Arlington",
    location: "Metairie, Louisiana",
    summary:
      "A custom home with a standing-seam roof, bar and butler's run, book-matched stone powder room and a panelled feature wall to the stair.",
    featured: true,
    images: [
      { src: dir("425-arlington", "01-exterior.jpg"), alt: "Front elevation of 425 Arlington Dr., a white stucco custom home with louvred shutters, an arched entry and a standing-seam metal roof" },
      { src: dir("425-arlington", "02-bar.jpg"), alt: "Bar and butler's run with stone counters, brass hardware and an integrated refrigerator" },
      { src: dir("425-arlington", "03-breakfast-nook.jpg"), alt: "Breakfast room with a bank of windows, exposed beams and a lantern chandelier" },
      { src: dir("425-arlington", "04-dining.jpg"), alt: "Dining room with deep green walls, a crystal chandelier and oak floors" },
      { src: dir("425-arlington", "05-kitchen-2.jpg"), alt: "Kitchen island in painted cabinetry with twin brass drum pendants and a concealed range hood" },
      { src: dir("425-arlington", "06-kitchen.jpg"), alt: "Kitchen looking along the island to the range wall, with marble counters and a gold ceiling fixture" },
      { src: dir("425-arlington", "07-loft.jpg"), alt: "Upstairs loft landing with panelled walls and a black metal stair rail" },
      { src: dir("425-arlington", "08-mudroom.jpg"), alt: "Mudroom with a dark stained locker bench and patterned cement floor tile" },
      { src: dir("425-arlington", "09-outside.jpg"), alt: "Rear elevation with a covered porch, ceiling fans and a fenced lawn" },
      { src: dir("425-arlington", "10-powder.jpg"), alt: "Powder room with book-matched veined stone walls, a vessel basin and a brass wall-mounted tap" },
      { src: dir("425-arlington", "11-primary-batg.jpg"), alt: "Primary bathroom looking through to a freestanding tub, with a double vanity and marble floors" },
      { src: dir("425-arlington", "12-primary-bathroom.jpg"), alt: "Primary bathroom with a glazed walk-in shower, twin vanities and a crystal chandelier" },
      { src: dir("425-arlington", "13-primary-bedroom.jpg"), alt: "Primary bedroom with paired windows and a starburst ceiling light in a tray ceiling" },
      { src: dir("425-arlington", "14-primary-closet.jpg"), alt: "Fitted primary dressing room with full-height shelving, drawer banks and a chandelier" },
      { src: dir("425-arlington", "15-staircase.jpg"), alt: "Entry hall and staircase with a black metal balustrade and oak treads" },
      { src: dir("425-arlington", "16-up-bath-2.jpg"), alt: "Bathroom with a tiled tub surround, marble vanity top and navy hexagon floor tile" },
      { src: dir("425-arlington", "17-up-bath-3.jpg"), alt: "Bathroom with a marble vanity, brass-framed mirror and a tiled shower" },
      { src: dir("425-arlington", "18-up-bath.jpg"), alt: "Bathroom with a freestanding tub, patterned tile shower wall and twin vanities" },
      { src: dir("425-arlington", "19-wonderwall.jpg"), alt: "Hallway with a geometric applied-moulding feature wall in white" },
    ],
  },
  {
    slug: "220-arlington",
    title: "220 Arlington Dr.",
    shortTitle: "220 Arlington",
    location: "Metairie, Louisiana",
    summary:
      "A custom home with a slate roof and stone entry, fluted timber cabinetry, an arched primary bath and a covered outdoor kitchen under live oaks.",
    featured: true,
    images: [
      { src: dir("220-arlington", "01-01.jpg"), alt: "Front elevation of 220 Arlington Dr., a two-storey custom home in pale stucco and stone with a slate roof, dormer windows and a three-bay garage" },
      { src: dir("220-arlington", "02-05.jpg"), alt: "Open living and dining space with wide oak floors looking toward the staircase and kitchen" },
      { src: dir("220-arlington", "03-08.jpg"), alt: "Kitchen with white cabinetry, open shelving, a timber island and a stone slab backsplash" },
      { src: dir("220-arlington", "04-09.jpg"), alt: "Kitchen range wall with a professional range, custom hood, stone backsplash and fluted timber cabinetry" },
      { src: dir("220-arlington", "05-11.jpg"), alt: "Primary bathroom with a glazed shower, fluted timber vanity, arched doorway and brass sconces" },
      { src: dir("220-arlington", "06-14.jpg"), alt: "Bedroom with a brass chandelier, a large window and an arched opening through to a dressing room" },
      { src: dir("220-arlington", "07-15.jpg"), alt: "Bedroom with oak floors, a corner window and a ceiling fan" },
      { src: dir("220-arlington", "08-18.jpg"), alt: "Bathroom with a grey painted vanity, marble top and a tiled tub surround with a recessed niche" },
      { src: dir("220-arlington", "09-20.jpg"), alt: "Covered outdoor living area with a built-in grill, timber-lined vaulted ceiling and a bluestone floor" },
      { src: dir("220-arlington", "10-21.jpg"), alt: "Rear garden with a covered porch and lawn beneath a mature live oak" },
      { src: dir("220-arlington", "11-22.jpg"), alt: "Rear elevation of the house framed by the canopy of a live oak" },
    ],
  },
  {
    slug: "312-sena",
    title: "312 Sena",
    shortTitle: "312 Sena",
    location: "Metairie, Louisiana",
    summary:
      "A custom home set under mature live oaks, with a galley kitchen in brass and stone, a patterned powder room and a sculptural stair rail.",
    featured: false,
    images: [
      { src: dir("312-sena", "01-exterior.jpg"), alt: "Front elevation of 312 Sena, a white rendered custom home with a steep slate roof and arched entry, framed by the canopy of a mature live oak" },
      { src: dir("312-sena", "02-kitchen-2.jpg"), alt: "Kitchen with a long island, panelled cabinetry, integrated refrigeration and brass box pendants" },
      { src: dir("312-sena", "03-kitchen.jpg"), alt: "Kitchen looking down the run toward glazed doors, with a tiled backsplash and stone counters" },
      { src: dir("312-sena", "04-outside.jpg"), alt: "Covered rear porch with ceiling fans looking out to a bluestone terrace and lawn" },
      { src: dir("312-sena", "05-powder.jpg"), alt: "Powder room with geometric patterned wallpaper, a round brass mirror and a panelled vanity" },
      { src: dir("312-sena", "06-primary.jpg"), alt: "Primary bathroom with a long double vanity, wall sconces and a glazed shower beside a freestanding tub" },
      { src: dir("312-sena", "07-staircase.jpg"), alt: "Staircase with a sculptural black metal balustrade and a lantern pendant above" },
      { src: dir("312-sena", "08-up-bath-2.jpg"), alt: "Bathroom with a marble vanity top, brick-set tiled tub surround and a wide mirror" },
      { src: dir("312-sena", "09-up-bath.jpg"), alt: "Bathroom with a veined marble vanity top, framed mirror and a tiled shower" },
    ],
  },
  {
    slug: "344-elmeer",
    title: "344 Elmeer",
    shortTitle: "344 Elmeer",
    location: "Metairie, Louisiana",
    summary:
      "A custom home with an open den and kitchen, a double-height stair hall, a toile powder room and marble-lined bathrooms.",
    featured: false,
    images: [
      { src: dir("344-elmeer", "01-outside.jpg"), alt: "Front elevation of 344 Elmeer, a white painted custom home with black-framed windows and an attached garage, shaded by a mature tree" },
      { src: dir("344-elmeer", "02-den-combo.jpg"), alt: "Open den and kitchen with wide oak floors and a wall of windows to the garden" },
      { src: dir("344-elmeer", "03-den.jpg"), alt: "Den with a fireplace flanked by windows and a run of glazing along the garden wall" },
      { src: dir("344-elmeer", "04-dining.jpg"), alt: "Dining room with a brass chandelier opening through to the kitchen and a wine refrigerator" },
      { src: dir("344-elmeer", "05-foyer.jpg"), alt: "Double-height entry hall with a staircase and a black metal balustrade" },
      { src: dir("344-elmeer", "06-kitchen.jpg"), alt: "Kitchen with painted cabinetry, a stone backsplash, wine refrigerator and panelled wall detail" },
      { src: dir("344-elmeer", "07-mudroom.jpg"), alt: "Mudroom with a built-in bench and cubbies over a dark tiled floor" },
      { src: dir("344-elmeer", "08-powder.jpg"), alt: "Powder room with blue toile wallpaper, a gilt mirror and a panelled vanity" },
      { src: dir("344-elmeer", "09-primary-bathroom.jpg"), alt: "Primary bathroom with a freestanding tub, double vanity, glazed shower and marble floors" },
      { src: dir("344-elmeer", "10-upstairs-bathroom-2.jpg"), alt: "Bathroom with twin brass-framed mirrors, a double vanity and a marble shower surround" },
      { src: dir("344-elmeer", "11-upstairs-bathroom.jpg"), alt: "Bathroom with a navy vanity, round mirror and a patterned tiled shower niche" },
    ],
  },
  {
    slug: "116-brockenbraugh",
    title: "116 Brockenbraugh Ct.",
    shortTitle: "116 Brockenbraugh",
    location: "Metairie, Louisiana",
    summary:
      "A symmetrical custom home with a classical entry, a chandelier-lit dining room, built-in joinery and a glass-shelved bar wall.",
    featured: false,
    images: [
      { src: dir("116-brockenbraugh", "01-dsc8424.jpg"), alt: "Front elevation of 116 Brockenbraugh Ct., a symmetrical white custom home with a pedimented entry, black shutters and a clipped front lawn" },
      { src: dir("116-brockenbraugh", "02-dsc8428.jpg"), alt: "Detail of pale blue glazed double entry doors with black lever handles" },
      { src: dir("116-brockenbraugh", "03-dsc8430.jpg"), alt: "Dining room with sage-green panelled walls and a large brass tiered chandelier" },
      { src: dir("116-brockenbraugh", "04-dsc8436.jpg"), alt: "Built-in joinery wall with open shelving painted in a deep slate tone" },
      { src: dir("116-brockenbraugh", "05-dsc8439.jpg"), alt: "Bar wall with brass-supported glass shelves over a hexagon tiled backsplash" },
      { src: dir("116-brockenbraugh", "06-dsc8440.jpg"), alt: "Kitchen with a long island, panelled cabinetry, integrated refrigeration and woven basket pendants" },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * ---------------------------------------------------------------------------
 * CURRENT PROJECTS — homes in progress
 * ---------------------------------------------------------------------------
 * From the existing site's Current Projects page: "New homes coming soon to Old
 * Metairie. For floor plans, pricing and lot information email
 * lhcbuilders@gmail.com."
 *
 * Only the addresses and renderings are published there. No pricing, square
 * footage, bedroom count or completion date is given, so none appears here.
 */

export type CurrentProject = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  /**
   * Only present where LHC publishes figures themselves. The 249 Brockenbraugh
   * numbers are read off the "For Sale" board in their own marketing image.
   */
  specs?: { label: string; value: string }[];
};

export const currentProjects: CurrentProject[] = [
  {
    slug: "249-brockenbraugh",
    title: "249 Brockenbraugh Ct.",
    image: "/images/current/249-brockenbraugh.jpg",
    alt: "Architectural rendering of the home at 249 Brockenbraugh Ct. at dusk, with an LHC Builders for-sale board on the lawn",
    specs: [
      { label: "Lot", value: "90 x 120" },
      { label: "Living", value: "5,946 sq ft" },
      { label: "Total", value: "7,078 sq ft" },
    ],
  },
  {
    slug: "102-sycamore",
    title: "102 Sycamore Dr.",
    image: "/images/current/102-sycamore.jpg",
    alt: "Architectural rendering of the proposed front elevation at 102 Sycamore Dr.",
  },
  {
    slug: "231-beverly",
    title: "231 Beverly Dr.",
    image: "/images/current/231-beverly.jpg",
    alt: "The home under construction at 231 Beverly Dr.",
  },
];
