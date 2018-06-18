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
import Dashboard from '../dashboard/Dashboard';
import NavBar from '../dashboard/NavBar';
import Home from '../dashboard/Home'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';


const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    paper: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    }
});

class WorkoutForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            goalSelector: 0,
            goals: [],
            exercises: [],
            allExercises: [],
            possibleExercises: [],
            chosenExercises: [],
            chosenStrings: [],
            selected: [],
            open: false,
            age: ''
        }
        this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount() {
        // get back array of goals
        const goals = fire.database().ref().child("goal")
        goals.on('value', snap => {
            console.log(snap.val())
            this.setState({ goals: snap.val() })
            console.log('goals', this.state.goals)
        })
        // get back intersecting table of exercises with a goal foreign key
        const exercises = fire.database().ref().child("goalExercises")
        exercises.on('value', snap => {
            this.setState({ exercises: snap.val() })

            console.log('exercises', snap.val())

        })
        // get back all exercises
        const singleEx = fire.database().ref().child('exercise')
        singleEx.on('value', snap => {
            this.setState({ allExercises: snap.val() })
        })
    }


    /* take selected goal as an argument and then use that argument.id to then return a list
    of the exercises that have that matching argument . id */
    goalExercises = function (event) {

        let singleEx = this.state.allExercises
        console.log('exercises', singleEx)
        let goalId = this.state.goalSelector
        let exercises = this.state.exercises
        console.log('goalEx', exercises)
        let tempArray = []

        for (let i = 0; i < singleEx.length; i++) {
            const currentEx = singleEx[i]
            console.log(currentEx)
            exercises.map(ex => {
                if (ex.goalId === goalId && ex.exerciseId === currentEx.id) {
                    console.log(currentEx.exerciseName, currentEx.id)
                    tempArray.push(currentEx.exerciseName)
                }
            })
            this.setState({ possibleExercises: tempArray })
            console.log(tempArray)
        }
    }.bind(this)

    // goal dropdown incubator
    handleChange(e) {
        this.setState({
            goalSelector: +e.target.value
        }, () => { this.goalExercises() })

    }

    goalChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // close form
    handleClose = () => {
        this.setState({ open: false });
    };

    // open form
    handleOpen = () => {
        this.setState({ open: true });
    };

    // take state of selected exercises for the specific goal,
    // create an array of objects of selected exercises
    // create an array of exerciseName key from each exercise object which will be an array of strings
    // For example = ["chest-press", "incline dumbell-press"]
    // pass the array of strings through the dual list component

    onChange = (selected) => {

            selected.forEach( string => {
                const foundExercise = this.state.allExercises.find(x => x.exerciseName === string )
                const currentChosen = this.state.chosenExercises.splice().concat([foundExercise])
         })
        this.props.setSelectedState(selected)
        this.setState({
            chosenExercises: this.state.chosenExercises.splice().concat([this.currentChosen]),
            chosenStrings: this.arrayOfStrings
        })

}

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Fade in={this.props.show}>
                    <form className="create-form">
                        <IconButton onClick={this.props.onCreate} size="small" variant="contained" color="primary">
                            <ArrowBack size="large" />
                        </IconButton>
                        <div className="workout-form-title">
                            <Typography variant='display2' align='center' gutterBottom>Customize your Workout</Typography>
                        </div>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-controlled-open-select" size="large" >Goal</InputLabel>
                            <Select
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                value={this.state.goals}
                                goalChange={this.goalChange}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'goal',
                                    id: 'demo-controlled-open-select',
                                }}>
                                {this.state.goals.map((index) => (
                                    <MenuItem key={index.id} value={index.id}>{index.goalName}</MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                        <div className="dual">

                            <DualListBox
                                selected={this.props.selected}
                                onChange={this.onChange}
                                options={this.state.possibleExercises.map(index => ({
                                    value: index,
                                    label: index
                                }))}
                            />

                        </div>
                        <div className="createWorkout">
                            <Button onClick={this.props.onCreate}
                                logWorkout={this.props.logWorkout}
                                size="small" variant="contained"
                                color="primary" raised>Create Workout</Button>
                        </div>
                    </form>
                </Fade>
            </div>
        )
    }
}

WorkoutForm.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(WorkoutForm)
