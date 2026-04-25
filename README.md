# HOMM Cafe QR Menu

Production-ready, mobile-first QR menu app built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- Modern QR menu UI optimized for phones
- Sticky category navigation for quick browsing
- Reusable component architecture
- Static, typed menu model in `data/menu.ts`
- `/qr` page with generated QR code via `qrcode.react`
- SEO metadata and optimized static rendering

## Project Structure

- `app` - App Router pages, layout, global styles
- `components` - Reusable UI components
- `data` - Static menu data
- `types` - Shared TypeScript types

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

`/qr` uses this value as the QR target.

## Production Checks

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push code to GitHub.
2. Import repository in Vercel.
3. Add env var: `NEXT_PUBLIC_SITE_URL` with your production URL.
4. Deploy.

After deploy, open `/qr` to validate the generated QR destination.
