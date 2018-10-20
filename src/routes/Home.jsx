import "babel-polyfill";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getGame } from "../store/reducers/game/actions";

import StoryItemCards from "../components/StoryItemCards";

import verifyImage from "../utils/verifyImage";
import updateChallenge from "../utils/updateChallenge";
import { Divider, Row, Spin, Button } from "antd";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

class Home extends Component {
  componentDidMount() {
    const { match, getGame, game } = this.props;
    const gameId = match.params.gameId;

    !game && getGame(gameId);
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

  render() {
    const { game } = this.props;
    const isAllDone = game && game.storyItems.every(item => item.isComplete);

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <img src={logo} style={{ height: "200px" }} />
        </Row>
        <Divider>Příběh</Divider>
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ paddingBottom: "1.5rem" }}
        >
          {!game ? (
            <Spin />
          ) : (
            <React.Fragment>
              <h1>{game.title}</h1>
              <p style={{ padding: "2rem", paddingTop: 0, paddingBottom: 0 }}>
                {game.description}
              </p>
              <StoryItemCards stories={game.storyItems} />
            </React.Fragment>
          )}
        </Row>
        {isAllDone && (
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            style={{ paddingBottom: "1rem" }}
          >
            <Link to={`/results`}>
              <Button type="primary">Výsledky</Button>
            </Link>
          </Row>
        )}
      </div>
    );
  }
}

export default connect(
  ({ game }) => ({ game }),
  { getGame }
)(Home);
