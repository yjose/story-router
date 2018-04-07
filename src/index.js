import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Utils/Home";
import Centered from "./Utils/Centred";
import Palette from "./Utils/Palette";
import WithProp from "./Utils/WithProp";
import "./style/index.scss";

export default (Stories = []) => (
  <Router>
    <div className="main">
      <Palette stories={Stories} />
      <Route exact path="/" component={Home} />
      {Stories.map(({ name, component, props }, i) => {
        const Component = !!props ? WithProp(component)(props) : component;
        return <Route key={i} exact path={`/${name}`} component={Component} />;
      })}
    </div>
  </Router>
);

export { Centered };
