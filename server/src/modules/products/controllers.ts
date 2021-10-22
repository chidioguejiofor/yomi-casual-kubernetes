import { RequestType } from "global";
import { Response } from "express";
import { productAPI } from "./api";
import {
  IProductCategoryRequest,
  IProductRequest,
} from "modules/products/requestTypes";

class ProductCategoryController {
  async createProductCategory(
    req: RequestType,
    res: Response
  ): Promise<unknown> {
    const data = req.body as IProductCategoryRequest;
    const { statusCode, ...others } = await productAPI.createProductCategory(
      data
    );
    return res.status(statusCode).json({ ...others });
  }

  async getProductCategories(
    req: RequestType,
    res: Response
  ): Promise<unknown> {
    const { statusCode, ...others } = await productAPI.retrieveCategories();
    return res.status(statusCode).json({ ...others });
  }

  async getProductCategory(req: RequestType, res: Response): Promise<unknown> {
    const { slug } = req.params;
    const {
      statusCode,
      ...others
    } = await productAPI.retrieveProductCategoryBySlug(slug);
    return res.status(statusCode).json({ ...others });
  }
}

class ProductController {
  async createProduct(req: RequestType, res: Response): Promise<unknown> {
    const { categoryId, ...data } = req.body as IProductRequest;
    const { statusCode, ...others } = await productAPI.createProduct(
      data,
      categoryId
    );

    return res.status(statusCode).json({ ...others });
  }

  async getProducts(req: RequestType, res: Response): Promise<unknown> {
    const { category_id: categoryId } = req.query;

    const { statusCode, ...others } = await productAPI.retrieveProducts(
      categoryId as string
    );
    return res.status(statusCode).json({ ...others });
  }
}

export const productCategoryController = new ProductCategoryController();

export const productController = new ProductController();
