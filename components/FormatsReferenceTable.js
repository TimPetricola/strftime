import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormattedDate from './FormattedDate';

const Row = ({date, entry: {format, label}}) => (
  <tr>
    <td><code>%{format}</code></td>
    <td dangerouslySetInnerHTML={{__html: label}}></td>
    <td>
      <FormattedDate format={`%${format}`} date={date} />
    </td>
  </tr>
);

const Table = ({entries, date}) => (
  <table className='reference-table'>
    <thead>
      <tr>
        <th>Format</th>
        <th className='full-width'>Meaning</th>
        <th>Output</th>
      </tr>
    </thead>
    <tbody>
      { entries.map(e => <Row key={e.format} entry={e} date={date} />) }
    </tbody>
  </table>
);

Table.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      format: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Table;
