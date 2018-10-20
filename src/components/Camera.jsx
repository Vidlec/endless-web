import React, { Component } from "react";
import { Icon } from "antd";

export default class Camera extends Component {
  handleOnChange = e => {
    const { onChange, name } = this.props;
    const {
      target: { files }
    } = e;
    onChange({ file: files[0], name });
  };
  render() {
    const { name } = this.props;
    return (
      <React.Fragment>
        <input
          type="file"
          id={name}
          name="image"
          accept="image/*"
          capture
          onChange={this.handleOnChange}
          style={{
            width: "0.1px",
            height: "0.1px",
            opacity: 0,
            overflow: "hidden",
            position: "absolute",
            zIndex: "-1"
          }}
        />
        <label htmlFor={name}>
          <Icon type="camera" theme="filled" style={{ fontSize: "72px" }} />
        </label>
      </React.Fragment>
    );
  }
}
