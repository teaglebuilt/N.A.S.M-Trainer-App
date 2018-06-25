import React, { Component } from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import "../styles/login.css"
import Home from '../dashboard/Home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fire, { auth, provider } from '../config/fire';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    googleButton: {
      margin: theme.spacing.unit,
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      }
    },
    facebookButton: {
        margin: theme.spacing.unit,
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
        '&:hover': {
          backgroundColor: indigo[500],
        }
    },
    input: {
      display: 'none',
    },
  });

class Login extends Component {
constructor(props) {
    super(props)

        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signUp = this.signUp.bind(this)
        this.googleSignIn = this.googleSignIn.bind(this)

    this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        user: []
    }
}

login(event) {
    event.preventDefault()
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then( (user) => {
    }).catch(error => {
        console.log(error)
    })
}

googleSignIn() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
}

signUp(key) {
        // event.preventDefault()
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( user => {

           let updateUser =fire.database().ref(`user/${key}`)
            updateUser.update({userId: user.user.uid})
            console.log(user)
        })
        .catch( (error) => {
            console.log(error)
        })
    }


handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
}


handleSubmit(e) {
    e.preventDefault();
    const userRef = fire.database().ref('user');
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      userId: "",
      weight: "",
      BMI: "",
      Max: {
          Bench: "",
          Squat: "",
          DeadLift: ""
      }
    }

    let userData = userRef.push(user);


    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
    this.signUp(userData.key)
}

componentDidMount(){
    const userRef = fire.database().ref('user');
    userRef.on('value', (snapshot) => {
        let user = snapshot.val()
        let newState = []
        for(let i in user) {
            newState.push({
                firstName: user[i].firstName,
                lastName: user[i].lastName,
                email: user[i].email,
                password: user[i].password
            })
        }
        this.setState({user: newState})
      })
    }






render() {

return (

    <div>
        <span className="logo">
            <img src="https://preview.ibb.co/fAZmpo/nasm_logo_one_copy.png" className="logo"/>
        </span>
    <div className="login-container">

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

            <div className="social-sign-in col-4">
            <Typography variant='display1' align='center' className="social" gutterBottom>
                Or Sign In with
               </Typography>
                <Button variant="contained" className={this.props.classes.googleButton} onClick={this.googleSignIn}>
                   <FontAwesomeIcon className="google" icon={['fab', 'google']} size="1x" />
                    oogle
                </Button>
                <Button variant="contained" className={this.props.classes.facebookButton}>
                   <FontAwesomeIcon className="google" icon={['fab', 'facebook']} size="2x" />
                    acebook
                </Button>
            </div>

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

      </div>
     </div>

        )
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login)