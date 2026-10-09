import { Cormorant_Garamond, Manrope, Noto_Sans_Arabic } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
});

export const bodyFontClassName = `${cormorant.variable} ${manrope.variable} ${notoArabic.variable} min-h-screen antialiased [html[dir=rtl]_&]:font-[family-name:var(--font-arabic)]`;
