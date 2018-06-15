import React, { Component } from 'react';
import './App.css';
import Login from './auth/Login'
import Home from './dashboard/Home'
import fire from './config/fire'
import WorkoutForm from './dashboard/WorkoutForm';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        user: {}
    }
}

componentDidMount() {
    this.authListener()
}
authListener() {
    fire.auth().onAuthStateChanged((user) => {
        console.log(user)
        if(user) {
            this.setState({ user })
            // localStorage.setItem("user", user.uid)
        } else {
            this.setState({ user: null })
            // localStorage.removeItem('user')
        }
    })
  }
render() {
    return(
        <div>
    {this.state.user ? (<Home />) : (<Login />)}
        </div>
    )
 }
}

export default App
