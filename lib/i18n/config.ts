export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localeOpenGraph(locale: Locale): string {
  if (locale === "fr") return "fr_FR";
  if (locale === "ar") return "ar_MA";
  return "en_US";
}

/** Home and other localized routes use a locale prefix (/en, /fr, /ar). */
export function homePath(locale: Locale): string {
  return `/${locale}`;
}

export function localePagePath(locale: Locale, segment: string): string {
  return `/${locale}/${segment.replace(/^\//, "")}`;
}

export function blogPath(locale: Locale): string {
  return `/${locale}/blog`;
}

export function blogPostPath(locale: Locale, slug: string): string {
  return `/${locale}/blog/${slug.replace(/^\//, "")}`;
}

export function pathWithLocale(pathname: string, locale: Locale): string {
  const stripped = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "") || "/";
  if (stripped === "/" || stripped === "") return homePath(locale);
  return stripped;
}

export function localeFromPathname(pathname: string): Locale | null {
  const m = pathname.match(/^\/(en|fr|ar)(?=\/|$)/);
  return m && isLocale(m[1]) ? m[1] : null;
}
