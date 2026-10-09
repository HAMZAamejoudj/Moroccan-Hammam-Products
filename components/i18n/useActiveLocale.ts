"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultLocale, isLocale, localeFromPathname, type Locale } from "@/lib/i18n/config";

/**
 * Locale from the URL prefix (/en, /fr, /ar) when present — same on server and first client paint.
 * Cookie `site_locale` applies only on routes without a locale prefix (e.g. /terms).
 */
export function useActiveLocale(): Locale {
  const pathname = usePathname() ?? "/";
  const pathnameLocale = localeFromPathname(pathname);
  const [cookieLocale, setCookieLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (pathnameLocale) return;
    const m = document.cookie.match(/(?:^|;\s*)site_locale=([^;]+)/);
    if (m && isLocale(m[1])) setCookieLocale(m[1]);
  }, [pathname, pathnameLocale]);

  if (pathnameLocale) return pathnameLocale;
  return cookieLocale ?? defaultLocale;
}
