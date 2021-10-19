import { jWTAdaptor } from "./adaptors/JWTAdaptor";
import { LoginUsecase } from "./usecases/LoginUsecase";
import { RegisterUsecase } from "./usecases/RegisterUsecase";
import { userRepository } from "./repositories";
import { ILoginRequest, IRegisterRequest } from "./requestTypes";

class AuthAPI {
  private registerUsecase: RegisterUsecase;
  private loginUsecase: LoginUsecase;

  constructor() {
    this.registerUsecase = new RegisterUsecase(userRepository, jWTAdaptor);
    this.loginUsecase = new LoginUsecase(userRepository, jWTAdaptor);
  }

  async loginUser(loginData: ILoginRequest) {
    return this.loginUsecase.execute(loginData);
  }

  async registerUser(registerData: IRegisterRequest) {
    return this.registerUsecase.execute(registerData);
  }

  async decodeToken(token: string) {
    return jWTAdaptor.validateAndDecodeToken(token);
  }
}

export const authAPI = new AuthAPI();
