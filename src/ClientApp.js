import React from "react";
import { hydrate } from "react-dom";

import "./App.css";
import App from "./App";

hydrate(<App />, document.getElementById("root"));
