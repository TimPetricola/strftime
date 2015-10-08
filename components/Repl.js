import React, { Component, PropTypes, findDOMNode } from 'react';

import { placeCaretAtEnd } from '../utils';

import ContentEditable from './ContentEditable';
import ColoredText from './ColoredText';
import FormattedDate from './FormattedDate';

class FormatInput extends Component {
  static propTypes = {
    initialValue: PropTypes.string
  }

  static defaultProps = {
    initialValue: ''
  }

  state = {
    value: this.props.initialValue
  }

  componentDidMount() {
    placeCaretAtEnd(findDOMNode(this.refs.editor));
  }

  handleChange(value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  getColoredContent() {
    const { regex } = this.props;

    return this.state.value.split(regex).map((part, i) => {
      if(part.match(regex)) {
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

  render() {
    return (
      <div className='date-input'>
        <code>
          <div className='date-input__highlighter'>{this.getColoredContent()}</div>
          <ContentEditable
            ref='editor'
            className='date-input__editor'
            onChange={this.handleChange.bind(this)}
            html={this.state.value}
          ></ContentEditable>
        </code>
      </div>
    );
  }
};

class FormattedString extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    regex: PropTypes.instanceOf(RegExp).isRequired
  }

  render() {
    const { content, regex, date } = this.props;

    const parts = content.split(regex).map((part, i) => {
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

    return <span>{parts}</span>;
  }
};

export default class Repl extends Component {
  static propTypes = {
    format: PropTypes.string,
    formats: PropTypes.arrayOf(PropTypes.string),
    flags: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    format: '',
    formats: [],
    flags: []
  }

  state = {
    format: this.props.value
  }

  handleFormatChange(format) {
    this.setState({ format: format });
  }

  render() {
    const { formats, flags } = this.props;

    const regex = new RegExp(
      `(%(?:${flags.join('|')})?(?:${formats.join('|')}))`
    );

    return (
      <div className='repl'>
        <FormatInput
          onChange={this.handleFormatChange.bind(this)}
          initialValue={this.props.value}
          regex={regex}
        />
        <div className='result'>
          <FormattedString
            date={this.props.date}
            content={this.state.format}
            regex={regex}
          />
        </div>
      </div>
    );
  }
};
