import React, { useEffect } from "react";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ViewportProvider } from "./Contexts/ViewportContext";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "--primary-color",
    },
    secondary: {
      main: "--secondary-color",
    },
    background: {
      default: "--background-color",
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
    if (process.env.NODE_ENV === "production") {
      fetch("https://macgradesweb.azurewebsites.net/api/visit");
    }
    console.log("Visited");
  }, []);
  return (
    <ViewportProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Home />
      </ThemeProvider>
    </ViewportProvider>
  );
}

export default App;
