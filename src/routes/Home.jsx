import "babel-polyfill";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getGame, setUserId } from "../store/reducers/game/actions";

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

    if (!game || game.gameId !== gameId) getGame(gameId);
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
    const { game, match, getGame, setUserId } = this.props;
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
              <div style={{ padding: "2rem", paddingTop: 0, paddingBottom: 0 }}>
                <h1>{game.title}</h1>
                <p>{game.description}</p>
              </div>
              <Divider>Kapitoly</Divider>
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
              <Button icon="book" type="primary" size="large" block>
                Tvůj příběh
              </Button>
            </Link>
          </Row>
        )}
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ paddingBottom: "1rem" }}
        >
          <Button
            icon="interation"
            onClick={() => {
              setUserId();
              getGame(match.params.gameId);
            }}
            type="danger"
          >
            Restart hry
          </Button>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ game }) => ({ game }),
  { getGame, setUserId }
)(Home);
