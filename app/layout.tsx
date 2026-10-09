import type { Metadata } from "next";
import "./globals.css";
import { getSiteConfig } from "@/lib/site-config";
import { siteLogo } from "@/lib/images";

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
  return children;
}
