import React, { Component } from "react";
import { connect } from "react-redux";
import { getResults } from "../store/reducers/results/actions";
import ResultCard from "../components/ResultCard";
import { Row, Divider, Spin, Col } from "antd";
import logo from "../assets/logo.png";

class Results extends Component {
  state = {
    shouldDisplayResults: false
  };

  componentDidMount() {
    const { getResults, results, userId } = this.props;
    const shouldFetchResults = !results ? true : userId !== results[0].user;
    shouldFetchResults
      ? (this.timeout = setTimeout(
          () => this.setState({ shouldDisplayResults: true }),
          2500
        ))
      : this.setState({ shouldDisplayResults: true });
    shouldFetchResults && getResults();
  }

  render() {
    const { results } = this.props;
    const { shouldDisplayResults } = this.state;
    if (!shouldDisplayResults)
      return (
        <React.Fragment>
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            style={{
              position: "fixed",
              top: 0,
              width: "100%",
              bottom: 0,
              margin: "0 auto"
            }}
          >
            <Col>
              <Row type="flex-column" justify="space-around" align="middle">
                <Row type="flex" justify="space-around" align="middle">
                  <img
                    src={logo}
                    style={{ height: "200px", paddingBottom: "1rem" }}
                  />
                </Row>
                <Col style={{ textAlign: "center" }}>
                  <Spin size="large" />
                </Col>
                <Col>
                  <p style={{ fontWeight: "bold", paddingTop: "1rem" }}>
                    Právě pro tebe vytváříme tvůj příbeh...
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      );
    return (
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        style={{ paddingTop: "2rem", display: shouldDisplayResults }}
      >
        <Divider>
          <h1>Tvůj příběh</h1>
        </Divider>
        {results &&
          results.map(result => (
            <ResultCard image={result.image} storyItemId={result.storyItemId} />
          ))}
      </Row>
    );
  }
}

export default connect(
  ({ results, userId }) => ({ results, userId }),
  { getResults }
)(Results);
