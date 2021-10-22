import { productRepository } from "modules/products/repositories";
import {
  IProductCategoryRequest,
  IProductRequest,
} from "modules/products/requestTypes";
import { CreateProductCategoryUsecase } from "./usecases/CreateProductCategoryUsecase";
import { CreateProductUsecase } from "./usecases/CreateProductUsecase";
import { RetrieveProductCategoryUsecase } from "./usecases/RetrieveProductCategoryUsecase";
import { RetrieveProductUsecase } from "./usecases/RetrieveProductUsecase";
import { RetrieveSingleProductCategoryUsecase } from "./usecases/RetrieveSingleProductCategoryUsecase";

class ProductAPI {
  private createProductCategoryUsecase: CreateProductCategoryUsecase;
  private retrieveProductCategoryUsecase: RetrieveProductCategoryUsecase;
  private retrieveProductUsecase: RetrieveProductUsecase;
  private createProductUsecase: CreateProductUsecase;
  private retrieveSingleProductCategoryUsecase: RetrieveSingleProductCategoryUsecase;

  constructor() {
    this.createProductCategoryUsecase = new CreateProductCategoryUsecase(
      productRepository
    );
    this.retrieveProductCategoryUsecase = new RetrieveProductCategoryUsecase(
      productRepository
    );
    this.retrieveProductUsecase = new RetrieveProductUsecase(productRepository);
    this.createProductUsecase = new CreateProductUsecase(productRepository);

    this.retrieveSingleProductCategoryUsecase = new RetrieveSingleProductCategoryUsecase(
      productRepository
    );
  }

  async createProductCategory(category: IProductCategoryRequest) {
    return this.createProductCategoryUsecase.execute(category);
  }

  async createProduct(product: IProductRequest, categoryIdOrSlug: string) {
    return this.createProductUsecase.execute(product, categoryIdOrSlug);
  }

  async retrieveCategories() {
    return this.retrieveProductCategoryUsecase.execute();
  }

  async retrieveProducts(categoryId: string) {
    return this.retrieveProductUsecase.execute(categoryId);
  }

  async retrieveProductCategoryBySlug(slug: string) {
    return this.retrieveSingleProductCategoryUsecase.execute(slug);
  }
}

export const productAPI = new ProductAPI();
export default productAPI;
