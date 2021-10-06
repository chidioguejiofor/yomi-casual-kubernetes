import { SuccessType } from "../types";

export class RetrieveProductCategoryUsecase {
  execute(): SuccessType {
    return {
      message: "Successfully retrieved product categories",
      statusCode: 200,
    };
  }
}
