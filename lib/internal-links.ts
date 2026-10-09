import { localePagePath, type Locale } from "@/lib/i18n/config";

type LinkRule = { phrase: string; href: string };

function localizeInternalHref(href: string, locale: Locale): string {
  if (href.startsWith("/blog/")) return `/${locale}${href}`;
  if (href === "/benefits") return localePagePath(locale, "benefits");
  if (href === "/private-label") return localePagePath(locale, "private-label");
  if (href === "/contact") return localePagePath(locale, "contact");
  return href;
}

const PAGE_LINKS: Record<string, LinkRule[]> = {
  home: [
    { phrase: "the full ritual", href: "/benefits" },
    { phrase: "private label hammam products", href: "/private-label" },
    { phrase: "private label", href: "/private-label" },
  ],
  about: [
    { phrase: "request a quote", href: "/contact" },
  ],
  benefits: [
    {
      phrase: "step-by-step hammam protocol",
      href: "/blog/moroccan-hammam-treatment-steps-spa",
    },
    { phrase: "choosing a kessa glove", href: "/blog/kessa-glove-guide" },
    { phrase: "black soap quality checks", href: "/blog/moroccan-black-soap-quality-guide" },
  ],
  "private-label": [
    { phrase: "how to plan a hammam kit", href: "/blog/private-label-hammam-kit" },
  ],
};

export function applyPageInternalLinks(
  page: string,
  text: string,
  locale: Locale = "en",
): string {
  const rules = PAGE_LINKS[page];
  if (!rules) return text;
  let result = text;
  for (const { phrase, href } of rules) {
    const re = new RegExp(`(?<!\\[)(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?!\\])`, "i");
    result = result.replace(re, `[$1](${localizeInternalHref(href, locale)})`);
  }
  return result;
}
