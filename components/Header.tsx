type HeaderProps = {
  cafeName: string;
};

export default function Header({ cafeName }: HeaderProps) {
  return (
    <header className="rounded-2xl border border-stone-200/80 bg-stone-50/95 px-5 py-6 shadow-[0_10px_30px_rgba(70,46,34,0.08)] backdrop-blur">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">QR MENU</p>
      <h1 className="mt-2 text-2xl font-semibold text-stone-900">{cafeName}</h1>
      <p className="mt-2 text-sm text-stone-600">
        Scan, browse, and order your favorites in seconds.
      </p>
    </header>
  );
}
