import { createTheme } from '@mui/material/styles';

let brandColor = '#69b95b';
// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: brandColor,
      contrastText: '#e3f3fc',
    },
    secondary: {
      main: '#35AAE9',

    },
    background: {
      default: '#041925',
      paper: '#083249'
    },
    text: {
      primary: '#e3f3fc',
      secondary: brandColor,
    },
    error: {
      main: '#F44336',
      light: '#F6685E',
      dark: '#AA2E25',
    },
    customPalette: {
      main: '#1E4459',
      light: '#3A6B7C',
      dark: '#0F2C3A',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#041925',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: brandColor,
        },
        h2: {
          color: brandColor,
        },
        h3: {
          color: brandColor,
        },
        h4: {
          color: brandColor,
        },
        h5: {
          color: brandColor,
        },
        h6: {
          color: brandColor,
        },
      },
    },
  },
});

export default theme;