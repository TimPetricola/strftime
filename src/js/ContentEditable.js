import React, { Component, PropTypes, findDOMNode } from 'react';

export default class ContentEditable extends Component {
  render() {
    return (
      <div
        {...this.props}
        contentEditable
        onInput={this.emitChange.bind(this)}
        onBlur={this.emitChange.bind(this)}
        dangerouslySetInnerHTML={{__html: this.props.html}}
      ></div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== findDOMNode(this).innerHTML;
  }

  emitChange() {
    const html = findDOMNode(this).innerText;

    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }

    this.lastHtml = html;
  }
};
