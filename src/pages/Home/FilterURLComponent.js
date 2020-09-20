import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = {
  body: {
    margin: '10px'
  },
  textField: {
    minWidth: '400px',
    '& label.Mui-focused': {
      color: 'grey'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
      },
    }
  }
}

class FilterURLComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      change: ''
    }
  }

  handleChange = (event) => {
    this.props.dispatch(event.target.value, 'CHANGE');
  }


  render() {
    const classes = this.props.classes;
    return (
      <TextField 
        id="outlined-basic-search" 
        variant="outlined" 
        size="small" 
        placeholder="URL or Tag"
        className={classes.textField}
        onChange={this.handleChange} 
        InputProps={{
          startAdornment: (
            <IconButton 
              type="submit" 
              disabled={this.props.alert.disabled}
            >
              <SearchIcon />
            </IconButton>
          )
        }}
      />
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    alert: state.alert,
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

const FilterURLWiteStyle = withStyles(useStyle)(FilterURLComponent);
export default connect(mapStatetoProps, mapDispatchtoProps)(FilterURLWiteStyle);