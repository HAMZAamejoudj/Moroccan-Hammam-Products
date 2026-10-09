import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Manrope, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSiteConfig } from "@/lib/site-config";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { siteLogo } from "@/lib/images";
import { SyncDocumentLocale } from "@/components/i18n/SyncDocumentLocale";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
});

const config = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moroccanhammamproducts.com"),
  title: {
    default: config.brand_name,
    template: `%s | ${config.brand_name}`,
  },
  openGraph: {
    type: "website",
    siteName: config.brand_name,
    images: [{ url: siteLogo.src, alt: config.brand_name }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${manrope.variable} ${notoArabic.variable} min-h-screen antialiased [html[dir=rtl]_&]:font-[family-name:var(--font-arabic)]`}
      >
        <SyncDocumentLocale />
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
