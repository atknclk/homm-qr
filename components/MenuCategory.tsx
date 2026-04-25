import MenuItemCard from "@/components/MenuItemCard";
import type { MenuCategory as MenuCategoryType } from "@/types/menu";

type MenuCategoryProps = {
  category: MenuCategoryType;
};

export default function MenuCategory({ category }: MenuCategoryProps) {
  const sectionId = category.title.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

  return (
    <section id={sectionId} className="scroll-mt-22">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-stone-900">{category.title}</h2>
      <div className="grid gap-3">
        {category.items.map((item) => (
          <MenuItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
