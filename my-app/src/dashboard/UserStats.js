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
  button: {
      margin: theme.spacing.unit,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      float: "right",
      marginTop: 40,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },

});

class PaperSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEdit: true
    }
    this.onEdit = this.onEdit.bind(this)
    this.showEdit = this.showEdit(this)
  }
showEdit = function() {
  this.setState({showEdit: true })
}
onEdit = function () {
//   let user = this.props.currentUser
//  user.forEach( index => {
//     for(let prop in index) {

//     }
//  })
}

render() {
    const { classes } = this.props;
    console.log(this.props.currentUser)
    return (
    <div className="user-stats-container">
    {this.state.showEdit ?
      <Paper className={classes.root} elevation={4}>
        <Typography className={classes.title} variant="headline" component="h3">
          USER STATS
        </Typography>
        <Typography>
        </Typography>
        <Button onEdit={this.onEdit()}
                showEdit={this.showEdit}
        variant="fab" aria-label="edit"
         className={classes.button}
          mini>
        <EditIcon></EditIcon>
      </Button>
      </Paper> : "" }
  </div>
  )
 }
}
PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);