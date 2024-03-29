import React, { Component } from "react";
import Navigation from "./components/Navigation";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import SRH from "./pages/SRH";
import GBV from "./pages/GBV";
import Visualize from "./pages/Visualize";
import About from "./pages/About";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navigation />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/home" render={(props) => <Home {...props} />} />
          <Route exact path="/SRH" render={(props) => <SRH {...props} />} />
		      <Route exact path="/GBV" render={(props) => <GBV {...props} />} />
          <Route exact path="/visualize" render={(props) => <Visualize {...props} />}/>
          <Route exact path="/about" render={(props) => <About {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
