import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';


export default class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    )
  }
}
