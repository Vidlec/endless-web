import React, { Component } from "react";
import { Card, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";

function CardHeader({ title, isComplete }) {
  return (
    <React.Fragment>
      <Row type="flex" justify="start" align="middle">
        <h3 style={{ margin: 0, marginRight: "1rem" }}>{title}</h3>
        {isComplete ? (
          <Icon
            type="check-circle"
            theme="filled"
            style={{ color: "#78e08f" }}
          />
        ) : (
          <Icon type="lock" theme="filled" />
        )}
      </Row>
    </React.Fragment>
  );
}

export default class StoryItemCard extends Component {
  render() {
    const { description, title, isComplete, _id } = this.props;
    return (
      <Card style={{ width: 300, marginTop: 16 }}>
        <Row gutter={4} type="flex" justify="space-around" align="middle">
          <Col span={20}>
            <Card.Meta
              title={<CardHeader title={title} isComplete={isComplete} />}
              description={description}
            />
          </Col>

          <Col span={4}>
            <Link to={`/story-item/${_id}`}>
              <Icon
                type="right-circle"
                theme="twoTone"
                style={{ fontSize: "25px" }}
              />
            </Link>
          </Col>
        </Row>
      </Card>
    );
  }
}
