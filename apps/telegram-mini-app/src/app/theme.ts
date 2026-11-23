import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C8F866',
      contrastText: '#0F1517',
    },
    background: {
      default: '#0F1517',
      paper: '#202C2D',
    },
    text: {
      primary: '#F5F6F7',
      secondary: '#B6C2C2',
    },
    divider: '#354243',
  },

  typography: {
    fontFamily: 'Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 12,
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
