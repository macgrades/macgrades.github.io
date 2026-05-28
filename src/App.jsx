import { useEffect } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

import "./App.css";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      fetch("https://macgradesweb.azurewebsites.net/api/visit");
    }
    console.log("Visited");
  }, []);
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
