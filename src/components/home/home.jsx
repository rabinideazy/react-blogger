import React, { Component } from 'react';

import Login from './login';
import Signup from './signup';

import * as services from '../../modules/services';

export default class Home extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      loggedIn: services.loggedIn() ? true : false,
      signupClick: false
    }
  }

  __ClickOnSignup(e) {
    e.preventDefault();
    this.setState({signupClick: true});
  }

  __ClickOnLogin(e) {
    e.preventDefault();
    this.setState({signupClick: false});
  }
  
  render() {
    if( this.state.loggedIn ) {
      window.location.href = '/blog';
      return;
    }

    return (
      <div>
        { !this.state.signupClick ? <Login onSignup={(e) => this.__ClickOnSignup(e)} /> : <Signup onLogin={(e) => this.__ClickOnLogin(e)} /> }
      </div>
    );
  }
}