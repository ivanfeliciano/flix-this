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

const testData = {
  11320: {
    1: {
      "title": "La edad de la inocencia",
      "desc": "Blablabla",
    },
    2: {
      "title": "Eternal sunshine",
      "desc": "Blablabla"
    }
  },
  21562: {
    1: {
      "title": "Inherent vice",
      "desc": "Blablabla",
    },
    2: {
      "title": "boogie nights",
      "desc": "Blablabla"
    }
  },
  31532: {
    1: {
      "title": "suspiria",
      "desc": "Blablabla",
    },
    2: {
      "title": "Mandy",
      "desc": "Blablabla"
    }
  },
  4876: {
    1: {
      "title": "Harry potter",
      "desc": "Blablabla",
    },
    2: {
      "title": "El tigre y el dragón",
      "desc": "Blablabla"
    }
  }
}

class MoviesPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistsFromFirebase: {
        11320: {
          "title": "Ton's qué mami",
          "desc": "Pelis pa verlas con la jainita"
        },
        21562: {
          "title": "Aburridas o muy chidas",
          "desc": "Pelis de Paul Thomas Anderson"
        },
        31532: {
          "title": "Wirdos",
          "desc": "Peliculas como el ojo de Thom Yorke"
        },
        4876: {
          "title": "Random",
          "desc": "Películas para apagar el cerebro"
        }
      },
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
    console.log(playListId);
    this.setState({moviesListSelected : true, playlistIdSelected : playListId});
  }

  onDeleteMovieClick (playListId) {
    console.log("Elimino lista: " + playListId);
  }
  
  render() {
    const isDialogVisible = this.state.moviesListSelected;
    let moviesListDialog = isDialogVisible ? <Movies playlistData={testData[this.state.playlistIdSelected]} callbackFromParent={() => this.setState({ moviesListSelected: false })} /> : null;
    return (
      <div>
        <List>
            {Object.keys(this.state.playlistsFromFirebase).map((key) => 
              <ListItem button onClick = {() => this.onMovieListClick(key)} key={key}>
                <ListItemAvatar>
                  <Avatar>
                    <LocalMoviesIcon/>
                  </Avatar>
                </ListItemAvatar> 
                <ListItemText primary = {this.state.playlistsFromFirebase[key].title} secondary = {this.state.playlistsFromFirebase[key].desc} /> 
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => this.onDeleteMovieClick(key)}>
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