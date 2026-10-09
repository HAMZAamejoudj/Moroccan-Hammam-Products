import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions placeholder for moroccanhammamproducts.com",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-28">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />
        <h1 className="font-serif text-4xl text-ink">Terms &amp; Conditions</h1>
        <p className="mt-6 text-ink/80">
          <span className="placeholder">[Terms and conditions text to be added by the brand owner.]</span>
        </p>
      </div>
    </>
  );
}
