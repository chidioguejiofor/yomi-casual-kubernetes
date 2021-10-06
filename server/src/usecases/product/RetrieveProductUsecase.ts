import { SuccessType } from "../types";

export class RetrieveProductUsecase {
  execute(): SuccessType {
    return {
      message: "Successfully retrieved products",
      statusCode: 200,
    };
  }
}
