import type { Metadata } from "next";
import { getBlogPost } from "@/lib/content";
import { blogPath, blogPostPath, homePath, localeOpenGraph, type Locale } from "@/lib/i18n/config";
import { getBlogUi } from "@/lib/i18n/messages";
import { buildPageMetadata } from "@/lib/i18n/page-metadata";

export function buildHomeMetadata(locale: Locale): Metadata {
  return buildPageMetadata(locale, "home", homePath(locale), {
    en: "/en",
    fr: "/fr",
    "x-default": "/en",
  });
}

export function buildAboutMetadata(locale: Locale): Metadata {
  const path = `/${locale}/about`;
  return buildPageMetadata(locale, "about", path, {
    en: "/en/about",
    fr: "/fr/about",
    "x-default": "/en/about",
  });
}

export function buildBenefitsMetadata(locale: Locale): Metadata {
  const path = `/${locale}/benefits`;
  return buildPageMetadata(locale, "benefits", path, {
    en: "/en/benefits",
    fr: "/fr/benefits",
    "x-default": "/en/benefits",
  });
}

export function buildPrivateLabelMetadata(locale: Locale): Metadata {
  const path = `/${locale}/private-label`;
  return buildPageMetadata(locale, "private-label", path, {
    en: "/en/private-label",
    fr: "/fr/private-label",
    "x-default": "/en/private-label",
  });
}

export function buildBlogIndexMetadata(locale: Locale): Metadata {
  const ui = getBlogUi(locale);
  const path = blogPath(locale);
  return {
    title: { absolute: ui.indexSeoTitle },
    description: ui.indexMetaDescription,
    alternates: {
      canonical: path,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title: ui.indexSeoTitle,
      description: ui.indexMetaDescription,
      url: path,
      locale: localeOpenGraph(locale),
    },
    twitter: {
      title: ui.indexSeoTitle,
      description: ui.indexMetaDescription,
    },
  };
}

export function buildContactMetadata(locale: Locale): Metadata {
  const path = `/${locale}/contact`;
  return buildPageMetadata(locale, "contact", path, {
    en: "/en/contact",
    fr: "/fr/contact",
    "x-default": "/en/contact",
  });
}

export function buildBlogPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getBlogPost(slug, locale);
  const path = blogPostPath(locale, slug);
  const { seo_title, meta_description, date } = post.frontmatter;
  return {
    title: seo_title,
    description: meta_description,
    alternates: {
      canonical: path,
      languages: {
        en: blogPostPath("en", slug),
        fr: blogPostPath("fr", slug),
        "x-default": blogPostPath("en", slug),
      },
    },
    openGraph: {
      title: seo_title,
      description: meta_description,
      url: path,
      type: "article",
      publishedTime: date,
      locale: localeOpenGraph(locale),
    },
    twitter: {
      title: seo_title,
      description: meta_description,
    },
  };
}
