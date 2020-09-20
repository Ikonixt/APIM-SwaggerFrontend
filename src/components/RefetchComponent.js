import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

class RefetchComponent extends Component {

  render() {
    return (
      <IconButton onClick={() => this.handleClick()} disabled={this.props.alert.disabled}>
        <RefreshIcon />
      </IconButton>
    )
  }

  handleClick = async () => {
    this.props.dispatch(true, 'DISABLED');
    const response = await fetch('/SwaggerAPI/_swagger/fetchdoc/');
    const result = await response.json();
    if (result.success) {
      this.props.dispatch('Update all URL successful', 'MESSAGE');
      this.props.dispatch('success', 'TYPE');
    }
    else {
      this.props.dispatch('Update all URL failed !!', 'MESSAGE');
      this.props.dispatch('error', 'TYPE');
    }
    this.props.dispatch(true, 'ALERT');
    this.props.dispatch(false, 'DISABLED');
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

export default connect(mapStatetoProps, mapDispatchtoProps)(RefetchComponent);