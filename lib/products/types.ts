export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductVariant = {
  name: string;
  description: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductDetail = {
  slug: string;
  h1: string;
  subtitle: string;
  badge: string;
  seo_title: string;
  meta_description: string;
  main_keyword: string;
  short_description: string;
  full_description: string[];
  images: { src: string; alt: string }[];
  specs: ProductSpec[];
  variants: ProductVariant[];
  benefits: string[];
  ritualSteps: { title: string; text: string }[];
  wholesaleHighlights: string[];
  faqs: ProductFaq[];
  relatedSlugs: string[];
};

export const PRODUCT_SLUGS = [
  "moroccan-black-soap",
  "ghassoul-clay",
  "kessa-exfoliating-gloves",
  "argan-and-prickly-pear-oil",
  "rose-water-nila-aker-fassi",
  "hammam-kits",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

