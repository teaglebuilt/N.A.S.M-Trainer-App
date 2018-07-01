import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import "../styles/login.css"
import fire, { auth, provider } from '../config/fire';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Register from '../auth/Register'

class Login extends Component {

    state = {

    }

login = function(event) {
        event.preventDefault()
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( (user) => {
        }).catch(error => {
            console.log(error)
        })
}.bind(this)

handleChange = function(event) {
    this.setState({ [event.target.name]: event.target.value })
}.bind(this)


  render() {
      return(
          <div>
              <div className="loginContainerOne">

<form onSubmit={this.handleSubmit} className="loginForm">

   <Typography variant='display1' align='center' className="signUpTitle" gutterBottom>
    Login
   </Typography>

<div className="form-group">
    <TextField margin="normal" value={this.state.email}
    onChange={this.handleChange}
    floatingLabelText="E-mail" name="email"
    className="form-control" placeholder="Enter Email"
    hintText="Email" floatingLabelTextFixed />
</div>


<div className="form-group">
    <TextField margin="normal" value={this.state.password}
    onChange={this.handleChange} type="password"
    name="password" className="form-control"
    placeholder="Enter Password" />
</div>

    <Button variant="contained"
    color="primary"
    type="submit" onClick={this.login}>Sign in</Button>
</form>
</div>
          </div>
      )
  }
}

export default Login