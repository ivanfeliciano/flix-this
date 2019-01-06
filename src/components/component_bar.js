import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FormDialog from './form_dialog_new_playlist';
import MoviesPlaylists from './playlists';

const grow = {flexGrow: 1};

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};


class MainAppBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }
  }

  render () {
    const isFormVisible = this.state.visible;
    let formDialog = isFormVisible ? <FormDialog callbackFromParent={() => this.setState({ visible : false })} /> : null;
    return (
      <div>
        <AppBar position="static" color="primary" style={styles.appBar} >
          <Toolbar>
            <Typography variant="h5" color="inherit" style={grow}>
              Flix this
            </Typography>
            <IconButton color="inherit" onClick={() => this.setState({ visible : true })}>
                <PlaylistAddIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        {formDialog}
        <MoviesPlaylists/>
      </div>
    );
  }
}

export default MainAppBar;
