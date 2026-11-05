import type { Locale } from "@/lib/i18n/config";
import { PRODUCT_SLUGS, type ProductDetail, type ProductSlug } from "./types";
import { productsByLocale } from "./data";

export * from "./types";
export * from "./data";

export function getAllProductSlugs(): string[] {
  return [...PRODUCT_SLUGS];
}

export function getProduct(
  slug: string,
  locale: Locale,
): ProductDetail | undefined {
  const loc = locale in productsByLocale ? locale : "en";
  const localeMap = productsByLocale[loc];
  if (slug in localeMap) {
    return localeMap[slug as ProductSlug];
  }
  return productsByLocale.en[slug as ProductSlug];
}

export function getAllProducts(locale: Locale): ProductDetail[] {
  const loc = locale in productsByLocale ? locale : "en";
  const localeMap = productsByLocale[loc];
  return PRODUCT_SLUGS.map((slug) => localeMap[slug]);
}

