import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#607d8b' },
  secondary: { main: '#ffc107' }

};

const typography = {
    useNextVariants: true,
};

const turquoiseTheme = 'Gallery Turquoise Blue Peafowl';

export default createMuiTheme({ palette, typography, turquoiseTheme })