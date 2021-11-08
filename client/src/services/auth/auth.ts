import { backendApiClient } from "../../externalClients/axios";
import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "../../interfaces";
import { IAuthService } from "../../interfaces";

export class AuthService implements IAuthService {
  private auth0Login: Function;
  private getAuth0Token: Function;
  private auth0User: any;
  private token: string;
  private auth0Logout: () => void;

  constructor(auth0Login, auth0User, getAuth0Token, auth0Logout) {
    this.auth0Login = auth0Login;
    this.auth0User = auth0User;
    this.getAuth0Token = getAuth0Token;
    this.auth0Logout = auth0Logout;
  }
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

  isLoggedIn() {
    return !!this.token;
  }

  public async loginWithOAuth() {
    // const data = await this.auth0Login();
    await this.auth0Login();
    const accessToken = await this.getToken();
    localStorage.setItem("token", accessToken);
  }

  public async signupWIthOAuth() {
    // const data = await this.auth0Login();

    await this.auth0Login();
    const accessToken = await this.getToken();
    localStorage.setItem("token", accessToken);
  }

  public async getToken() {
    try {
      if (!this.token) {
        this.token = await this.getAuth0Token();
      }
    } finally {
      return this.token;
    }
  }

  public async logout() {
    this.auth0Logout();
  }
}
