import type { MenuCategory } from "@/types/menu";

export const menu: MenuCategory[] = [
  {
    title: "HOT COFFEE'S",
    items: [
      {
        name: "Espresso",
        description: "Intense single-shot espresso with rich crema.",
        price: 150
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk and airy foam.",
        price: 220
      },
      {
        name: "Flat White",
        description: "Double espresso balanced with silky microfoam milk.",
        price: 230
      },
      {
        name: "Mocha",
        description: "Espresso, chocolate, and steamed milk.",
        price: 240
      },
      {
        name: "Turkish Coffee",
        description: "Traditional finely ground coffee served in a small cup.",
        price: 120
      }
    ]
  },
  {
    title: "COLD COFFEE'S",
    items: [
      {
        name: "Ice Americano",
        description: "Espresso poured over cold water and ice.",
        price: 210
      },
      {
        name: "Ice Latte",
        description: "Smooth espresso with chilled milk and ice.",
        price: 220
      },
      {
        name: "Ice Mocha",
        description: "Iced espresso drink with chocolate and milk.",
        price: 240
      },
      {
        name: "Cold Brew",
        description: "Slow-steeped coffee, naturally sweet and refreshing.",
        price: 240
      },
      {
        name: "Ice White Mocha",
        description: "White chocolate espresso blend served over ice.",
        price: 245
      }
    ]
  },
  {
    title: "SNACKS",
    items: [
      {
        name: "Berry Granola Bowl",
        description: "Seasonal berries, labneh cream, and house granola.",
        price: 380
      },
      {
        name: "Avocado Toast",
        description: "Sourdough toast with avocado cream and poached egg.",
        price: 420
      },
      {
        name: "French Toast",
        description: "Egg-soaked brioche with agave syrup and fresh fruits.",
        price: 390
      },
      {
        name: "Smoked Salmon Roll",
        description: "Sourdough roll with smoked salmon and salad greens.",
        price: 470
      },
      {
        name: "Pretzel Plate",
        description: "Pretzel, tulum cheese, olives, and boiled egg.",
        price: 390
      }
    ]
  }
];
