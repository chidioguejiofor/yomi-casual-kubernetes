export type Collection = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  categoryId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};
