import { ProductRepoType } from "modules/products/repositories";
import { sequelizeErrorHandler } from "shared/utils/errorHandlers";
import { UsecaseResponseType } from "types";

export class CreateProductCategoryUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }

  async execute(category): Promise<UsecaseResponseType> {
    try {
      const newProductCategory = await this.productRepository.createProductCategory(
        category
      );

      return {
        message: "Successfully created category",
        statusCode: 200,
        data: newProductCategory,
      };
    } catch (error) {
      const [errors, statusCode] = sequelizeErrorHandler(error);

      return {
        message: "Error occured while creating product category",
        statusCode,
        errors: errors,
      };
    }
  }
}
