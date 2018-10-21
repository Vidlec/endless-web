import "babel-polyfill";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getGame, setUserId } from "../store/reducers/game/actions";
import { resetResults } from "../store/reducers/results/actions";

import StoryItemCards from "../components/StoryItemCards";

import verifyImage from "../utils/verifyImage";
import updateChallenge from "../utils/updateChallenge";
import { Divider, Row, Spin, Button } from "antd";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

class Home extends Component {
  componentDidMount() {
    const { match, getGame, game, setUserId } = this.props;
    const gameId = match.params.gameId;

    if (!game || game.gameId !== gameId) {
      getGame(gameId);
      setUserId();
    }
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
    const {
      game,
      match,
      getGame,
      setUserId,
      results,
      resetResults
    } = this.props;
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
              {isAllDone && (
                <Row
                  type="flex"
                  justify="space-around"
                  align="middle"
                  style={{ paddingBottom: "1rem" }}
                >
                  <Divider />
                  <Link to={`/results`}>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        backgroundColor: "#78e08f",
                        borderColor: "#78e08f",
                        fontSize: "20px",
                        height: "50px",
                        width: "250px"
                      }}
                    >
                      {results ? "Tvůj příběh" : "Vytvořit tvůj příběh"}
                    </Button>
                  </Link>
                </Row>
              )}
              <Divider>Kapitoly</Divider>
              <StoryItemCards stories={game.storyItems} />
            </React.Fragment>
          )}
        </Row>
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
              resetResults();
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
  ({ game, results }) => ({ game, results }),
  { getGame, setUserId, resetResults }
)(Home);
