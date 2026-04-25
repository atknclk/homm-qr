import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const parseEnvFile = async (envPath) => {
  const raw = await readFile(envPath, "utf8");
  const lines = raw.split("\n");
  const entries = lines
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const index = line.indexOf("=");
      if (index === -1) return null;
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      return [key, value];
    })
    .filter(Boolean);
  return Object.fromEntries(entries);
};

const env = await parseEnvFile(resolve(process.cwd(), ".env.local"));

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const requiredKeys = ["apiKey", "authDomain", "projectId", "appId"];
for (const key of requiredKeys) {
  if (!firebaseConfig[key]) {
    throw new Error(`Missing Firebase config key: ${key}`);
  }
}

const seedData = [
  {
    id: "hot-coffees",
    title: "HOT COFFEE'S",
    order: 0,
    items: [
      { name: "Espresso", description: "Intense single-shot espresso with rich crema.", price: 150, order: 0 },
      { name: "Cappuccino", description: "Espresso with steamed milk and airy foam.", price: 220, order: 1 },
      {
        name: "Flat White",
        description: "Double espresso balanced with silky microfoam milk.",
        price: 230,
        order: 2
      },
      { name: "Mocha", description: "Espresso, chocolate, and steamed milk.", price: 240, order: 3 },
      {
        name: "Turkish Coffee",
        description: "Traditional finely ground coffee served in a small cup.",
        price: 120,
        order: 4
      }
    ]
  },
  {
    id: "cold-coffees",
    title: "COLD COFFEE'S",
    order: 1,
    items: [
      { name: "Ice Americano", description: "Espresso poured over cold water and ice.", price: 210, order: 0 },
      { name: "Ice Latte", description: "Smooth espresso with chilled milk and ice.", price: 220, order: 1 },
      { name: "Ice Mocha", description: "Iced espresso drink with chocolate and milk.", price: 240, order: 2 },
      { name: "Cold Brew", description: "Slow-steeped coffee, naturally sweet and refreshing.", price: 240, order: 3 },
      {
        name: "Ice White Mocha",
        description: "White chocolate espresso blend served over ice.",
        price: 245,
        order: 4
      }
    ]
  },
  {
    id: "snacks",
    title: "SNACKS",
    order: 2,
    items: [
      {
        name: "Berry Granola Bowl",
        description: "Seasonal berries, labneh cream, and house granola.",
        price: 380,
        order: 0
      },
      { name: "Avocado Toast", description: "Sourdough toast with avocado cream and poached egg.", price: 420, order: 1 },
      { name: "French Toast", description: "Egg-soaked brioche with agave syrup and fresh fruits.", price: 390, order: 2 },
      { name: "Smoked Salmon Roll", description: "Sourdough roll with smoked salmon and salad greens.", price: 470, order: 3 },
      { name: "Pretzel Plate", description: "Pretzel, tulum cheese, olives, and boiled egg.", price: 390, order: 4 }
    ]
  }
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionRef = collection(db, "menuCategories");

const existing = await getDocs(collectionRef);
for (const d of existing.docs) {
  await deleteDoc(doc(db, "menuCategories", d.id));
}

for (const category of seedData) {
  const { id, ...payload } = category;
  await setDoc(doc(db, "menuCategories", id), payload);
}

console.log(`Seed complete. Wrote ${seedData.length} categories.`);
