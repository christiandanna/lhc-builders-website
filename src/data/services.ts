/**
 * ---------------------------------------------------------------------------
 * SERVICES
 * ---------------------------------------------------------------------------
 * The six service lines LHC Builders publishes on lhcbuildersnola.com, in the
 * order they appear there.
 *
 * Each description is written from what is actually visible in LHC's own
 * photography and from the design philosophy on the existing site. No claim is
 * made about volume, duration, suppliers, trades or credentials.
 *
 * Every image is a real LHC photograph; `fromProject` records which home it
 * comes from, so a photo is never shown as representing work it is not.
 */

export type Service = {
  slug: string;
  title: string;
  /** A short line used on cards and list rows. */
  summary: string;
  /** Fuller copy for the services page. */
  description: string;
  image: string;
  imageAlt: string;
  /** Slug of the project the photograph comes from. */
  fromProject: string;
};

export const services: Service[] = [
  {
    slug: "custom-cabinetry",
    title: "Custom Cabinetry",
    summary:
      "Built-in joinery made for the room it sits in — kitchens, bars, dressing rooms, mudrooms and libraries.",
    description:
      "Cabinetry is where a custom home stops looking custom if it is rushed. Ours is designed for the specific wall it will live on: full-height shelving that meets the ceiling properly, fluted and panelled fronts, dressing rooms fitted out to the inch, and painted finishes chosen against the room rather than from a chart.",
    image: "/images/projects/116-brockenbraugh/04-dsc8436.jpg",
    imageAlt:
      "Built-in joinery wall with open shelving painted in a deep slate tone at 116 Brockenbraugh Ct.",
    fromProject: "116-brockenbraugh",
  },
  {
    slug: "designer-lighting",
    title: "Designer Lighting",
    summary:
      "Fixtures selected room by room, with the wiring and ceiling detail planned around them.",
    description:
      "Lighting is decided early, because a chandelier that deserves a room needs the blocking, the box height and the ceiling detail to be right long before it arrives. Layered sources — decorative, architectural and task — are planned together so a room works at dinner and at seven in the morning.",
    image: "/images/projects/116-brockenbraugh/03-dsc8430.jpg",
    imageAlt:
      "Sage-green panelled dining room with a large brass tiered chandelier at 116 Brockenbraugh Ct.",
    fromProject: "116-brockenbraugh",
  },
  {
    slug: "luxury-kitchens",
    title: "Luxury Kitchens",
    summary:
      "Islands, ranges, stone and integrated appliances, laid out around how the house actually gathers.",
    description:
      "The kitchen carries more of a home than any other room, so it gets the most planning. Island length and clearance, the run between range and sink, integrated refrigeration, concealed hoods, and stone chosen slab by slab — all set out before the cabinetry is ordered rather than negotiated on site.",
    image: "/images/projects/425-arlington/06-kitchen.jpg",
    imageAlt:
      "Kitchen with a long island, marble counters, brass pendants and a professional range at 425 Arlington Dr.",
    fromProject: "425-arlington",
  },
  {
    slug: "statement-bathrooms",
    title: "Statement Bathrooms",
    summary:
      "Primary suites and powder rooms built around a single strong material decision.",
    description:
      "A bathroom holds up when one idea leads and everything else supports it — a book-matched slab, a full-height marble shower, a papered powder room. Waterproofing, falls and niche placement are detailed before tiling starts, because that is what keeps the room looking new in ten years.",
    image: "/images/projects/413-phosphor/08-14.jpg",
    imageAlt:
      "Primary bathroom with a book-matched marble shower surround, freestanding tub and brass chandelier at 413 Phosphor Ave.",
    fromProject: "413-phosphor",
  },
  {
    slug: "tile-and-stone",
    title: "Custom Tile & Stone Work",
    summary:
      "Book-matched slabs, hand-set patterns and the layout work that makes them land correctly.",
    description:
      "Tile and stone are where craftsmanship is most visible and least forgiving. Slabs are selected and sequenced so veining runs where it should, patterns are set out so cuts fall in the right places, and transitions, edges and grout lines are decided on paper before anyone mixes adhesive.",
    image: "/images/projects/425-arlington/10-powder.jpg",
    imageAlt:
      "Powder room lined in book-matched veined stone with a vessel basin and brass wall-mounted tap at 425 Arlington Dr.",
    fromProject: "425-arlington",
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living",
    summary:
      "Covered porches, outdoor kitchens and terraces built for the way this climate is actually used.",
    description:
      "In south Louisiana the covered porch is a room. Ours are built like one: proper ceiling linings, fans and lighting run in from the start, built-in grills and counters in materials that survive the humidity, and terraces laid to fall so water leaves the house rather than sits against it.",
    image: "/images/projects/220-arlington/09-20.jpg",
    imageAlt:
      "Covered outdoor living area with a built-in grill, timber-lined vaulted ceiling and bluestone floor at 220 Arlington Dr.",
    fromProject: "220-arlington",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
