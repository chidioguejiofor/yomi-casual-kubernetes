import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in-styles.scss';
import { auth, signInWithGoogle } from '../../firebase/firebase.util';
import CustomButton from '../custom-button/custom-button';
export default class Signincomponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '',
        password: ''
      });
    } catch (error) {
      console.log('Failed to Sign in', error.message);
    }
  };
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account </h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            name='email'
            label='Email'
            required
          />
          <FormInput
            type='password'
            value={this.state.password}
            name='password'
            label='Password'
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
