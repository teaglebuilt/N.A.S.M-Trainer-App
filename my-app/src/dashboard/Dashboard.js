import React, { Component } from 'react';
import Home from '../dashboard/Home'
import WorkoutCard from '../dashboard/WorkoutCard'
// import UserStats from '../dashboard/UserStats'
import '../styles/dashboard.css'
import fire from '../config/fire'

class Dashboard extends Component {
    constructor(props) {
        super(props)
            this.uniqueKey = 0
    }
    state = {
        workoutHistory: [],
        groupedExercises: {},
        arrayOfExercises: []
    }


getData = function() {
        let promises = []
    const woDB = fire.database().ref('workoutHasExercise')
    woDB.on('value', snap => {
        let ex = snap.val()
        this.setState({ workoutHistory: ex })
        for (let i in ex) {
            promises.push(new Promise((resolve, reject) => {
                const DB = fire.database().ref(`workout/${ex[i].workoutID}`)
                DB.on('value', snap => {
                    ex[i].workout = snap.val()
                    resolve(ex[i].workout)
                })
            }))
            promises.push(new Promise((resolve, reject) => {
                const exercise = fire.database().ref(`exercise/${ex[i].exercise}`)
                exercise.on('value', snap => {

                    ex[i].exerciseObject = snap.val()
                    resolve(ex[i].exerciseObject)
                })
            }))

        }
        Promise.all(promises)
            .then(data => {
                this.setState({ workoutHistory: ex })
                this.combineExercises()
            })

    })

}
 componentDidMount() {
 this.getData()
 }


combineExercises = function() {

    let workoutHistory = this.state.workoutHistory
    if( workoutHistory) {

        let newArray = Object.values(workoutHistory)
        const groupedExercises = {}
      newArray.forEach(ex => {
           let exObj = ex.exerciseObject
            // for( let key in exObj) {
                if (!groupedExercises.hasOwnProperty(ex.workoutID)) {
                                groupedExercises[ex.workoutID] = [{
                                    name: ex.exerciseObject.exerciseName,
                                    image: ex.exerciseObject.exerciseImageURL,
                                    description: ex.exerciseObject.exerciseDescr
                                }]
                            } else {
                                groupedExercises[ex.workoutID].push({
                                    name: ex.exerciseObject.exerciseName,
                                    image: ex.exerciseObject.exerciseImageURL,
                                    description: ex.exerciseObject.exerciseDescr
                                })
                            }

                this.setState({groupedExercises: groupedExercises})
            })

    }

}.bind(this)


loopGroupEx = function() {
    let workoutObject = this.state.groupedExercises
    let groupedEx = Object.values(workoutObject)
    console.log(groupedEx)
    return groupedEx.map( array => {
        console.log(array)
        return(<WorkoutCard key={this.uniqueKey++} array={array} />)
    })
}.bind(this)

render() {

        // console.log(this.props.chosenExercises)

// loop ovr workouthistory
//initialize an array
// each workout, if wh.workoutID === nextwh workoutID
// push it in the array
//remove from the wh array

// render wirkoutcard using this array
        return(

            <div className="width">
                <h1 className="log-title">Workout Log</h1>
                <div className="log-container">
                {this.loopGroupEx()}

                </div>
            </div>
        )
    }
}

export default Dashboard
