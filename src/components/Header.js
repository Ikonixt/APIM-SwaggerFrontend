import React, { Component } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import AddURL from './AddURLComponent';
import Refetch from './RefetchComponent';

class Header extends Component {

  render() {
    return (
      <AppBar position="static" style={{backgroundColor:"#5DAA5F", minWidth: "1000px"}}>
        <Toolbar>
          <Button color="inherit" href={`${process.env.PUBLIC_URL}/home`}>Home</Button>
          <Button color="inherit" href={`${process.env.PUBLIC_URL}/swagger`}>Swagger</Button>
          <div style={{marginLeft: 'auto'}}>
            <AddURL />
          </div> 
          <Refetch />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;