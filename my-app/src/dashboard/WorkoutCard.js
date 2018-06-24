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
    maxWidth: 600,
    minWidth: 400,
    borderRadius: 15,
    margin: 20,
    padding: 0,
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


  render() {
    return (
      <div>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
            </Typography>
            {this.props.array.map(object => {

              return (
                <div>
                  <Typography className={this.props.classes.pos} variant="headline" color="textSecondary">
                    {object.name}
                  </Typography>
                </div>
              )
            })}
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

