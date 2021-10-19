import { ProductRepoType } from "modules/products/repositories";
import { UsecaseResponseType } from "types";

export class RetrieveSingleProductCategoryUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }

  async execute(
    queryValue: string,
    getBySlug = true
  ): Promise<UsecaseResponseType> {
    let singleCategory = null;
    try {
      if (getBySlug) {
        singleCategory = await this.productRepository.getProductCategory({
          slug: queryValue,
        });
      } else {
        singleCategory = await this.productRepository.getProductCategory({
          id: queryValue,
        });
      }
    } catch (error) {
      return {
        message: "There was an error while creating the product",
        statusCode: 400,
      };
    }

    if (!singleCategory) {
      return {
        message: "Category not found",
        statusCode: 404,
      };
    }

    return {
      message: "Successfully retrieved category",
      statusCode: 200,
      data: singleCategory,
    };
  }
}
