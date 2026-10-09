"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteLogo } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { homePath, localeDirection } from "@/lib/i18n/config";
import { useActiveLocale } from "@/components/i18n/useActiveLocale";
import { getHomeUi, getNavItems, getNavLabels } from "@/lib/i18n/messages";

export function Header({ brandName }: { brandName: string }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLocale = useActiveLocale();
  const ui = getHomeUi(activeLocale);
  const nav = getNavItems(activeLocale);
  const navAria = getNavLabels(activeLocale).mainNav;

  return (
    <header
      suppressHydrationWarning
      dir={localeDirection(activeLocale)}
      lang={activeLocale}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-gold/20 bg-cream/98 shadow-md backdrop-blur-md"
          : "border-gold/15 bg-cream/90 shadow-sm backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 md:py-3.5">
        <Link
          href={homePath(activeLocale)}
          className="flex shrink-0 items-center justify-self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Image
            src={siteLogo.src}
            alt={`${brandName} — ${siteLogo.alt}`}
            width={siteLogo.width}
            height={siteLogo.height}
            className="h-11 w-auto max-w-[200px] object-contain object-left md:h-12 md:max-w-[240px]"
            priority
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-5 md:flex lg:gap-7"
          aria-label={navAria}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-ink hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <LocaleSwitcher className="hidden sm:flex" />
          <Button
            href="/contact"
            variant="primary"
            className="hidden md:inline-flex"
          >
            {ui.headerRequestQuote}
          </Button>
          <button
            type="button"
            className="inline-flex rounded-md border border-gold/40 bg-cream p-2 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{ui.menu}</span>
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-gold/20 bg-cream px-4 pb-4 md:hidden"
      >
        <ul className="flex flex-col gap-2 pt-2">
          <li className="pb-2 sm:hidden">
            <LocaleSwitcher className="w-full justify-center" />
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 text-sm font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button href="/contact" className="w-full">
              {ui.requestQuote}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
