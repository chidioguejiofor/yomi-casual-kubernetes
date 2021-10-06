import { SuccessType } from "../types";

export class CreateProductUsecase {
  execute(): SuccessType {
    return {
      message: "Successfully creaated product",
      statusCode: 201,
    };
  }
}
