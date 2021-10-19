import { ProductRepoType } from "modules/products/repositories";
import { UsecaseResponseType } from "types";

export class RetrieveProductUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }

  async execute(categoryId: string): Promise<UsecaseResponseType> {
    try {
      const products = await this.productRepository.retrieveProducts({
        categoryId,
      });

      return {
        message: "Successfully retrieved products",
        statusCode: 200,
        data: products,
      };
    } catch (error) {
      return {
        message: "There was an error while creating the product",
        statusCode: 400,
      };
    }
  }
}
