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

## Google Drive gallery (no database)
Customer photos stay on Google Drive. The site lists the sub-folders of ONE public folder and links each one to Drive.
1. In Drive create a folder, e.g. **Mesari Gallery**, and share it: *Anyone with the link → Viewer*.
2. Inside it, make one sub-folder per event, named `Customer Name - Event Type` (e.g. `Putu & Ayu - Wedding`) and upload the photos.
   Optional: name one photo `cover.jpg` to choose the card image (otherwise the first photo is used).
   Check each sub-folder is also shared as *Anyone with the link* (this is the link customers receive).
3. Google Cloud Console → create a project → enable **Google Drive API** → Credentials → **Create API key** → restrict it to the Drive API.
4. Copy the folder ID from the folder URL (`drive.google.com/drive/folders/THIS_PART`).
5. Set `GOOGLE_API_KEY` and `GOOGLE_DRIVE_FOLDER_ID` (in `.env.local`, and in your hosting dashboard).
New folders appear automatically within an hour (`revalidate` in `src/app/page.tsx`).
Only put a customer's folder in the gallery folder if they agreed to have their photos shown.
