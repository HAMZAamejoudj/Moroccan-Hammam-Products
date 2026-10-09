---
brand_name: "Moroccan Hammam Products"
domain: "https://moroccanhammamproducts.com"
language: "en"
tagline: "Moroccan hammam products, wholesale from Morocco"
whatsapp: "+212 648-273228"
phone: "+212 648-273228"
email: "sales@moroccanhammamproducts.com"
hours: "Mon to Sat, 9:00 to 18:00 (Morocco time)"
office_address: "Agadir, Souss-Massa, Morocco"
workshop_address: "Agadir, Souss-Massa, Morocco"
address_locality: "Agadir"
postal_code: "80000"
social:
  instagram: "[Instagram URL]"
  facebook: "[Facebook URL]"
  linkedin: "[LinkedIn URL]"
---

# Global site content

## Navigation (header)

- Home → /
- About → /about
- Benefits → /benefits
- Private Label → /private-label
- Blog → /blog
- Contact → /contact
- Header button: "Request a quote" → /contact

## Floating button

WhatsApp button on every page (bottom right), linking to `https://wa.me/[number without +]`, label "Chat on WhatsApp".

## Footer

**Column 1: About**
[Brand name] makes and exports the products of the Moroccan hammam: black soap, ghassoul clay, kessa gloves, argan oil and rose water. Wholesale and private label for spas, retailers and beauty brands worldwide.

**Column 2: Products**
- Moroccan black soap
- Ghassoul clay
- Kessa gloves
- Argan oil
- Rose water
- Hammam kits

**Column 3: Company**
- About → /about
- Benefits → /benefits
- Private Label → /private-label
- Blog → /blog
- Contact → /contact

**Column 4: Contact**
- WhatsApp / phone
- Email
- Office address
- Hours

**Bottom bar:** © [current year] [Brand name]. All rights reserved. · Privacy Policy · Terms & Conditions

## Sitewide schema (JSON-LD, in the root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Brand name]",
  "url": "https://moroccanhammamproducts.com/",
  "logo": "https://moroccanhammamproducts.com/logo.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[street]",
    "addressLocality": "[city]",
    "postalCode": "[code]",
    "addressCountry": "MA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[+212...]",
    "contactType": "sales",
    "availableLanguage": ["English", "French", "Arabic"]
  },
  "sameAs": ["[Instagram URL]", "[Facebook URL]", "[LinkedIn URL]"]
}
```

Add a BreadcrumbList on every page except Home.

## Redirects from the old site (301)

- /index.html → /
- /about.html → /about
- /case-study.html → /
- /case-study-details.html → /
- /blog.html → /blog
- /blog-details.html → /blog
- /contact.html → /contact
- /attorney.html → /contact

## Internal linking map

| From | Links to | Anchor text example |
| --- | --- | --- |
| Home | Benefits, Private Label, Contact, Blog 2, Blog 3 | "the full hammam ritual", "private label hammam products" |
| About | Contact, Private Label | "request a quote" |
| Benefits | Blog 2, Blog 3, Blog 5, Contact | "step-by-step hammam protocol" |
| Private Label | Blog 6, Contact | "how to plan a hammam kit" |
| Blog 1 | Blog 3, Blog 4, Contact, Private Label | "black soap quality checks" |
| Blog 2 | Blog 3, Blog 4, Blog 5, Blog 6, Benefits | "choosing a kessa glove" |
| Blog 3 | Blog 2, Blog 4, Blog 6, Contact | "Moroccan hammam treatment steps" |
| Blog 4 | Blog 2, Blog 3, Blog 6 | "black soap for the hammam" |
| Blog 5 | Blog 2, Benefits, Private Label, Contact | "bulk ghassoul quote" |
| Blog 6 | Private Label, Blog 2, Blog 3, Blog 4, Blog 5 | "start your private label project" |

Rules: 3 to 5 internal links per article, descriptive anchors (never "click here"), the most important link in the first 200 words.
