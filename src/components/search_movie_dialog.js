import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
	state = {
    open: true,
    netflix: true,
    torrent: false,
    pelispedia: false,
    cuevana2: true,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.callbackFromParent();
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

	render() {
   const { netflix, cuevana2, pelispedia, torrent } = this.state;
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
                <Button color="inherit" onClick={this.handleClose}>
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
              multiline
            />

            <TextField
              label="Title"
              defaultValue="Leave No Trace"
              margin="normal"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Plot"
              defaultValue="A father and his thirteen year-old daughter are living an ideal existence in a vast urban park in Portland, Oregon, when a small mistake derails their lives forever."
              margin="normal"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Rotten tomatoes"
              defaultValue="90%"
              margin="normal"
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
                <Checkbox checked={netflix} onChange={this.handleChange('netflix')} value="netflix" />
              }
              label="Netflix"
            />
            <FormControlLabel
              control={
                <Checkbox checked={pelispedia} onChange={this.handleChange('pelispedia')} value="pelispedia" />
              }
              label="pelispedia.tv"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cuevana2}
                  onChange={this.handleChange('cuevana2')}
                  value="cuevana2"
                />
              }
              label="Cuevana2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={torrent}
                  onChange={this.handleChange('torrent')}
                  value="torrent"
                />
              }
              label="Torrent"
            />
          </FormGroup>
        </FormControl>
          </Dialog>
            
        </div>
    );
  }
}

export default AddMovieForm;