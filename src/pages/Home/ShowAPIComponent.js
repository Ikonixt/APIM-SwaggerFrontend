import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  withStyles, 
  Dialog, 
  DialogActions, 
  DialogTitle,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  TextField,
  IconButton,
  Grid
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyle = {
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialogTitle: {
    minWidth: '600px',
    maxWidth: '600px'
  },
  tag: {
    marginLeft: '10%'
  },
  box: {
    margin: '5px'
  },
  table: {
    maxWidth: '95%'
  },
  tableHeadFont: {
    fontWeight: 'bold'
  },
  tablePath: {
    minWidth: '80%'
  },
  tableMethod: {
    minWidth: '20%'
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

class ShowAPIComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      paths: [],
      url: '',
      tag: '',
      urlTag: '',
      urlId: 0
    }
  }

  async componentDidUpdate(prevProps) {
    if (!prevProps.showAPI.show && this.props.showAPI.show) {
      const urlObject = await new URL(this.props.showAPI.url);
      const urlTag = this.props.showAPI.tag;
      const urlIdd = this.props.showAPI.id; 
      this.setState({domain: urlObject.host});
      this.setState({urlTag: urlTag}); 
      this.setState({urlId: urlIdd}); 

      var strin = this.state.urlId.toString(); 

      const response = await fetch('SwaggerAPI/_swagger/getpaths/' + strin);
      const result = await response.json();
      let paths = [];
      if (result.paths.length > 0 && result.success) {
        result.paths.forEach(pathsEach => {
          let methodResult = '';
          pathsEach.method.forEach(methodEach => {
            methodResult = methodResult + ' (' + methodEach + ')';
          });
          paths.push({
            path: pathsEach.path,
            method: methodResult
          });
        });
        this.setState({paths: paths});
      }
    }
  }

  handleChange = (event) => {
    const tag = event.target.value;
    this.setState({tag: tag});
    if (tag.trim()) 
      this.setState({disabled: false});
    else {
      this.setState({disabled: true});
    }
  }

  handleSubmit = async (event) => {
    const urlIdd = this.props.showAPI.id; 
    this.setState({urlId: urlIdd}); 
    const idString = this.state.urlId.toString();
    event.preventDefault();
    this.props.dispatch(true, 'DISABLED');
    if (this.state.tag.length > 50) {
      this.props.dispatch("Please don't enter more than 50 characters", 'MESSAGE');
      this.props.dispatch('error', 'TYPE');
    }
    else {
      const response = await fetch('SwaggerAPI/_swagger/updatetag', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          domain: this.state.domain,
          tag: this.state.tag,
          id: idString
        })
      });
      const data = await response.json();
      this.setState({disabled: false});
      if (data.success) {
        this.props.dispatch('Update Tag Successful', 'MESSAGE');
        this.props.dispatch('success', 'TYPE');
        this.props.dispatch(this.state.tag, 'TAG');
      }
      else {
        this.props.dispatch('Update Tag Failed', 'MESSAGE');
        this.props.dispatch('error', 'TYPE');
      }
    }
    this.props.dispatch(true, 'ALERT');
    this.props.dispatch(false, 'DISABLED');
  }

  handleClose = () => {
    this.props.dispatch(false, 'SHOW');
  };

  render() {
    const classes = this.props.classes;
    return (
      <Dialog 
        maxWidth='lg'
        open={this.props.showAPI.show}
        onClose={this.handleClose}
        className={classes.dialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          <p>Domain: {this.state.domain}</p>
          <p style={{fontSize: '80%'}}>Tag: {this.props.showAPI.tag}</p>
          <form onSubmit={this.handleSubmit}>
            <Grid container alignItems="center">
                <TextField 
                  id="outlined-basic-tag" 
                  variant="outlined"
                  size="small" 
                  placeholder="Tag"
                  className={classes.textField}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton type="submit" disabled={this.state.disabled || this.props.alert.disabled} className={classes.addButton}>
                        <EditIcon />
                      </IconButton>
                    )
                  }}
                />
            </Grid>
          </form>
        </DialogTitle>
        <div className={classes.box}>
          <Table align="center" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tablePath}>
                  <p className={classes.tableHeadFont}>Path</p>
                </TableCell>
                <TableCell align="center" className={classes.tableMethod}>
                  <p className={classes.tableHeadFont}>Method</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.paths.map(pathEach => (
                <TableRow hover key={pathEach.path}>
                  <TableCell className={classes.tablePath}>
                      {pathEach.path}
                  </TableCell>
                  <TableCell className={classes.tableMethod}>
                      {pathEach.method}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogActions>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    alert: state.alert,
    showAPI: state.showAPI
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

const ShowAPIWithStyle = withStyles(useStyle)(ShowAPIComponent);
export default connect(mapStatetoProps, mapDispatchtoProps)(ShowAPIWithStyle);