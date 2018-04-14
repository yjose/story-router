/*!
 * story-router v0.0.1
 * (c) 2018-present Youssouf Elazizi
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var reactRouter = require('react-router');
var reactFuzzyPicker = require('react-fuzzy-picker');
var reactCodemirror2 = require('react-codemirror2');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('react-dom');
var reactRouterDom = require('react-router-dom');

var Centred = function Centred(Comp) {
  return function (props) {
    return React.createElement("div", {
      className: "centred"
    }, React.createElement(Comp, props));
  };
};

var Home = Centred(function () {
  return React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, React.createElement("h1", null, "Welcome To parcel-storybook"), React.createElement("h5", null, " Tab Ctrl+P to open the stories palette"));
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Palette = function Palette(props) {
  return React.createElement(reactFuzzyPicker.FuzzyWrapper, {
    isKeyPressed: function isKeyPressed(e) {
      // Press slash.
      return e.ctrlKey && e.keyCode == 80;
    },
    popup: function popup(isOpen, onClose) {
      return React.createElement(FuzzySearchExample, _extends({
        isOpen: isOpen
      }, props, {
        onClose: onClose
      }));
    }
  });
};

var FuzzySearchExample = function FuzzySearchExample(props) {
  return React.createElement(reactFuzzyPicker.FuzzyPicker, _extends({}, props, {
    onChange: function onChange(choice) {
      props.history.push("/".concat(choice.name));
      props.onClose();
    },
    items: props.stories,
    itemValue: function itemValue(item) {
      return item.name;
    },
    renderItem: function renderItem(item) {
      return React.createElement("span", {
        className: "item-wrapper"
      }, item.name);
    }
  }));
};

var Palette$1 = reactRouter.withRouter(Palette);

require("codemirror/mode/javascript/javascript");

var Prop =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Prop, _React$Component);

  function Prop(props) {
    var _this;

    _classCallCheck(this, Prop);

    _this = _possibleConstructorReturn(this, (Prop.__proto__ || Object.getPrototypeOf(Prop)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "onChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(editor, data, _value) {
        _this.setState({
          valid: true,
          value: _value
        });

        try {
          _this.setState({
            validData: fromJson(_this.state.value)
          });

          _this.props.onChange(_this.state.validData);
        } catch (err) {
          _this.setState({
            valid: false,
            value: _value
          });
        }
      }
    });
    _this.state = {
      value: toJson(_this.props.value),
      validData: _this.props.value,
      valid: true
    };
    return _this;
  }

  _createClass(Prop, [{
    key: "render",
    value: function render() {
      var options = {
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
      var _state = this.state,
          valid = _state.valid,
          value = _state.value,
          validData = _state.validData;
      return React.createElement("div", {
        className: "props-editor"
      }, React.createElement("div", {
        className: "json-valid ".concat(valid ? "valid" : "invalid")
      }, React.createElement("span", {
        className: "s-valid"
      }), " ", React.createElement("span", {
        className: "s-invalid"
      })), React.createElement(reactCodemirror2.Controlled, {
        value: value,
        options: options,
        onBeforeChange: this.onChange,
        onChange: function onChange(editor, data, value) {}
      }));
    }
  }]);

  return Prop;
}(React.Component);

var fromJson = function fromJson(json) {
  return JSON.parse(json);
};

var toJson = function toJson(val) {
  return JSON.stringify(val, null, 2);
};

var WithProp = function WithProp(Comp) {
  return function () {
    var _class, _temp, _initialiseProps;

    var ps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _temp = _class =
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inherits(P, _React$PureComponent);

      function P(props) {
        var _this;

        _classCallCheck(this, P);

        _this = _possibleConstructorReturn(this, (P.__proto__ || Object.getPrototypeOf(P)).call(this, props));

        _initialiseProps.call(_assertThisInitialized(_this));

        _this.state = {
          props: ps
        };
        return _this;
      }

      _createClass(P, [{
        key: "render",
        value: function render() {
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
      }]);

      return P;
    }(React.PureComponent), _initialiseProps = function _initialiseProps() {
      var _this2 = this;

      Object.defineProperty(this, "onPropsChange", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function value(props) {
          _this2.setState({
            props: props
          });
        }
      });
    }, _temp;
  };
};

var index = (function (_ref) {
  var _ref$stories = _ref.stories,
      stories = _ref$stories === void 0 ? [] : _ref$stories;
  return React.createElement(reactRouterDom.BrowserRouter, null, React.createElement("div", {
    className: "main"
  }, React.createElement(Palette$1, {
    stories: stories
  }), React.createElement(reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: Home
  }), stories.map(function (_ref2, i) {
    var name = _ref2.name,
        component = _ref2.component,
        props = _ref2.props;
    var Component = !!props ? WithProp(component)(props) : component;
    return React.createElement(reactRouterDom.Route, {
      key: i,
      exact: true,
      path: "/".concat(name),
      component: Component
    });
  })));
});

exports.default = index;
exports.Centred = Centred;
