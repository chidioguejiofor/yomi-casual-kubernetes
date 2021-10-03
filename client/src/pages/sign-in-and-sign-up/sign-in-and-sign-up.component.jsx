import React from 'react';
import Signin from '../../components/sign-in/sign-in-component';
import SignUp from '../../components/sign-up/signUp';
import './sign-in-and-sign-up.styles.scss';
const Signinandsignup = () => {
  return (
    <div className='sign-in-and-sign-up'>
      <Signin />
      <SignUp />
    </div>
  );
};

export default Signinandsignup;
