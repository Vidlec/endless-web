import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Layout, Divider, Spin } from "antd";
import GoogleMap from "google-map-react";
import { Link } from "react-router-dom";
import { selectStoryItem } from "../store/reducers/game/selectors";
import { verifyImage } from "../store/reducers/game/actions";
import getCoordsDistance from "../utils/getCoordsDistance";

import Camera from "../components/Camera";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class StoryItem extends Component {
  state = {
    image: null,
    userCoordinates: null
  };

  componentDidMount() {
    this.positionWatcher = navigator.geolocation.watchPosition(
      this.updateUserPostion
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.positionWatcher);
  }

  updateUserPostion = position => {
    const {
      storyItem: { location }
    } = this.props;
    const distance = getCoordsDistance(
      position.coords.latitude,
      position.coords.longitude,
      location.coordinates[0],
      location.coordinates[1]
    );
    console.log("updating");
    this.setState({
      userCoordinates: position.coords,
      isNear: distance < 20,
      distance
    });
  };

  handleOnCameraCHange = ({ file }) => {
    const {
      verifyImage,
      storyItem: { _id }
    } = this.props;

    getBase64(file, url => {
      verifyImage(_id, url);
      this.setState({ image: url });
    });
  };

  render() {
    const { storyItem, gameId } = this.props;
    const {
      description,
      title,
      isComplete,
      location,
      labels,
      isLoading
    } = storyItem;
    const { userCoordinates, isNear, distance } = this.state;
    return (
      <React.Fragment>
        <Layout
          style={{
            padding: "24px",
            backgroundColor: "#009adb"
          }}
        >
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
              <Link to={`/${gameId}`}>
                <h3
                  style={{
                    padding: 0,
                    margin: 0,
                    marginLeft: "0.5rem",
                    color: "white"
                  }}
                >
                  Zpět
                </h3>
              </Link>
            </Col>
          </Row>
        </Layout>
        <Layout style={{ padding: "1rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Divider>{title}</Divider>
              {!isComplete ? (
                <React.Fragment>
                  <h4>
                    Pro odemknutí kapitoly, pořiďte fotku, která obsahuje
                    alespoň jeden z předmětů:
                  </h4>
                  {labels.map(label => (
                    <p>{label}</p>
                  ))}
                  <h4>Na tomto místě</h4>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>{description}</p>
                  {this.state.image && (
                    <img src={this.state.image} style={{ maxWidth: "300px" }} />
                  )}
                </React.Fragment>
              )}
              <div
                style={{
                  height: "300px",
                  width: "100%",
                  marginTop: "1rem"
                }}
              >
                <GoogleMap
                  bootstrapURLKeys={{
                    key: "AIzaSyBdZobDPrJxTyRaIPdmUwUxmK6Gi6-ZZ_Y"
                  }}
                  defaultCenter={{
                    lat: location.coordinates[0],
                    lng: location.coordinates[1]
                  }}
                  defaultZoom={15}
                >
                  <Icon
                    lat={location.coordinates[0]}
                    lng={location.coordinates[1]}
                    style={{ color: "#e55039", fontSize: "34px" }}
                    type="environment"
                    theme="filled"
                  />
                  {userCoordinates && (
                    <Icon
                      lat={userCoordinates.latitude}
                      lng={userCoordinates.longitude}
                      style={{ color: "#e55039", fontSize: "34px" }}
                      type="smile"
                      theme="filled"
                    />
                  )}
                </GoogleMap>
              </div>
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
          {!isComplete &&
            isNear &&
            !isLoading && (
              <Camera name="test" onChange={this.handleOnCameraCHange} />
            )}
          {!isNear && (
            <div>
              <p style={{ marginBottom: 0 }}>Musíte být blíže</p>
              <span style={{ marginRight: "5px" }}>Vaše vzdálenost je</span>
              {distance ? (
                <span style={{ fontWeight: "bold" }}>
                  {Math.ceil(distance)} metrů
                </span>
              ) : (
                <Spin />
              )}
            </div>
          )}
          {isLoading && <Spin />}
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
  { verifyImage }
)(StoryItem);
