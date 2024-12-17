import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./layout/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;