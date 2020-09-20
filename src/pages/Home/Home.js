import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Header from '../../components/Header';
import Alert from '../../components/AlertComponent';
import ShowURL from './ShowURLComponent';
import ShowAPI from './ShowAPIComponent';
import FilterURL from './FilterURLComponent';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <Alert />
        <Header />
        <ShowAPI />
        <Grid container alignItems="center">
          <Grid container justify="center">

            <h1 style={{marginLeft: "15px"}}>API-M Swagger API Display</h1>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <FilterURL />
          </Grid>
          <Grid container justify="center">
            <ShowURL urls={[]} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;