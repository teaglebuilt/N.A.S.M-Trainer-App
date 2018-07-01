import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import 'typeface-roboto'
import fire from '../config/fire'
import EditIcon from '@material-ui/icons/Edit';
import Home from '../dashboard/Home'
import App from '../App'
import UserStatsEdit from '../dashboard/UserStatsEdit'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 15,
    paddingBottom: 20,
    marginLeft: 40,
    marginTop: theme.spacing.unit * 3,
    width: 250,
    height: 250,
    borderRadius: 15
  }),
  title: {
      fontFamily: ['sans-serif'],
      fontSize: 35,
      fontWeight: "bold",
      color: "#ED3D51",
     },
  stats: {
    width: 250,
    height: 120,
    display: "flex",
    flexDirection: "row"
  }
});

class PaperSheet extends Component {
  constructor(props) {
    super(props)
this.state = {
  updatedUser: {},
  show: false
   }
 }

handleOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};

setSelectedState = function (data) {
  this.setState({ updatedUser: data })
}.bind(this)

printUpdatedStats = function() {
let updatedUser = this.state.updatedUser
  for(let prop in updatedUser) {
  let arr = updatedUser[prop]
for( let i = 0; i < arr.length; i++) {
  return(<div>
      <Typography variant="display1">
         BMI: {arr[i].BMI}
      </Typography>
      <Typography variant="display1">
         LBS: {arr[i].weight}
      </Typography>
      </div>)
  }
 }
}.bind(this)

componentDidMount() {

}
render() {
    const { classes } = this.props;

    return (
    <div className="user-stats-container">

      <Paper className={classes.root} elevation={4}>
        <Typography className={classes.title} variant="headline" component="h3">
          USER STATS
        </Typography>
        <div className={classes.stats}>
          {this.printUpdatedStats()}
         </div>
      <UserStatsEdit handleClose={this.handleClose}
                     setSelectedState={this.setSelectedState}
                     currentUser={this.props.currentUser}/>
      </Paper>
  </div>
  )
 }
}
PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);