import { createContext } from "react";
import { IAuthService } from "../interfaces";

export const AuthAdapterContext =
  createContext<IAuthService | null>(null);

