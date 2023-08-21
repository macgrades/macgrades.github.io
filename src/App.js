import React from 'react';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#800020',
    },
    secondary: {
      main: '#ff6f00',
    },
    background: {
      default: '#bfc1c2',
    },
  },
  typography: {
    /*
    fontFamily: ['Montserrat','sans-serif'].join(','),
    fontWeight: '300',
    */
  },
});

function App() {

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Header />
      <Home />
    </ThemeProvider>
  );
}

export default App;
