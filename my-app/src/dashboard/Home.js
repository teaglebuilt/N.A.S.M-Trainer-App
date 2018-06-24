import React, { Component } from 'react';
import '../styles/navbar.css'
import fire from '../config/fire'
import NavBar from './NavBar';
import WorkoutForm from '../dashboard/WorkoutForm'
import Dashboard from '../dashboard/Dashboard';
import UserStats from '../dashboard/UserStats'
import Grid from '@material-ui/core/Grid';
import Chart from '../dashboard/chart'
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme';
import './Home'

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 3}px`,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
});

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            selected: [],
            workoutArray: [],
            chosenExercises: [],
            currentUser: []
        }
    }


    showForm = function () {
        this.setState({ show: true })
    }.bind(this)

    setSelectedState = function (data) {
        this.setState({ selected: data })
    }.bind(this)

    setChosenExercises = function ( data ) {
        this.setState({ chosenExercises: data })
    }.bind(this)

    onCreate = function (event, key ) {
        event.preventDefault()
        let workoutArray = this.state.selected
        this.setState({ workoutArray: workoutArray })
        this.setState({ show: false })
        const workoutDBRef = fire.database().ref('workout');
        const workoutExerciseDBRef = fire.database().ref('workoutHasExercise');
        fire.auth().onAuthStateChanged((user) => {
            console.log(user.uid)
            const workout = {
                workoutDate: Date.now(),
                userId: user.uid
            }
            let workoutObject = workoutDBRef.push(workout)
            let workoutId = workoutObject.key

        this.state.chosenExercises.forEach( ex => {
            const exercise = {
                workoutID: workoutId,
                exercise: ex.id
            }
            workoutExerciseDBRef.push(exercise)
        })
    })
}.bind(this)



componentDidMount() {

}

render() {
console.log(this.props.currentUser)

        return (


                <MuiThemeProvider theme={theme}>

                    <div className="home-page">
                        <NavBar showForm={this.showForm} />
                        <Grid container spacing={24}>
                            <Grid item={4}>
                                <UserStats currentUser={this.props.currentUser}
                                onEdit={this.onEdit} />
                            </Grid>
                            {this.state.show ?
                                <WorkoutForm
                                    setChosenExercises={this.setChosenExercises}
                                    setSelectedState={this.setSelectedState}
                                    selected={this.state.selected}
                                    onCreate={this.onCreate}
                                    showForm={this.showForm}
                                    hideForm={this.hideForm}
                                    show={this.state.show}
                                     />
                                :

                                <Grid item={4}>
                                    <Dashboard
                                    currentUser={this.props.currentUser}
                                    chosenExercises={this.state.chosenExercises} />
                                </Grid>
                                     }

                        </Grid>


                    </div>
                </MuiThemeProvider>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Home