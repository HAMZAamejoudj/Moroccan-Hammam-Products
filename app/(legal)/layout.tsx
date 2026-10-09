import { SiteShell } from "@/components/layout/SiteShell";
import { bodyFontClassName } from "@/lib/fonts";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell locale="en" bodyClassName={bodyFontClassName}>
      {children}
    </SiteShell>
  );
}
