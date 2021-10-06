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
    this.createProductCategoryUsecase = new CreateProductCategoryUsecase();
    this.retrieveProductCategoryUsecase = new RetrieveProductCategoryUsecase();
    this.retrieveProductUsecase = new RetrieveProductUsecase();
    this.createProductUsecase = new CreateProductUsecase();
  }

  createProductCategory() {
    return this.createProductCategoryUsecase.execute();
  }

  createProduct() {
    return this.createProductUsecase.execute();
  }

  retrieveCategories() {
    return this.retrieveProductCategoryUsecase.execute();
  }

  retrieveProducts() {
    return this.retrieveProductUsecase.execute();
  }
}

export const productAPI = new ProductAPI();
