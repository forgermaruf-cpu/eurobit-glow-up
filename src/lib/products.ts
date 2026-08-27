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
};

export const productImage = productImg;

export const products: Product[] = [
  {
    slug: "eurobit-4170",
    name: "Eurobit 4170 (3170 / 5170)",
    category: "Bitumen Membrane",
    tagline: "APP-modified torch-on membrane for roofs and foundations.",
    description:
      "High-performance APP-modified bitumen waterproofing membrane, reinforced with non-woven polyester. Designed for exposed roofs, foundations, and podium decks in Pakistan's climate.",
    specs: [
      { label: "Thickness", value: "3 / 4 / 5 mm" },
      { label: "Reinforcement", value: "Polyester" },
      { label: "Softening Point", value: "≥ 150°C" },
      { label: "Standard", value: "ASTM D6222" },
    ],
    image: membraneImg,
  },
  {
    slug: "eurobit-4170-sl",
    name: "Eurobit 4170 SL",
    category: "Bitumen Membrane",
    tagline: "Slate-finish membrane for exposed rooftop applications.",
    description:
      "Mineral slate surfaced APP-modified membrane, UV resistant and suitable for exposed roof waterproofing without additional protection.",
    specs: [
      { label: "Thickness", value: "4 mm" },
      { label: "Finish", value: "Mineral Slate" },
      { label: "UV Resistance", value: "Excellent" },
      { label: "Warranty", value: "Up to 10 years" },
    ],
    image: membraneImg,
  },
  {
    slug: "eurobit-garden",
    name: "Eurobit Garden",
    category: "Bitumen Membrane",
    tagline: "Root-resistant membrane for planters and green roofs.",
    description:
      "Anti-root modified bitumen membrane engineered for green roofs, terraces, and planter boxes. Prevents root penetration and water ingress.",
    specs: [
      { label: "Thickness", value: "4 mm" },
      { label: "Anti-Root", value: "Yes (chemical)" },
      { label: "Reinforcement", value: "Polyester" },
      { label: "Application", value: "Green roofs" },
    ],
    image: membraneImg,
  },
  {
    slug: "eurobit-aluminium",
    name: "Eurobit Aluminium",
    category: "Bitumen Membrane",
    tagline: "Aluminium-faced membrane, reflective and heat-resistant.",
    description:
      "APP-modified membrane finished with a durable aluminium foil facing — reflects UV, resists heat, and enhances rooftop energy performance.",
    specs: [
      { label: "Thickness", value: "4 mm" },
      { label: "Facing", value: "Aluminium foil" },
      { label: "Reflectivity", value: "High" },
      { label: "Use", value: "Exposed roofs" },
    ],
    image: membraneImg,
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
    image: membraneImg,
  },
];

export const productCategories = [
  "Bitumen Membrane",
  "Admixture",
  "Coating",
  "Sealant",
] as const;