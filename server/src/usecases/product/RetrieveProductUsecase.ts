import { ProductRepoType } from "repositories";
import { ResponseType } from "../types";

export class RetrieveProductUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<ResponseType> {
    try {
      const products = await this.productRepository.retrieveProducts();

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
