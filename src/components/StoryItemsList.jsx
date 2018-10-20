import React, { Component } from "react";
import { Row, Col } from "antd";
import StoryItem from "./StoryItem";

export default class StoryItemsList extends Component {
  render() {
    const { stories } = this.props;
    return (
      <Row type="flex" justify="space-around">
        <h1>Atentát na Heydricha</h1>
        {Object.keys(stories).map(key => {
          return (
            <Col key={key}>
              <StoryItem
                description="Zažijte drama v zatáčce, kde byl spáchán atentát"
                title="Atentát"
                isComplete
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}
