import { useContext, useState } from "react";
import { AuthAdapterContext } from "../context/AuthAdapterContext";
import { IAuthService } from "../interfaces";

export function useLoginUser() {
  const authService = useContext(AuthAdapterContext) as IAuthService;

  const [loginArgs, setLoginArgs] = useState({
    data: null,
    loading: false,
    success: false,
  });

  const handleLogin = async (email: string, password: string) => {
    setLoginArgs({
      ...loginArgs,
      loading: true,
    });

    const { success } = await authService.loginWithEmail({
      email,
      password,
    });

    setLoginArgs({
      ...loginArgs,
      loading: false,
      success,
    });

    return true;
  };

  if (!authService) {
    throw new Error("The ShopDataAdapterContext is required");
  }

  return [loginArgs, handleLogin];
}
