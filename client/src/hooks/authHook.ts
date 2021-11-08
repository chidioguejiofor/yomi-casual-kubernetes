import { useState } from "react";
import { useAuthService } from "../context/AuthAdapterContext";

export function useLoginUser() {
  const authService = useAuthService();

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
