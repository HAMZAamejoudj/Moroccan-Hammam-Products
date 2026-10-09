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
      { source: "/", destination: "/en", permanent: true },
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/benefits", destination: "/en/benefits", permanent: true },
      { source: "/private-label", destination: "/en/private-label", permanent: true },
      { source: "/index.html", destination: "/en", permanent: true },
      { source: "/about.html", destination: "/en/about", permanent: true },
      { source: "/case-study.html", destination: "/", permanent: true },
      { source: "/case-study-details.html", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/en/blog", permanent: true },
      { source: "/blog-details.html", destination: "/en/blog", permanent: true },
      { source: "/blog", destination: "/en/blog", permanent: true },
      { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: true },
      { source: "/contact.html", destination: "/en/contact", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
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
