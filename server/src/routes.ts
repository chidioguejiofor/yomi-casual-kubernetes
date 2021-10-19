import { Application, Router } from "express";
import {
  registerValidator,
  loginValidator,
} from "./modules/auth/validation/auth";
import {
  AuthController,
  productCategoryController,
  productController,
} from "./controllers";

import cors from "cors";

export class Routes {
  public static authController: AuthController = new AuthController();

  public static addRoutesToApp(app: Application): void {
    const allowSpecificHostsRouter = Router();
    const allowAllHostsRouter = Router();

    /*
    This allows all hosts to access this endpoint. The idea here is that an endpiont
    like the confirm email GET endpoint should be acceessible while others may not be 
    based on the need of the project.

    */
    allowAllHostsRouter.use(cors());

    allowSpecificHostsRouter.use(
      cors({
        origin: ["http://localhost:3000", "https://syca-49bfe.web.app"], // this changes based on the project,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      })
    );

    // AUTh
    allowSpecificHostsRouter
      .route("/auth/register")
      .post(registerValidator.middleware, this.authController.register);

    allowSpecificHostsRouter
      .route("/auth/login")
      .post(loginValidator.middleware, this.authController.login);

    // PRODUCTS
    allowAllHostsRouter
      .route("/products/categories")
      .post(
        this.authController.validateLoginMiddleware,
        productCategoryController.createProductCategory
      );

    allowAllHostsRouter
      .route("/products/categories")
      .get(
        this.authController.validateLoginMiddleware,
        productCategoryController.getProductCategories
      );
    allowAllHostsRouter
      .route("/products/categories/:slug")
      .get(
        this.authController.validateLoginMiddleware,
        productCategoryController.getProductCategory
      );

    allowAllHostsRouter
      .route("/products")
      .post(
        this.authController.validateLoginMiddleware,
        productController.createProduct
      );

    allowAllHostsRouter
      .route("/products")
      .get(
        this.authController.validateLoginMiddleware,
        productController.getProducts
      );

    // protectRouteMiddleWare
    app.use("/api", allowSpecificHostsRouter);
    app.use("/api", allowAllHostsRouter);
  }
}
