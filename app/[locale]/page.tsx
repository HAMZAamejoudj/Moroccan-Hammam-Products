import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
import { getPageCached } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildHomeMetadata } from "@/lib/i18n/home-metadata";
import { parseFaq, parseNumberedSteps, parseSectionIndex, getSectionById } from "@/lib/parse";
import {
  JsonLd,
  faqSchema,
  howToSchema,
  websiteSchema,
} from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildHomeMetadata(raw as Locale);
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const page = await getPageCached("home", locale);
  const sections = parseSectionIndex(page.body);
  const faqSection = getSectionById(sections, "faq");
  const orderingSection = getSectionById(sections, "ordering");
  const faqs = parseFaq(faqSection?.body ?? "");
  const steps = parseNumberedSteps(orderingSection?.body ?? "");
  const howToTitle = orderingSection?.title ?? "How ordering works";

  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          faqSchema(faqs),
          howToSchema(howToTitle, steps),
        ].filter(Boolean)}
      />
      <HomePage locale={locale} />
    </>
  );
}
