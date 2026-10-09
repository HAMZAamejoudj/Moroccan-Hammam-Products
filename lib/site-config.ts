import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type SiteConfig = {
  brand_name: string;
  domain: string;
  language: string;
  tagline: string;
  whatsapp: string;
  phone: string;
  email: string;
  hours: string;
  office_address: string;
  workshop_address: string;
  address_locality?: string;
  postal_code?: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "site.md"), "utf8");
  const { data } = matter(raw);
  return data as SiteConfig;
}

