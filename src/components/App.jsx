import "babel-polyfill";
import axios from "axios";
import React, { Component } from "react";
import Camera from "./Camera";
import qs from "query-string";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const getChallenges = gameId => {
  return new Promise(resolve => {
    setTimeout(() => resolve(["Židle", "Lampa"]), 400);
  });
};

const createChallenges = challenges =>
  challenges.reduce((acc, challenge) => {
    const start = window.performance.now();

    return Object.assign(acc, {
      [challenge]: {
        time: null,
        start
      }
    });
  }, {});

export default class App extends Component {
  state = {
    gameId: qs.parse(location.search).id
  };

  verifyImage = (image, name) => {
    navigator.geolocation.getCurrentPosition(console.log);
    return getBase64(image, base64 => {
      console.log(base64);
      return axios.post(
        "https://jfuzi5ahih.execute-api.eu-west-1.amazonaws.com/dev/recognize",
        base64
      );
    });
  };

  updateChallenges = async ({ file, name }) => {
    const isCorrect = await this.verifyImage(file, name);
    console.log(isCorrect);
    this.setState(({ challenges }) => ({
      challenges: Object.assign(challenges, { [name]: { done: isCorrect } })
    }));
  };

  componentDidMount() {
    const { gameId } = this.state;
    getChallenges(gameId).then(challenges => {
      this.setState({ challenges: createChallenges(challenges) });
    });
  }

  renderChallenges = () => {
    const { challenges } = this.state;
    return Object.keys(challenges).map(key => (
      <div>
        <span>{key}</span>
        <Camera name={key} onChange={this.updateChallenges} />
        {challenges[key].done && <span>DONE!</span>}
      </div>
    ));
  };

  render() {
    return <div>{this.state.challenges && this.renderChallenges()}</div>;
  }
}
