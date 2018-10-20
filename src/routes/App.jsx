import React, { Component } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import Home from "./Home";
import Results from "./Results";
import StoryItem from "./StoryItem";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/home/:gameId" component={Home} />
            <Route
              exact
              path="/story-item/:storyItemId"
              component={StoryItem}
            />
            <Route exact path="/results" component={Results} />
          </Switch>
        </Router>
      </div>
    );
  }
}
