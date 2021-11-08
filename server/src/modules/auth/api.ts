import { jwtService } from "./services/JWTService";
import { LoginUsecase } from "./usecases/LoginUsecase";
import { RegisterUsecase } from "./usecases/RegisterUsecase";
import { userRepository } from "./repositories";
import { ILoginRequest, IRegisterRequest } from "./requestTypes";

class AuthAPI {
  private registerUsecase: RegisterUsecase;
  private loginUsecase: LoginUsecase;

  constructor() {
    this.registerUsecase = new RegisterUsecase(userRepository, jwtService);
    this.loginUsecase = new LoginUsecase(userRepository, jwtService);
  }

  async loginUser(loginData: ILoginRequest) {
    return this.loginUsecase.execute(loginData);
  }

  async registerUser(registerData: IRegisterRequest) {
    return this.registerUsecase.execute(registerData);
  }

  validateTokenMiddleware = jwtService.getJWTValidatorMiddleware();
}

export const authAPI = new AuthAPI();
