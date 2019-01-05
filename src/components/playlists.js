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

class MoviesPlaylists extends React.Component {
	state = {
	    dense: false,
	    secondary: true,
	};
	render() {
	const { dense, secondary } = this.state;
    return (
        <div>

            <List dense={dense}>
                <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalMoviesIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
              </List>
        </div>
    );
  }
}

export default MoviesPlaylists;