import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
require("codemirror/mode/javascript/javascript");

class Prop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: toJson(this.props.value),
      validData: this.props.value,
      valid: true
    };
  }

  onChange = (editor, data, value) => {
    this.setState({ valid: true, value });
    try {
      this.setState({ validData: fromJson(this.state.value) });
      this.props.onChange(this.state.validData);
    } catch (err) {
      this.setState({ valid: false, value });
    }
  };

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

    const { valid, value, validData } = this.state;
    return (
      <div className="props-editor">
        <div className={`json-valid ${valid ? "valid" : "invalid"}`}>
          <span className="s-valid" /> <span className="s-invalid" />
        </div>
        <CodeMirror
          value={value}
          options={options}
          onBeforeChange={this.onChange}
          onChange={(editor, data, value) => {}}
        />
      </div>
    );
  }
}

export default Prop;

const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);
