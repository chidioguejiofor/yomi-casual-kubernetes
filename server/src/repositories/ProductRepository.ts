import { IProductCategoryRequest, IProductRequest } from "requestTypes";
import db from "database/models";

const Product = db.Product;
const ProductCategory = db.ProductCategory;

class ProductRepository {
  async createProductCategory(category: IProductCategoryRequest) {
    console.log(category);
    const newCategory = await ProductCategory.create({
      ...category,
      slug: category.slug || category.title?.toLowerCase(),
    });
    return newCategory;
  }

  async retriveManyProductCategories(where = {}) {
    const categories = await ProductCategory.findAll({ where });
    return categories;
  }

  async createProduct(product: IProductRequest) {
    const defaultSlug = product.name
      ?.toString()
      .toLowerCase()
      .replace(/ /g, "-");

    const newProduct = await Product.create({
      ...product,
      slug: product.slug || defaultSlug,
    });
    return newProduct;
  }

  async retrieveProducts(where = {}) {
    const products = await Product.findAll({ where });

    return products;
  }
}

export const productRepository = new ProductRepository();
export type ProductRepoType = typeof productRepository;
