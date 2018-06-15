import React, { Component } from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import fire from '../config/fire'
import '../styles/workoutform.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack';
import 'typeface-roboto'
import WorkoutCard from '../createWorkout/WorkoutCard'
import NavBar from '../dashboard/NavBar';
import Home from '../dashboard/Home'



class WorkoutForm extends Component {
constructor(props){
    super(props)

    this.state = {
        goalSelector: 0,
        goals: [],
        exercises: [],
        singleExercise: [],
        selectedExercise: [],
        selected: [],
    }
    this.handleChange= this.handleChange.bind(this)

}

componentDidMount() {
const goals = fire.database().ref().child("goal")
    goals.on('value', snap => {
        console.log(snap.val())
        this.setState({goals: snap.val()})
        console.log('goals',this.state.goals)
    })
const exercises = fire.database().ref().child("goalExercises")
exercises.on('value', snap => {
    this.setState({exercises: snap.val()})

        console.log('exercises', snap.val())

})
const singleEx = fire.database().ref().child('exercise')
        singleEx.on('value', snap => {
            this.setState({singleExercise: snap.val()})

        })
    }


    /* take selected goal as an argument and then use that argument.id to then return a list
    of the exercises that have that matching argument . id */
goalExercises = function(event) {

let singleEx = this.state.singleExercise
console.log('exercises',singleEx)
let goalId = this.state.goalSelector
let exercises = this.state.exercises
console.log('goalEx',exercises)
let tempArray = []

for(let i = 0; i < singleEx.length; i++) {
    const currentEx = singleEx[i]
    exercises.map( ex => {
        if(ex.goalId === goalId && ex.exerciseId === currentEx.id) {
            console.log(currentEx.exerciseName, currentEx.id)
            tempArray.push(currentEx.exerciseName)
        }
    })
    this.setState({selectedExercise: tempArray })
    console.log(tempArray)
 }
}.bind(this)

handleChange(e) {
    this.setState({
      goalSelector: +e.target.value
    }, () => {this.goalExercises()})

}

temp = []
onChange= function(selected) {
    let singleEx = selected.pop()
    this.temp.push(singleEx)
    console.log(this.temp)
   this.props.setSelectedState(this.temp)
}.bind(this)


// onCreate= function() {
// let workoutArray = this.state.selected
// console.log(workoutArray)
// }.bind(this)

    render() {


        return(
            <div>
                {this.props.show ?  <form className="create-form">
                <IconButton onClick={this.props.onCreate} size="small" variant="contained" color="primary">
                  <ArrowBack size="large" />
                </IconButton>
            <div className="workout-form-title">
                <Typography variant='display2' align='center' gutterBottom>Customize your Workout</Typography>
            </div>
            <div className="goalSelect">
            <label className="label">Select your Goal</label>
            <select onChange={this.handleChange}>
             {this.state.goals.map((index) => (
                 <option value={index.id}>{index.goalName}</option>
                  ))}
            </select>
            </div>
                <div className="dual">

                    <DualListBox selected={this.props.selected} onChange={this.onChange} options={this.state.selectedExercise.map( index => ({
                        value: index,
                        label: index
                    }) )}
                    />

               </div>
               <div className="createWorkout">
                    <Button onClick={this.props.onCreate} size="small" variant="contained" color="primary">Create Workout</Button>
               </div>
            </form> : null }

            </div>
        )
    }
}

export default WorkoutForm