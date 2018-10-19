import React, { Component } from "react";

export default class Camera extends Component {
  handleOnChange = e => {
    const { onChange, name } = this.props;
    const {
      target: { files }
    } = e;
    onChange({ file: files[0], name });
  };
  render() {
    return (
      <input
        type="file"
        name="image"
        accept="image/*"
        capture
        onChange={this.handleOnChange}
      />
    );
  }
}
