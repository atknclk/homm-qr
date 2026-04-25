# HOMM Cafe QR Menu

Production-ready, mobile-first QR menu app built with Next.js App Router, TypeScript, Tailwind CSS, and Firebase Firestore.

## Features

- Modern QR menu UI optimized for phones
- Sticky category navigation for quick browsing
- Reusable component architecture
- Real-time menu from Firebase Firestore
- `/qr` page with generated QR code via `qrcode.react`
- SEO metadata and optimized static rendering

## Project Structure

- `app` - App Router pages, layout, global styles
- `components` - Reusable UI components
- `lib` - Firebase client and Firestore menu service
- `types` - Shared TypeScript types

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` (or copy from `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

- `/qr` uses `NEXT_PUBLIC_SITE_URL` as QR target.
- Home page reads menu from Firestore collection `menuCategories`.

## Firestore Schema

Collection: `menuCategories`

Document example:

```json
{
  "title": "HOT COFFEE'S",
  "order": 0,
  "items": [{ "name": "Espresso", "description": "Single shot", "price": 150, "order": 0 }]
}
```

## Menu Management

- Manage `menuCategories` directly from Firebase Console.
- Menu page subscribes to Firestore and updates in real-time.

## Production Checks

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push code to GitHub.
2. Import repository in Vercel.
3. Add all Firebase env vars + `NEXT_PUBLIC_SITE_URL`.
4. Deploy.

After deploy, open `/qr` to validate the generated QR destination.
