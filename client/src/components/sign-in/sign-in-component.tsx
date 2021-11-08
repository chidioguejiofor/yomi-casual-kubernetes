import React, { useState } from "react";
import { useLoginUser } from "../../hooks/authHook";
import "./sign-in-styles.scss";
import CustomButton from "../custom-button/custom-button";
import { useAuthService } from "../../context/AuthAdapterContext";

const SigninComponent = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const authService = useAuthService();

  const [loginUser] = useLoginUser();
  const handleChange = (e) => {
    const { value, name } = e.target;

    setSignInData({ ...signInData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = signInData;
    try {
      await loginUser(email, password);
      setSignInData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Failed to Sign in", error.message);
    }
  };

  const loginUserViaAuth0 = async () => {
    await authService.loginWithOAuth();
  };
  return (
    <div className="sign-in">
      <h2>I already have an account </h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={loginUserViaAuth0}
            isGoogleSignIn
          >
            Sign in With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SigninComponent;
