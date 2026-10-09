import { FaqItem } from "./parse";
import { SiteConfig } from "./site-config";
import { BlogFrontmatter } from "./content";

const BASE = "https://moroccanhammamproducts.com";

export function organizationSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.brand_name,
    url: `${BASE}/`,
    logo: `${BASE}/logo.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.office_address,
      addressLocality: config.address_locality ?? "Agadir",
      postalCode: config.postal_code ?? "80000",
      addressCountry: "MA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.phone,
      contactType: "sales",
      availableLanguage: ["English", "French", "Arabic"],
    },
    sameAs: [
      config.social.instagram,
      config.social.facebook,
      config.social.linkedin,
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Moroccan Hammam Products",
    url: `${BASE}/`,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: FaqItem[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function howToSchema(name: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export function articleSchema(
  fm: BlogFrontmatter,
  headline: string,
  image: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: fm.meta_description,
    author: {
      "@type": "Person",
      name: fm.author,
    },
    datePublished: fm.date,
    dateModified: fm.date,
    image: `${BASE}${image}`,
    mainEntityOfPage: `${BASE}/blog/${fm.slug}`,
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private label hammam products",
    provider: {
      "@type": "Organization",
      name: "Moroccan Hammam Products",
    },
    areaServed: "Worldwide",
    serviceType: "Cosmetic manufacturing and private label",
  };
}

export function aboutPageSchema(headline: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: headline,
    url: `${BASE}/about`,
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${BASE}/contact`,
  };
}

export function localBusinessSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.brand_name,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.office_address,
      addressLocality: config.address_locality ?? "Agadir",
      addressCountry: "MA",
    },
    openingHours: config.hours,
  };
}

export function JsonLd({ data }: { data: object | object[] | null }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
