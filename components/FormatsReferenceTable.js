import React, { Component, PropTypes } from 'react';

import { color } from '../utils';

import FormattedDate from './FormattedDate';

export default class FormatsReferenceTable extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        format: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }

  renderRow(entry) {
    const { format, label } = entry;
    const usedFormat = `%${format}`;

    return (
      <tr key={format}>
        <td><code>{usedFormat}</code></td>
        <td dangerouslySetInnerHTML={{__html: label}}></td>
        <td>
          <FormattedDate format={usedFormat} date={this.props.date} />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className='reference-table'>
        <thead>
          <tr>
            <th>Format</th>
            <th className='full-width'>Meaning</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          { this.props.entries.map(entry => this.renderRow(entry)) }
        </tbody>
      </table>
    );
  }
};
