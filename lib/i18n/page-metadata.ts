import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { localeOpenGraph, type Locale } from "@/lib/i18n/config";

export function buildPageMetadata(
  locale: Locale,
  pageName: string,
  canonicalPath: string,
  languages: Record<string, string>,
): Metadata {
  const page = getPage(pageName, locale);
  const title = page.frontmatter.seo_title;
  const description = page.frontmatter.meta_description;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      locale: localeOpenGraph(locale),
      alternateLocale: ["en_US", "fr_FR"].filter(
        (l) => l !== localeOpenGraph(locale),
      ),
    },
    twitter: {
      title,
      description,
    },
  };
}
