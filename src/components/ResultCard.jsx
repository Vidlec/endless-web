import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectStoryItem } from "../store/reducers/game/selectors";
import { Card, Row, Col, Icon } from "antd";

class ResultCard extends Component {
  render() {
    const { storyItemId, storyItem, image } = this.props;
    const { title, subtitle } = storyItem;
    return (
      <Link to={`/story-item/${storyItemId}`}>
        <Card
          hoverable
          style={{ width: 300, marginTop: 16 }}
          cover={<img alt={storyItemId} src={image} />}
        >
          <Row gutter={4} type="flex" justify="space-around" align="middle">
            <Col span={20}>
              <Card.Meta title={title} description={subtitle} />
            </Col>
            <Col span={4}>
              <Icon
                type={"right-circle"}
                theme="filled"
                style={{
                  fontSize: "25px",
                  color: "#009adb"
                }}
              />
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
}

export default connect(
  (state, props) => ({
    storyItem: selectStoryItem(props.storyItemId)(state)
  }),
  null
)(ResultCard);
