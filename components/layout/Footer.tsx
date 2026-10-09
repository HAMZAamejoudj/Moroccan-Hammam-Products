"use client";

import Image from "next/image";
import Link from "next/link";
import { siteLogo } from "@/lib/images";
import { homePath, localeDirection, localePagePath, type Locale } from "@/lib/i18n/config";
import type { FooterProductLink } from "@/lib/i18n/messages";
import { useActiveLocale } from "@/components/i18n/useActiveLocale";
import { getFooterUi, getNavItems } from "@/lib/i18n/messages";
import { whatsappUrl } from "@/lib/whatsapp-url";
import { MoroccanPattern } from "./MoroccanPattern";

export type FooterConfig = {
  brand_name: string;
  phone: string;
  email: string;
  whatsapp: string;
};

function footerProductHref(locale: Locale, item: FooterProductLink) {
  if (item.page === "private-label") {
    return localePagePath(locale, "private-label");
  }
  const base = localePagePath(locale, "benefits");
  return item.benefitsId ? `${base}#${item.benefitsId}` : base;
}

export function Footer({ config }: { config: FooterConfig }) {
  const year = 2026;
  const activeLocale = useActiveLocale();
  const ui = getFooterUi(activeLocale);
  const nav = getNavItems(activeLocale).filter(
    (n) => n.href !== homePath(activeLocale),
  );

  return (
    <footer
      suppressHydrationWarning
      className="relative mt-auto border-t border-gold/15 bg-white pt-16 pb-8"
      dir={localeDirection(activeLocale)}
      lang={activeLocale}
    >
      <MoroccanPattern className="pointer-events-none absolute right-4 top-4 h-24 w-24 text-gold opacity-40" />
      <div className="mx-auto max-w-6xl px-4 pb-10">
        <Link href={homePath(activeLocale)} className="inline-block">
          <Image
            src={siteLogo.src}
            alt={config.brand_name}
            width={siteLogo.width}
            height={siteLogo.height}
            className="h-14 w-auto max-w-[260px] object-contain md:h-16 md:max-w-[300px]"
          />
        </Link>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-serif text-lg text-ink">{ui.aboutHeading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{ui.aboutBlurb}</p>
        </div>
        <div>
          <h2 className="font-serif text-lg text-ink">{ui.productsHeading}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {ui.products.map((p) => (
              <li key={p.label}>
                <Link
                  href={footerProductHref(activeLocale, p)}
                  className="link-underline text-ink/80 hover:text-ink"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg text-ink">{ui.companyHeading}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="link-underline text-ink/80" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg text-ink">{ui.contactHeading}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            <li>
              <a className="link-underline" href={whatsappUrl(config.whatsapp)}>
                {ui.whatsAppLabel} / {config.phone}
              </a>
            </li>
            <li>
              <a className="link-underline" href={`mailto:${config.email}`}>
                {config.email}
              </a>
            </li>
            <li>{ui.officeAddress}</li>
            <li>{ui.hours}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-gold/20 px-4 pt-6 text-xs text-ink/70">
        <p>
          © {year} {config.brand_name}. {ui.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
