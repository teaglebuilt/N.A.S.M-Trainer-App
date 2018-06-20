import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Home from '../dashboard/Home'
import Dashboard from '../dashboard/Dashboard'
import '../styles/workoutCard.css'

const styles = {

  card: {
    minWidth: 2,
    border: 5
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class WorkoutCard extends Component {

displayCardContent = function() {
 let workoutArr = this.props.array
 workoutArr.forEach( object => {
   console.log(object)
 })
}
  render() {


    return (
      <div>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary">

            </Typography>
            <Typography variant="headline" component="h2">
             Date
            </Typography>
            <Typography className={this.props.classes.pos} variant="headline" color="textSecondary">
            {/* {this.displayCardContent()} */}

                      {this.props.array.map( object => {

                                  return( <ul className="ex-list">
                                            <li>{object.name}</li>
                                            <li>{object.description}</li>
                                           </ul>
                                            )

                          })}

            </Typography>
            <Typography component="p">

            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" outlinedButton>Show Details</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
    WorkoutCard.propTypes = {
      classes: PropTypes.object.isRequired,
    };


export default withStyles(styles)(WorkoutCard);

