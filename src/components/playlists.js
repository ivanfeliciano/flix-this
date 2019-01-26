import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import DeleteIcon from '@material-ui/icons/Delete';
import Movies from './movies';
import firebase from  './Firebase/firebase';

class MoviesPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistsInfo: [],
      deleteMovie : false,
      moviesListSelected : false,
      playlistIdSelected : null,
    };
    this.onMovieListClick = this
      .onMovieListClick
      .bind(this);
    this.onDeleteMovieClick = this
      .onDeleteMovieClick
      .bind(this);

  }

  onMovieListClick (playListId) {
    // console.log(playListId);
    this.setState({moviesListSelected : true, playlistIdSelected : playListId});
  }

  onDeleteMovieClick (playListId) {
    // console.log("Elimino lista: " + playListId);
    firebase.database().ref('playlists/' + playListId).set(null);
    firebase.database().ref('moviesInfoByListId/' + playListId).set(null);
  }
  
  componentWillMount() {
    let playlistMoviesRef = firebase.database().ref('playlists').orderByKey();
    playlistMoviesRef.on('child_added', snapshot => {
      let playlist = { title : snapshot.val().title, description : snapshot.val().description, id : snapshot.key };
      this.setState({ playlistsInfo: [playlist].concat(this.state.playlistsInfo) });
    })
    playlistMoviesRef.on('child_removed', snapshot => {
      let tmp = this.state.playlistsInfo.filter(function (item) {
        return item.id !== snapshot.key;
      });
      this.setState({ playlistsInfo : tmp });
    })
  }

  render() {
    const isDialogVisible = this.state.moviesListSelected;
    let moviesListDialog = isDialogVisible ? <Movies playlistData={this.state.playlistIdSelected} callbackFromParent={() => this.setState({ moviesListSelected: false })} /> : null;
    return (
      <div>
        <List>
            {Object.keys(this.state.playlistsInfo).map((key) => 
              <ListItem button onClick={() => this.onMovieListClick(this.state.playlistsInfo[key].id)} key={this.state.playlistsInfo[key].id}>
                <ListItemAvatar>
                  <Avatar>
                    <LocalMoviesIcon/>
                  </Avatar>
                </ListItemAvatar> 
                <ListItemText primary = {this.state.playlistsInfo[key].title} secondary = {this.state.playlistsInfo[key].description} /> 
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => this.onDeleteMovieClick(this.state.playlistsInfo[key].id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction> 
              </ListItem>
            )}
        </List>
        {moviesListDialog}
      </div>
    );
  }
}

export default MoviesPlaylists;