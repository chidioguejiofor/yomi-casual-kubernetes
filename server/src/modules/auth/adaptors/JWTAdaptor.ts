import jwt from "jsonwebtoken";

type GenericRecord = Record<string, any>;

const TOKEN_SCRET = process.env.JWT_SECRET;

class JWTAdaptor {
  generateToken(data: GenericRecord, expiresIn: string): string {
    return jwt.sign(data, TOKEN_SCRET, { expiresIn });
  }

  validateAndDecodeToken(token: string): [boolean, GenericRecord] {
    try {
      const decoded = jwt.verify(token, TOKEN_SCRET);
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
}

export const jWTAdaptor = new JWTAdaptor();

export type JWTAdaptorType = typeof jWTAdaptor;
