export type IProductCategoryRequest = {
  title: string;
  slug: string;
  imageUrl: string;
  size: string;
};

export type IProductCategory = IProductCategoryRequest & {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};

export type IProductRequest = {
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  categoryId: number;
};

export type IProduct = IProductRequest & {
  id: number;
};
