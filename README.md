# Moroccan Hammam Products — marketing site

Next.js (App Router) site for [moroccanhammamproducts.com](https://moroccanhammamproducts.com). Content is markdown in `content/`; no CMS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

- Sitewide nav, footer, contact: `content/site.md`
- Pages: `content/pages/*.md`
- Blog: `content/blog/*.md` (frontmatter + body)

After editing markdown, save and refresh; pages are statically generated at build time.

## Add a blog post

1. Create `content/blog/your-slug.md` with frontmatter (`slug`, `seo_title`, `meta_description`, `date`, `author`, `category`, `reading_time`, `schema`).
2. Add internal link comments at the bottom if needed (see existing posts).
3. Rebuild or restart dev — the post appears on `/blog` and at `/blog/your-slug`.

## Swap images

All image paths are in `lib/images.ts`. Replace files under `public/images/products/` and update that file. Product photos from the owner are named `product-01.webp` … `product-22.webp`.

## Environment variables

Copy `.env.example` to `.env.local`:

- `RESEND_API_KEY` — Resend API key for the contact form
- `CONTACT_TO_EMAIL` — inbox for quote requests

If `RESEND_API_KEY` is missing, submissions are logged to the server console and the user still sees success in development.

## Deploy on Vercel

1. Import this repository as a Vercel project (root directory: `.`).
2. Set environment variables in the Vercel dashboard.
3. Deploy. `metadataBase` is already set to `https://www.moroccanhammamproducts.com`.

## Scripts

- `npm run build` — production build (SSG)
- `npm run lint` — ESLint
- `npm start` — serve production build

## Placeholders

Owner placeholders in copy are marked with a dashed underline on the site. See `PLACEHOLDERS.md` for the full list.
