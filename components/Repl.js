import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import ColoredText from './ColoredText';
import FormattedDate from './FormattedDate';

function outputRegex(flags, formats) {
  return new RegExp(
    `(%(?:${flags.join('|')})?(?:${formats.join('|')}))`
  );
}

const ColoredFormatPart = ({format, convertToDate: date}) => (
  <ColoredText colorKey={format}>
    { date
      ? <FormattedDate format={format} date={date} />
      : format
    }
  </ColoredText>
);

const ColoredFormat = ({format, regex, convertToDate: date, ...props}) => (
  <span {...props}>
    {
      format.split(regex).map((part, i) => (
        part.match(regex)
          ? <ColoredFormatPart key={i} format={part} convertToDate={date} />
          : <span key={i}>{part}</span>
      ))
    }
  </span>
);

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

  state = {
    format: this.props.value
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { props: { date, flags, formats, value }, state: { format }} = this;
    const regex = outputRegex(flags, formats);

    return (
      <div className='repl'>
        <div className='repl-row'>
          <label className='repl-label'>Input</label>
          <div className='repl-field'>
            <ColoredFormat regex={regex} format={format} className='repl-io repl-highlight' />
            <input
              type='text'
              ref='input'
              value={format}
              className='repl-io repl-input'
              onChange={this.handleChange}
              placeholder={`Type a format string here, .e.g ${value}`}
            />
          </div>
        </div>
        <div className='repl-row'>
          <span className='repl-label'>Output</span>
          <div className='repl-field'>
            <code className='repl-io'>
              <ColoredFormat regex={regex} format={format} convertToDate={date} />
            </code>
          </div>
        </div>
      </div>
    );
  }
};
