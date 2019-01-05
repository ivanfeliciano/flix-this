import React, { Component } from 'react';
import MainAppBar from './components/component_bar'
import { MuiThemeProvider } from '@material-ui/core/styles';
import turquoiseTheme from './theme.js';
import FormDialog from './components/form_dialog_new_playlist';
import MoviesPlaylists from './components/playlists';
import Movies from './components/movies';
import MovieDialogDetails from './components/movie_details';
import AddMovieForm from './components/search_movie_dialog';
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      addListButtonClicked : "" 
    }
  }
  playListButtonHandler(params) {
    this.setState({
      addListButtonClicked : params
    });
  }


  render() {
    return (
      < MuiThemeProvider theme={turquoiseTheme} >
      < MainAppBar />
      < FormDialog />
      < MoviesPlaylists />
      < Movies />
      < MovieDialogDetails />
      < AddMovieForm />
      </MuiThemeProvider>
    );
  }
}


export default App;
