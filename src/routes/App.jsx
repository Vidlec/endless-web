import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import StoryItem from "./StoryItem";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/:gameId" component={Home} />
            <Route path="/story-item/:storyItemId" component={StoryItem} />
          </Switch>
        </Router>
      </div>
    );
  }
}
