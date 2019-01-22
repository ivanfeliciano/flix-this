import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import AddMovieForm from './search_movie_dialog';
import MovieDialogDetails from './movie_details';
import firebase from './Firebase/firebase';

const styles = {
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  appBar : {
    position : 'relative',
  },
  flex: {
    flex: 1,
  },
};

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      playlistDataId : this.props.playlistData,
      newMovieFormDialogVisible : false,
      movieDetailsVisible : false,
      movieSelected: null,
      playlistData: [],
    };
    this.onMovieClick = this.onMovieClick.bind(this);
    this.onDoneMovieClick = this.onDoneMovieClick.bind(this);
    this.addNewMovieClick = this.addNewMovieClick.bind(this);

  }

  handleClose = () => {
    this.props.callbackFromParent();
    this.setState({ open: false });
  };

  onMovieClick (movieId) {
    console.log("Movie " + movieId + " clicked");
    this.setState({movieDetailsVisible : true, movieSelected: movieId});
  }

  onDoneMovieClick (movieId) {
    console.log("Movie " + movieId + " seen it");
  }

  addNewMovieClick (event) {
    this.setState({newMovieFormDialogVisible : true});
  }

  componentWillMount() {
    let moviesListRef = firebase.database().ref('moviesInfoByListId/' + this.state.playlistDataId).orderByKey();
    moviesListRef.on('child_added', snapshot => {
      let movie = { title: snapshot.val().title, description: snapshot.val().description, id: snapshot.key };
      this.setState({ playlistData: [movie].concat(this.state.playlistData) });
    })
  }

	render() {
    const isAddNewMovieDialogVisible = this.state.newMovieFormDialogVisible;
    const isMovieDetailsVisible = this.state.movieDetailsVisible;
    let newMovieDialog = isAddNewMovieDialogVisible ? <AddMovieForm callbackFromParent={() => this.setState({ newMovieFormDialogVisible: false })} /> : null;
    let movieDetailsDialog = isMovieDetailsVisible ? <MovieDialogDetails movieData={this.state.movieSelected} callbackFromParentDetails={() => this.setState({ movieDetailsVisible: false })} /> : null;
    return (
      <div>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
          <AppBar style={styles.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography style={styles.flex} variant="h5" color="inherit" >
                Movies
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {Object.keys(this.state.playlistData).map((key) => 
              <ListItem button onClick={() => this.onMovieClick(this.state.playlistData[key].id)} key={this.state.playlistData[key].id}>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPlayIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.playlistData[key].title} secondary={this.state.playlistData[key].description} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Check" onClick={() => this.onDoneMovieClick(this.state.playlistData[key].id)}>
                    <CheckIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
          <Fab color="secondary" style={styles.button} onClick={this.addNewMovieClick}>
          < AddIcon />
          </Fab>
        </Dialog>
        {newMovieDialog}
        {movieDetailsDialog}
      </div>
    );
  }
}

export default Movies;