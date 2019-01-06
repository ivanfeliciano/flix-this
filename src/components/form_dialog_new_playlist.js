import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FormDialog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dialogTitle : "Create new playlist",
      open : true
    };
  }

  handleClose = (event) => {
    this.props.callbackFromParent(event);
  };
  render () {
    return (
      <Dialog
          fullWidth={true}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent>
            
            <TextField
              id="playlist-name-input"
              label="Name"
              style={{ margin: 8 }}
              placeholder="Da best."
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="playlist-des-input"
              label="Description"
              style={{ margin: 8 }}
              placeholder="My favorite all time movies."
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="inherit">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default FormDialog;
