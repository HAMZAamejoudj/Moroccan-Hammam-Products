import type { Locale } from "@/lib/i18n/config";
import { localePagePath } from "@/lib/i18n/config";
import { parseNumberedSteps } from "@/lib/parse";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const BLOG_LINK_RULES: Record<
  string,
  { anchor: string; href: string; firstOnly?: boolean }[]
> = {
  "kessa-glove-guide": [
    { anchor: "black soap", href: "/blog/moroccan-black-soap-quality-guide" },
    {
      anchor: "hammam treatment",
      href: "/blog/moroccan-hammam-treatment-steps-spa",
    },
    { anchor: "kit", href: "/blog/private-label-hammam-kit" },
  ],
  "moroccan-black-soap-quality-guide": [
    { anchor: "hammam", href: "/blog/moroccan-hammam-treatment-steps-spa" },
    { anchor: "kessa", href: "/blog/kessa-glove-guide" },
    { anchor: "INCI list", href: "/contact" },
    { anchor: "samples", href: "/contact" },
    { anchor: "gift sets", href: "/blog/private-label-hammam-kit" },
  ],
  "ghassoul-clay-guide": [
    { anchor: "hammam", href: "/blog/moroccan-hammam-treatment-steps-spa" },
    { anchor: "rose water", href: "/benefits" },
    { anchor: "private label", href: "/private-label" },
    { anchor: "bulk ghassoul", href: "/contact" },
  ],
  "source-hammam-products-wholesale": [
    { anchor: "black soap", href: "/blog/moroccan-black-soap-quality-guide" },
    { anchor: "kessa", href: "/blog/kessa-glove-guide" },
    { anchor: "documents", href: "/contact" },
    { anchor: "samples", href: "/contact" },
    { anchor: "private label", href: "/private-label" },
  ],
  "moroccan-hammam-treatment-steps-spa": [
    { anchor: "black soap", href: "/blog/moroccan-black-soap-quality-guide" },
    { anchor: "kessa", href: "/blog/kessa-glove-guide" },
    { anchor: "ghassoul", href: "/blog/ghassoul-clay-guide" },
    { anchor: "take-home kit", href: "/blog/private-label-hammam-kit" },
    { anchor: "product amounts", href: "/benefits" },
  ],
  "private-label-hammam-kit": [
    { anchor: "private label", href: "/private-label", firstOnly: true },
    { anchor: "black soap", href: "/blog/moroccan-black-soap-quality-guide" },
    { anchor: "kessa", href: "/blog/kessa-glove-guide" },
    { anchor: "ghassoul", href: "/blog/ghassoul-clay-guide" },
    { anchor: "ritual", href: "/blog/moroccan-hammam-treatment-steps-spa" },
  ],
};

export function stripInternalLinkComments(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, "").trim();
}

function linkifyAnchors(
  md: string,
  rules: { anchor: string; href: string; firstOnly?: boolean }[],
): string {
  let result = md;
  for (const rule of rules) {
    const escaped = rule.anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<!\\[)(${escaped})(?!\\])`, "i");
    if (rule.firstOnly) {
      result = result.replace(re, `[$1](${rule.href})`);
    } else {
      result = result.replace(re, `[$1](${rule.href})`);
    }
  }
  return result;
}

function withLocaleInternalHref(href: string, locale: Locale): string {
  if (href.startsWith("/blog/")) return `/${locale}${href}`;
  if (href === "/benefits") return localePagePath(locale, "benefits");
  if (href === "/private-label") return localePagePath(locale, "private-label");
  if (href === "/contact") return localePagePath(locale, "contact");
  if (href === "/about") return localePagePath(locale, "about");
  return href;
}

/** Prefix locale on markdown links that still point at unprefixed app routes. */
export function prefixLocaleInMarkdownLinks(md: string, locale: Locale): string {
  return md.replace(
    /\]\(\/(?!en\/|fr\/|ar\/)(blog\/[^)]+|benefits|private-label|contact|about)\)/g,
    (_, path: string) => {
      const href = path.startsWith("blog/") ? `/${path}` : `/${path}`;
      return `](${withLocaleInternalHref(href, locale)})`;
    },
  );
}

export function prepareBlogMarkdown(
  slug: string,
  body: string,
  locale: Locale = "en",
): string {
  let md = stripInternalLinkComments(body);
  md = md.replace(/^#\s+.+\n?/, "");
  const rules = BLOG_LINK_RULES[slug];
  if (rules) {
    md = linkifyAnchors(md, rules);
  }
  return prefixLocaleInMarkdownLinks(md, locale);
}

/** Turn `[like this]` into plain text; keep markdown links `[text](url)` intact */
export function normalizeBracketPlaceholders(md: string): string {
  return md.replace(/\[([^\]]+)\](?!\()/g, "$1");
}

const FAQ_HEADING = /\n## (FAQ|Questions fréquentes|الأسئلة الشائعة)\s*\n/;

export function extractFaqSection(body: string): {
  bodyWithoutFaq: string;
  faqMarkdown: string;
} {
  const match = body.match(FAQ_HEADING);
  if (!match || match.index === undefined) {
    return { bodyWithoutFaq: body, faqMarkdown: "" };
  }
  const idx = match.index;
  return {
    bodyWithoutFaq: body.slice(0, idx).trim(),
    faqMarkdown: body.slice(idx + 1),
  };
}

const STEP7_HEADING = /\n## (The 7 steps|Les 7 étapes|الخطوات السبع)\s*\n/;
const PREPARE_HEADINGS = [
  "How to prepare it",
  "Comment le préparer",
  "طريقة التحضير",
] as const;

export function extractHowToSteps(md: string): string[] {
  const step7 = md.match(STEP7_HEADING);
  if (step7 && step7.index !== undefined) {
    const after = md.slice(step7.index + step7[0].length);
    const block = after.split("\n## ")[0] ?? "";
    return [...block.matchAll(/^### \d+\.\s+(.+)$/gm)].map((m) => m[1].trim());
  }
  if (/^## (Step \d+:|Étape \d+:|الخطوة \d+:)/m.test(md)) {
    return [
      ...md.matchAll(/^## ((?:Step|Étape|الخطوة) \d+:.+)$/gm),
    ].map((m) => m[1].trim());
  }
  for (const heading of PREPARE_HEADINGS) {
    if (md.includes(`## ${heading}`)) {
      return parseNumberedSteps(
        md.split(`## ${heading}`)[1]?.split("\n## ")[0] ?? "",
      );
    }
  }
  return [];
}

export async function markdownToHtml(md: string): Promise<string> {
  const cleaned = normalizeBracketPlaceholders(md);
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(cleaned);
  return String(file);
}

export function extractH2s(html: string): { id: string; text: string }[] {
  const items: { id: string; text: string }[] = [];
  const re = /<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    items.push({ id: m[1], text });
  }
  return items;
}
