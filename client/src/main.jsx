import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// redux
import { store } from "./app/store";
import { Provider } from "react-redux";

// components
import App from "./app/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
