import { getPageCached } from "@/lib/content";
import { getSiteConfig } from "@/lib/site-config";
import { homePath, localeDirection, type Locale } from "@/lib/i18n/config";
import { getContactUi, getNavLabels } from "@/lib/i18n/messages";
import { parseBulletList, parseFaq, parseSectionIndex, getSectionById } from "@/lib/parse";
import { whatsappUrl } from "@/lib/whatsapp-url";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { FAQ } from "@/components/sections/FAQ";
import { QuoteForm } from "@/components/contact/QuoteForm";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110123.45678901234!2d-9.598107!3d30.427755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b875e4b8f8f8f%3A0x0!2sAgadir%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma";

export async function ContactPage({ locale }: { locale: Locale }) {
  const page = await getPageCached("contact", locale);
  const config = getSiteConfig();
  const ui = getContactUi(locale);
  const nav = getNavLabels(locale);
  const sections = parseSectionIndex(page.body);
  const intro = page.body.replace(/^#\s+.+\n?/, "").split(/\n## /)[0].trim();
  const tips = getSectionById(sections, "tips");
  const visit = getSectionById(sections, "visit");
  const faq = getSectionById(sections, "faq");
  const officeAddress = config.office_address || ui.officeAddress;

  return (
    <div className="bg-white" dir={localeDirection(locale)} lang={locale}>
      <div className="mx-auto max-w-6xl px-4 pt-28">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: nav.contact },
          ]}
        />
        <h1 className="max-w-2xl font-serif text-4xl text-ink md:text-5xl">{page.h1}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/85">
          <PlaceholderText text={intro} />
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 md:grid md:grid-cols-5 md:gap-10">
        <div className="md:col-span-3">
          <h2 className="font-serif text-2xl text-ink">{ui.formHeading}</h2>
          <div className="mt-6">
            <QuoteForm locale={locale} whatsappHref={whatsappUrl(config.whatsapp)} />
          </div>
        </div>
        <aside className="mt-10 md:col-span-2 md:mt-14">
          <h2 className="font-serif text-xl text-ink">{tips?.title ?? ui.tipsHeading}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink/85">
            {parseBulletList(tips?.body ?? "").map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-serif text-xl text-ink">{ui.detailsHeading}</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/85">
            <li>
              <strong className="text-ink">{ui.whatsAppPhone}:</strong>{" "}
              <a className="link-underline" href={whatsappUrl(config.whatsapp)}>
                {config.phone}
              </a>
            </li>
            <li>
              <strong className="text-ink">{ui.email}:</strong>{" "}
              <a className="link-underline" href={`mailto:${config.email}`}>
                {config.email}
              </a>
            </li>
            <li>
              <strong className="text-ink">{ui.hours}:</strong> {config.hours || ui.hoursValue}
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-xl text-ink">{ui.office}</h2>
          <p className="mt-2 text-sm text-ink/85">{officeAddress}</p>
          <div className="mt-4 overflow-hidden rounded-lg border border-gold/20 shadow-sm">
            <iframe
              title={ui.mapTitle}
              src={MAP_EMBED_SRC}
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <h2 className="mt-10 font-serif text-xl text-ink">{visit?.title ?? ui.visitHeading}</h2>
          <p className="mt-3 text-sm text-ink/85">
            <PlaceholderText text={visit?.body ?? ""} />
          </p>
        </aside>
      </section>

      <FAQ items={parseFaq(faq?.body ?? "")} title={ui.faqTitle} locale={locale} />
    </div>
  );
}
