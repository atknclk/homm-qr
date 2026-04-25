export type MenuItem = {
  name: string;
  description?: string;
  price: number;
};

export type MenuCategory = {
  title: string;
  items: MenuItem[];
};
