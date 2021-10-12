import { ProductRepoType } from "repositories";
import { ResponseType } from "../types";

export class RetrieveProductCategoryUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }
  async execute(): Promise<ResponseType> {
    try {
      const categories = await this.productRepository.retriveManyProductCategories();

      return {
        message: "Successfully retrieved product categories",
        statusCode: 200,
        data: categories,
      };
    } catch (error) {
      return {
        message: "There was an error while retrieving product categories",
        statusCode: 400,
      };
    }
  }
}
