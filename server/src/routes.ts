import { Application, Router } from "express";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  changeForgottenPasswordValidator,
  loggedInUserChangePasswordValidator,
} from "./validation/auth";
import {
  AuthController,
  productCategoryController,
  productController,
} from "./controllers";

import cors from "cors";
import { TokenValidator } from "./utils/TokenValidator";

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

    allowAllHostsRouter
      .route("/products/categories")
      .post(productCategoryController.createProductCategory);

    allowAllHostsRouter
      .route("/products/categories")
      .get(productCategoryController.getProductCategories);
    allowAllHostsRouter
      .route("/products/categories/:slug")
      .get(productCategoryController.getProductCategory);

    allowAllHostsRouter
      .route("/products")
      .post(productController.createProduct);

    allowAllHostsRouter.route("/products").get(productController.getProducts);

    // allowAllHostsRouter
    //   .route("/auth/confirm-email/:id")
    //   .get(this.authController.confirmEmail);

    // allowSpecificHostsRouter
    //   .route("/auth/register")
    //   .post(registerValidator.middleware, this.authController.register);

    // allowSpecificHostsRouter
    //   .route("/auth/login")
    //   .post(loginValidator.middleware, this.authController.login);

    // allowSpecificHostsRouter
    //   .route("/auth/forgot-password")
    //   .post(
    //     forgotPasswordValidator.middleware,
    //     this.authController.forgotPassword
    //   );

    // allowSpecificHostsRouter
    //   .route("/auth/forgot-password/confirm")
    //   .post(
    //     changeForgottenPasswordValidator.middleware,
    //     this.authController.changeForgottenPassword
    //   );

    // allowSpecificHostsRouter
    //   .route("/auth/change-password")
    //   .post(
    //     TokenValidator.protectRouteMiddleWare,
    //     loggedInUserChangePasswordValidator.middleware,
    //     this.authController.loggedInUserChangesPassword
    //   );

    // protectRouteMiddleWare
    app.use("/api", allowSpecificHostsRouter);
    app.use("/api", allowAllHostsRouter);
  }
}
