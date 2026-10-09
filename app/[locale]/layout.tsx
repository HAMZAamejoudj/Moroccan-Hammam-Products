import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { SiteCtaBand } from "@/components/sections/SiteCtaBand";
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
    <LocaleProvider locale={locale}>
      {children}
      <SiteCtaBand locale={locale} />
    </LocaleProvider>
  );
}
