import React, { Component, PropTypes } from 'react';

import { color } from '../utils';

export default class ColoredText extends Component {
  static propTypes = {
    colorKey: PropTypes.string.isRequired
  }

  render() {
    const style = {
      backgroundColor: color(this.props.colorKey)
    };

    return (
      <span style={style}>
        {this.props.children}
      </span>
    );
  }
};
