/*!
 * story-router v1.0.1
 * (c) 2018-present Youssouf Elazizi
 * Released under the MIT License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import fuzzysearch from 'fuzzysearch';
import { withRouter } from 'react-router';
import { Controlled } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

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

var FuzzyPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuzzyPicker, _React$Component);

  function FuzzyPicker(props) {
    var _this;

    _classCallCheck(this, FuzzyPicker);

    _this = _possibleConstructorReturn(this, (FuzzyPicker.__proto__ || Object.getPrototypeOf(FuzzyPicker)).call(this));
    _this.state = {
      selectedIndex: 0,
      // which item is selected?
      items: _this.getInitialItems() // the items wich are displayed in the fuzzy find list

    };
    return _this;
  } // Move the selected index up or down.


  _createClass(FuzzyPicker, [{
    key: "onMoveUp",
    value: function onMoveUp() {
      if (this.state.selectedIndex > 0) {
        this.selectIndex(--this.state.selectedIndex); // User is at the start of the list. Should we cycle back to the end again?
      } else if (this.props.cycleAtEndsOfList) {
        this.selectIndex(this.state.items.length - 1);
      }
    }
  }, {
    key: "onMoveDown",
    value: function onMoveDown() {
      var itemsLength = this.state.items.length - 1;

      if (this.state.selectedIndex < itemsLength) {
        this.selectIndex(++this.state.selectedIndex); // User is at the end of the list. Should we cycle back to the start again?
      } else if (this.props.cycleAtEndsOfList) {
        this.selectIndex(0);
      }
    } // handle key events in the textbox

  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      switch (event.key) {
        // Moving up and down
        // Either arrow keys, tab/shift+tab, or ctrl+j/ctrl+k (what's used in vim sometimes)
        case 'ArrowUp':
          {
            this.onMoveUp();
            event.preventDefault();
            break;
          }

        case 'ArrowDown':
          {
            this.onMoveDown();
            event.preventDefault();
            break;
          }

        case 'j':
          {
            if (event.ctrlKey) {
              this.onMoveDown();
            }

            break;
          }

        case 'k':
          {
            if (event.ctrlKey) {
              this.onMoveUp();
            }

            break;
          }

        case 'Tab':
          {
            if (event.shiftKey) {
              this.onMoveUp();
            } else {
              this.onMoveDown();
            }

            event.preventDefault();
            break;
          }

        case 'Enter':
          {
            // Enter key
            var item = this.state.items[this.state.selectedIndex];

            if (item) {
              this.setState({
                items: this.getInitialItems()
              });
              this.props.onChange(item);
            }

            break;
          }

        case 'Escape':
          {
            this.setState({
              items: this.getInitialItems()
            });
            this.props.onClose();
          }
      }
    }
  }, {
    key: "getInitialItems",
    value: function getInitialItems() {
      return [];
    } // When the user types into the textbox, this handler is called.
    // Though the textbox is an uncontrolled input, this is needed to regenerate the
    // list of choices under the textbox.

  }, {
    key: "onInputChanged",
    value: function onInputChanged(_ref) {
      var _this2 = this;

      var value = _ref.target.value;

      if (value.length) {
        // Pick the closest matching items if possible.
        var items = this.props.items.filter(function (item) {
          return fuzzysearch(value.toLowerCase(), _this2.props.itemValue(item).toLowerCase());
        });
        this.setState({
          items: items.slice(0, this.props.displayCount),
          selectedIndex: 0
        });
      } else {
        // initially, show an empty picker.
        this.setState({
          items: this.getInitialItems(),
          selectedIndex: 0
        });
      }
    } // Highlight the given item

  }, {
    key: "selectIndex",
    value: function selectIndex(ct) {
      this.props.onChangeHighlightedItem(this.state.items[ct]); // fire a callback

      this.setState({
        selectedIndex: ct
      }); // update the state for real
    }
  }, {
    key: "onClickOnBg",
    value: function onClickOnBg(event) {
      if (event.target.className === 'fuzzy-switcher-background') {
        this.props.onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.props.isOpen) {
        return React.createElement("div", {
          className: "fuzzy-picker-background",
          onClick: this.onClickOnBg.bind(this)
        }, React.createElement("div", {
          className: "fuzzy-picker"
        }, React.createElement("span", {
          className: "fuzzy-picker-top-text"
        }, React.createElement("span", {
          className: "fuzzy-picker-label"
        }, this.props.label), React.createElement("span", {
          className: "fuzzy-picker-instructions"
        }, React.createElement("span", null, React.createElement("strong", null, "tab"), " or ", React.createElement("strong", null, "\u2191\u2193"), " to navigate"), React.createElement("span", null, React.createElement("strong", null, "enter"), " to select"), React.createElement("span", null, React.createElement("strong", null, "esc"), " to dismiss"))), React.createElement("input", {
          type: "text",
          className: "fuzzy-input",
          autoFocus: true,
          onKeyDown: this.onKeyDown.bind(this),
          onChange: this.onInputChanged.bind(this)
        }), React.createElement("ul", {
          className: "fuzzy-items"
        }, this.state.items.map(function (item, ct) {
          // render each item
          return React.createElement("li", {
            key: _this3.props.itemValue(item),
            className: classnames({
              selected: ct === _this3.state.selectedIndex
            }),
            onMouseOver: _this3.selectIndex.bind(_this3, ct),
            onClick: _this3.props.onChange.bind(_this3, _this3.state.items[ct])
          }, _this3.props.renderItem(item));
        }))));
      } else {
        return null;
      }
    }
  }]);

  return FuzzyPicker;
}(React.Component);
FuzzyPicker.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  label: PropTypes.string,
  displayCount: PropTypes.number,
  cycleAtEndsOfList: PropTypes.bool,
  onChangeHighlightedItem: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  renderItem: PropTypes.func,
  itemValue: PropTypes.func
};
FuzzyPicker.defaultProps = {
  label: 'Search',
  // The text above the searchbox that describes what's happening
  displayCount: 5,
  // How many items to display at once
  cycleAtEndsOfList: true,
  // When a user arrows past the end of the list, should the highlight wrap?
  onChangeHighlightedItem: function onChangeHighlightedItem(item) {},
  // Called when the user highlights a new item
  onChange: function onChange(item) {},
  // Called when an item is selected
  onClose: function onClose() {},
  // Called when the popup is closed
  // By default, the item as its value (ie, each item is a string.)
  renderItem: function renderItem(item) {
    return item;
  },
  itemValue: function itemValue(item) {
    return item;
  }
};

var AsyncFuzzyPicker =
/*#__PURE__*/
function (_FuzzyPicker) {
  _inherits(AsyncFuzzyPicker, _FuzzyPicker);

  function AsyncFuzzyPicker() {
    _classCallCheck(this, AsyncFuzzyPicker);

    return _possibleConstructorReturn(this, (AsyncFuzzyPicker.__proto__ || Object.getPrototypeOf(AsyncFuzzyPicker)).apply(this, arguments));
  }

  _createClass(AsyncFuzzyPicker, [{
    key: "onInputChanged",
    // Since we're fetching async, fetch the new items to show.
    value: function onInputChanged(_ref) {
      var _this = this;

      var value = _ref.target.value;
      return this.props.fetchItems(content).then(function (items) {
        if (Array.isArray(items)) {
          _this.setState({
            items: items
          });
        } else {
          throw new Error("Resolved data isn't an array, and react-fuzzy-picker expects an array of strings to be resolved - like [\"foo\", \"bar\", \"baz\"]");
        }
      });
    }
  }]);

  return AsyncFuzzyPicker;
}(FuzzyPicker);
AsyncFuzzyPicker.propTypes = Object.assign({}, FuzzyPicker.PropTypes, {
  fetchItems: PropTypes.func.isRequired
});
delete AsyncFuzzyPicker.propTypes.items; // reset the value of items since that isn't needed here.

