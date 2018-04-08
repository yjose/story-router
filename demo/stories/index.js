import React from "react";
import Story from "./Story";
//import { Centred } from "../../src/utils/";
import { Centred } from "../../lib/index.es.js";

const storyProps = { text: "Parcel Storybook" };
const buttonProps = {
  name: "My Button",
  style: {
    margin: "10px",
    height: "30px",
    color: "black",
    background: "blue"
  }
};

export default [
  {
    name: "Story 1",
    component: Centred(Story),
    props: storyProps // adding props
  },
  {
    name: "without Prop", // without props
    component: Centred(() => <button>Test without props</button>)
  }
];
