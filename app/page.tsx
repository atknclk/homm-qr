import Header from "@/components/Header";
import MenuCategory from "@/components/MenuCategory";
import { menu } from "@/data/menu";

const categoryLink = (title: string) => title.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-10 pt-6 sm:px-6">
      <Header cafeName="HOMM Coffee and Culture" />

      <nav className="sticky top-0 z-10 mt-6 overflow-x-auto rounded-xl border border-stone-200/90 bg-stone-50/90 p-2 shadow-[0_6px_20px_rgba(70,46,34,0.08)] backdrop-blur">
        <ul className="flex min-w-max gap-2">
          {menu.map((category) => (
            <li key={category.title}>
              <a
                href={`#${categoryLink(category.title)}`}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 space-y-8">
        {menu.map((category) => (
          <MenuCategory key={category.title} category={category} />
        ))}
      </div>
    </main>
  );
}
