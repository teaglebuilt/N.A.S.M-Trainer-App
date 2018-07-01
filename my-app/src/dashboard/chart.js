import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import fire from '../config/fire'

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 15,
      paddingBottom: 20,
      marginLeft: 40,
      marginTop: theme.spacing.unit * 3,
      width: 400,
      height: 300,
      borderRadius: 15
    }),
    title: {
        fontFamily: ['sans-serif'],
        fontSize: 35,
        fontWeight: "bold",
        color: "#ED3D51",
       },
    button: {
        margin: theme.spacing.unit,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        float: "right",
        marginTop: 40,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },

  });

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goals: [],
            chartData: {
                labels: ['Stabilization', "Endurance", "Hypertrophy", "Power"],
                datasets: [
                    {
                      label: 'Goal',
                      data: [ 1, 3, 4, 5 ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                      ]
                    }
                ]
            }
        }
    }

getGoal = function() {
    let goals = fire.database().ref('goal')
    goals.on('value', snap => {
        this.setState({ goals: snap.val() })
    })
}.bind(this)

getData = function() {
let promises = []
const goalDB = fire.database().ref('goalExercises')
goalDB.on('value', snap => {
    let goal = snap.val()
    console.log(goal)
})
}.bind(this)

addData = function(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}.bind(this)

componentDidMount() {
    this.getGoal()
    this.getData()
}

    render() {
        const { classes } = this.props;
         return (<div className="chart">
             <Paper className={classes.root} elevation={4}>

                  <Bar
                       data={this.state.chartData}
                       options={{
                           title: {
                               display: true,
                               text: "Goal Statistics",
                               fontSize: 25
                           },
                           legend: {
                               display: true,
                               position: "right",
                               labels: {
                                   fontColor: "#000"
                               }
                           },
                           maintainAspectRatio: false,
                           responsive: true,
                           layout: {
                            padding: {
                                left: 40,
                                right: 10,
                                top: 10,
                                bottom: 0
                            }
                        },
                        tooltips: {
                            enabled: true
                        }
                       }} />

                    </Paper>
                 </div>
                 )
    }
}

Chart.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Chart)