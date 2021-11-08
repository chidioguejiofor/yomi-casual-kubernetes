import React, { useEffect, useRef, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext } from "react";
import { IAuthService } from "../interfaces";
import { AuthService } from "../services/auth/auth";

export const AuthAdapterContext = createContext<IAuthService | null>(null);

export const AuthAdapterProvider = (props) => {
  const { user, getAccessTokenSilently, loginWithPopup, logout } = useAuth0();

  const [loading, setLoading] = useState(false);
  const authService: AuthService = useRef<AuthService>(
    new AuthService(loginWithPopup, user, getAccessTokenSilently, logout)
  ).current;

  useEffect(() => {
    async function fetchToken() {
      setLoading(true);
      const token = await authService.getToken();
      setLoading(false);
      console.log(token);
    }

    fetchToken();

    //eslint-disable-next-line
  }, []);

  return (
    <AuthAdapterContext.Provider value={authService}>
      {!loading && props.children}
    </AuthAdapterContext.Provider>
  );
};

export const useAuthService = (): IAuthService => {
  const authService = useContext(AuthAdapterContext);

  if (!authService) {
    throw  new Error("AuthProvider must be in scope");
  }

  return authService;
};
