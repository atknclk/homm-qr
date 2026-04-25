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
    id: "sicak-kahveler",
    title: "SICAK KAHVELER",
    order: 0,
    items: [
      { name: "Espresso", description: "Yoğun tek shot espresso.", price: 150, order: 0 },
      { name: "Double Espresso", description: "Çift shot espresso.", price: 180, order: 1 },
      { name: "Filtre Kahve", description: "Günlük demleme filtre kahve.", price: 180, order: 2 },
      {
        name: "Americano",
        description: "Espresso bazlı, daha yumuşak içim.",
        price: 200,
        order: 3
      },
      { name: "Latte", description: "Espresso ve kadifemsi süt.", price: 210, order: 4 },
      { name: "Aromalı Latte", description: "Aromalı şurup ile latte.", price: 230, order: 5 },
      { name: "Cappuccino", description: "Espresso, süt ve yoğun köpük.", price: 220, order: 6 },
      { name: "Cortado", description: "Dengeli espresso ve az süt.", price: 200, order: 7 },
      { name: "Flat White", description: "Çift espresso, mikro köpük süt.", price: 220, order: 8 },
      { name: "Mocha", description: "Çikolata dokunuşlu latte.", price: 230, order: 9 },
      {
        name: "White Chocolate Mocha",
        description: "Beyaz çikolata notalı mocha.",
        price: 230,
        order: 10
      },
      { name: "Türk Kahvesi", description: "Geleneksel Türk kahvesi.", price: 120, order: 11 },
      {
        name: "Double Türk Kahvesi",
        description: "Daha yoğun Türk kahvesi.",
        price: 150,
        order: 12
      }
    ]
  },
  {
    id: "soguk-kahveler",
    title: "SOĞUK KAHVELER",
    order: 1,
    items: [
      { name: "Ice Americano", description: "Buz ve su ile ferah espresso.", price: 210, order: 0 },
      { name: "Ice Latte", description: "Buzlu latte.", price: 220, order: 1 },
      { name: "Aromalı Ice Latte", description: "Aromalı buzlu latte.", price: 240, order: 2 },
      {
        name: "Ice Flat White",
        description: "Yoğun espresso tadında buzlu flat white.",
        price: 230,
        order: 3
      },
      { name: "Ice Mocha", description: "Buzlu çikolatalı kahve.", price: 240, order: 4 },
      {
        name: "Ice White Mocha",
        description: "Buzlu beyaz çikolatalı mocha.",
        price: 240,
        order: 5
      },
      { name: "Cold Brew", description: "Uzun demleme, yumuşak içim.", price: 240, order: 6 }
    ]
  },
  {
    id: "kahvalti-ve-tabaklar",
    title: "KAHVALTI VE TABAKLAR",
    order: 2,
    items: [
      {
        name: "Berry Granola",
        description: "Kırmızı meyveler, süzme yoğurt-labne kreması ve ev yapımı granola.",
        price: 380,
        order: 0
      },
      {
        name: "Poşe Armut Granola",
        description: "Tarçınlı elma püresi, poşe armut, süzme yoğurt-labne kreması ve granola.",
        price: 370,
        order: 1
      },
      {
        name: "Somon Avokado",
        description: "Ekşi maya ekmek üzerinde avokado kreması, somon füme ve poşe yumurta.",
        price: 470,
        order: 2
      },
      {
        name: "Füme Kaburga İstiridye Mantar",
        description: "Otlu labne kreması, füme antrikot ve ızgara istiridye mantarı.",
        price: 450,
        order: 3
      },
      {
        name: "Ege Benedict",
        description: "Dana jambon, ricotta kreması, poşe yumurta ve hollandaise sos.",
        price: 420,
        order: 4
      },
      {
        name: "French Tost",
        description: "Agave şuruplu ve yumurtalı ekmek üzerinde taze meyveler.",
        price: 390,
        order: 5
      },
      {
        name: "Bretzel Tabağı",
        description: "Bretzel, salata, tulum peyniri, sele zeytin ve haşlanmış yumurta.",
        price: 390,
        order: 6
      }
    ]
  },
  {
    id: "matcha",
    title: "MATCHA",
    order: 3,
    items: [
      { name: "Matcha Latte", description: "Klasik matcha latte.", price: 240, order: 0 },
      { name: "Strawberry Matcha", description: "Çilek bazlı matcha latte.", price: 260, order: 1 },
      { name: "Matcha Çayı", description: "Saf matcha çayı.", price: 200, order: 2 }
    ]
  },
  {
    id: "cay-ve-diger-icecekler",
    title: "ÇAY VE DİĞER İÇECEKLER",
    order: 4,
    items: [
      { name: "Çay", description: "Klasik ince belli çay.", price: 50, order: 0 },
      { name: "Fincan Çay", description: "Porselen fincanda çay servisi.", price: 85, order: 1 },
      { name: "Ihlamur", description: "Bitki çayı.", price: 180, order: 2 },
      {
        name: "Yaseminli Yeşil Çay",
        description: "Hafif aromalı yeşil çay.",
        price: 190,
        order: 3
      },
      { name: "Rooibos Relax", description: "Kafeinsiz bitki çayı.", price: 200, order: 4 },
      { name: "Sıcak Çikolata", description: "Yoğun sıcak çikolata.", price: 230, order: 5 },
      { name: "Sahlep", description: "Tarçınla servis edilen sıcak sahlep.", price: 210, order: 6 },
      { name: "Chai Tea Latte", description: "Baharatlı chai latte.", price: 220, order: 7 },
      { name: "Su", description: "330 ml su.", price: 50, order: 8 },
      { name: "Soda", description: "Maden suyu.", price: 90, order: 9 },
      { name: "Churchill", description: "Limonlu-tuzlu soda karışımı.", price: 130, order: 10 }
    ]
  },
  {
    id: "ekstralar",
    title: "EKSTRALAR",
    order: 5,
    items: [
      {
        name: "Bitkisel Süt",
        description: "Badem / yulaf / soya alternatif süt farkı.",
        price: 40,
        order: 0
      }
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
