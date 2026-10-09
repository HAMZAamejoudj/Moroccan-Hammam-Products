import { CTABand } from "@/components/sections/CTABand";
import { getHomeCtaContent } from "@/lib/home-cta";
import type { Locale } from "@/lib/i18n/config";
import { getSiteConfig } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp-url";

export async function SiteCtaBand({ locale }: { locale: Locale }) {
  const cta = await getHomeCtaContent(locale);
  if (!cta || cta.buttons.length === 0) return null;
  const config = getSiteConfig();
  return (
    <CTABand
      title={cta.title}
      body={cta.body}
      buttons={cta.buttons}
      whatsappHref={whatsappUrl(config.whatsapp)}
    />
  );
}
