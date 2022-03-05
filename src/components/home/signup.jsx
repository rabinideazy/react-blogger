import React, { Component } from 'react';
import axios from 'axios';

import Constants from '../../modules/config';

import './signup.scss';

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      emailError: '',
      confirmPasswordError: '',
      signupError: '',
      signupSuccess: ''
    };

    this.nameRef = React.createRef(); //reference for name
    this.emailRef = React.createRef(); //reference for email
    this.passwordRef = React.createRef(); //reference for password
    this.confirmPasswordRef = React.createRef(); //reference for confirm password
  }

  validateEmail(e){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      emailTxt = e.target.value;

    if(!emailTxt.match(mailformat)) {
      this.setState({emailError: 'Please use valid email.'});
    } else {
      this.setState({emailError: ''});
    }
  }

  validateConfirmPassword(e) {
    let confirmPwd = e.target.value,
      pwd = this.passwordRef.current.value;

    if(confirmPwd !== pwd) {
      this.setState({confirmPasswordError: 'Password and Confirm Password has to be same.'});
    } else {
      this.setState({confirmPasswordError: ''});
    }
  }

  handleSignupFormSubmit(e) {
    e.preventDefault();

    let fields = {
      name: this.nameRef.current.value,
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };

    this.setState({signupError: ''});

    axios.post(`${Constants.endpoint}/user/signup`, fields).then((res) => {
      this.setState({signupSuccess: 'User has been created successfully.'});
    })
    .catch((error) => {
      let errMsg = error.response.data.data;
      this.setState({signupError: errMsg});
    });
  }
  
  render() {
    return (
      <div className="signup">
        <form method="post" onSubmit={this.handleSignupFormSubmit.bind(this)}>
          <label htmlFor="userName">Name</label>
          <input type="text" id="userName" name="user_name" placeholder="Your Name.." ref={this.nameRef} required />

          <label htmlFor="userEmail">Email</label>
          <input type="email" id="userEmail" name="user_email" placeholder="Your Email.." onKeyUp={this.validateEmail.bind(this)} ref={this.emailRef} required />
          <p><span className="userEmailError">{this.state.emailError}</span></p>

          <label htmlFor="userPassword">Password</label>
          <input type="password" id="userPassword" name="user_password" placeholder="Your Password.." ref={this.passwordRef} required />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="user_confirm_password" placeholder="Confirm Password.." onKeyUp={this.validateConfirmPassword.bind(this)} ref={this.confirmPasswordRef} required />
          <p><span className="userConfirmPasswordError">{this.state.confirmPasswordError}</span></p>

          <p><span className="userSignupError">{this.state.signupError}</span></p>
          <p><span className="userSignupSuccess">{this.state.signupSuccess}</span></p>
        
          <input type="submit" value="Signup" />
        </form>

        <p>Have an account? <span><a href="#" onClick={this.props.onLogin}>Login Here</a></span></p>
      </div>
    );
  }
}