import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BenefitsPage } from "@/components/pages/BenefitsPage";
import { getPageCached } from "@/lib/content";
import { homePath, isLocale, localePagePath, type Locale } from "@/lib/i18n/config";
import { buildBenefitsMetadata } from "@/lib/i18n/home-metadata";
import { getNavLabels } from "@/lib/i18n/messages";
import { parseFaq, parseNumberedSteps, parseSectionIndex, getSectionById } from "@/lib/parse";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildBenefitsMetadata(raw as Locale);
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const sections = parseSectionIndex((await getPageCached("benefits", locale)).body);
  const faqSection = getSectionById(sections, "faq");
  const ritualSection = getSectionById(sections, "ritual");
  const faqs = parseFaq(faqSection?.body ?? "");
  const ritualSteps = parseNumberedSteps(ritualSection?.body ?? "");
  const nav = getNavLabels(locale);
  const benefitsPath = localePagePath(locale, "benefits");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: nav.home, path: homePath(locale) },
            { name: nav.benefits, path: benefitsPath },
          ]),
          faqSchema(faqs),
          ritualSteps.length > 0
            ? howToSchema(ritualSection?.title ?? "The ritual, step by step", ritualSteps)
            : null,
        ].filter(Boolean)}
      />
      <BenefitsPage locale={locale} />
    </>
  );
}
