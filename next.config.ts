import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/case-study.html", destination: "/", permanent: true },
      { source: "/case-study-details.html", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/en/blog", permanent: true },
      { source: "/blog-details.html", destination: "/en/blog", permanent: true },
      { source: "/blog", destination: "/en/blog", permanent: false },
      { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: false },
      { source: "/contact.html", destination: "/en/contact", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: false },
      { source: "/attorney.html", destination: "/en/contact", permanent: true },
    ];
  },
  turbopack: {
    root,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
