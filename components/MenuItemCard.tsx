import type { MenuItem } from "@/types/menu";

type MenuItemCardProps = {
  item: MenuItem;
};

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <article className="rounded-xl border border-stone-200/80 bg-white/95 p-4 shadow-[0_8px_20px_rgba(70,46,34,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(70,46,34,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-stone-900">{item.name}</h3>
        <p className="shrink-0 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-sm font-medium text-stone-800">
          ₺{item.price}
        </p>
      </div>
      {item.description && <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>}
    </article>
  );
}
