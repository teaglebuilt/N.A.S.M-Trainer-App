import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';


import 'typeface-roboto'


export default createMuiTheme({
  palette: {
    primary: {
        main: "#0D21A1",
        light: "#3772FF"
    },
    secondary: {
        main: "#FFE100",
        light: "FFEE73"
    },
    accent: {
        main: "#444444"
    }
  },
  typography: {
      fontFamily:['typeface-roboto']
  }
});