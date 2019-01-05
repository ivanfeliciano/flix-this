import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const grow = {flexGrow: 1,};



class MainAppBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: true }
    this.clickAdd = this.clickAdd.bind(this);
  }

  clickAdd(event) {
    console.log("Add clicked");
  }
  render () {
    return (
        <AppBar position="static" color="primary" >
          <Toolbar>
            <Typography variant="h5" color="inherit" style={grow}>
              Flix this
            </Typography>
            <IconButton color="inherit" onClick={event => this.clickAdd(event)}>
                <PlaylistAddIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
    );
  }
}

export default MainAppBar;
