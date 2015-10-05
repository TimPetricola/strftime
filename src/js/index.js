import React, { Component, findDOMNode } from 'react';

import { getHash } from './utils';

import FormattedDate from './FormattedDate';
import Builder from './Builder';

import '../css/style.css';

var App = {
  init() {
    this.render();
    this.initDateComponents();
  },

  initDateComponents() {
    const formatAttribute = 'data-formatted-date';

    Array.prototype.forEach.call(
      document.querySelectorAll(`[${formatAttribute}]`),
      (ele) => (
        React.render(
          <FormattedDate format={ele.getAttribute(formatAttribute)} />,
          ele
        )
      )
    );
  },

  getSupportedCodes() {
    if(!this.supportedCodes) {
      const codeAttribute = 'data-code';

      this.supportedCodes = Array.prototype.map.call(
        document.querySelectorAll(`[${codeAttribute}]`),
        (ele) => ele.getAttribute(codeAttribute)
      );
    }

    return this.supportedCodes;
  },

  initialFormat() {
    let format = getHash();
    if(!format.length) {
      format = '%B %d, %Y - %H:%M:%S';
    }
    return format;
  },

  render() {
    React.render(
      <Builder
        value={this.initialFormat()}
        supportedCodes={this.getSupportedCodes()}
      />,
      document.getElementById('app')
    );
  }
};

App.init();
