import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Layout, Divider, Spin } from "antd";
import GoogleMap from "google-map-react";
import { selectStoryItem } from "../store/reducers/game/selectors";
import { verifyImage, setUserImage } from "../store/reducers/game/actions";
import getCoordsDistance from "../utils/getCoordsDistance";

import Camera from "../components/Camera";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class StoryItem extends Component {
  state = {
    userCoordinates: null
  };

  componentDidMount() {
    this.positionWatcher = navigator.geolocation.watchPosition(
      this.updateUserPostion,
      () => null,
      { enableHighAccuracy: true }
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

    this.setState({
      userCoordinates: position.coords,
      isNear: distance <= 150,
      distance
    });
  };

  handleOnCameraCHange = ({ file }) => {
    const {
      verifyImage,
      setUserImage,
      storyItem: { _id }
    } = this.props;

    getBase64(file, url => {
      verifyImage(_id, url);
      setUserImage(url, _id);
    });
  };

  render() {
    const { storyItem, history } = this.props;
    const {
      description,
      title,
      isComplete,
      location,
      labels,
      isLoading,
      image,
      subtitle
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
              <Icon
                onClick={() => history.goBack()}
                type="left-circle"
                theme="twoTone"
                style={{ fontSize: "1.5rem" }}
              />
            </Col>
            <Col span={22}>
              <h3
                onClick={() => history.goBack()}
                style={{
                  padding: 0,
                  margin: 0,
                  marginLeft: "0.5rem",
                  color: "white"
                }}
              >
                Zpět
              </h3>
            </Col>
          </Row>
        </Layout>
        {isComplete && image && <img style={{ width: "100%" }} src={image} />}
        <Layout style={{ padding: "1rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Divider>{title}</Divider>
              {!isComplete ? (
                <React.Fragment>
                  <h4>{subtitle}</h4>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>{description}</p>
                </React.Fragment>
              )}
              <div
                style={{
                  height: "300px",
                  width: "100%",
                  marginTop: "1rem",
                  paddingBottom: "2.5rem"
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
        <Row type="flex" justify="center" style={{}}>
          {!isComplete &&
            isNear &&
            !isLoading && (
              <Camera name="test" onChange={this.handleOnCameraCHange} />
            )}
          {!isNear &&
            !isComplete && (
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
  { verifyImage, setUserImage }
)(StoryItem);
