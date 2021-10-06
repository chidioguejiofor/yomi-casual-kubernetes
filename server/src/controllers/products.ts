import { RequestType } from "global";
import { Response } from "express";
import { productAPI } from "../usecases";

class ProductCategoryController {
  async createProductCategory(
    req: RequestType,
    res: Response
  ): Promise<unknown> {
    const { statusCode, message } = productAPI.createProductCategory();
    return res.status(statusCode).json({ message });
  }

  async getProductCategories(
    req: RequestType,
    res: Response
  ): Promise<unknown> {
    const { statusCode, message } = productAPI.retrieveCategories();
    return res.status(statusCode).json({ message });
  }
}

class ProductController {
  async createProduct(req: RequestType, res: Response): Promise<unknown> {
    const { statusCode, message } = productAPI.createProduct();
    return res.status(statusCode).json({ message });
  }

  async getProducts(req: RequestType, res: Response): Promise<unknown> {
    const { statusCode, message } = productAPI.retrieveProducts();
    return res.status(statusCode).json({ message });
  }
}

export const productCategoryController = new ProductCategoryController();

export const productController = new ProductController();
