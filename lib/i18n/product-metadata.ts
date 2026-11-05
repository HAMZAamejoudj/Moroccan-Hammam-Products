import type { Metadata } from "next";
import { getProduct } from "@/lib/products";
import {
  localeOpenGraph,
  productPath,
  productsPath,
  type Locale,
} from "@/lib/i18n/config";
import { getProductUi } from "@/lib/i18n/messages";
import { absoluteUrl } from "@/lib/site-url";

const OG_LOCALES = ["en_US", "fr_FR", "ar_MA"] as const;

export function buildProductDetailMetadata(locale: Locale, slug: string): Metadata {
  const product = getProduct(slug, locale);
  if (!product) {
    return {};
  }

  const path = productPath(locale, slug);
  const title = product.seo_title;
  const description = product.meta_description;
  const canonical = absoluteUrl(path);
  const primaryImage = product.images[0]?.src ? absoluteUrl(product.images[0].src) : undefined;

  return {
    title: { absolute: title },
    description,
    keywords: [product.main_keyword, "wholesale morocco", "moroccan hammam products"],
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(productPath("en", slug)),
        fr: absoluteUrl(productPath("fr", slug)),
        ar: absoluteUrl(productPath("ar", slug)),
        "x-default": absoluteUrl(productPath("en", slug)),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: localeOpenGraph(locale),
      alternateLocale: OG_LOCALES.filter((l) => l !== localeOpenGraph(locale)),
      images: primaryImage ? [{ url: primaryImage, alt: product.images[0].alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: primaryImage ? [primaryImage] : undefined,
    },
  };
}

export function buildProductsIndexMetadata(locale: Locale): Metadata {
  const ui = getProductUi(locale);
  const path = productsPath(locale);
  const canonical = absoluteUrl(path);

  return {
    title: { absolute: ui.catalogTitle },
    description: ui.catalogSubtitle,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(productsPath("en")),
        fr: absoluteUrl(productsPath("fr")),
        ar: absoluteUrl(productsPath("ar")),
        "x-default": absoluteUrl(productsPath("en")),
      },
    },
    openGraph: {
      title: ui.catalogTitle,
      description: ui.catalogSubtitle,
      url: canonical,
      locale: localeOpenGraph(locale),
      alternateLocale: OG_LOCALES.filter((l) => l !== localeOpenGraph(locale)),
    },
    twitter: {
      card: "summary_large_image",
      title: ui.catalogTitle,
      description: ui.catalogSubtitle,
    },
  };
}

