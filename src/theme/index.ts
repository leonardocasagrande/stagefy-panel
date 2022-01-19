import { createTheme } from '@mui/material';
import { colors } from 'contents/colorDefinitions';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Baloo Bhaijaan 2"',
          fontWeight: 500,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: '"Baloo Bhaijaan 2"',
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: '1.5rem',
          color: palette.text?.secondary,
          letterSpacing: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25);',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          fontWeight: 400,
          fontSize: '0.875rem',
          fontFamily: '"Baloo Bhaijaan 2", Geneva, Tahoma, sans-serif',
          padding: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderColor: colors.primaryMain,
          },
        },
      },
    },
  },
});

export default theme;
