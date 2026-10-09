export type FaqItem = { question: string; answer: string };

export type SectionIndex = {
  byTitle: Map<string, string>;
  byId: Map<string, { title: string; body: string }>;
};

const SECTION_HEADING = /^## (?:\[([^\]]+)\]\s*)?(.+)\n([\s\S]*)$/;

export function parseSectionIndex(body: string): SectionIndex {
  const withoutH1 = body.replace(/^#\s+.+\n?/, "");
  const parts = withoutH1.split(/\n(?=## )/);
  const byTitle = new Map<string, string>();
  const byId = new Map<string, { title: string; body: string }>();
  for (const part of parts) {
    const m = part.match(SECTION_HEADING);
    if (!m) continue;
    const id = m[1]?.trim();
    const title = m[2].trim();
    const sectionBody = m[3].trim();
    byTitle.set(title, sectionBody);
    if (id) byId.set(id, { title, body: sectionBody });
  }
  return { byTitle, byId };
}

export function parseSections(body: string): Map<string, string> {
  return parseSectionIndex(body).byTitle;
}

export function getSectionById(index: SectionIndex, id: string): { title: string; body: string } | undefined {
  return index.byId.get(id);
}

const SUBSECTION_HEADING = /^### (?:\[([^\]]+)\]\s*)?(.+)\n([\s\S]*)$/;

export type SubsectionEntry = { id?: string; title: string; body: string };

export function parseSubsectionEntries(section: string): SubsectionEntry[] {
  const parts = section.split(/\n(?=### )/);
  const entries: SubsectionEntry[] = [];
  for (const part of parts) {
    const m = part.match(SUBSECTION_HEADING);
    if (!m) continue;
    entries.push({
      id: m[1]?.trim(),
      title: m[2].trim(),
      body: m[3].trim(),
    });
  }
  return entries;
}

export function parseSubsections(section: string): Map<string, string> {
  const parts = section.split(/\n(?=### )/);
  const map = new Map<string, string>();
  for (const part of parts) {
    const m = part.match(SUBSECTION_HEADING);
    if (m) map.set(m[2].trim(), m[3].trim());
  }
  const intro = parts[0];
  if (!intro.startsWith("### ")) {
    map.set("__intro__", intro.trim());
  }
  return map;
}

export function parseFaq(text: string): FaqItem[] {
  const items: FaqItem[] = [];
  const re = /\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n## |$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    items.push({
      question: m[1].trim(),
      answer: m[2].trim(),
    });
  }
  return items;
}

export function parseBulletList(text: string): string[] {
  return text
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((l) => l.replace(/^-\s+/, "").trim());
}

/** Bullet lines like `- **Title:** description` or `- **Title.** description` */
export function parseBoldBulletList(text: string): { title: string; body: string }[] {
  return parseBulletList(text).map((item) => {
    let m = item.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (m) return { title: m[1].trim(), body: m[2].trim() };
    m = item.match(/^\*\*(.+?)\.\*\*\s*(.+)$/);
    if (m) return { title: m[1].trim(), body: m[2].trim() };
    return { title: "", body: item };
  });
}

export function parseNumberedSteps(text: string): string[] {
  return text
    .split("\n")
    .filter((l) => /^\d+\.\s/.test(l))
    .map((l) => l.replace(/^\d+\.\s+/, "").trim());
}

export type ButtonSpec = { label: string; href: string };

export function parseButtons(line: string): ButtonSpec[] {
  const re = /\[([^\]]+?)\s*→\s*([^\]]+)\]/g;
  const buttons: ButtonSpec[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    let href = m[2].trim();
    if (href.toLowerCase().includes("whatsapp")) {
      href = "whatsapp";
    }
    buttons.push({ label: m[1].trim(), href });
  }
  return buttons;
}

export function parseAudienceCards(text: string): { title: string; body: string }[] {
  return text
    .split("\n")
    .filter((l) => l.startsWith("- **"))
    .map((l) => {
      const m = l.match(/^-\s+\*\*(.+?):\*\*\s*(.+)$/);
      if (!m) return null;
      return { title: m[1], body: m[2] };
    })
    .filter(Boolean) as { title: string; body: string }[];
}

/** Render `[like this]` as plain text without brackets or placeholder styling */
export function unwrapBracketPlaceholders(text: string): string {
  return text.replace(/\[([^\]]+)\]/g, "$1");
}

/** Remove markdown-only lines (buttons, editor notes) from rendered copy */
export function stripEditorNotes(text: string): string {
  return text
    .split("\n")
    .filter((l) => {
      const t = l.trim();
      if (!t) return true;
      if (/^Button:\s/i.test(t)) return false;
      if (/^Buttons:\s/i.test(t)) return false;
      if (/^Placeholders to show/i.test(t)) return false;
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function contentParagraphs(text: string): string[] {
  return stripEditorNotes(text)
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export function firstParagraphAfterH1(body: string): string {
  const rest = body.replace(/^#\s+.+\n?/, "").trim();
  const beforeSection = rest.split(/\n## /)[0];
  const lines = beforeSection
    .split("\n")
    .filter(
      (l) =>
        l.trim() &&
        !l.startsWith("Buttons:") &&
        !l.startsWith("Trust bar:") &&
        !l.startsWith("Button:"),
    );
  return lines.join("\n").trim();
}
