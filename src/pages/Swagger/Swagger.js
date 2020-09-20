import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import Header from '../../components/Header';
import Alert from '../../components/AlertComponent';

class Swagger extends Component {

  render() {

    const api = 'SwaggerAPI/_swagger/getdoc';
    return (
      <div>
        <Alert />
        <Header />
        <SwaggerUI url={api} />
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
    return {
      alert: state.alert,
      showAPI: state.showAPI,
      filter: state.filter
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
  
export default connect(mapStatetoProps, mapDispatchtoProps)(Swagger);