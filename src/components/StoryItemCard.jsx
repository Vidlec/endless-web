import React, { Component } from "react";
import { Card, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";

function CardHeader({ title, isComplete }) {
  return (
    <React.Fragment>
      <Row type="flex" justify="start" align="middle">
        <h3 style={{ margin: 0, marginRight: "1rem" }}>{title}</h3>
      </Row>
    </React.Fragment>
  );
}

export default class StoryItemCard extends Component {
  render() {
    const { subtitle, title, isComplete, _id } = this.props;
    return (
      <Link to={`/story-item/${_id}`}>
        <Card hoverable style={{ width: 300, marginTop: 16 }}>
          <Row gutter={4} type="flex" justify="space-around" align="middle">
            <Col span={20}>
              <Card.Meta
                title={<CardHeader title={title} isComplete={isComplete} />}
                description={subtitle}
              />
            </Col>

            <Col span={4}>
              <Icon
                type={isComplete ? "check-circle" : "right-circle"}
                theme="filled"
                style={{
                  fontSize: "25px",
                  color: isComplete ? "#78e08f" : "#009adb"
                }}
              />
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
}
