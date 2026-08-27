import productImg from "@/assets/product-membrane.jpg";
import membraneAsset from "@/assets/eurobit-membrane.jpg.asset.json";

const membraneImg = membraneAsset.url;

export type Product = {
  slug: string;
  name: string;
  category: "Bitumen Membrane" | "Admixture" | "Coating" | "Sealant";
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
};

export const productImage = productImg;

export const products: Product[] = [
  {
    slug: "eurobit-4170",
    name: "Eurobit 4170 (3170 / 5170)",
    category: "Bitumen Membrane",
    tagline: "APP-modified torch-on membrane for roofs and foundations.",
    description:
      "Eurobit 4170 is our core torch-applied APP-modified bitumen membrane, reinforced with non-woven polyester and available in 3, 4 and 5 mm (3170 / 4170 / 5170). Used for roof slabs, foundations, basements and podium decks.",
    specs: [
      { label: "Thickness", value: "3 / 4 / 5 mm" },
      { label: "Reinforcement", value: "Polyester" },
      { label: "Softening Point", value: "≥ 150°C" },
      { label: "Standard", value: "ASTM D6222" },
    ],
    image: membraneImg,
    imageAlt:
      "Rolls of Eurobit 4170 APP-modified bitumen waterproofing membrane with black torch-on surface, red banding and printed eurobit branding.",
  },
  {
    slug: "eurobit-4170-sl",
    name: "Eurobit 4170 SL",
    category: "Bitumen Membrane",
    tagline: "Slate-finish membrane for exposed rooftop applications.",
    description:
      "Eurobit 4170 SL is finished with coloured mineral slate granules on the top face, giving built-in UV protection so the membrane can be left exposed on roofs and terraces without a screed or tile covering.",
    specs: [
      { label: "Thickness", value: "4 mm" },
      { label: "Finish", value: "Mineral Slate" },
      { label: "UV Resistance", value: "Excellent" },
      { label: "Warranty", value: "Up to 10 years" },
    ],
    image: membraneImg,
    imageAlt:
      "Roll of Eurobit 4170 SL mineral slate surfaced bitumen membrane, shown as a black torch-on roll with red band and eurobit branding.",
  },
  {
    slug: "eurobit-garden",
    name: "Eurobit Garden",
    category: "Bitumen Membrane",
    tagline: "Root-resistant membrane for planters and green roofs.",
    description:
      "Eurobit Garden carries a chemical root inhibitor in the bitumen compound, so roots from lawns, shrubs and planted terraces cannot penetrate the waterproofing layer. Supplied for green roofs, planter boxes and landscaped podium decks.",
    specs: [
      { label: "Thickness", value: "4 mm" },
      { label: "Anti-Root", value: "Yes (chemical)" },
      { label: "Reinforcement", value: "Polyester" },
      { label: "Application", value: "Green roofs" },
    ],
    image: membraneImg,
    imageAlt:
      "Roll of Eurobit Garden anti-root bitumen membrane for green roofs and planters, black torch-on roll with red band and eurobit branding.",
  },
  {
    slug: "eurobit-aluminium",
    name: "Eurobit Aluminium",
    category: "Bitumen Membrane",
    tagline: "Aluminium-faced membrane, reflective and heat-resistant.",
    description:
      "Eurobit Aluminium is laminated with an embossed aluminium foil facing that reflects sunlight and lowers surface temperature on exposed roofs, while the APP-modified bitumen core keeps the deck fully waterproof.",
    specs: [
      { label: "Thickness", value: "4 mm" },
      { label: "Facing", value: "Aluminium foil" },
      { label: "Reflectivity", value: "High" },
      { label: "Use", value: "Exposed roofs" },
    ],
    image: membraneImg,
    imageAlt:
      "Roll of Eurobit Aluminium foil-faced bitumen membrane, black torch-on roll with red band and eurobit branding.",
  },
  {
    slug: "euro-plast-sp",
    name: "Euro-Plast SP",
    category: "Admixture",
    tagline: "Superplasticizer for high-strength concrete mixes.",
    description:
      "High-range water reducer conforming to ASTM C-494 Type F & G. Improves workability, strength, and durability of structural concrete.",
    specs: [
      { label: "Type", value: "PCE-based" },
      { label: "Dosage", value: "0.5 – 2.0% of cement" },
      { label: "Standard", value: "ASTM C-494 F/G" },
      { label: "Colour", value: "Amber liquid" },
    ],
    image: productImg,
    imageAlt:
      "Euro-Plast SP concrete superplasticizer admixture product image.",
  },
  {
    slug: "euro-cure",
    name: "Euro-Cure",
    category: "Admixture",
    tagline: "Concrete curing compound for slabs and pavements.",
    description:
      "Wax-based curing compound that forms a continuous membrane on fresh concrete, retaining moisture for full hydration and strength development.",
    specs: [
      { label: "Type", value: "Wax emulsion" },
      { label: "Coverage", value: "4 – 6 m²/L" },
      { label: "Standard", value: "ASTM C-309" },
      { label: "Application", value: "Spray" },
    ],
    image: productImg,
    imageAlt:
      "Euro-Cure concrete curing compound product image.",
  },
  {
    slug: "euro-coat-ep",
    name: "Euro-Coat EP",
    category: "Coating",
    tagline: "Epoxy protective coating for industrial floors and tanks.",
    description:
      "Two-component solvent-free epoxy coating providing chemical resistance and abrasion protection for industrial floors, water tanks, and secondary containment.",
    specs: [
      { label: "System", value: "2K Epoxy" },
      { label: "DFT", value: "300 – 500 µm" },
      { label: "Pot Life", value: "45 min @ 25°C" },
      { label: "Food Contact", value: "Available (FG grade)" },
    ],
    image: productImg,
    imageAlt:
      "Euro-Coat EP two-component epoxy protective coating product image.",
  },
  {
    slug: "euro-flex-pu",
    name: "Euro-Flex PU",
    category: "Coating",
    tagline: "Liquid polyurethane waterproofing membrane.",
    description:
      "Single-component moisture-curing polyurethane forming a seamless, elastic waterproof membrane over roofs, wet areas, and complex geometries.",
    specs: [
      { label: "Elongation", value: "> 400%" },
      { label: "Coverage", value: "1.2 kg/m² (2 coats)" },
      { label: "UV Resistance", value: "Yes" },
      { label: "Colour", value: "Grey / White" },
    ],
    image: productImg,
    imageAlt:
      "Euro-Flex PU liquid polyurethane waterproofing membrane product image.",
  },
  {
    slug: "euro-seal-pu",
    name: "Euro-Seal PU",
    category: "Sealant",
    tagline: "Polyurethane expansion joint sealant.",
    description:
      "One-component elastic polyurethane sealant for expansion joints, curtain walls, and precast panel joints. Excellent adhesion and movement capability.",
    specs: [
      { label: "Movement", value: "±25%" },
      { label: "Shore A", value: "35" },
      { label: "Cure", value: "Moisture" },
      { label: "Standard", value: "ASTM C-920" },
    ],
    image: productImg,
    imageAlt:
      "Euro-Seal PU polyurethane expansion joint sealant product image.",
  },
];

export const productCategories = [
  "Bitumen Membrane",
  "Admixture",
  "Coating",
  "Sealant",
] as const;