import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSiteConfig } from "@/lib/site-config";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { localeDirection, type Locale } from "@/lib/i18n/config";

export function SiteShell({
  children,
  locale,
  bodyClassName,
}: {
  children: React.ReactNode;
  locale: Locale;
  bodyClassName: string;
}) {
  const config = getSiteConfig();
  const dir = localeDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body suppressHydrationWarning className={bodyClassName}>
        <JsonLd data={organizationSchema(config)} />
        <Suspense fallback={null}>
          <Header brandName={config.brand_name} />
        </Suspense>
        <main suppressHydrationWarning className="bg-white">
          {children}
        </main>
        <Suspense fallback={null}>
          <Footer config={config} />
        </Suspense>
        <WhatsAppFloat config={config} />
      </body>
    </html>
  );
}
