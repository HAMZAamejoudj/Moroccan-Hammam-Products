/** Canonical production origin (www). */
export const SITE_ORIGIN = "https://www.moroccanhammamproducts.com";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
