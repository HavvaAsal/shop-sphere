import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Header from "./layout/Header";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
