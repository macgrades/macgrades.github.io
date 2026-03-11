import React, { useEffect } from "react";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";

import { ViewportProvider } from "./Contexts/ViewportContext";
import "./App.css";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      fetch("https://macgradesweb.azurewebsites.net/api/visit");
    }
    console.log("Visited");
  }, []);
  return (
    <ViewportProvider>
      <Header />
      <Home />
    </ViewportProvider>
  );
}

export default App;
