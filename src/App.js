import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Swagger from './pages/Swagger/Swagger';

class App extends Component {
  render() {
    return (
      <Router>
          <Route path={`${process.env.PUBLIC_URL}/home`} component={Home} />
          <Route path={`${process.env.PUBLIC_URL}/swagger`} component={Swagger} />
      </Router>
    );
  }
}

export default App;
//te