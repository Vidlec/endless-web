import "babel-polyfill";
import axios from "axios";
import React, { Component } from "react";
import Camera from "./Camera";
import qs from "query-string";

import createChallenges from "../utils/createChallenges";
import verifyImage from "../utils/verifyImage";
import updateChallenge from "../utils/updateChallenge";

const getChallenges = gameId => {
  return new Promise(resolve => {
    setTimeout(() => resolve(["Židle", "Lampa"]), 400);
  });
};

export default class App extends Component {
  state = {
    gameId: qs.parse(location.search).id
  };

  componentDidMount() {
    const { gameId } = this.state;

    getChallenges(gameId).then(challenges => {
      this.setState({ challenges: createChallenges(challenges) });
    });
  }

  handleOnFileChange = async ({ file, name }) => {
    const isCorrect = await verifyImage(file, name);

    this.setState(({ challenges }) => ({
      challenges: Object.assign(
        challenges,
        updateChallenge(challenges[name], isCorrect)
      )
    }));
  };

  renderChallenges = () => {
    const { challenges } = this.state;

    return Object.keys(challenges).map(key => {
      const { end, done } = challenges[key];
      return (
        <div key={key}>
          <span>{key}</span>
          <Camera name={key} onChange={this.handleOnFileChange} />
          {done && <span>DONE!</span>}
          {end && <span>{`Took: ${Math.floor(end)} ms`}</span>}
        </div>
      );
    });
  };

  render() {
    return <div>{this.state.challenges && this.renderChallenges()}</div>;
  }
}
