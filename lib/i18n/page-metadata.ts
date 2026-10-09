import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { localeOpenGraph, type Locale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/site-url";

const OG_LOCALES = ["en_US", "fr_FR", "ar_MA"] as const;

function absoluteLanguageAlternates(languages: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(languages).map(([key, path]) => [key, absoluteUrl(path)]),
  );
}

export function buildPageMetadata(
  locale: Locale,
  pageName: string,
  canonicalPath: string,
  languages: Record<string, string>,
): Metadata {
  const page = getPage(pageName, locale);
  const title = page.frontmatter.seo_title;
  const description = page.frontmatter.meta_description;
  const canonical = absoluteUrl(canonicalPath);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: absoluteLanguageAlternates(languages),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: localeOpenGraph(locale),
      alternateLocale: OG_LOCALES.filter((l) => l !== localeOpenGraph(locale)),
    },
    twitter: {
      title,
      description,
    },
  };
}
