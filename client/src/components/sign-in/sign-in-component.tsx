import React, { useState } from "react";
import { useLoginUser } from "../../hooks/authHook";

import FormInput from "../form-input/form-input.component";
import "./sign-in-styles.scss";
import { signInWithGoogle } from "../../firebase/firebase.util";
import CustomButton from "../custom-button/custom-button";

const SigninComponent = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [loginRequestArgs, loginUser] = useLoginUser();
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

  return (
    <div className="sign-in">
      <h2>I already have an account </h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          value={signInData.email}
          handleChange={handleChange}
          name="email"
          label="Email"
          required
        />
        <FormInput
          type="password"
          value={signInData.password}
          name="password"
          label="Password"
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SigninComponent;
// export default class Signincomponent extends Component {
//   constructor(props) {
//     super(props);

//     state = {
//       email: "",
//       password: "",
//     };
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password } = state;
//     try {
//       auth.signInWithEmailAndPassword(email, password);
//       setState({
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       console.log("Failed to Sign in", error.message);
//     }
//   };

//   render() {
//     return (
//       <div className="sign-in">
//         <h2>I already have an account </h2>
//         <span>Sign in with your email and password</span>

//         <form onSubmit={handleSubmit}>
//           <FormInput
//             type="email"
//             value={signInData.email}
//             handleChange={handleChange}
//             name="email"
//             label="Email"
//             required
//           />
//           <FormInput
//             type="password"
//             value={signInData.password}
//             name="password"
//             label="Password"
//             handleChange={handleChange}
//             required
//           />
//           <div className="buttons">
//             <CustomButton type="submit">Sign In</CustomButton>
//             <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
//               Sign in With Google
//             </CustomButton>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
// function useState(arg0: { email: string; password: string }): [any, any] {
//   throw new Error("Function not implemented.");
// }
