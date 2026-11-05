import type { Locale } from "@/lib/i18n/config";
import type { ProductDetail, ProductSlug } from "../types";
import { productsEn } from "./en";
import { productsFr } from "./fr";
import { productsAr } from "./ar";

export { productsEn } from "./en";
export { productsFr } from "./fr";
export { productsAr } from "./ar";

export const productsByLocale: Record<
  Locale,
  Record<ProductSlug, ProductDetail>
> = {
  en: productsEn,
  fr: productsFr,
  ar: productsAr,
};

