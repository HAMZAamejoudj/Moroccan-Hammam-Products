"use client";

import Link from "next/link";
import { usePageLocale } from "@/components/i18n/LocaleProvider";
import { localizeHref } from "@/lib/i18n/localize-href";
import type { Locale } from "@/lib/i18n/config";

const PLACEHOLDER = /(\[[^\]]+\])/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

export function PlaceholderText({
  text,
  className,
  locale: localeProp,
}: {
  text: string;
  className?: string;
  locale?: Locale;
}) {
  const contextLocale = usePageLocale();
  const locale = localeProp ?? contextLocale;

  function linkHref(href: string) {
    return localizeHref(href, locale);
  }

  function segment(chunk: string, keyPrefix: string) {
    const parts = chunk.split(PLACEHOLDER);
    return parts.map((part, i) => {
      if (!part.startsWith("[") || !part.endsWith("]")) {
        const linkMatch = part.match(LINK);
        if (linkMatch) {
          return (
            <Link
              key={`${keyPrefix}-l-${i}`}
              href={linkHref(linkMatch[2])}
              className="link-underline"
            >
              {linkMatch[1]}
            </Link>
          );
        }
        return <span key={`${keyPrefix}-${i}`}>{part}</span>;
      }
      return (
        <span key={`${keyPrefix}-p-${i}`} className="placeholder">
          {part}
        </span>
      );
    });
  }

  const chunks = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <span className={className}>
      {chunks.map((chunk, i) => {
        const m = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          return (
            <Link key={i} href={linkHref(m[2])} className="link-underline">
              {m[1]}
            </Link>
          );
        }
        return <span key={i}>{segment(chunk, String(i))}</span>;
      })}
    </span>
  );
}
