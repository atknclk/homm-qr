import type { Metadata } from "next";
import { QRCodeSVG } from "qrcode.react";

export const metadata: Metadata = {
  title: "HOMM Cafe | QR Code",
  description: "Scan this QR code to open HOMM Cafe's digital menu."
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function QrPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10">
      <section className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">HOMM Cafe</p>
        <h1 className="mt-2 text-2xl font-semibold text-neutral-900">Scan for Menu</h1>
        <p className="mt-2 text-sm text-neutral-600">
          This QR code points to the live menu URL. Update
          <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5">NEXT_PUBLIC_SITE_URL</code>
          on Vercel.
        </p>

        <div className="mt-6 flex justify-center rounded-xl border border-neutral-200 p-4">
          <QRCodeSVG value={siteUrl} size={220} includeMargin />
        </div>

        <a
          href={siteUrl}
          className="mt-5 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Open Menu URL
        </a>
      </section>
    </main>
  );
}
