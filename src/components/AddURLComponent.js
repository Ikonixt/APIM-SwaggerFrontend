import React, {Component} from 'react';
import { connect } from 'react-redux';
import { TextField, withStyles, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyle = {
  authfields: {
    margin: '10px',
    display: 'inline-block'
  },
  labeling: {
    paddingRight: '5px'
  },
  body: {
    margin: '10px',
    display: 'inline-block'
  },
  addButton: {
    marginLeft: '5px'
  },
  alignhorizont: {
    display: 'inline-block'
  },
  textField: {
    backgroundColor: 'white',
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

class AddURLComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      uname: '',
      pword: '',
      tag: ''
    };
  }



  handleChange = (event) => {
    this.setState({url: event.target.value});
    if (event.target.value.trim()) {
      this.setState({disabled: false});
    }
    else {
      this.setState({disabled: true});
    }
  }

  handleUnameChange = (event) => {
    this.setState({uname: event.target.value});
  }

  handlePwordChange = (event) => {
    this.setState({pword: event.target.value});
  }

  handleTagChange = (event) => {
    this.setState({tag: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.dispatch(true, 'DISABLED');
    
    console.log(JSON.stringify({
      url: this.state.url
    }));
    

    const response = await fetch('/SwaggerAPI/_swagger/addhost', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        url: this.state.url,
        uname: this.state.uname,
        pword: this.state.pword,
        tag: this.state.tag
      })
    });
    const data = await response.json();
    this.setState({disabled: false});
    console.log(data);
    

    if (data.success) {
      this.props.dispatch('New URL was added to Swagger', 'MESSAGE');
      this.props.dispatch('success', 'TYPE');
    }
    else {
      this.props.dispatch('Fail to add new URL !!', 'MESSAGE');
      this.props.dispatch('error', 'TYPE');
    }
    this.props.dispatch(true, 'ALERT');
    this.props.dispatch(false, 'DISABLED');
  }

  checkDisable = () => {
    if (this.state.disabled || this.props.alert.disabled)
      return true;
    else 
      return false;
  }
// style="padding-right: 5px;"
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.body}>
        <form onSubmit={this.handleSubmit}>

        <div className={classes.authfields}>
        <label className={classes.labeling}>Username</label>
        <input type="text" name="uname" onChange={this.handleUnameChange}/>
        </div>
        
        <div className={classes.authfields}>
        <label className={classes.labeling}>Password</label>
        <input type="password" name="pword" onChange={this.handlePwordChange}/>
        </div>

        <div className={classes.authfields}>
        <label className={classes.labeling}>API Tag</label>
        <input type="text" name="tag" onChange={this.handleTagChange}/>
        </div>

              <TextField
                id="outlined-basic" 
                variant="outlined" 
                size="small" 
                className={classes.textField}
                placeholder="URL" 
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                      <IconButton 
                        type="submit" 
                        disabled={this.state.disabled || this.props.alert.disabled} 
                        className={classes.addButton}
                      >
                        <AddCircleIcon />
                      </IconButton>
                  )
                }}
              />
        </form>
      </div>
    );
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
 //
const AddURLWithStyle = withStyles(useStyle)(AddURLComponent);
export default connect(mapStatetoProps, mapDispatchtoProps)(AddURLWithStyle);
