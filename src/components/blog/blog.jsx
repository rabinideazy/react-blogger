import React, { Component } from 'react';
import axios from 'axios';

import Constants from '../../modules/config';
import * as services from '../../modules/services';

import './blog.scss';

export default class Blog extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      loggedIn: services.loggedIn() ? true : false,
      blogs: []
    }
  }

  componentDidMount() {
    axios.get(`${Constants.endpoint}/blogs`).then((res) => {
      this.setState({blogs: res.data});
    })
    .catch((error) => {
      console.log(error.response.data.data);
    });
  }

  onLogout() {
    services.loggedOut();
  }

  createMarkup(content) {
    return {__html: content};
  }
  
  render() {
    if( !this.state.loggedIn ) {
      window.location.href = '/';
      return;
    }

    return (
      <div className="main">
        <p className="logout"><a href="#" onClick={this.onLogout.bind(this)}>Logout</a></p>
        {
          this.state.blogs.map((d,i) => {
            return (
              <div className="blog" key={i}>
                <div className="blog-img"><img src={d.thumbnail_url} alt="Blog Image" /></div>
                <div className="blog-content" dangerouslySetInnerHTML={this.createMarkup(d.post_content)}></div>
              </div>
            );
          })
        }
      </div>
    );
  }
}