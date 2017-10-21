import React, { Component } from 'react';
import PropTypes from 'prop-types';
import strftime from 'strftime';

function formattedDate(format, date) {
  let formatted = strftime(format, date);

  if (formatted === '\n') {
    formatted = <br />;
  }

  return formatted;
}

const FormattedDate = ({format, date, ...props}) => (
  <span {...props}>
    {formattedDate(format, date)}
  </span>
);

FormattedDate.propTypes = {
  format: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default FormattedDate;
