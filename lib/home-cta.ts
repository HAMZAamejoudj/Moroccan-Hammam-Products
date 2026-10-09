import { getPageCached } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import {
  ButtonSpec,
  getSectionById,
  parseButtons,
  parseSectionIndex,
} from "@/lib/parse";

export type HomeCtaContent = {
  title: string;
  body: string;
  buttons: ButtonSpec[];
};

export async function getHomeCtaContent(locale: Locale): Promise<HomeCtaContent | null> {
  const page = await getPageCached("home", locale);
  const cta = getSectionById(parseSectionIndex(page.body), "cta");
  if (!cta) return null;
  const body =
    cta.body
      .split("\n\n")[0]
      ?.replace(/^Buttons:.*/gm, "")
      .trim() ?? "";
  return {
    title: cta.title,
    body,
    buttons: parseButtons(cta.body),
  };
}

export function isWhatsAppButton(button: ButtonSpec): boolean {
  return (
    button.href === "whatsapp" ||
    /whatsapp|واتساب/i.test(button.label) ||
    button.href.toLowerCase().includes("whatsapp")
  );
}
