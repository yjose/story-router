import React from "react";
import ReactDOM from "react-dom";
// import story-router component
//import StoryRouter from "../src/index.js";
import StoryRouter from "../lib/index.es.js";
import "../lib/index.css";

import Stories from "./stories/index";

//const Components = Object.entries(require("./stories/*.js"));
const App = () => <StoryRouter stories={Stories} />;

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
