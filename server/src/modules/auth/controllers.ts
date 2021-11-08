import { NextFunction, Response } from "express";
import { RequestType } from "global";
import { authAPI } from "./api";
import { IRegisterRequest } from "./requestTypes";
import { loginValidator, registerValidator } from "./validation/auth";

const JWT_ERROR_MESSAGE_MAPPER = {
  invalid_token: "Session invalid, please login again",
  credentials_required: "You need to be logged in to access this",
};

export class AuthController {
  public register = async (
    req: RequestType,
    res: Response
  ): Promise<unknown> => {
    const validationResponse = registerValidator.validate(
      req.body as IRegisterRequest
    );

    const success = validationResponse[0];

    const dataOrErrors = registerValidator.excludeUnknownFields(
      validationResponse[1]
    );

    if (!success) {
      return res.status(400).json({
        message: "Data you passed was invalid",
        errors: dataOrErrors,
      });
    }
    const { statusCode, ...others } = await authAPI.registerUser(dataOrErrors);

    return res.status(statusCode).json({ ...others });
  };

  public async login(req: RequestType, res: Response): Promise<unknown> {
    const validationResponse = loginValidator.validate(
      req.body as IRegisterRequest
    );

    const success = validationResponse[0];

    const dataOrErrors = loginValidator.excludeUnknownFields(
      validationResponse[1]
    );

    if (!success) {
      return res.status(400).json({
        message: "Data you passed was invalid",
        errors: dataOrErrors,
      });
    }

    const data = req.body as IRegisterRequest;
    const { statusCode, ...others } = await authAPI.loginUser(data);

    return res.status(statusCode).json({ ...others });
  }

  // public async validaxteLoginMiddleware(
  //   req: RequestType,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<unknown> {
  //   const { headers } = req;
  //   const [bearer, token] = headers.authorization?.split(" ") || [];

  //   if (bearer?.toLowerCase() !== "bearer") {
  //     return res.status(401).json({
  //       message: "You need to be logged in to access this",
  //     });
  //   }
  //   const [success, decodedOrErrors] = await authAPI.decodeToken(token);

  //   if (!success) {
  //     return res.status(401).json(decodedOrErrors);
  //   }

  //   req.decoded = decodedOrErrors;
  //   next();
  // }

  public handleAuthenticationErrors(
    err,
    req: RequestType,
    res: Response,
    next: NextFunction
  ): void {
    if (err.name === "UnauthorizedError") {
      const message = JWT_ERROR_MESSAGE_MAPPER[err.code] || err.message;
      res.status(err.status).send({ message: message });
      return;
    }
    next();
  }

  public validateLoginMiddleware = authAPI.validateTokenMiddleware;
}