AsyncFuzzyPicker.defaultProps = Object.assign({}, FuzzyPicker.defaultProps, {
  // by default, don't show any items.
  fetchItems: function fetchItems() {
    return Promise.resolve([]);
  }
});

var FuzzyWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuzzyWrapper, _React$Component);

  function FuzzyWrapper(props) {
    var _this;

    _classCallCheck(this, FuzzyWrapper);

    _this = _possibleConstructorReturn(this, (FuzzyWrapper.__proto__ || Object.getPrototypeOf(FuzzyWrapper)).call(this));
    _this.state = {
      isOpen: false
    }; // create a bound function to invoke when keys are pressed on the body.

    _this.keyEvent = function (event) {
      if (this.props.isKeyPressed(event)) {
        event.preventDefault();
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    }.bind(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(FuzzyWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('keydown', this.keyEvent);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('keydown', this.keyEvent);
    } // Called by the containing fuzzysearcher to close itself.

  }, {
    key: "onClose",
    value: function onClose() {
      this.setState({
        isOpen: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.popup(this.state.isOpen, this.onClose.bind(this));
    }
  }]);

  return FuzzyWrapper;
}(React.Component);
FuzzyWrapper.propTypes = {
  isKeyPressed: PropTypes.func.isRequired,
  popup: PropTypes.func.isRequired
};
FuzzyWrapper.defaultProps = {
  isKeyPressed: function isKeyPressed() {
    return false;
  },
  popup: function popup() {
    return null;
  }
};

var Palette = function Palette(props) {
  return React.createElement(FuzzyWrapper, {
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
  return React.createElement(FuzzyPicker, _extends({}, props, {
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

var Palette$1 = withRouter(Palette);

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
      })), React.createElement(Controlled, {
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
  return React.createElement(BrowserRouter, null, React.createElement("div", {
    className: "main"
  }, React.createElement(Palette$1, {
    stories: stories
  }), React.createElement(Route, {
    exact: true,
    path: "/",
    component: Home
  }), stories.map(function (_ref2, i) {
    var name = _ref2.name,
        component = _ref2.component,
        props = _ref2.props;
    var Component = !!props ? WithProp(component)(props) : component;
    return React.createElement(Route, {
      key: i,
      exact: true,
      path: "/".concat(name),
      component: Component
    });
  })));
});

export default index;
export { Centred };
