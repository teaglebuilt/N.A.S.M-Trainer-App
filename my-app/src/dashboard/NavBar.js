import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import fire from '../config/fire'
import Home from '../dashboard/Home'
import WorkoutForm from '../dashboard/WorkoutForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    fontSize: 30,
    fontWeight: 500,
    padding: 10
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  fab: {
    height: 50,
    width: 50,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  logo: {
    fontFamily: "roboto",
    padding: 10
  },
  hello: {
    marginLeft: 50,

  }
};

class MenuAppBar extends React.Component {
  constructor(props){
    super(props)

    this.logout = this.logout.bind(this)
  }
      state = {
        auth: true,
        anchorEl: null
      };

      logout() {
        fire.auth().signOut()
    }


  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

helloUser = function() {
let user = this.props.currentUser
for( let prop in user) {
  return(user[prop].firstName)
}
}.bind(this)

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props.currentUser)

    return (

      <div className={classes.root}>

        <AppBar position="static">
          <Toolbar>
            <Tooltip id="tooltip-fab" title="Add">
             <Button onClick={this.props.showForm} variant="fab" color="secondary" aria-label="Add" className={classes.fab}>
                <AddIcon />
             </Button>
            </Tooltip>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Create Workout
            </Typography>
             <Typography variant="title" color="inherit" className={classes.logo}>
              NASM
              </Typography>
              <FontAwesomeIcon icon={['fas', 'dumbbell']} size={"3x"} />
              <Typography variant="title" color="inherit" className={classes.logo}>
              Trainer
            </Typography>
            <Typography variant="subheading" color="inherit" className={classes.hello} >
             Hello, {this.helloUser()}
            </Typography>

            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.logout}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);