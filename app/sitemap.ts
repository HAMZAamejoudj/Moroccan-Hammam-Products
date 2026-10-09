import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n/config";

const BASE = "https://moroccanhammamproducts.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/en",
    "/fr",
    "/ar",
    "/en/about",
    "/fr/about",
    "/ar/about",
    "/en/benefits",
    "/fr/benefits",
    "/ar/benefits",
    "/en/private-label",
    "/fr/private-label",
    "/ar/private-label",
    "/en/blog",
    "/fr/blog",
    "/ar/blog",
    "/en/contact",
    "/fr/contact",
    "/ar/contact",
    "/privacy-policy",
    "/terms",
  ];

  const pages = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: "2026-10-08",
    changeFrequency: "monthly" as const,
    priority: path === "/en" ? 1 : 0.8,
  }));

  const posts = (locales as readonly Locale[]).flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({
      url: `${BASE}/${locale}/blog/${slug}`,
      lastModified: "2026-10-08",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...pages, ...posts];
}
