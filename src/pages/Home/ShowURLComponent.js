import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  withStyles, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  IconButton, 
  Dialog, 
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyle = {
  table: {
    maxWidth: '700px'
  },
  tableVisable: {
    minWidth: '50px'
  },
  tableURL: {
    minWidth: '400px',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  tableTag: {
    minWidth: '200px',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  tableAction: {
    minWidth: '150px',
    maxWidth: '150px'
  },
  tableHeadFont: {
    fontWeight: 'bold'
  }
}

class ShowURLComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      delete: false,
      urlDelete: '',
      urlTag: '',
      urlId: 0
    }
  }

  async componentDidMount() {
    //get urls here
    const response = await fetch('SwaggerAPI/_swagger/geturl');
    const result = await response.json();
    if (!result.success) {
      this.props.dispatch('Failed to load URL !!', 'MESSAGE');
      this.props.dispatch('error', 'TYPE');
      this.props.dispatch(true, 'ALERT');
    }
    else {
      this.setState({ urls: result.urls });
    }
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.alert.alert && !prevProps.alert.alert && this.props.alert.type === 'success') || (this.props.filter.change !== prevProps.filter.change)) {
      const result = await fetch('SwaggerAPI/_swagger/geturl')
      .then(async response => await response.json());
      if (result.success) {
        let filterUrls = result.urls;
        if (this.props.filter.change.length > 0) {
          filterUrls = result.urls.filter(urlEach => {
            const urlSearch = urlEach.url.search(this.props.filter.change);
            const tagSearch = urlEach.tag.search(this.props.filter.change);
            const result = urlSearch !== -1 || tagSearch !== -1 ? true : false;
            return result;
          });
        }
        this.setState({urls: filterUrls});
        this.props.dispatch(false, 'FILTER');
      }
    }
  }
  

  
  handleDelete = (url,urltag, urlid) => {
    console.log(urlid);
    this.setState({urlDelete: url, urlTag: urltag, urlId: urlid});
    this.setState({delete: true});
  }

  handleDeleteConfirm = async () => {
    this.setState({delete: false});
    const url = this.state.urlDelete;
    const urlTag = this.state.urlTag;
    const urlId = this.state.urlId;
    const response = await fetch('SwaggerAPI/_swagger/deletedoc', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        urlTag: urlTag,
        urlId: urlId
      })
    })
    const result = await response.json();
    if (result.success) {
      this.props.dispatch('Deleted Successfully', 'MESSAGE');
      this.props.dispatch('success', 'TYPE');
    }
    else {
      this.props.dispatch('Deleted Failed !!', 'MESSAGE');
      this.props.dispatch('error', 'TYPE');
    }
    this.props.dispatch(true, 'ALERT');
  }


  handleShowAPI = (url) => {
    //modify
    this.props.dispatch(url.url, 'URL');
    this.props.dispatch(url.tag, 'TAG');
    this.props.dispatch(true, 'SHOW');
    this.props.dispatch(url.identifier, 'ID');
  }
  //modded

  handleVisable = async (url) => {
    let updatedUrl = '';
    const newUrl = this.state.urls.map(urlEach => {
      if (urlEach.url === url) {
        urlEach.visable = !urlEach.visable;
        updatedUrl = urlEach;
      }
      return urlEach;
    });
    const response = await fetch('SwaggerAPI/_swagger/updatevisable', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        url: updatedUrl.url,
        urlTag: updatedUrl.tag,
        urlId: updatedUrl.identifier
      })
    });
    const result = await response.json();
    if (result.success) {
      this.setState({urls: newUrl});
    }
  }

  handleClose = () => {
    this.setState({delete: false});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Dialog
          maxWidth='lg'
          open={this.state.delete}
          onClose={this.handleClose}
          className={classes.dialog}
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogActions align="center">
            <Button onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button onClick={() => this.handleDeleteConfirm()}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableVisable}>
              </TableCell>
              <TableCell align="center" className={classes.tableURL}>
                <p className={classes.tableHeadFont}>URL</p>
              </TableCell>
              <TableCell align="center" className={classes.tableTag}>
                <p className={classes.tableHeadFont}>TAG</p>
              </TableCell>
              <TableCell align="center" className={classes.tableAction}>
                <p className={classes.tableHeadFont}>ACTION</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.urls.map(urlEach => (
              <TableRow hover key={urlEach.url}>
              <TableCell align="center" className={classes.tableVisable}>
                <IconButton onClick={() => this.handleVisable(urlEach.url)}>
                  <VisableButton visable={urlEach.visable}/>
                </IconButton>
              </TableCell>
              <TableCell className={classes.tableURL}>
                {urlEach.url}
              </TableCell>
              <TableCell className={classes.tableTag}>
                {urlEach.tag}
              </TableCell>
              <TableCell align="center" className={classes.tableAction}>
                <IconButton onClick={() => this.handleShowAPI(urlEach)} disabled={this.props.alert.disabled} >
                  <InfoIcon />
                </IconButton>
                <IconButton onClick={() => this.handleDelete(urlEach.url, urlEach.tag, urlEach.identifier)} disabled={this.props.alert.disabled}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

}

class VisableButton extends Component {
  render() {
    if (this.props.visable) {
      return (
          <VisibilityIcon />
      )
    }
    else {
      return (
          <VisibilityOffIcon />
      )
    }
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

const ShowURLWithStyle = withStyles(useStyle)(ShowURLComponent);
export default connect(mapStatetoProps, mapDispatchtoProps)(ShowURLWithStyle);