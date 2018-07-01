import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField'
import fire from '../config/fire'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing.unit * 4,
  },
  formControl: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    width: 250
  },
  label: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "roboto",
    padding: 10
  },
  button: {
    margin: theme.spacing.unit,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    float: "right",
    marginTop: 40,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  submit: {
    float: "right",

  }
});


class UserStatsEdit extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateStats = this.updateStats.bind(this)
    this.installStats = this.installStats.bind(this)

  this.state = {
    open: false,
    weight: "",
    bmi: ""
  }
}

  handleOpen = function () {
    this.setState({ open: true });
  }.bind(this)

  rand = function () {
    return Math.round(Math.random() * 20) - 10;
  }.bind(this)

  getModalStyle = function () {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }.bind(this)

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
}

handleSubmit = (event) => {
event.preventDefault()
}

updateStats = () => {
  let currentUser = this.props.currentUser
  currentUser.forEach( user => {
   user.BMI = this.state.bmi,
   user.weight = this.state.weight
  })
  this.setState({ open: false});
  this.props.setSelectedState({ updatedUser: currentUser })
  this.installStats(currentUser)
}

installStats = (user) => {

  let db = fire.database().ref(`user`)
  db.on('value', snap => {
    let dbUser = snap.val()

    for(let prop in dbUser) {
    let userObject = dbUser[prop]
      user.find( i => {
        if(userObject.userId === i.userId) {
            // ???????
        }
      })
    }
  })
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.buttonDiv}>

          <Button
            onClick={this.handleOpen}
            variant="fab" aria-label="edit"
            className={classes.button}
            mini>
            <EditIcon></EditIcon>
          </Button>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this.getModalStyle()}  className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text
            </Typography>
            <form onSubmit={this.handleSubmit} className={classes.formControl} >

            <TextField margin="normal" onChange={this.handleChange}
                       value={this.state.bmi} type="text"
                       name="bmi" placeholder="BMI"
                       >
            </TextField>

            <TextField margin="normal" onChange={this.handleChange}
                       value={this.state.weight} type="text"
                       name="weight" placeholder="lbs" >
            </TextField>
            <Button onClick={this.updateStats}
              className={classes.submit}>Submit Stats</Button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

UserStatsEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserStatsEdit);

