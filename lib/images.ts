/**
 * Central image map — swap paths here to update photos site-wide.
 * Product photos live in /public/images/products/
 */
export const siteLogo = {
  src: "/logo.webp",
  alt: "Moroccan hammam products — brand logo",
  width: 220,
  height: 72,
} as const;

export const siteImages = {
  heroHome: {
    src: "/images/hero.webp",
    alt: "Moroccan hammam products on marble: black soap, ghassoul clay, argan oil, olive branches and spa setting",
    priority: true,
  },
  hero: {
    src: "/images/products/product-01.webp",
    alt: "Moroccan black soap in a bulk production tub, olive-dark beldi paste",
  },
  blackSoapVariants: {
    src: "/images/products/product-02.webp",
    alt: "Three jars of Moroccan black soap with nila, aker fassi and traditional beldi",
  },
  trioRetail: {
    src: "/images/products/product-03.webp",
    alt: "Ghassoul powder, argan oil and black soap in retail jars on a spa counter",
  },
  productPyramid: {
    src: "/images/products/product-04.webp",
    alt: "Beldi soap, ghassoul mask, tebrima and nila masks arranged as a product display",
  },
  fullRange: {
    src: "/images/products/product-05.webp",
    alt: "Full range of Moroccan hammam products including soaps, clays, oils and masks",
  },
  bulkOils: {
    src: "/images/products/product-06.webp",
    alt: "Wholesale prickly pear, cypress and argan oils and rose water from Morocco",
  },
  fourJars: {
    src: "/images/products/product-07.webp",
    alt: "Nila mask, argan cream, black soap with rose and ghassoul powder in jars",
  },
  bulkPowders: {
    src: "/images/products/product-08.webp",
    alt: "Five kilogram blocks of nila powder and aker fassi powder for wholesale",
  },
  arganPress: {
    src: "/images/products/product-09.webp",
    alt: "Cold-pressed argan oil bottles beside traditional Moroccan press mats",
  },
  productionLine: {
    src: "/images/products/product-10.webp",
    alt: "Moroccan organica production line with bulk black soap, ghassoul and scrubs",
  },
  harvestLine: {
    src: "/images/products/product-11.webp",
    alt: "Moroccan harvest organic skincare line with kessa glove, oils and floral waters",
  },
  bulkSupply: {
    src: "/images/products/product-12.webp",
    alt: "Wholesale ghassoul powder, black soap, argan oil and rose water spray bottles",
  },
  kessaRetail: {
    src: "/images/products/product-13.webp",
    alt: "SAHARA GLOW kessa exfoliating glove in retail packaging",
  },
  arganBottles: {
    src: "/images/products/product-14.webp",
    alt: "Moroccan Organica organic argan oil in 250 ml wholesale bottles",
  },
  argamaraLine: {
    src: "/images/products/product-15.webp",
    alt: "ARGAMARA rose water, rhassoul clay, black soap and argan oil collection",
  },
  privateLabelRun: {
    src: "/images/products/product-16.webp",
    alt: "Private label production run of pink and blue clay jars with gold lids",
  },
  nilaBulk: {
    src: "/images/products/product-17.webp",
    alt: "Four wholesale buckets of traditional Moroccan nila indigo powder",
  },
  workshopA: {
    src: "/images/products/product-18.webp",
    alt: "Moroccan hammam products staged for export on a stainless steel work surface",
  },
  workshopB: {
    src: "/images/products/product-19.webp",
    alt: "Assorted Moroccan beauty products ready for spa and retail supply",
  },
  workshopC: {
    src: "/images/products/product-20.webp",
    alt: "Wholesale Moroccan skincare jars and dropper bottles on a production table",
  },
  workshopD: {
    src: "/images/products/product-21.webp",
    alt: "Moroccan black soap and clay products in bulk and retail packaging",
  },
  workshopE: {
    src: "/images/products/product-22.webp",
    alt: "Moroccan hammam wholesale products including oils, soaps and floral waters",
  },
} as const;

/** Lifestyle images for Benefits page product cards */
export type BenefitImage =
  | { src: string; alt: string }
  | { src: string; alt: string }[];

export const benefitProductImagesById: Record<string, BenefitImage> = {
  "black-soap": {
    src: "/images/benefits/black-soap.webp",
    alt: "Moroccan black soap in an engraved brass bowl with fresh olives",
  },
  kessa: {
    src: "/images/benefits/kessa.webp",
    alt: "Black kessa exfoliating glove on marble in a Moroccan hammam setting",
  },
  ghassoul: {
    src: "/images/benefits/ghassoul.webp",
    alt: "Ghassoul clay powder in a brass bowl with raw clay chunks and olive branches",
  },
  "argan-oil": {
    src: "/images/benefits/argan-oil.webp",
    alt: "Argan oil in a glass bottle with argan nuts and a gold cap",
  },
  "rose-water": {
    src: "/images/benefits/rose-water.webp",
    alt: "Rose water in a glass bottle with fresh pink roses",
  },
  "nila-aker": [
    {
      src: "/images/benefits/nila.webp",
      alt: "Nila indigo powder in a traditional Moroccan brass bowl",
    },
    {
      src: "/images/benefits/aker-fassi.webp",
      alt: "Aker fassi poppy powder in a brass bowl with rose petals",
    },
  ],
};

