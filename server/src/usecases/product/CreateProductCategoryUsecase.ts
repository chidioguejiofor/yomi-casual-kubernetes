import { SuccessType } from "../types";

export class CreateProductCategoryUsecase {
  execute(): SuccessType {
    return {
      message: "Successfully creaated product category",
      statusCode: 200,
    };
  }
}
