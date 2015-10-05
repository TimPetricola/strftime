import React, { Component, findDOMNode } from 'react';

import { placeCaretAtEnd, setHash } from './utils';

import ContentEditable from './ContentEditable';
import ColoredText from './ColoredText';
import FormattedDate from './FormattedDate';

class FormatInput extends Component {
  state = {
    value: this.props.initialValue || ''
  }

  componentDidMount() {
    placeCaretAtEnd(findDOMNode(this.refs.editor));
  }

  handleChange(value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  getColoredContent() {
    return this.state.value.split(this.props.regex).map((part, i) => {
      if(part.match(this.props.regex)) {
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
  render() {
    const parts = this.props.content.split(this.props.regex).map((part, i) => {
      if(part.match(this.props.regex)) {
        return (
          <ColoredText colorKey={part} key={i}>
            <FormattedDate format={part} />
          </ColoredText>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    }.bind(this));

    return <span>{parts}</span>;
  }
};


class Result extends Component{
  render() {
    return (
      <div className='result'>
        <FormattedString
          content={this.props.format}
          regex={this.props.regex}
          supportedCodes={this.props.supportedCodes}
        />
      </div>
    );
  }
};

export default class StrftimeBuilder extends Component {
  state = {
    format: this.props.value || ''
  }

  handleFormatChange(format) {
    this.setState({ format: format });
    setHash(format);
  }

  getRegex() {
    this.regex = this.regex || new RegExp(`(${this.props.supportedCodes.join('|')})`);
    return this.regex;
  }

  render() {
    return (
      <div>
        <FormatInput
          onChange={this.handleFormatChange.bind(this)}
          initialValue={this.props.value}
          regex={this.getRegex()}
          supportedCodes={this.props.supportedCodes}
        />
        <Result
          format={this.state.format}
          regex={this.getRegex()}
          supportedCodes={this.props.supportedCodes}
        />
      </div>
    );
  }
};