/** @deprecated Use benefitProductImagesById with subsection [id] keys. */
export const benefitProductImages: Record<string, BenefitImage> = {
  "Moroccan black soap": {
    src: "/images/benefits/black-soap.webp",
    alt: "Moroccan black soap in an engraved brass bowl with fresh olives",
  },
  "Kessa glove": {
    src: "/images/benefits/kessa.webp",
    alt: "Black kessa exfoliating glove on marble in a Moroccan hammam setting",
  },
  "Ghassoul clay": {
    src: "/images/benefits/ghassoul.webp",
    alt: "Ghassoul clay powder in a brass bowl with raw clay chunks and olive branches",
  },
  "Argan oil": {
    src: "/images/benefits/argan-oil.webp",
    alt: "Argan oil in a glass bottle with argan nuts and a gold cap",
  },
  "Rose water": {
    src: "/images/benefits/rose-water.webp",
    alt: "Rose water in a glass bottle with fresh pink roses",
  },
  "Nila powder and aker fassi": benefitProductImagesById["nila-aker"],
};

/** Home page product grid — order matches `home.md` ### subsections */
export const homeProductCardImages: { src: string; alt: string }[] = [
  {
    src: "/images/benefits/black-soap.webp",
    alt: "Moroccan black soap (savon beldi) in a traditional brass bowl",
  },
  {
    src: "/images/benefits/ghassoul.webp",
    alt: "Ghassoul (rhassoul) clay powder and raw clay chunks",
  },
  {
    src: "/images/benefits/kessa.webp",
    alt: "Kessa exfoliating glove for the Moroccan hammam",
  },
  {
    src: "/images/benefits/argan-oil.webp",
    alt: "Argan oil and prickly pear seed oil in glass bottles",
  },
  {
    src: "/images/benefits/rose-water.webp",
    alt: "Rose water and orange blossom water with nila and aker fassi ingredients",
  },
  {
    src: "/images/products/product-11.webp",
    alt: "Hammam gift set with kessa glove, oils and floral waters",
  },
];

export type SiteImageKey = keyof typeof siteImages;

/** Hero / card image per blog article */
export const blogSlugHero: Record<string, { src: string; alt: string }> = {
  "moroccan-black-soap-quality-guide": {
    src: "/images/blog/moroccan-black-soap-quality-guide.webp",
    alt: "Moroccan black soap in a gold bowl with olives in a riad hammam",
  },
  "kessa-glove-guide": {
    src: "/images/blog/kessa-glove-guide.webp",
    alt: "Black kessa glove with hammam bowls and towels by an indoor pool",
  },
  "ghassoul-clay-guide": {
    src: "/images/blog/ghassoul-clay-guide.webp",
    alt: "Ghassoul clay powder with raw chunks and retail packaging in a riad",
  },
  "moroccan-hammam-treatment-steps-spa": {
    src: "/images/blog/moroccan-hammam-treatment-steps-spa.webp",
    alt: "Moroccan hammam ritual: black soap, kessa, ghassoul, argan oil and rose water",
  },
  "private-label-hammam-kit": {
    src: "/images/blog/private-label-hammam-kit.webp",
    alt: "Moroccan hammam products and checklist for planning a private label kit",
  },
  "source-hammam-products-wholesale": {
    src: "/images/blog/source-hammam-products-wholesale.webp",
    alt: "Wholesale Moroccan hammam products: soap, clay, oils and gift packaging",
  },
};

/** Blog card fallback images by category */
export const blogCategoryImages: Record<string, SiteImageKey> = {
  "Buying guides": "fullRange",
  "Spa guides": "productPyramid",
  "Product guides": "trioRetail",
  "Private label": "privateLabelRun",
};

export const privateLabelImages = {
  formulations: {
    src: "/images/private-label/formulations.webp",
    alt: "Moroccan hammam formulations: black soap, ghassoul and colored masks in jars",
  },
  bulkTubs: {
    src: "/images/private-label/bulk-tubs.webp",
    alt: "5 kg bulk tubs of ghassoul scrub and nila mask ready for private label",
  },
  palletExport: {
    src: "/images/private-label/pallet-export.webp",
    alt: "Private label order wrapped on a pallet for export shipping",
  },
  labeledSerumLine: {
    src: "/images/private-label/labeled-serum-line.webp",
    alt: "Labeled dropper bottles on a production line",
  },
  labeledDropperBottles: {
    src: "/images/private-label/labeled-dropper-bottles.webp",
    alt: "Custom labeled argan oil dropper bottles in bulk",
  },
  brandedBatch: {
    src: "/images/private-label/branded-batch.webp",
    alt: "Finished private label cosmetic bottles ready for retail",
  },
} as const;

export function blogPostImage(
  slug: string,
  category: string,
): { src: string; alt: string } {
  if (blogSlugHero[slug]) return blogSlugHero[slug];
  const key = blogCategoryImages[category] ?? "fullRange";
  return siteImages[key];
}
