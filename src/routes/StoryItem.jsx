import React, { Component } from "react";
import { Row, Col, Icon, Layout, Divider } from "antd";
import { Link } from "react-router-dom";

import Camera from "../components/Camera";

export default class StoryItem extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout style={{ padding: "1rem" }}>
          <Row type="flex" justify="start" align="middle">
            <Col span={2}>
              <Link to={`/j7hsd782`}>
                <Icon
                  type="left-circle"
                  theme="twoTone"
                  style={{ fontSize: "1.5rem" }}
                />
              </Link>
            </Col>
            <Col span={22}>
              <h3 style={{ padding: 0, margin: 0, marginLeft: "1rem" }}>
                Story item name
              </h3>
            </Col>
          </Row>
        </Layout>
        <Layout style={{ padding: "1rem", backgroundColor: "#f8c291" }}>
          <Row>
            <Col>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Divider />
              <h4>Take a picture of the church to unlock this story</h4>
              <Icon type="lock" theme="filled" style={{ fontSize: "45px" }} />
            </Col>
          </Row>
        </Layout>
        <div style={{ position: "absolute", bottom: 20, left: "40%" }}>
          <Camera name="test" />
        </div>
      </React.Fragment>
    );
  }
}
