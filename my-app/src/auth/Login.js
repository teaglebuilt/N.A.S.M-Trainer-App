import React, { Component } from "react"
import fire from '../config/fire'
import "../styles/login.css"


class Login extends Component {
constructor(props) {
    super(props)

        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.signUp = this.signUp.bind(this)

    this.state = {
        email: "",
        password: ""
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
    event.preventDefault()
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch( (error) => {
        console.log(error)
    })
}
handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
}

render() {
        return (
         <div className="col-md-6">
            <form>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div className="form-group">
                <label>Email Address</label>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter Password" />
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</button>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.signUp}>Sign up</button>
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </form>
          </div>
        )
    }
}

export default Login
