import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 15,
    marginLeft: 40,
    marginTop: theme.spacing.unit * 3,
    width: 250,
    height: 250
  }),
  title: {
      fontFamily: ['sans-serif'],
      fontSize: 35,
      fontWeight: "bold",
      color: "#ED3D51",

  }
});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <div className="user-stats-container">
      <Paper className={classes.root} elevation={4}>
        <Typography className={classes.title} variant="headline" component="h3">
          USER STATS
        </Typography>
        <h3>
            Weight: {}
        </h3>
        <h3>
            BMI:
        </h3>



      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);