import React, { Component } from "react";
import { connect } from "react-redux";
import { getResults } from "../store/reducers/results/actions";

class Results extends Component {
  componentDidMount() {
    const { getResults } = this.props;
    getResults();
  }
  render() {
    const { results } = this.props;
    return (
      <div>{results && results.map(result => <img src={result.image} />)}</div>
    );
  }
}

export default connect(
  ({ results }) => ({ results }),
  { getResults }
)(Results);
