import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsIndexPage } from "@/components/pages/ProductsIndexPage";
import {
  homePath,
  isLocale,
  locales,
  productsPath,
  type Locale,
} from "@/lib/i18n/config";
import { buildProductsIndexMetadata } from "@/lib/i18n/product-metadata";
import { getNavLabels, getProductUi } from "@/lib/i18n/messages";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return (locales as readonly Locale[]).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildProductsIndexMetadata(raw as Locale);
}

export const instant = false;

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const nav = getNavLabels(locale);
  const ui = getProductUi(locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: nav.home, path: homePath(locale) },
            { name: ui.productsBreadcrumb, path: productsPath(locale) },
          ]),
        ]}
      />
      <ProductsIndexPage locale={locale} />
    </>
  );
}

