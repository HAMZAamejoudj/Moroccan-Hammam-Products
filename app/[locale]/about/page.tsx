import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/pages/AboutPage";
import { getPageCached } from "@/lib/content";
import { homePath, isLocale, localePagePath, type Locale } from "@/lib/i18n/config";
import { buildAboutMetadata } from "@/lib/i18n/home-metadata";
import { getNavLabels } from "@/lib/i18n/messages";
import { JsonLd, aboutPageSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildAboutMetadata(raw as Locale);
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const page = await getPageCached("about", locale);
  const nav = getNavLabels(locale);
  const aboutPath = localePagePath(locale, "about");

  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema(page.h1),
          breadcrumbSchema([
            { name: nav.home, path: homePath(locale) },
            { name: nav.about, path: aboutPath },
          ]),
        ]}
      />
      <AboutPage locale={locale} />
    </>
  );
}
