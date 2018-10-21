import "antd/dist/antd.css";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./styles.css";
import { store, persistor } from "./store/configStore";

import App from "./routes/App";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
