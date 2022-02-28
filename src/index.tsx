import React from "react";
import ReactDOM from "react-dom";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./sass/core.scss";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
