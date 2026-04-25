"use client";

import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { MenuCategory } from "@/types/menu";

type FirestoreMenuItem = {
  name: string;
  description?: string;
  price: number;
  order?: number;
};

type FirestoreMenuCategory = {
  title: string;
  order?: number;
  items?: FirestoreMenuItem[];
};

const COLLECTION_NAME = "menuCategories";

const normalizeCategory = (id: string, data: FirestoreMenuCategory): MenuCategory => {
  const items = (data.items ?? [])
    .map((item, index) => ({
      id: `${id}-item-${index}`,
      name: item.name,
      description: item.description ?? "",
      price: Number(item.price ?? 0),
      order: item.order ?? index
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return {
    id,
    title: data.title,
    items,
    order: data.order ?? 0
  };
};

export const subscribeMenu = (
  onData: (menu: MenuCategory[]) => void,
  onError?: (error: Error) => void
) => {
  if (!db || !isFirebaseConfigured) {
    onError?.(new Error("Firebase config is missing."));
    return () => undefined;
  }

  const menuRef = collection(db, COLLECTION_NAME);
  const menuQuery = query(menuRef, orderBy("order", "asc"));

  return onSnapshot(
    menuQuery,
    (snapshot) => {
      const categories = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as FirestoreMenuCategory;
        return normalizeCategory(docSnap.id, data);
      });
      onData(categories);
    },
    (error) => {
      onError?.(error as Error);
    }
  );
};
