import { Playfair_Display, Manrope, Noto_Sans_Arabic } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const bodyFontClassName = `${playfair.variable} ${manrope.variable} ${notoArabic.variable} min-h-screen antialiased rtl:font-[family-name:var(--font-arabic)]`;
