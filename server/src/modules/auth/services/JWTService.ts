import jsonwebtoken from "jsonwebtoken";
import { NextFunction, Response } from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { RequestType } from "global";
const jwtMiddleware = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URL,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

type GenericRecord = Record<string, any>;

// const TOKEN_SCRET = process.env.JWT_SECRET;
const TOKEN_SCRET =
  "d-EtI7B_SgDA5pA_vnI3g6G3kWktAku_QpGeIh6NMmO_42VTIXY4e5wzJ3V1Dhb-";

class JWTService {
  generateToken(data: GenericRecord, expiresIn: string): string {
    return jsonwebtoken.sign(data, TOKEN_SCRET, { expiresIn });
  }

  validateAndDecodeTokaen(token: string): [boolean, GenericRecord | string] {
    try {
      const decoded = jsonwebtoken.verify(token, TOKEN_SCRET);
      return [true, decoded];
    } catch (err) {
      return [
        false,
        {
          message: "Session invalid, please login again",
        },
      ];
    }
  }

  static async decodeToken(
    token: string
  ): Promise<[boolean, GenericRecord | string]> {
    try {
      const decoded = await jsonwebtoken.decode(token);

      return [true, decoded];
    } catch (err) {
      return [
        false,
        {
          message: "Token is invalid",
        },
      ];
    }
  }

  async decodeTokenAndAddUserObjectMiddleware(
    req: RequestType,
    res: Response,
    next: NextFunction
  ) {
    const { headers } = req;
    const [bearer, token] = headers.authorization?.split(" ") || [];

    if (bearer?.toLowerCase() !== "bearer") {
      return res.status(401).json({
        message: "You need to be logged in to access this",
      });
    }

    const [success, decodedOrErrors] = await JWTService.decodeToken(token);

    if (!success) {
      return res.status(401).json(decodedOrErrors);
    }

    req.decoded = decodedOrErrors;

    next();
  }

  public getJWTValidatorMiddleware() {
    return [jwtMiddleware, this.decodeTokenAndAddUserObjectMiddleware];
  }
}

export const jwtService = new JWTService();

export type JWTServiceType = typeof jwtService;
