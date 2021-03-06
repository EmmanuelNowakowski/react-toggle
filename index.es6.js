import React from 'react'
import classNames from 'classnames'
import Check from './check'
import X from './x'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import copy from 'shallow-copy'

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Toggle',

  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    showColors: React.PropTypes.bool,
    renderSVGs: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    id: React.PropTypes.string,
    'aria-labelledby': React.PropTypes.string,
    'aria-label': React.PropTypes.string
  },

  getInitialState() {
    var checked = false;
    if ('checked' in this.props) {
      checked = this.props.checked
    } else if ('defaultChecked' in this.props) {
      checked = this.props.defaultChecked
    }
    return {
      checked: !!checked,
      hasFocus: false
    }
  },

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked})
    }
  },

  handleClick(event) {
    var checkbox = this.input
    if (event.target !== checkbox)
    {
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    if (!('checked' in this.props)) {
      this.setState({checked: checkbox.checked})
    }
  },

  handleFocus() {
    this.setState({hasFocus: true})
  },

  handleBlur() {
    this.setState({hasFocus: false})
  },

  render() {

    var classes = classNames('react-toggle', {
        'react-toggle--checked' : this.state.checked && this.props.showColors,
        'react-toggle--checked-lessColor' : this.state.checked && !this.props.showColors,
        'react-toggle--focus': this.state.hasFocus,
        'react-toggle--disabled': this.props.disabled
      })

    // remove all properties that are not allowed in input-fields
    var inputFieldProperties = copy(this.props);
    delete inputFieldProperties.showColors;
    delete inputFieldProperties.renderSVGs;
    delete inputFieldProperties.tabIndex;

    if (this.props.renderSVGs === false || this.props.renderSVGs === undefined) {
      return (
        <div className={classes} onClick={this.handleClick}>
          <div className="react-toggle-track">
            <div className="react-toggle-track-check">

            </div>
            <div className="react-toggle-track-x">

            </div>
            </div>
          <div className="react-toggle-thumb"></div>

          <input
            ref={ref => {this.input = ref;}}
            tabIndex={this.props.tabIndex}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="react-toggle-screenreader-only"
            type="checkbox"
            {...inputFieldProperties} />
        </div>
      )
    } else {
      return (
        <div className={classes} onClick={this.handleClick}>
          <div className="react-toggle-track">
            <div className="react-toggle-track-check">
              <Check />
            </div>
            <div className="react-toggle-track-x">
              <X />
            </div>
          </div>
          <div className="react-toggle-thumb"></div>

          <input
            ref={ref => {this.input = ref;}}
            tabIndex={this.props.tabIndex}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="react-toggle-screenreader-only"
            type="checkbox"
            {...inputFieldProperties} />
        </div>
      )
    }
  }
})
