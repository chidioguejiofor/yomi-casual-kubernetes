import { ProductRepoType } from "modules/products/repositories";
import { sequelizeErrorHandler } from "shared/utils/errorHandlers";
import { UsecaseResponseType } from "types";

export class CreateProductUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }

  async execute(product): Promise<UsecaseResponseType> {
    try {
      const newProduct = await this.productRepository.createProduct(product);

      return {
        message: "Successfully created product",
        statusCode: 200,
        data: newProduct,
      };
    } catch (error) {
      const [errors, statusCode] = sequelizeErrorHandler(error);
      return {
        errors,
        message: "There was an error while creating the product",
        statusCode,
      };
    }
  }
}
