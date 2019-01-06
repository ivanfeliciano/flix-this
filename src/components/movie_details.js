import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};



class MovieDialogDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true,
      movieData : this.props.movieData, 
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.callbackFromParentDetails();
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {this.state.movieData.title}               
              </Typography>
              <Typography style={styles.pos} color="textSecondary">
                {this.state.movieData.rating}
              </Typography>
              <Typography component="p">
                {this.state.movieData.plot}
              </Typography>
                {this.state.movieData.platforms}
            </CardContent>
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default MovieDialogDetails;