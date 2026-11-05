import Link from "next/link";
import Image from "next/image";
import { getProduct, getAllProducts, type ProductDetail } from "@/lib/products";
import {
  homePath,
  localeDirection,
  localePagePath,
  productPath,
  productsPath,
  type Locale,
} from "@/lib/i18n/config";
import { getNavLabels, getProductUi } from "@/lib/i18n/messages";
import { getSiteConfig } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp-url";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { MoroccanPattern } from "@/components/layout/MoroccanPattern";
import { Check } from "lucide-react";

export function ProductDetailPage({
  product,
  locale,
}: {
  product: ProductDetail;
  locale: Locale;
}) {
  const ui = getProductUi(locale);
  const nav = getNavLabels(locale);
  const config = getSiteConfig();
  const dir = localeDirection(locale);

  const waText = `${ui.inquireAboutProduct} ${product.h1}`;
  const waLink = whatsappUrl(config.whatsapp, waText);
  const contactLink = `${localePagePath(locale, "contact")}?product=${product.slug}`;

  // Find related products
  const allProducts = getAllProducts(locale);
  const relatedProducts = product.relatedSlugs
    .map((s) => allProducts.find((p) => p.slug === s))
    .filter((p): p is ProductDetail => Boolean(p));

  return (
    <div className="bg-white pb-16 pt-24 md:pt-28" dir={dir} lang={locale}>
      {/* Breadcrumbs & Header bar */}
      <div className="mx-auto max-w-7xl px-4 pb-6">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: ui.productsBreadcrumb, href: productsPath(locale) },
            { label: product.h1 },
          ]}
        />
      </div>

      {/* Hero Product Overview (2 columns) */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Gallery Column */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} title={product.h1} />
          </div>

          {/* Product Details & Actions Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Category / Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {product.badge}
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  100% Made in Morocco
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                {product.h1}
              </h1>
              <p className="mt-2 text-base font-medium text-gold-dark md:text-lg">
                {product.subtitle}
              </p>

              {/* Short Description */}
              <p className="mt-4 text-base leading-relaxed text-ink/80">
                {product.short_description}
              </p>

              {/* Key Features Chips */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-y border-gold/15 py-5 sm:grid-cols-3">
                <div className="rounded-lg bg-cream/50 p-2.5 text-center">
                  <span className="block text-xs font-semibold text-accent">
                    {locale === "ar" ? "المنشأ" : locale === "fr" ? "Origine" : "Origin"}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-ink">
                    {locale === "ar" ? "المغرب MA" : "Morocco MA"}
                  </span>
                </div>
                <div className="rounded-lg bg-cream/50 p-2.5 text-center">
                  <span className="block text-xs font-semibold text-accent">
                    {locale === "ar" ? "الوثائق" : locale === "fr" ? "Documents" : "Compliance"}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-ink">
                    COA / MSDS / INCI
                  </span>
                </div>
                <div className="col-span-2 rounded-lg bg-cream/50 p-2.5 text-center sm:col-span-1">
                  <span className="block text-xs font-semibold text-accent">
                    {locale === "ar" ? "التوريد" : locale === "fr" ? "Formats" : "Supply"}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-ink">
                    {locale === "ar" ? "جملة وتجزئة" : "Bulk & Retail"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={contactLink}
                  variant="primary"
                  className="w-full text-center text-sm font-semibold sm:w-auto sm:flex-1"
                >
                  {ui.requestQuote}
                </Button>
                <Button
                  href={waLink}
                  variant="secondary"
                  external
                  className="w-full text-center text-sm font-semibold sm:w-auto sm:flex-1"
                >
                  {ui.chatWhatsApp}
                </Button>
              </div>

              <div className="mt-3 text-center sm:text-start">
                <Link
                  href={`${localePagePath(locale, "contact")}?samples=true&product=${product.slug}`}
                  className="inline-flex items-center text-xs font-medium text-ink/70 hover:text-primary hover:underline"
                >
                  <span>→ {ui.requestSamples}</span>
                </Link>
              </div>
            </div>

            {/* Quick Specs Snapshot */}
            <div className="mt-8 rounded-xl border border-gold/20 bg-cream/40 p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {ui.keySpecs}
              </h3>
              <dl className="mt-3 divide-y divide-gold/15 text-xs sm:text-sm">
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="grid grid-cols-3 py-2">
                    <dt className="font-semibold text-ink/90">{spec.label}</dt>
                    <dd className="col-span-2 text-ink/75">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description & Heritage */}
      <section className="border-t border-gold/10 bg-cream/20 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow={locale === "ar" ? "الأصالة والتراث" : locale === "fr" ? "Héritage & Authenticité" : "Heritage & Sourcing"}
            title={product.h1}
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/85 md:text-lg">
            {product.full_description.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="border-t border-gold/10 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow={locale === "ar" ? "مميزات حصرية" : locale === "fr" ? "Efficacité prouvée" : "Formulated for results"}
            title={ui.benefitsTitle}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-gold/15 bg-cream/30 p-5 shadow-sm transition hover:border-gold/40 hover:shadow-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-cream font-bold text-sm">
                  ✓
                </div>
                <p className="text-sm leading-relaxed text-ink/85">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual Application Steps */}
      <section className="border-t border-gold/10 bg-cream/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow={locale === "ar" ? "طقوس الحمام" : locale === "fr" ? "Protocole traditionnel" : "Authentic Spa Protocol"}
            title={ui.howToUseTitle}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.ritualSteps.map((step, idx) => (
              <div
                key={step.title}
                className="relative flex flex-col justify-between rounded-xl border border-gold/20 bg-white p-6 shadow-sm ring-1 ring-ink/5"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-accent">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variants & Formats */}
      {product.variants.length > 0 ? (
        <section className="border-t border-gold/10 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              eyebrow={locale === "ar" ? "تشكيلة الخيارات" : locale === "fr" ? "Personnalisation" : "Range Options"}
              title={ui.variantsTitle}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.variants.map((variant) => (
                <div
                  key={variant.name}
                  className="rounded-xl border border-gold/20 bg-cream/20 p-6 shadow-sm hover:border-gold/50"
                >
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {variant.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">
                    {variant.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Wholesale & Private Label Options */}
      <section className="border-t border-gold/10 bg-cream/30 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-gold/25 bg-white p-8 shadow-md md:p-12">
            <SectionHeading
              eyebrow={locale === "ar" ? "خدمات المصنع" : locale === "fr" ? "Production sur mesure" : "B2B Manufacturing"}
              title={ui.wholesaleHighlightsTitle}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {product.wholesaleHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                  </span>
                  <p className="text-sm leading-relaxed text-ink/85">{highlight}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4 border-t border-gold/15 pt-6">
              <Button href={localePagePath(locale, "private-label")} variant="secondary">
                {locale === "ar" ? "تعرف على العلامة الخاصة" : locale === "fr" ? "Découvrir la marque blanche" : "Explore Private Label Services"}
              </Button>
              <Button href={contactLink} variant="primary">
                {ui.requestQuote}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Specifications Table */}
      <section className="border-t border-gold/10 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow={locale === "ar" ? "بيانات فنية" : locale === "fr" ? "Données produit" : "Quality assurance"}
            title={ui.keySpecs}
          />
          <div className="mt-8 overflow-hidden rounded-xl border border-gold/20 bg-white shadow-sm ring-1 ring-ink/5">
            <table className="w-full text-left text-sm" dir={dir}>
              <tbody className="divide-y divide-gold/15">
                {product.specs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i % 2 === 0 ? "bg-cream/20" : "bg-white"}
                  >
                    <td className="w-1/3 px-5 py-3.5 font-semibold text-ink">
                      {spec.label}
                    </td>
                    <td className="px-5 py-3.5 text-ink/80">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {product.faqs.length > 0 ? (
        <section className="border-t border-gold/10 bg-cream/30 py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeading title={ui.faqTitle} />
            <div className="mt-10 space-y-4">
              {product.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-gold/20 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related Products */}
      {relatedProducts.length > 0 ? (
        <section className="border-t border-gold/10 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <SectionHeading title={ui.relatedTitle} />
              </div>
              <Link
                href={productsPath(locale)}
                className="text-sm font-semibold text-primary hover:text-accent hover:underline"
              >
                {ui.allProducts} →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gold/20 bg-white shadow-sm ring-1 ring-ink/5 transition hover:border-gold/40 hover:shadow-md"
                >
                  {rel.images[0] ? (
                    <Link
                      href={productPath(locale, rel.slug)}
                      className="relative aspect-[4/3] overflow-hidden bg-stone-100"
                    >
                      <Image
                        src={rel.images[0].src}
                        alt={rel.images[0].alt}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold text-accent uppercase">
                      {rel.badge}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-ink">
                      <Link
                        href={productPath(locale, rel.slug)}
                        className="hover:text-primary transition"
                      >
                        {rel.h1}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ink/75 line-clamp-3">
                      {rel.short_description}
                    </p>
                    <div className="mt-5 flex items-center justify-between pt-2 border-t border-gold/10">
                      <Link
                        href={productPath(locale, rel.slug)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        {ui.viewDetails} →
                      </Link>
                      <Button
                        href={`${localePagePath(locale, "contact")}?product=${rel.slug}`}
                        variant="secondary"
                        className="text-xs py-1.5 px-3"
                      >
                        {ui.requestQuote}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Bottom Conversion Band */}
      <section className="relative overflow-hidden bg-primary py-16 text-cream md:py-20">
        <MoroccanPattern className="pointer-events-none absolute right-4 top-4 h-32 w-32 text-gold opacity-15" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl font-normal md:text-4xl text-cream">
            {ui.readyToOrderTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/90">
            {ui.readyToOrderBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={contactLink}
              variant="secondary"
              className="!border-cream !bg-cream !text-primary hover:!bg-white"
            >
              {ui.requestQuote}
            </Button>
            <Button
              href={waLink}
              external
              variant="primary"
              className="!border-cream !bg-accent !text-cream hover:!bg-accent/90"
            >
              {ui.chatWhatsApp}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

