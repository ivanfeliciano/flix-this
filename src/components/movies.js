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
	state = {
    open: true,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


	render() {
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
                  Movies List
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalPlayIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Movie Title"
                      secondary="Description"
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Check">
                        <CheckIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Fab color="secondary" style={styles.button}>
            < AddIcon />
            </Fab>
          </Dialog>
            
        </div>
    );
  }
}

export default Movies;