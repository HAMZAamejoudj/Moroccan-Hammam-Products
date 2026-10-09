import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/pages/ContactPage";
import { getPageCached } from "@/lib/content";
import { getSiteConfig } from "@/lib/site-config";
import { homePath, isLocale, localePagePath, type Locale } from "@/lib/i18n/config";
import { buildContactMetadata } from "@/lib/i18n/home-metadata";
import { getNavLabels } from "@/lib/i18n/messages";
import { parseFaq, parseSectionIndex, getSectionById } from "@/lib/parse";
import {
  JsonLd,
  breadcrumbSchema,
  contactPageSchema,
  faqSchema,
  localBusinessSchema,
} from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildContactMetadata(raw as Locale);
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const page = await getPageCached("contact", locale);
  const config = getSiteConfig();
  const sections = parseSectionIndex(page.body);
  const faqSection = getSectionById(sections, "faq");
  const faqs = parseFaq(faqSection?.body ?? "");
  const nav = getNavLabels(locale);
  const contactPath = localePagePath(locale, "contact");

  return (
    <>
      <JsonLd
        data={[
          contactPageSchema(),
          localBusinessSchema(config),
          breadcrumbSchema([
            { name: nav.home, path: homePath(locale) },
            { name: nav.contact, path: contactPath },
          ]),
          faqSchema(faqs),
        ].filter(Boolean)}
      />
      <ContactPage locale={locale} />
    </>
  );
}
