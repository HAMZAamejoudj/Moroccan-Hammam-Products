import {
  blogPath,
  blogPostPath,
  defaultLocale,
  homePath,
  isLocale,
  localeFromPathname,
  localePagePath,
  type Locale,
} from "./config";

/** App routes that exist under /[locale]/… */
export const localizedPageSegments = [
  "about",
  "benefits",
  "private-label",
  "contact",
] as const;

export type LocalizedPageSegment = (typeof localizedPageSegments)[number];

export function isLocalizedPageSegment(segment: string): segment is LocalizedPageSegment {
  return (localizedPageSegments as readonly string[]).includes(segment);
}

function localeFromHref(href: string): Locale | null {
  const m = href.match(/^\/(en|fr|ar)(?=\/|$)/);
  return m && isLocale(m[1]) ? m[1] : null;
}

/** Prefix /benefits → /fr/benefits when locale is fr. Leaves /contact, /blog, etc. unchanged. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("http")) {
    return href;
  }

  if (localeFromHref(href)) return href;

  const pathOnly = href.split(/[#?]/)[0];
  const suffix = href.slice(pathOnly.length);

  for (const segment of localizedPageSegments) {
    if (pathOnly === `/${segment}`) {
      return `${localePagePath(locale, segment)}${suffix}`;
    }
  }

  if (pathOnly === "/blog") {
    return `${blogPath(locale)}${suffix}`;
  }

  const blogPost = pathOnly.match(/^\/blog\/([^/]+)$/);
  if (blogPost) {
    return `${blogPostPath(locale, blogPost[1])}${suffix}`;
  }

  if (pathOnly === "/" || pathOnly === "") {
    return `${homePath(locale)}${suffix}`;
  }

  return href;
}

/** Keep the same page when switching language (/fr/benefits → /ar/benefits). */
export function switchLocalePath(pathname: string, locale: Locale): string {
  const stripped = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "") || "/";

  if (stripped === "/" || stripped === "") {
    return homePath(locale);
  }

  const segment = stripped.replace(/^\//, "").split("/")[0];
  if (segment && isLocalizedPageSegment(segment)) {
    return localePagePath(locale, segment);
  }

  if (stripped === "/blog" || stripped.startsWith("/blog/")) {
    return `/${locale}${stripped}`;
  }

  return homePath(locale);
}

export function preferredLocaleFromCookie(cookieValue: string | undefined): Locale {
  return cookieValue && isLocale(cookieValue) ? cookieValue : defaultLocale;
}
