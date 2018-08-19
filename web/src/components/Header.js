import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {logout} from '../actions/AuthActions';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const mapStateToProps = state => {
  return {
      username: state.user.username
  }
}

const mapDispatchToProps = dispatch => ({
  logout:  () => {
    dispatch(logout())
  }
})

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Super Shopper!
          </Typography>
            {
            this.props.username === undefined ?
            null 
            :
              <Button color="inherit" onClick={()=>{ this.props.logout()}}>Logout</Button>
           
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
};

export default compose(withStyles(styles), connect(
  mapStateToProps,
  mapDispatchToProps
))(Header)