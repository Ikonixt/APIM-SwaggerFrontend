import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

class AlertComponent extends Component {

  handleClose = () => {
    this.props.dispatch(false, 'ALERT');
  }

  render() {
    return (
      <Snackbar 
        open={this.props.alert.alert} 
        autoHideDuration={2000} 
        onClose={this.handleClose}
      >
          <Alert severity={this.props.alert.type}>
            {this.props.alert.message}
          </Alert>
      </Snackbar>
    )
  }
}

const mapStatetoProps = (state) => {
    return {
      alert: state.alert
    }  
  }
  
const mapDispatchtoProps = (dispatch) => {
  return {
    dispatch: (payload, type) => {
      dispatch({
        type: type,
        payload: payload
      });
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(AlertComponent);