import React, { Component } from 'react';
import '../styles/navbar.css'
import fire from '../config/fire'
import NavBar from './NavBar';
import WorkoutForm from '../dashboard/WorkoutForm'
import Dashboard from '../dashboard/Dashboard';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme';



class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            selected: [],
            workoutArray: []
        }
    }


    showForm = function () {
        this.setState({ show: true })
    }.bind(this)

    setSelectedState = function (data) {
    this.setState({selected: data})
    }.bind(this)

    onCreate= function(event) {
        event.preventDefault()
        let workoutArray = this.state.selected
        this.setState({workoutArray: workoutArray})
        this.setState({show: false})
        console.log(workoutArray)
        const DBRef = fire.database().ref('workout');
        const workout = {
            workoutList: {},
            workoutDate: Date.now()
        }
        setTimeout(function(){DBRef.push(workout)}, 5000)
        console.log(workoutArray)

    }.bind(this)



    render() {


        return(
            <MuiThemeProvider theme={theme}>
            <div>

            <NavBar showForm={this.showForm} />
            {this.state.show ?
            <WorkoutForm
            setSelectedState={this.setSelectedState}
            selected={this.state.selected}
            onCreate={this.onCreate}
            showForm={this.showForm}
            show={this.state.show} />
             : <Dashboard workoutArray={this.state.workoutArray} />  }
           </div>
        </MuiThemeProvider>

        )
    }
}

export default Home