export type MenuItem = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  order?: number;
};

export type MenuCategory = {
  id?: string;
  title: string;
  items: MenuItem[];
  order?: number;
};
