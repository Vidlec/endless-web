import React, { Component } from "react";
import { Row, Col } from "antd";
import StoryItemCard from "./StoryItemCard";

export default class StoryItemCards extends Component {
  render() {
    const { stories } = this.props;
    return (
      <Row type="flex" justify="space-around">
        {stories.map(storyItem => {
          const { _id } = storyItem;
          return (
            <Col key={_id}>
              <StoryItemCard {...storyItem} />
            </Col>
          );
        })}
      </Row>
    );
  }
}
