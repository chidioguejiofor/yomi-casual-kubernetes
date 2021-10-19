import { UserRepoType } from "../repositories";
import { sequelizeErrorHandler } from "shared/utils/errorHandlers";
import { UsecaseResponseType } from "types";
import { IRegisterRequest } from "../requestTypes";
import { JWTAdaptorType } from "../adaptors/JWTAdaptor";
import { REGISTER_SUCCESS } from "../messages/success";

export class RegisterUsecase {
  userRepository: UserRepoType;
  jwtAdaptor: JWTAdaptorType;

  constructor(userRepository: UserRepoType, jwtAdaptor: JWTAdaptorType) {
    this.userRepository = userRepository;
    this.jwtAdaptor = jwtAdaptor;
  }

  async execute(registerData: IRegisterRequest): Promise<UsecaseResponseType> {
    try {
      const { redirectURL, ...userData } = registerData;
      const user = await this.userRepository.createUser(userData);

      delete user["password"];

      return {
        message: REGISTER_SUCCESS,
        statusCode: 201,
        data: user,
      };
    } catch (error) {
      const [errors, statusCode] = sequelizeErrorHandler(error);

      return {
        message: "An error occured while registering user",
        statusCode,
        errors: errors,
      };
    }
  }
}
