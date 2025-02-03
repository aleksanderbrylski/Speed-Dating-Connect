// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ED124A',
    },
    secondary: {
      main: '#8A616B',
    },
  },
  typography: {
    fontFamily: 'epilogue, sans-serif',
    h1: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '36px',
      lineHeight: '45px',
      letterSpacing: '-1px',
      color: '#171212',
      fontWeight: 'bold'
    },
    h2: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '24px',
      lineHeight: '30px',
      letterSpacing: '0px',
      color: '#171212',
      fontWeight: 'bold'
    },
    h4: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '48px',
      lineHeight: '60px',
      letterSpacing: '-2px',
      color: '#ffffff',
      fontWeight: 'bold'
    },
    h5: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0px',
      color: '#ffffff',
      fontWeight: 300
    },
    h6: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '18px',
      lineHeight: '23px',
      letterSpacing: '0px',
      color: '#171212',
      fontWeight: 'bold'
    },
    body1: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0px',
      color: '#171212',
      fontWeight: 'regular'
    },
    body2: {
      fontFamily: 'epilogue, sans-serif',
      fontSize: '14px',
      lineHeight: '21px',
      letterSpacing: '0px',
      color: '#964F61',
      fontWeight: 'regular'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '16px 16px',
          textTransform: 'none',
          height: '40px',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '21px',
        },
        containedPrimary: {
          backgroundColor: '#ED124A', // Custom primary color
          '&:hover': {
            backgroundColor: '#ED124A', // Darker shade on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#171212',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E8D1D6', // Border color
            },
            '&:hover fieldset': {
              borderColor: '#E8D1D6', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E8D1D6', // Border color when focused
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#E8D1D6', // Label color when focused
          },
        },
      },
    },
  }
});

export default theme;