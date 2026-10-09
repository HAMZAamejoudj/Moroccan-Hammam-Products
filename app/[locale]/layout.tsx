import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import { SiteCtaBand } from "@/components/sections/SiteCtaBand";
import { bodyFontClassName } from "@/lib/fonts";
import { isLocale, type Locale } from "@/lib/i18n/config";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <SiteShell locale={locale} bodyClassName={bodyFontClassName}>
      <LocaleProvider locale={locale}>
        {children}
        <SiteCtaBand locale={locale} />
      </LocaleProvider>
    </SiteShell>
  );
}
