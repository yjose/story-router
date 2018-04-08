import React from "react";

import { withRouter } from "react-router";

import { FuzzyPicker, FuzzyWrapper } from "react-fuzzy-picker";

const Palette = props => (
  <FuzzyWrapper
    isKeyPressed={e => {
      // Press slash.
      return e.ctrlKey && e.keyCode == 80;
    }}
    popup={(isOpen, onClose) => (
      <FuzzySearchExample isOpen={isOpen} {...props} onClose={onClose} />
    )}
  />
);

const FuzzySearchExample = props => (
  <FuzzyPicker
    {...props}
    onChange={choice => {
      props.history.push(`/${choice.name}`);
      props.onClose();
    }}
    items={props.stories}
    itemValue={item => item.name}
    renderItem={item => <span className="item-wrapper">{item.name}</span>}
  />
);

export default withRouter(Palette);
