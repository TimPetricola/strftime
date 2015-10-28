import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import ColoredText from './ColoredText';
import FormattedDate from './FormattedDate';

export default class Repl extends Component {
  static propTypes = {
    value: PropTypes.string,
    formats: PropTypes.arrayOf(PropTypes.string),
    flags: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    formats: [],
    flags: [],
    onChange: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      format: props.value
    }

    this.regex = new RegExp(
      `(%(?:${props.flags.join('|')})?(?:${props.formats.join('|')}))`
    );
  }

  componentDidMount() {
    // Set focus at the end of input
    const node = findDOMNode(this.refs.input);
    node.focus();
    node.selectionStart = node.selectionEnd = node.value.length;
  }

  handleChange(event) {
    const format = event.target.value;
    this.setState({ format: format });
    this.props.onChange(format);
  }

  coloredFormat() {
    return this.state.format.split(this.regex).map((part, i) => {
      if(part.match(this.regex)) {
        return (
          <ColoredText colorKey={part} key={i}>
            {part}
          </ColoredText>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });
  }

  renderFormattedDate() {
    const { date } = this.props;
    const { format } = this.state;
    const { regex } = this;

    return format.split(regex).map((part, i) => {
      if (part.match(regex)) {
        return (
          <ColoredText colorKey={part} key={i}>
            <FormattedDate format={part} date={date} />
          </ColoredText>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    }.bind(this));
  }

  render() {
    return (
      <div className='repl'>
        <div className='repl-row'>
          <label className='repl-label'>Input</label>
          <div className='repl-field'>
            <span className='repl-io repl-highlight'>
              {this.coloredFormat()}
            </span>
            <input
              type='text'
              ref='input'
              value={this.state.format}
              className='repl-io repl-input'
              onChange={this.handleChange.bind(this)}
              placeholder={`Type a format string here, .e.g ${this.props.value}`}
            />
          </div>
        </div>
        <div className='repl-row'>
          <span className='repl-label'>Output</span>
          <div className='repl-field'>
            <code className='repl-io'>
              {this.renderFormattedDate()}
            </code>
          </div>
        </div>
      </div>
    );
  }
};
