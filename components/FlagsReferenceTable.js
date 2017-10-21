import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Row = ({entry: {flag, label}}) => (
  <tr key={flag}>
    <td><code>{flag}</code></td>
    <td dangerouslySetInnerHTML={{__html: label}}></td>
  </tr>
);

const Table = ({entries}) => (
  <table className='reference-table'>
    <thead>
      <tr>
        <th>Flag</th>
        <th className='full-width'>Meaning</th>
      </tr>
    </thead>
    <tbody>
      { entries.map(e => <Row key={e.flag} entry={e} />) }
    </tbody>
  </table>
);

Table.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      flag: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Table;
