import React, { Component, PropTypes } from 'react';
import strftime from 'strftime';

function formattedDate(format, date) {
  let formatted = strftime(format, date);

  if (formatted === '\n') {
    formatted = <br />;
  }

  return formatted;
}

export default class FormattedDate extends Component {
  static propTypes = {
    format: React.PropTypes.string.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired
  }

  render() {
    const {format, date, ...props} = this.props;

    return (
      <span {...props}>
        {formattedDate(format, date)}
      </span>
    );
  }
};
