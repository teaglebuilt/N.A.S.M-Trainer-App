import React, { Component } from "react"
import fire from '../config/fire'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import "../styles/login.css"



class Login extends Component {
constructor(props) {
    super(props)

        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signUp = this.signUp.bind(this)

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
        console.log(user)
    }).catch(error => {
        console.log(error)
    })
}

signUp(event) {
    // event.preventDefault()
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch( (error) => {
        console.log(error)
    })
}
handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
}


handleSubmit(e) {
    console.log("handlesubmit")
    e.preventDefault();
    const userRef = fire.database().ref('user');
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    userRef.push(user);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
    this.signUp()
  }

componentDidMount(){
    const userRef = fire.database().ref('user');
    userRef.on('value', (snapshot) => {
        let user = snapshot.val()
        console.log(user)
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
            <div className="login-page">

            <div className="loginContainer">
            <form onSubmit={this.handleSubmit} className="loginForm">

               <Typography variant='display1' align='center' gutterBottom>
                Login
               </Typography>

                <div className="form-group">

        <TextField margin="normal" value={this.state.email} onChange={this.handleChange}
                floatingLabelText="E-mail" name="email"
                className="form-control" placeholder="Enter Email"
                hintText="Email" floatingLabelTextFixed />
                </div>


                <div className="form-group">
                <TextField margin="normal" value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter Password" />
                </div>

                <Button variant="contained" color="primary" className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</Button>
                <Typography variant='display1' align='center' gutterBottom>
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
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </form>
            </div>
          </div>
        )
    }
}

export default Login

