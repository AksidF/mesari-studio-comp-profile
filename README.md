# Mesari Studio Bali

Next.js 16 (App Router) + TypeScript. No UI libraries, no Tailwind, just one CSS file.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Where to edit
| What | File |
|---|---|
| Text, prices, WhatsApp number, FAQ, photos | `src/content/site.ts` |
| Colors | top of `src/app/globals.css` (`:root`) |
| Section layout | `src/components/Sections.tsx` |
| SEO (title, OG, sitemap) | `src/app/layout.tsx`, `sitemap.ts`, `robots.ts` |

## Before going live
1. Check `whatsapp`, `email` and real prices in `site.ts`; add your Instagram/TikTok links (hidden while empty).
2. Put photos in `public/gallery/` and set `image: "/gallery/x.jpg"` in `portfolio`.
3. Logo, favicon (`src/app/icon.png`) and share image are already set. Replace them if you update the logo.
4. Copy `.env.example` to `.env.local` and set your real domain.
5. Deploy to Vercel (free), then submit `/sitemap.xml` to Google Search Console.
Requires Node.js 20.9 or newer.
