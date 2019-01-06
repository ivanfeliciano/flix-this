import React, { Component } from 'react';
import MainAppBar from './components/component_bar'
import { MuiThemeProvider } from '@material-ui/core/styles';
import turquoiseTheme from './theme.js';
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      addListButtonClicked : false,
    }
  }
  render() {
    
    return (
      < MuiThemeProvider theme={turquoiseTheme} >
      < MainAppBar/>
      </MuiThemeProvider>
    );
  }
}


export default App;
