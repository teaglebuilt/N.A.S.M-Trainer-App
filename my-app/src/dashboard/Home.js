import React, { Component } from 'react';
import '../styles/navbar.css'
import fire from '../config/fire'
import NavBar from './NavBar';
import WorkoutForm from '../dashboard/WorkoutForm'
import Dashboard from '../dashboard/Dashboard';
import UserStats from '../dashboard/UserStats'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../styles/theme';
import './Home'
import Login from '../auth/Login'
// const $ = require('jquery');


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
        }
    }


    showForm = function () {
        this.setState({ show: true })
    }.bind(this)

    setSelectedState = function (data) {
        this.setState({ selected: data })
    }.bind(this)


    onCreate = function (event) {
        event.preventDefault()
        let workoutArray = this.state.selected
        this.setState({ workoutArray: workoutArray })
        this.setState({ show: false })
        console.log(workoutArray)

        const workoutDBRef = fire.database().ref('workout');
        const workoutExerciseDBRef = fire.database().ref('workoutHasExercise');
        const workout = {
            workoutDate: Date.now()
        }
        let workoutObject = workoutDBRef.push(workout)
        let workoutId = workoutObject.key
        console.log(workoutId)
        this.state.selected.forEach( ex => {
            const exercise = {
                workoutID: workoutId,
                exercise: ex
            }
            workoutExerciseDBRef.push(exercise)
        })
    }.bind(this)


componentDidMount() {

}

    render() {


        return (
            <div>
                <MuiThemeProvider theme={theme}>

                    <div className="home-page">
                        <NavBar showForm={this.showForm} />
                        <Grid container spacing={24}>
                            <Grid item={4}>
                                <UserStats />
                            </Grid>
                            {this.state.show ?
                                <WorkoutForm
                                    setSelectedState={this.setSelectedState}
                                    selected={this.state.selected}
                                    onCreate={this.onCreate}
                                    showForm={this.showForm}
                                    show={this.state.show} />
                                :
                                <Grid item={6}>
                                    <Dashboard workoutArray={this.state.workoutArray} />
                                </Grid>}
                        </Grid>


                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Home