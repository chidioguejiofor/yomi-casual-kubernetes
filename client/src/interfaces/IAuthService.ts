import { IUser } from "./IAuth";

export type ILoginRequest = {
  email: string;
  password: string;
};
type DataResopnse = IUser & {
  token: string;
};
export type IAuthResponse = {
  data: DataResopnse;
  success: boolean;
};

export type IRegisterRequest = ILoginRequest & {
  firstName: string;
  lastName: string;
};

export interface IAuthService {
  loginWithEmail(loginRequest: ILoginRequest): Promise<IAuthResponse>;
  registerNewUser(registerRequest: IRegisterRequest): Promise<IAuthResponse>;
}
