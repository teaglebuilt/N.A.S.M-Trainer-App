import React, { Component } from 'react';
import '../styles/navbar.css'
import fire from '../config/fire'
import NavBar from './NavBar';
import WorkoutForm from '../createWorkout/WorkoutForm'
import WorkoutCard from '../createWorkout/WorkoutCard'



class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            selected: []
        }
    }


    showForm = function () {
        this.setState({ show: true })
    }.bind(this)

    setSelectedState = function (data) {
    this.setState({selected: data})
    }.bind(this)

    onCreate= function() {
        let workoutArray = this.state.selected
        console.log(workoutArray)
        }.bind(this)

    render() {
        return(
        <div>
            <NavBar showForm={this.showForm} />
            <WorkoutForm setSelectedState={this.setSelectedState} selected={this.state.selected} onCreate={this.onCreate} showForm={this.showForm}  show={this.state.show} />
         </div>

        )
    }
}

export default Home