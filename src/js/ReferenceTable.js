import React, { Component, PropTypes } from 'react';

import { color } from './utils';

import FormattedDate from './FormattedDate';
import referenceEntries from 'json!../reference.json';

export default class ReferenceTable extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }

  renderRow(entry) {
    const { code, label } = entry;
    const usedCode = `%${code}`;

    return (
      <tr data-code={usedCode} key={usedCode}>
        <td><code>{usedCode}</code></td>
        <td dangerouslySetInnerHTML={{__html: label}}></td>
        <td>
          <code>
            <FormattedDate format={usedCode} date={this.props.date} />
          </code>
        </td>
      </tr>
    );
  }

  render() {
    const { entries } = this.props;

    return (
      <table className='reference'>
        <thead>
          <tr>
            <th>Code</th>
            <th>Meaning</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          { entries.map(entry => this.renderRow(entry)) }
        </tbody>
      </table>
    );
  }
};
