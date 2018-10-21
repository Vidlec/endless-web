import React, { Component } from "react";
import { connect } from "react-redux";
import { getResults } from "../store/reducers/results/actions";
import ResultCard from "../components/ResultCard";
import { Row, Divider } from "antd";

class Results extends Component {
  componentDidMount() {
    const { getResults } = this.props;
    getResults();
  }
  render() {
    const { results } = this.props;
    return (
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        style={{ paddingTop: "2rem" }}
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
  ({ results }) => ({ results }),
  { getResults }
)(Results);
