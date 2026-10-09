import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy placeholder for moroccanhammamproducts.com",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-28">
        <Breadcrumbs items={[{ label: "Home", href: "/en" }, { label: "Privacy Policy" }]} />
        <h1 className="font-serif text-4xl text-ink">Privacy Policy</h1>
        <p className="mt-6 text-ink/80">
          <span className="placeholder">[Privacy policy text to be added by the brand owner.]</span>
        </p>
      </div>
    </>
  );
}
