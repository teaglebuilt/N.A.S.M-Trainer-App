import React, { Component } from "react"
import fire from '../config/fire'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import "../styles/login.css"
class Register extends Component {



render() {
    return(
       <div className="loginContainerTwo">
            <form onSubmit={this.handleSubmit} className="loginForm">
                <Typography variant='display1' align='center' className="signUpTitle" gutterBottom>
                Create Account
               </Typography>

                <div className="form-group">
                    <TextField margin="normal" value={this.state.firstName} onChange={this.handleChange} type="firstName" name="firstName" className="form-control" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <TextField margin="normal" value={this.state.lastName} onChange={this.handleChange} type="lastName" name="lastName" className="form-control" placeholder="Last Name" />
                </div>
                <div className="form-group">
                  <TextField margin="normal" value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                   <TextField margin="normal"value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter Password" />
                </div>


                    <Button variant="contained" color="primary" className="authBtn" type="submit" containedPrimary>Sign up</Button>
           </form>
           </div>
    )
 }
}

export default Register