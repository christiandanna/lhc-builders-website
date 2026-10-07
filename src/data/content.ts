/**
 * ---------------------------------------------------------------------------
 * PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy is drawn from LHC Builders' own website (lhcbuildersnola.com). Lines
 * marked "verbatim" are theirs word for word; the rest is written in the same
 * voice and makes no factual claim the source does not support.
 *
 * Nothing here states years in business, project counts, awards, credentials,
 * square footage, budgets, trades, suppliers or client names.
 */

// --- Home: hero and positioning --------------------------------------------

export const heroCopy = {
  /** Verbatim from the existing site. */
  eyebrow: "Built with intention. Designed to last.",
  title: "Custom homes in Old Metairie and New Orleans",
  /** Verbatim from the existing site. */
  lede: "Defined by timeless design, thoughtful details, and elevated craftsmanship.",
  primaryCta: "Start Your Project",
  secondaryCta: "View Our Work",
};

export const introCopy = {
  eyebrow: "Who we are",
  /** Verbatim from the existing site. */
  title: "Homes that feel thoughtfully designed, for family and function",
  body: [
    // Both paragraphs verbatim from the existing site.
    "Based in Old Metairie, our homes blend timeless architecture with warm finishes, elevated materials, and spaces designed for everyday life.",
    "At LHC Builders, we believe the difference between standard and custom is in the details. From the first architectural drawings to the unique lighting and tile selection, every home is built with intention, quality, and a refined approach to modern living.",
  ],
};

// --- Home: our approach -----------------------------------------------------

export const approachCopy = {
  eyebrow: "Our approach",
  /** Verbatim from the existing site. */
  title:
    "Every project begins with a vision and is brought to life through thoughtful design, craftsmanship, and attention to detail.",
  /** The seven focus areas listed verbatim on the existing site. */
  focus: [
    "Custom Home Building",
    "Unique Touches",
    "Specialty Designs",
    "Thoughtful Attention to Detail",
    "Design-Driven Interiors",
    "Expert Craftsmanship",
    "Timeless Exterior Architecture",
  ],
  /** Verbatim from the existing site. */
  goal:
    "Our goal is always the same: create homes that feel elevated, functional, and deeply personal.",
};

// --- Home: closing statement ------------------------------------------------

export const builtWithIntentionCopy = {
  eyebrow: "Built with intention",
  /** Both lines verbatim from the existing site. */
  body: [
    "We build homes meant to be lived in — gathering spaces filled with natural light, kitchens designed to bring people together, and quiet corners that feel like retreat.",
    "Because a well-built home should feel timeless from the very beginning.",
  ],
};

// --- Design philosophy (services page) --------------------------------------

export const philosophyCopy = {
  eyebrow: "Design philosophy",
  /** Verbatim from the existing site. */
  title: "We believe luxury lives in the details.",
  body: [
    // Both verbatim from the existing site.
    "From custom kitchens and statement lighting to tile selections and thoughtfully designed bathrooms, every finish is selected to create spaces that feel cohesive, warm, and elevated.",
    "Our interiors are designed to create balance between comfort and sophistication — spaces that feel timeless, livable, and refined.",
  ],
};

// --- Process ----------------------------------------------------------------

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

/**
 * The five stages named on the existing site. The titles are verbatim; the
 * descriptions explain each stage without adding commitments, durations or
 * deliverables the source does not state.
 */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation & Vision",
    body: "We start with what you want the house to be — how you live in it, what you want it to feel like, and what the lot will allow.",
  },
  {
    number: "02",
    title: "Architectural Planning",
    body: "The vision becomes drawings. Plan, elevation and detail are resolved on paper, where changes are inexpensive.",
  },
  {
    number: "03",
    title: "Construction & Craftsmanship",
    body: "The build itself, guided every step with clear communication, thoughtful planning, and hands-on attention to detail.",
  },
  {
    number: "04",
    title: "Interior Selections",
    body: "Cabinetry, lighting, tile, stone and finishes are selected together so the rooms read as one house rather than a set of decisions.",
  },
  {
    number: "05",
    title: "Final Finishes & Delivery",
    body: "The last layer of detail, a final walkthrough, and the keys.",
  },
];

