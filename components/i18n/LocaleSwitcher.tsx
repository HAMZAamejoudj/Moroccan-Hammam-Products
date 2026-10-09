"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeFromPathname,
  localeLabels,
  locales,
} from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/localize-href";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const activeLocale = localeFromPathname(pathname);

  return (
    <div
      suppressHydrationWarning
      className={cn("flex items-center gap-1 rounded-md border border-gold/30 bg-cream/80 p-0.5 text-xs", className)}
      role="navigation"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const href = switchLocalePath(pathname, locale);
        const isActive = activeLocale === locale;
        return (
          <Link
            key={locale}
            href={href}
            className={cn(
              "rounded px-2 py-1 font-medium transition",
              isActive ? "bg-primary text-white" : "text-ink/80 hover:text-primary",
            )}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "page" : undefined}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
