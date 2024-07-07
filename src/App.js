import React, { useEffect } from 'react';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ViewportProvider } from './Contexts/ViewportContext';


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
  useEffect(() => {
    fetch('https://macgradesweb.azurewebsites.net/api/visit');
    console.log('Visited');
  }, []);
  return (
    <ViewportProvider>
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Header />
      <Home />
      <Footer />
    </ThemeProvider>
    </ViewportProvider>
  );
}

export default App;
