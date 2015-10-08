import React, { Component, PropTypes } from 'react';

export default class FlagsReferenceTable extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        flag: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }

  renderRow(entry) {
    const { flag, label } = entry;

    return (
      <tr key={flag}>
        <td><code>{flag}</code></td>
        <td dangerouslySetInnerHTML={{__html: label}}></td>
      </tr>
    );
  }

  render() {
    const { entries } = this.props;

    return (
      <table className='reference-table'>
        <thead>
          <tr>
            <th>Flag</th>
            <th className='full-width'>Meaning</th>
          </tr>
        </thead>
        <tbody>
          { entries.map(entry => this.renderRow(entry)) }
        </tbody>
      </table>
    );
  }
};
