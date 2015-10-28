import React, { Component, PropTypes } from 'react';

import { color } from '../utils';

const ColoredText = ({colorKey, children}) => (
  <span style={{ backgroundColor: color(colorKey) }}>
    {children}
  </span>
);

ColoredText.propTypes = {
  colorKey: PropTypes.string.isRequired
};

export default ColoredText;
