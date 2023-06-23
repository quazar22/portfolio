import { createTheme } from '@mui/material/styles';
import hexToRgbA from './utils/hexToRgba';

let brandColor = '#69b95b';
let paperColor = '#083249';
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
      paper: paperColor
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
          backgroundColor: "#041925",
          backgroundImage: 'linear-gradient(315deg, rgba(105,185,91,0.09567577030812324) 0%, rgba(4,25,37,1) 37%);',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: brandColor,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: brandColor,
          backgroundColor: paperColor,
          transition: 'all 0.3s ease',  // Smooth transition on hover
          '&:hover': {
            boxShadow: '0px 0px 10px 4px ' + hexToRgbA(brandColor, 0.5),  // Add shadow on hover
            transform: 'scale(1.05)',  // Grow size by 5% on hover
          },
        },
      },
    },
    MuiTabs: {
      // styleOverrides: {
      //   root: {
      //     color: brandColor,
      //     border: "none",
      //     boxShadow: "none",
      //     // remove border
      //     // remove box shadow
      //     outline: "none",
      //     // smooth transition on focus and raise brightness and add
      //     '&:focus': {
      //       boxShadow: "none",
      //       outline: "none",
      //     },
      //   }
      // }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: { // Name of the rule
          // overflow: 'visible', // Fix IE 11 issue
          // '&:active': {
          //   boxShadow: '0 0 10px 2px lime', // Add a green shadow on click
          //   filter: 'brightness(105%)' // Increase brightness by 5%
          // },
          // '&:hover': {
          //   boxShadow: '0 0 10px 2px lime', // Add a green shadow on hover
          //   filter: 'brightness(105%)' // Increase brightness by 5%
          // },
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&:hover': {
            // Increase brightness by 5% and add shadow on hover
            boxShadow: 'none',
            borderRadius: '20px',

            // first child add border radius
            '& .MuiTypography-root': {
              // backgroundImage: "radial-gradient(circle, rgba(105,185,91,1) 11%, rgba(4,25,37,1) 100%);",
              // boxShadow: "0 0 10px 2px lime",
              filter: "drop-shadow(0 0 0.55rem " + brandColor + ")",  // apply a blur filter
            }
          },
          '& .MuiTouchRipple-root': {
            display: 'none'
          },
        }
      }
    },
  },
});

export default theme;