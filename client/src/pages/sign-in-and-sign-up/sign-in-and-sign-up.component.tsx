import React from "react";
import Signin from "../../components/sign-in/sign-in-component";
import SignUp from "../../components/sign-up/signUp";
import { AuthAdapterContext } from "../../context/AuthAdapterContext";
import authService from "../../services/auth/auth";
import "./sign-in-and-sign-up.styles.scss";

const Signinandsignup = () => {
  return (
    <AuthAdapterContext.Provider value={authService}>
      <div className="sign-in-and-sign-up">
        <Signin />
        <SignUp />
      </div>
    </AuthAdapterContext.Provider>
  );
};

export default Signinandsignup;
