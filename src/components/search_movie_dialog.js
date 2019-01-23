import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import OMDB_KEY from './keys';
import firebase from './Firebase/firebase';

const styles = {
  root: {
    display: 'flex',
  },
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

class AddMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: this.props.playlistId,
      open: true,
      netflix: false,
      torrent: false,
      pelispedia: false,
      cuevana2: false,
      isLoaded: false,
      errorFromApi: false,
      resultFromApi: null,
      queryMovieTitle: "",
      titleResult: "",
      plotResult: "",
      ratingResult: "",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchTyping = this.handleSearchTyping.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.addMovieToFirebase = this.addMovieToFirebase.bind(this);
  }
	
  handleClickOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.props.callbackFromParent();
    this.setState({ open: false });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  handleSearchTyping(event) {
    this.setState({ queryMovieTitle : event.target.value , isLoaded: false});
  }

  addMovieToFirebase() {
    let platforms = "";
    if (this.state.netflix) platforms += "Netflix,"
    if (this.state.pelispedia) platforms += "Pelispedia.tv,"
    if (this.state.cuevana2) platforms += "Cuevana2,"
    if (this.state.torrent) platforms += "Torrent"
    if (this.state.titleResult) {
      let movieKey = firebase.database().ref().child('movies').push().key;
      let updates = {};
      updates['movies/' + movieKey] = { title: this.state.titleResult, plot: this.state.plotResult , platforms: platforms};
      updates['moviesInfoByListId/' + this.state.playlistId + '/' + movieKey] = {title : this.state.titleResult, description : this.state.plotResult};
      firebase.database().ref().update(updates);
    }
    this.handleClose();
  }

  makeRequest(event) {
    event.preventDefault();
    let query = this.state.queryMovieTitle;
    query = query.split(" ").join("+")
    fetch("http://www.omdbapi.com/?t=" + query+ "&apikey=" + OMDB_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("RESULTADO");
          console.log(result);
          if (result.Title && result.Plot) {
            this.setState({ titleResult: result.Title, plotResult : result.Plot })
          }
          else {
            this.setState({ titleResult: this.state.queryMovieTitle, plotResult : "NA" })
          }
          this.setState({
            isLoaded: true,
            resultFromApi : result,
          });
        },
        (error) => {
          console.log("ERROR");
          console.error(error);
          this.setState({ titleResult: this.state.queryMovieTitle, plotResult : "NA" })
          this.setState({
            isLoaded: true,
          });
        }
      )
  }

	render() {
    let resultComponent;
    if (this.state.isLoaded) {
      resultComponent = <div>
        <TextField
          label="Title"
          margin="normal"
          value={this.state.titleResult}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          label="Plot"
          margin="normal"
          value={this.state.plotResult}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Available on</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={this.state.netflix} onChange={this.handleChange} name="netflix" />
              }
              label="Netflix"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.pelispedia} onChange={this.handleChange} name="pelispedia" />
              }
              label="pelispedia.tv"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.cuevana2}
                  onChange={this.handleChange}
                  name="cuevana2"
                />
              }
              label="Cuevana2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.torrent}
                  onChange={this.handleChange}
                  name="torrent"
                />
              }
              label="Torrent"
            />
          </FormGroup>
        </FormControl>
      </div>

    }
    return (
        <div>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
          >

            <AppBar style={styles.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography style={styles.flex} variant="h5" color="inherit" >
                  Add movie
                </Typography>
                <Button color="inherit" onClick={this.addMovieToFirebase}>
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              margin="normal"
              variant="outlined"
              value={this.state.queryMovieTitle}
              onChange={(event) => this.handleSearchTyping(event)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Search"
                      onClick={this.makeRequest}
                    >
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {resultComponent}
            
          </Dialog>
            
        </div>
    );
  }
}

export default AddMovieForm;