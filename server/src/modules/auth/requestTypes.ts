export type IRegisterRequest = {
  firstName: string;
  lastName: string;
  redirectURL: string;
  email: string;
  password: string;
};

export type ILoginRequest = {
  email: string;
  password: string;
};

export type IUser = {
  emailVerified: boolean;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
