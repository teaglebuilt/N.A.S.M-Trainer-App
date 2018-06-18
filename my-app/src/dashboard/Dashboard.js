import React, { Component } from 'react';
import Home from '../dashboard/Home'
// import UserStats from '../dashboard/UserStats'
import '../styles/dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        return(

            <div className="width">
                <h1 className="log-title">Workout Log</h1>
                <div className="log-container">
                    <ul>
                    {this.props.workoutArray.map( ex=> {
                        return <li>{ex}</li>

                    })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Dashboard