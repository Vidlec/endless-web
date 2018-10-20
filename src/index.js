import "antd/dist/antd.css";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./styles.css";
import store from "./store/configStore";

import App from "./routes/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
