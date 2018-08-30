import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from './components/Authentication/Auth';
import Groups from './components/groups/GroupDisplayContext';
import { Route, Link } from 'react-router-dom'

import Header from './components/Header';


export default class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
        <div className="App">
          <Header />
            <Route exact path="/" component={Auth} />
            <Route exact path="/groups" component={Groups} />
        </div>
    )
  }
}
