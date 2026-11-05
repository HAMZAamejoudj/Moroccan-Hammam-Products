import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/pages/ProductDetailPage";
import {
  getProduct,
  getAllProductSlugs,
  PRODUCT_SLUGS,
  type ProductSlug,
} from "@/lib/products";
import {
  homePath,
  isLocale,
  locales,
  productPath,
  productsPath,
  type Locale,
} from "@/lib/i18n/config";
import { buildProductDetailMetadata } from "@/lib/i18n/product-metadata";
import { getNavLabels, getProductUi } from "@/lib/i18n/messages";
import {
  JsonLd,
  productSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return (locales as readonly Locale[]).flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  if (!PRODUCT_SLUGS.includes(slug as ProductSlug)) return {};
  return buildProductDetailMetadata(locale, slug);
}

export const instant = false;

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  if (!PRODUCT_SLUGS.includes(slug as ProductSlug)) notFound();

  const product = getProduct(slug, locale);
  if (!product) notFound();

  const nav = getNavLabels(locale);
  const ui = getProductUi(locale);
  const pPath = productPath(locale, slug);

  const schemas: object[] = [
    productSchema(product, pPath),
    breadcrumbSchema([
      { name: nav.home, path: homePath(locale) },
      { name: ui.productsBreadcrumb, path: productsPath(locale) },
      { name: product.h1, path: pPath },
    ]),
  ];

  if (product.faqs && product.faqs.length > 0) {
    const faqSchemaData = faqSchema(product.faqs);
    if (faqSchemaData) {
      schemas.push(faqSchemaData);
    }
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ProductDetailPage product={product} locale={locale} />
    </>
  );
}

