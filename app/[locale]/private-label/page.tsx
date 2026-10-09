import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivateLabelPage } from "@/components/pages/PrivateLabelPage";
import { getPageCached } from "@/lib/content";
import { homePath, isLocale, localePagePath, type Locale } from "@/lib/i18n/config";
import { buildPrivateLabelMetadata } from "@/lib/i18n/home-metadata";
import { getNavLabels } from "@/lib/i18n/messages";
import { parseFaq, parseNumberedSteps, parseSectionIndex, getSectionById } from "@/lib/parse";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema, serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildPrivateLabelMetadata(raw as Locale);
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const page = await getPageCached("private-label", locale);
  const sections = parseSectionIndex(page.body);
  const howSection = getSectionById(sections, "how-it-works");
  const faqSection = getSectionById(sections, "faq");
  const steps = parseNumberedSteps(howSection?.body ?? "");
  const faqs = parseFaq(faqSection?.body ?? "");
  const nav = getNavLabels(locale);
  const plPath = localePagePath(locale, "private-label");

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(),
          breadcrumbSchema([
            { name: nav.home, path: homePath(locale) },
            { name: nav.privateLabel, path: plPath },
          ]),
          howToSchema(howSection?.title ?? "Private label hammam products", steps),
          faqSchema(faqs),
        ].filter(Boolean)}
      />
      <PrivateLabelPage locale={locale} />
    </>
  );
}
