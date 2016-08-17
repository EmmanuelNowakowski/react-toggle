"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react"));

var classNames = _interopRequire(require("classnames"));

var Check = _interopRequire(require("./check"));

var X = _interopRequire(require("./x"));

var PureRenderMixin = _interopRequire(require("react-addons-pure-render-mixin"));

var copy = _interopRequire(require("shallow-copy"));

module.exports = React.createClass({
  mixins: [PureRenderMixin],

  displayName: "Toggle",

  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    showColors: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    id: React.PropTypes.string,
    "aria-labelledby": React.PropTypes.string,
    "aria-label": React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    var checked = false;
    if ("checked" in this.props) {
      checked = this.props.checked;
    } else if ("defaultChecked" in this.props) {
      checked = this.props.defaultChecked;
    }
    return {
      checked: !!checked,
      hasFocus: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ("checked" in nextProps) {
      this.setState({ checked: !!nextProps.checked });
    }
  },

  handleClick: function handleClick(event) {
    var checkbox = this.input;
    if (event.target !== checkbox) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    if (!("checked" in this.props)) {
      this.setState({ checked: checkbox.checked });
    }
  },

  handleFocus: function handleFocus() {
    this.setState({ hasFocus: true });
  },

  handleBlur: function handleBlur() {
    this.setState({ hasFocus: false });
  },

  render: function render() {
    var _this = this;

    var classes = classNames("react-toggle", {
      "react-toggle--checked": this.state.checked && this.props.showColors,
      "react-toggle--checked-lessColor": this.state.checked && !this.props.showColors,
      "react-toggle--focus": this.state.hasFocus,
      "react-toggle--disabled": this.props.disabled
    });

    // remove all properties that are not allowed in input-fields
    var inputFieldProperties = copy(this.props);
    delete inputFieldProperties.showColors;

    return React.createElement(
      "div",
      { className: classes, onClick: this.handleClick },
      React.createElement(
        "div",
        { className: "react-toggle-track" },
        React.createElement(
          "div",
          { className: "react-toggle-track-check" },
          this.props.children
        ),
        React.createElement(
          "div",
          { className: "react-toggle-track-x" },
          this.props.children
        )
      ),
      React.createElement("div", { className: "react-toggle-thumb" }),
      React.createElement("input", _extends({
        ref: function (ref) {
          _this.input = ref;
        },
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        className: "react-toggle-screenreader-only",
        type: "checkbox"
      }, inputFieldProperties))
    );
  }
});
