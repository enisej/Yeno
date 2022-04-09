import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navigation from "./components/UI/Navigation";

function App() {
  return (
    <BrowserRouter>
        <Navigation/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
