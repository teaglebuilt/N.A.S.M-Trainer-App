import React, { Component } from 'react';
import './App.css';
import fire, { auth, provider } from './config/fire';
import Home from './dashboard/Home'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './styles/theme';
import Login from './auth/Login'
import { library } from '@fortawesome/fontawesome-svg-core'
import {  faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import {  faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
library.add( faChevronRight, faChevronLeft, faGoogle, faFacebook)

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
        user: {},
        currentUser: []
    }
}


componentDidMount() {
    this.authListener()
    this.currentUserAuth()
}
authListener() {
    fire.auth().onAuthStateChanged((user) => {
        console.log(user)
        if(user) {
            this.setState({ user })
            localStorage.setItem("user", user.uid)

        } else {
            this.setState({ user: null })
            localStorage.removeItem('user')
        }
        console.log(this.state.user)
    })
  }

  currentUserAuth = function() {
    fire.auth().onAuthStateChanged((user) => {
        let dbUser = fire.database().ref(`user`)
        dbUser.on('value', snap => {
            let fbuser = snap.val()
            let userArray = Object.values(fbuser)
           let arr = []
           if(user === null) {
               return false
           } else {

               userArray.filter( i => {
                 if(i.userId === user.uid) {
                     arr.push(i)
                 }
               })
           }
            this.setState({currentUser: arr})
        })
    })
  }.bind(this)
render() {
console.log(this.state.currentUser)
    return(
        <MuiThemeProvider theme={theme}>
        <div>

    {this.state.user ? (<Home currentUser={this.state.currentUser}/>) : (<Login />)}

        </div>
        </MuiThemeProvider>
    )
 }
}

export default App
