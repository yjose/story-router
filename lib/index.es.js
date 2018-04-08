/*!
 * story-router v0.0.1
 * (c) 2018-present Youssouf Elazizi
 * Released under the MIT License.
 */
import React from 'react';
import { withRouter } from 'react-router';
import { FuzzyPicker, FuzzyWrapper } from 'react-fuzzy-picker';
import { Controlled } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

const Centred = Comp => props => React.createElement("div", {
  className: "centred"
}, React.createElement(Comp, props));

var Home = Centred(() => React.createElement("div", {
  style: {
    textAlign: "center"
  }
}, React.createElement("h1", null, "Welcome To parcel-storybook"), React.createElement("h5", null, " Tab Ctrl+P to open the stories palette")));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const Palette = props => React.createElement(FuzzyWrapper, {
  isKeyPressed: e => {
    // Press slash.
    return e.ctrlKey && e.keyCode == 80;
  },
  popup: (isOpen, onClose) => React.createElement(FuzzySearchExample, _extends({
    isOpen: isOpen
  }, props, {
    onClose: onClose
  }))
});

const FuzzySearchExample = props => React.createElement(FuzzyPicker, _extends({}, props, {
  onChange: choice => {
    props.history.push(`/${choice.name}`);
    props.onClose();
  },
  items: props.stories,
  itemValue: item => item.name,
  renderItem: item => React.createElement("span", {
    className: "item-wrapper"
  }, item.name)
}));

var Palette$1 = withRouter(Palette);

require("codemirror/mode/javascript/javascript");

class Prop extends React.Component {
  constructor(props) {
    super(props);
    Object.defineProperty(this, "onChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (editor, data, value) => {
        this.setState({
          valid: true,
          value
        });

        try {
          this.setState({
            validData: fromJson(this.state.value)
          });
          this.props.onChange(this.state.validData);
        } catch (err) {
          this.setState({
            valid: false,
            value
          });
        }
      }
    });
    this.state = {
      value: toJson(this.props.value),
      validData: this.props.value,
      valid: true
    };
  }

  render() {
    const options = {
      theme: "material",
      height: "auto",
      viewportMargin: Infinity,
      mode: {
        name: "javascript",
        json: true,
        statementIndent: 2
      },
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: false,
      tabSize: 2
    };
    const {
      valid,
      value,
      validData
    } = this.state;
    return React.createElement("div", {
      className: "props-editor"
    }, React.createElement("div", {
      className: `json-valid ${valid ? "valid" : "invalid"}`
    }, React.createElement("span", {
      className: "s-valid"
    }), " ", React.createElement("span", {
      className: "s-invalid"
    })), React.createElement(Controlled, {
      value: value,
      options: options,
      onBeforeChange: this.onChange,
      onChange: (editor, data, value) => {}
    }));
  }

}

const fromJson = json => JSON.parse(json);

const toJson = val => JSON.stringify(val, null, 2);

const WithProp = Comp => (ps = {}) => {
  var _class, _temp, _initialiseProps;

  return _temp = _class = class P extends React.PureComponent {
    constructor(props) {
      super(props);

      _initialiseProps.call(this);

      this.state = {
        props: ps
      };
    }

    render() {
      return React.createElement("div", {
        className: "content"
      }, React.createElement(Prop, {
        value: ps,
        onChange: this.onPropsChange
      }), React.createElement("div", {
        style: {
          flex: "1"
        }
      }, React.createElement(Comp, this.state.props)));
    }

  }, _initialiseProps = function () {
    Object.defineProperty(this, "onPropsChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: props => {
        this.setState({
          props: props
        });
      }
    });
  }, _temp;
};

var index = (({
  stories = []
}) => React.createElement(BrowserRouter, null, React.createElement("div", {
  className: "main"
}, React.createElement(Palette$1, {
  stories: stories
}), React.createElement(Route, {
  exact: true,
  path: "/",
  component: Home
}), stories.map(({
  name,
  component,
  props
}, i) => {
  const Component = !!props ? WithProp(component)(props) : component;
  return React.createElement(Route, {
    key: i,
    exact: true,
    path: `/${name}`,
    component: Component
  });
}))));

export default index;
export { Centred };
