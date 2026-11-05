import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n/config";
import { PRODUCT_SLUGS } from "@/lib/products";
import { SITE_ORIGIN } from "@/lib/site-url";

const BASE = SITE_ORIGIN;
const NOW = "2026-11-03";

function buildAlternates(pathWithoutLocale: string) {
  const p = pathWithoutLocale.replace(/^\//, "");
  return {
    languages: {
      en: `${BASE}/en${p ? `/${p}` : ""}`,
      fr: `${BASE}/fr${p ? `/${p}` : ""}`,
      ar: `${BASE}/ar${p ? `/${p}` : ""}`,
      "x-default": `${BASE}/en${p ? `/${p}` : ""}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreSegments = [
    "",
    "about",
    "benefits",
    "products",
    "private-label",
    "blog",
    "contact",
    "sitemap",
  ];

  // Localized main pages with hreflang alternates
  const localizedPages: MetadataRoute.Sitemap = (locales as readonly Locale[]).flatMap((locale) =>
    coreSegments.map((segment) => {
      const path = segment ? `/${locale}/${segment}` : `/${locale}`;
      return {
        url: `${BASE}${path}`,
        lastModified: NOW,
        changeFrequency: segment === "" ? ("weekly" as const) : ("monthly" as const),
        priority: segment === "" ? 1.0 : segment === "products" ? 0.9 : 0.8,
        alternates: buildAlternates(segment),
      };
    }),
  );

  // Legal static pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/privacy-policy`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${BASE}/terms`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  // Product detail pages with hreflang alternates
  const productUrls: MetadataRoute.Sitemap = (locales as readonly Locale[]).flatMap((locale) =>
    PRODUCT_SLUGS.map((slug) => ({
      url: `${BASE}/${locale}/products/${slug}`,
      lastModified: NOW,
      changeFrequency: "weekly" as const,
      priority: 0.95,
      alternates: buildAlternates(`products/${slug}`),
    })),
  );

  // Blog posts
  const postUrls: MetadataRoute.Sitemap = (locales as readonly Locale[]).flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({
      url: `${BASE}/${locale}/blog/${slug}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: buildAlternates(`blog/${slug}`),
    })),
  );

  return [...localizedPages, ...productUrls, ...postUrls, ...legalPages];
}
