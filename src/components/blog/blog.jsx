import React, { Component } from 'react';

import * as services from '../../modules/services';

export default class Blog extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      loggedIn: services.loggedIn() ? true : false
    }
  }
  
  render() {
    if( !this.state.loggedIn ) {
      window.location.href = '/';
    }

    return (
      <div>
        This is blog..
      </div>
    );
  }
}