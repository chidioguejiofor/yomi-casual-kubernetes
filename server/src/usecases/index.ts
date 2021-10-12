import { productRepository } from "repositories";
import { IProductCategoryRequest, IProductRequest } from "requestTypes";
import { CreateProductCategoryUsecase } from "./product/CreateProductCategoryUsecase";
import { CreateProductUsecase } from "./product/CreateProductUsecase";
import { RetrieveProductCategoryUsecase } from "./product/RetrieveProductCategoryUsecase";
import { RetrieveProductUsecase } from "./product/RetrieveProductUsecase";

class ProductAPI {
  private createProductCategoryUsecase: CreateProductCategoryUsecase;
  private retrieveProductCategoryUsecase: RetrieveProductCategoryUsecase;
  private retrieveProductUsecase: RetrieveProductUsecase;
  private createProductUsecase: CreateProductUsecase;

  constructor() {
    this.createProductCategoryUsecase = new CreateProductCategoryUsecase(
      productRepository
    );
    this.retrieveProductCategoryUsecase = new RetrieveProductCategoryUsecase(
      productRepository
    );
    this.retrieveProductUsecase = new RetrieveProductUsecase(productRepository);
    this.createProductUsecase = new CreateProductUsecase(productRepository);
  }

  async createProductCategory(category: IProductCategoryRequest) {
    return this.createProductCategoryUsecase.execute(category);
  }

  async createProduct(product: IProductRequest) {
    return this.createProductUsecase.execute(product);
  }

  async retrieveCategories() {
    return this.retrieveProductCategoryUsecase.execute();
  }

  async retrieveProducts() {
    return this.retrieveProductUsecase.execute();
  }
}

export const productAPI = new ProductAPI();
