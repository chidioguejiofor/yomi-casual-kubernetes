import { backendApiClient } from "../../externalClients/axios";
import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "../../interfaces";
import { IAuthService } from "../../interfaces";

class AuthService implements IAuthService {
  async loginWithEmail(loginRequest: ILoginRequest): Promise<IAuthResponse> {
    const response = await backendApiClient.post(`/auth/login`, loginRequest);
    const { data } = response.data as any as IAuthResponse;

    const success = response.status === 200;

    if (success) localStorage.setItem("token", data.token);
    return { data, success };
  }
  async registerNewUser(
    registerRequest: IRegisterRequest
  ): Promise<IAuthResponse> {
    const response = await backendApiClient.post(
      `/auth/register`,
      registerRequest
    );
    const { data } = response.data as any;

    return data;
  }
}

const authService = new AuthService();

export default authService;
