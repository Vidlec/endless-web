import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Layout, Divider } from "antd";
import { Link } from "react-router-dom";
import { selectStoryItem } from "../store/reducers/game/selectors";
import { updateStoryItem } from "../store/reducers/game/actions";

import Camera from "../components/Camera";

class StoryItem extends Component {
  render() {
    const { storyItem, gameId, updateStoryItem } = this.props;
    const { description, title, _id, isComplete } = storyItem;
    return (
      <React.Fragment>
        <Layout style={{ padding: "1rem" }}>
          <Row type="flex" justify="start" align="middle">
            <Col span={2}>
              <Link to={`/${gameId}`}>
                <Icon
                  type="left-circle"
                  theme="twoTone"
                  style={{ fontSize: "1.5rem" }}
                />
              </Link>
            </Col>
            <Col span={22}>
              <h3 style={{ padding: 0, margin: 0, marginLeft: "1rem" }}>
                {title}
              </h3>
            </Col>
          </Row>
        </Layout>
        <Layout style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <p>{description}</p>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Divider />
              {!isComplete ? (
                <React.Fragment>
                  <h4>Take a picture of the church to unlock this story</h4>
                  <Icon
                    type="lock"
                    theme="filled"
                    style={{ fontSize: "45px" }}
                  />
                </React.Fragment>
              ) : (
                <p>Unlocked content</p>
              )}
            </Col>
          </Row>
        </Layout>
        <Row
          type="flex"
          justify="center"
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0
          }}
        >
          {!isComplete && (
            <Camera
              name="test"
              onChange={() => updateStoryItem(_id, { isComplete: true })}
            />
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(
  (state, props) => ({
    storyItem: selectStoryItem(props.match.params.storyItemId)(state),
    gameId: state.game.gameId
  }),
  { updateStoryItem }
)(StoryItem);
