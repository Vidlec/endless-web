import "babel-polyfill";
import React, { Component } from "react";

import StoryItemsList from "../components/StoryItemsList";

import createChallenges from "../utils/createChallenges";
import verifyImage from "../utils/verifyImage";
import updateChallenge from "../utils/updateChallenge";

const getChallenges = gameId => {
  return new Promise(resolve => {
    setTimeout(() => resolve(["Židle", "Lampa"]), 10);
  });
};

export default class Home extends Component {
  state = {
    challenges: null
  };

  componentDidMount() {
    const { match } = this.props;
    const gameId = match.params.gameId;
    console.log(gameId);

    getChallenges(gameId).then(challenges => {
      this.setState({ challenges: createChallenges(challenges) });
    });
  }

  handleOnFileChange = async ({ file, name }) => {
    const isCorrect = await verifyImage(file, name);
    console.log(isCorrect);

    this.setState(({ challenges }) => ({
      challenges: Object.assign(
        challenges,
        updateChallenge(challenges[name], isCorrect)
      )
    }));
  };

  render() {
    const { challenges, gameId } = this.state;
    const isAllDone =
      challenges &&
      Object.values(challenges).every(challenge => challenge.done);

    return (
      <div>
        <p>{gameId}</p>
        {challenges && <StoryItemsList stories={challenges} />}
        {isAllDone && <button>Submit</button>}
      </div>
    );
  }
}
