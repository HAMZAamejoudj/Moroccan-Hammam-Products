"use client";

import Image from "next/image";
import Link from "next/link";
import { siteLogo } from "@/lib/images";
import { homePath, localeDirection, localePagePath, productPath, type Locale } from "@/lib/i18n/config";
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
  if (item.slug) {
    return productPath(locale, item.slug);
  }
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
      <div suppressHydrationWarning className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand Logo & Blurb */}
        <div suppressHydrationWarning className="flex flex-col">
          <Link href={homePath(activeLocale)} className="inline-block">
            <Image
              src={siteLogo.src}
              alt={config.brand_name}
              width={siteLogo.width}
              height={siteLogo.height}
              className="h-14 w-auto max-w-[220px] object-contain object-left rtl:object-right md:h-16 md:max-w-[240px]"
            />
          </Link>
          <h2 className="sr-only">{ui.aboutHeading}</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-ink md:text-[0.95rem]">
            {ui.aboutBlurb}
          </p>
        </div>

        {/* Column 2: Products */}
        <div suppressHydrationWarning>
          <h2 className="font-serif text-xl font-bold tracking-tight text-ink md:text-2xl">
            {ui.productsHeading}
          </h2>
          <ul className="mt-4 space-y-2 text-sm md:text-[0.95rem]">
            {ui.products.map((p) => (
              <li key={p.label}>
                <Link
                  href={footerProductHref(activeLocale, p)}
                  className="link-underline font-semibold text-ink transition-colors hover:text-primary"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company */}
        <div suppressHydrationWarning>
          <h2 className="font-serif text-xl font-bold tracking-tight text-ink md:text-2xl">
            {ui.companyHeading}
          </h2>
          <ul className="mt-4 space-y-2 text-sm md:text-[0.95rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  className="link-underline font-semibold text-ink transition-colors hover:text-primary"
                  href={n.href}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div suppressHydrationWarning>
          <h2 className="font-serif text-xl font-bold tracking-tight text-ink md:text-2xl">
            {ui.contactHeading}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-ink md:text-[0.95rem]">
            <li>
              <a
                href={whatsappUrl(config.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-bold text-primary transition-colors hover:text-accent"
              >
                {ui.whatsAppLabel}
              </a>
            </li>
            <li>
              <a
                className="link-underline font-semibold text-ink transition-colors hover:text-primary"
                href={`mailto:${config.email}`}
              >
                {config.email}
              </a>
            </li>
            <li>
              <a
                className="link-underline font-semibold text-ink transition-colors hover:text-primary"
                href={`tel:${config.phone}`}
              >
                {config.phone}
              </a>
            </li>
            <li className="font-semibold text-ink">{ui.officeAddress}</li>
            <li className="font-medium text-ink/90">{ui.hours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div
        suppressHydrationWarning
        className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-gold/15 px-4 pt-8 text-xs font-semibold text-ink/80 sm:flex-row md:text-sm"
      >
        <p suppressHydrationWarning>
          © {year} {config.brand_name}. {ui.rightsReserved}
        </p>
        <div suppressHydrationWarning className="flex flex-wrap gap-5">
          <Link
            className="link-underline font-semibold text-ink transition-colors hover:text-primary"
            href="/privacy-policy"
          >
            Privacy policy
          </Link>
          <Link
            className="link-underline font-semibold text-ink transition-colors hover:text-primary"
            href="/terms"
          >
            Terms and conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