/** Verbatim from the existing site, introducing the process. */
export const processIntro =
  "At any given time, our homes are in different stages of the building process — from early planning and framing to final finishes and move-in day. We guide every step with clear communication, thoughtful planning, and hands-on attention to detail.";

// --- About ------------------------------------------------------------------

export const aboutCopy = {
  intro:
    "LHC Builders is a residential contractor based in Old Metairie, building custom homes in Old Metairie and New Orleans.",
  philosophyTitle: "The difference between standard and custom is in the details",
  philosophy: [
    "A custom home is not a bigger version of a standard one. It is a house where every decision was actually made — where the cabinetry was drawn for that wall, the chandelier was chosen before the ceiling was framed, and the stone was selected slab by slab rather than ordered from a sample.",
    "That is slower. It is also the only way to end up with a house that still feels considered years after the move-in date.",
  ],
  pillars: [
    {
      title: "Design-driven",
      body: "Finishes, fixtures and joinery are selected together rather than one trade at a time, so the rooms belong to the same house.",
    },
    {
      title: "Built for the climate",
      body: "Covered porches, outdoor kitchens, drainage and materials chosen for south Louisiana heat and humidity rather than in spite of it.",
    },
    {
      title: "Hands-on",
      body: "Every stage is guided with clear communication, thoughtful planning, and attention to detail on site — not from a distance.",
    },
    {
      title: "Local",
      body: "Based in Old Metairie, building in the neighbourhoods we live in.",
    },
  ],
};

// --- FAQ --------------------------------------------------------------------

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * These answer the questions a prospective client actually asks. Each answer
 * stays inside what the existing site supports, and points to a conversation
 * where specifics are needed.
 */
export const faqItems: FaqItem[] = [
  {
    question: "Where do you build?",
    answer:
      "LHC Builders is based in Old Metairie and builds custom homes in Old Metairie and New Orleans. If you have a lot or a property in mind, send the address and you will get a straight answer about whether it is something we can take on.",
  },
  {
    question: "Do you build on my lot, or do you have lots available?",
    answer:
      "Both. We build custom homes for clients on their own property, and we also have homes of our own in progress in Old Metairie. Those are listed on the Current Projects page — email lhcbuilders@gmail.com for floor plans, pricing and lot information.",
  },
  {
    question: "How does a custom home project start?",
    answer:
      "With a consultation. We talk through how you want to live in the house, what you want it to feel like, and what the lot will allow. From there the vision moves into architectural planning, where the drawings get resolved before construction begins.",
  },
  {
    question: "Do you work with an architect, or do you handle the design?",
    answer:
      "Architectural planning is part of the process. If you already have an architect and drawings, we can build to them. If you do not, that stage is something we guide you through.",
  },
  {
    question: "Who handles the interior selections?",
    answer:
      "We do, with you. Cabinetry, lighting, tile, stone and finishes are selected together rather than one trade at a time — it is the stage that decides whether the finished rooms feel like one house.",
  },
  {
    question: "How will I know what is happening during construction?",
    answer:
      "Every stage is guided with clear communication and hands-on attention to detail. You should not have to chase an update on your own house.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Licence and insurance details are not published on this site yet. Ask directly and you will be sent current documentation. [CONFIRM LICENSE AND INSURANCE DETAILS]",
  },
];

// --- Contact ----------------------------------------------------------------

export const contactCopy = {
  /** Verbatim from the existing site. */
  title: "Interested in a custom home or upcoming property?",
  lede: "We would love to hear from you. Tell us about the project and we will come back to you.",
  /** Verbatim from the existing site. */
  closing: "Let's build something beautiful…",
};
