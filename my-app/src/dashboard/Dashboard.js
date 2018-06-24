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
        arrayOfExercises: [],
        displayCards: false
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
                if (!groupedExercises.hasOwnProperty(ex.workoutID, ex.userId)) {
                                groupedExercises[ex.workoutID] = [{
                                    date: new Date().toISOString().split('T')[0],
                                    name: ex.exerciseObject.exerciseName,
                                    image: ex.exerciseObject.exerciseImageURL,
                                    description: ex.exerciseObject.exerciseDescr
                                }]
                            } else {
                                groupedExercises[ex.workoutID].push({
                                    date: new Date().toISOString().split('T')[0],
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

      return groupedEx.map( array => {
      return(
      <WorkoutCard key={this.uniqueKey++} array={array} />
    )
    })
}.bind(this)

userHistory = function() {
const workoutDB = fire.database().ref('workout')
let currentUser = this.props.currentUser
let workoutObject = this.state.groupedExercises
let groupedEx = Object.values(workoutObject)
workoutDB.on('value', snap => {
    let workouts = snap.val()
    let workoutArr = Object.values(workouts)
      workoutArr.forEach( index => {
          console.log(index.userId)
          currentUser.find( user => {
              console.log(user.userId)
             if(index.userId === user.userId) {
                // {this.loopGroupEx()}
             }
        })
  })
})
}.bind(this)

render() {
        return(

            <div className="width">

                {this.userHistory()}
                {this.loopGroupEx()}

            </div>
        )
    }
}

export default Dashboard
