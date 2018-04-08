import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home, Palette, WithProp, Centred } from "./utils/";
import "./style/index.scss";

export default ({ stories = [] }) => (
  <Router>
    <div className="main">
      <Palette stories={stories} />
      <Route exact path="/" component={Home} />
      {stories.map(({ name, component, props }, i) => {
        const Component = !!props ? WithProp(component)(props) : component;
        return <Route key={i} exact path={`/${name}`} component={Component} />;
      })}
    </div>
  </Router>
);

export { Centred };
