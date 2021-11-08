import { UserRepoType } from "../repositories";
import { sequelizeErrorHandler } from "shared/utils/errorHandlers";
import { UsecaseResponseType } from "types";
import { ILoginRequest } from "../requestTypes";
import { JWTServiceType } from "../services/JWTService";

export class LoginUsecase {
  userRepository: UserRepoType;
  jwtAdaptor: JWTServiceType;

  constructor(userRepository: UserRepoType, jwtAdaptor: JWTServiceType) {
    this.userRepository = userRepository;
    this.jwtAdaptor = jwtAdaptor;
  }

  async execute(loginRequestData: ILoginRequest): Promise<UsecaseResponseType> {
    try {
      const { email, password } = loginRequestData;
      const user = await this.userRepository.getUser({
        email,
      });

      const passwordIsValid = await this.userRepository.validatePassword(
        password,
        user?.password || ""
      );

      if (user && passwordIsValid) {
        delete user["password"];

        user["token"] = this.jwtAdaptor.generateToken(user, "3d");

        return {
          message: "Successfully logged in user",
          statusCode: 200,
          data: user,
        };
      }

      return {
        message: "Credentials not found",
        statusCode: 404,
      };
    } catch (error) {
      const [errors, statusCode] = sequelizeErrorHandler(error);

      return {
        message: "An error occured while trying to login",
        statusCode,
        errors: errors,
      };
    }
  }
}
