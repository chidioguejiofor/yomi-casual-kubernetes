import { ProductRepoType } from "modules/products/repositories";
import { Op } from "sequelize";
import { sequelizeErrorHandler } from "shared/utils/errorHandlers";
import { UsecaseResponseType } from "types";

export class CreateProductUsecase {
  productRepository: ProductRepoType;

  constructor(productRepository: ProductRepoType) {
    this.productRepository = productRepository;
  }

  async execute(
    product,
    categorySlugOrId: string
  ): Promise<UsecaseResponseType> {
    try {
      const category = await this.productRepository.getProductCategory({
        [Op.or]: [
          {
            slug: categorySlugOrId,
          },
          {
            id: categorySlugOrId,
          },
        ],
      });

      if (!category) {
        return {
          message: "Category not found",
          statusCode: 404,
        };
      }
      const newProduct = await this.productRepository.createProduct({
        ...product,
        categoryId: category.id,
      });

      return {
        message: "Successfully created product",
        statusCode: 201,
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
