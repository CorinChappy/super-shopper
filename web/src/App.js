import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from './components/Authentication/Auth';

import Header from './components/Header';


export default class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Auth />
      </div>
    )
  }
}
