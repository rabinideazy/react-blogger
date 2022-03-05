import React, { Component } from 'react';
import axios from 'axios';

import Constants from '../../modules/config';
import * as services from '../../modules/services';

import './login.scss';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      emailError: '',
      loginError: ''
    };

    this.emailRef = React.createRef(); //reference for email
    this.passwordRef = React.createRef(); //reference for password
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

  handleLoginFormSubmit(e) {
    e.preventDefault();

    let fields = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };

    this.setState({loginError: ''});

    axios.post(`${Constants.endpoint}/user/login`, fields).then((res) => {
      services.setUserData( res.data );
      window.location.href = '/blog';
    })
    .catch((error) => {
      let errMsg = error.response.data.data;
      this.setState({loginError: errMsg});
    });
  }
  
  render() {
    return (
      <div className="login">
        <form method="post" onSubmit={this.handleLoginFormSubmit.bind(this)}>
          <label htmlFor="userEmail">Email</label>
          <input type="email" id="userEmail" name="user_email" placeholder="Your Email.." onKeyUp={this.validateEmail.bind(this)} ref={this.emailRef} required />
          <p><span className="userEmailError">{this.state.emailError}</span></p>

          <label htmlFor="userPassword">Password</label>
          <input type="password" id="userPassword" name="user_password" placeholder="Your Password.." ref={this.passwordRef} required />

          <p><span className="userLoginError">{this.state.loginError}</span></p>
        
          <input type="submit" value="Login" />
        </form>

        <p>Don't have an account? <span><a href="#" onClick={this.props.onSignup}>Register Here</a></span></p>
      </div>
    );
  }
}