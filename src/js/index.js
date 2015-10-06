import React, { Component, findDOMNode } from 'react';

import { getHash } from './utils';

import FormattedDate from './FormattedDate';
import Builder from './Builder';
import ReferenceTable from './ReferenceTable';

import '../css/style.css';

import referenceEntries from 'json!../reference.json';

var App = {
  init() {
    this.render();
    this.initReferenceTable();
  },

  initReferenceTable() {
    React.render(
      <ReferenceTable entries={referenceEntries} />,
      document.getElementById('reference-table')
    );
  },

  initialFormat() {
    let format = getHash();
    if(!format.length) {
      format = '%B %d, %Y - %H:%M:%S';
    }
    return format;
  },

  render() {
    const supportedCodes = referenceEntries.map(entry => `%${entry.code}`);

    React.render(
      <Builder
        value={this.initialFormat()}
        supportedCodes={supportedCodes}
      />,
      document.getElementById('app')
    );
  }
};

App.init();
