"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import MenuCategory from "@/components/MenuCategory";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeMenu } from "@/lib/menu-store";
import type { MenuCategory as MenuCategoryType } from "@/types/menu";

const categoryLink = (title: string) => title.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

function MenuLoader() {
  return (
    <div className="mt-6 flex min-h-[42vh] flex-col items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border border-stone-300/80 border-t-stone-700 border-r-stone-500" />
        <span className="absolute inset-[10px] animate-spin rounded-full border border-stone-300/70 border-b-stone-700 [animation-direction:reverse] [animation-duration:1.6s]" />
        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-2xl shadow-[0_8px_24px_rgba(70,46,34,0.16)]">
          ☕
        </span>
      </div>
      <p className="mt-4 text-xs tracking-wide text-stone-500">Menu yukleniyor</p>
    </div>
  );
}

export default function MenuClient() {
  const [categories, setCategories] = useState<MenuCategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      setError("Firebase baglantisi tanimlanmadi.");
      return;
    }

    const unsubscribe = subscribeMenu(
      (menuData) => {
        if (menuData.length > 0) {
          setCategories(menuData);
        }
        setError(null);
        setIsLoading(false);
      },
      (subscribeError) => {
        setError(subscribeError.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-10 pt-6 sm:px-6">
      <Header cafeName="HOMM Coffee and Culture" />
      {error && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {error}
        </p>
      )}
      {isLoading && !error && <MenuLoader />}

      {!isLoading && (
        <nav className="sticky top-0 z-10 mt-6 overflow-x-auto rounded-xl border border-stone-200/90 bg-stone-50/90 p-2 shadow-[0_6px_20px_rgba(70,46,34,0.08)] backdrop-blur">
          <ul className="flex min-w-max gap-2">
            {categories.map((category) => (
              <li key={category.id ?? category.title}>
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
      )}

      <div className="mt-6 space-y-8">
        {categories.map((category) => (
          <MenuCategory key={category.id ?? category.title} category={category} />
        ))}
      </div>
    </main>
  );
}
