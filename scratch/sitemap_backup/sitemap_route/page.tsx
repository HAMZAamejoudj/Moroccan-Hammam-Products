import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitemapPage } from "@/components/pages/SitemapPage";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_ORIGIN } from "@/lib/site-url";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return (locales as readonly Locale[]).map((locale) => ({ locale }));
}

const titles: Record<Locale, { title: string; desc: string; breadcrumb: string }> = {
  en: {
    title: "Sitemap | Moroccan Hammam Products",
    desc: "Complete directory of pages, wholesale products, spa protocol guides, and services on Moroccan Hammam Products.",
    breadcrumb: "Sitemap",
  },
  fr: {
    title: "Plan du site | Moroccan Hammam Products",
    desc: "Répertoire complet des pages, produits de gros, guides du hammam et services de Moroccan Hammam Products.",
    breadcrumb: "Plan du site",
  },
  ar: {
    title: "خريطة الموقع | منتجات الحمام المغربي",
    desc: "دليل وفهرس كامل لصفحات الموقع، منتجات الجملة، وأدلة طقوس الحمام لمنتجات الحمام المغربي.",
    breadcrumb: "خريطة الموقع",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const meta = titles[locale];

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: `${SITE_ORIGIN}/${locale}/sitemap`,
      languages: {
        en: `${SITE_ORIGIN}/en/sitemap`,
        fr: `${SITE_ORIGIN}/fr/sitemap`,
        ar: `${SITE_ORIGIN}/ar/sitemap`,
        "x-default": `${SITE_ORIGIN}/en/sitemap`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: `${SITE_ORIGIN}/${locale}/sitemap`,
      siteName: "Moroccan Hammam Products",
      type: "website",
    },
  };
}

export const instant = false;

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const meta = titles[locale];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", path: `/${locale}` },
          { name: meta.breadcrumb, path: `/${locale}/sitemap` },
        ])}
      />
      <SitemapPage locale={locale} />
    </>
  );
}

