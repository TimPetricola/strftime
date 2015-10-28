import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { searchReference } from '../utils';

import FormattedDate from './FormattedDate';
import Repl from './Repl';
import FormatsReferenceTable from './FormatsReferenceTable';
import FlagsReferenceTable from './FlagsReferenceTable';

const Search = ({query, onChange}) => (
  <label className='search-field'>
    <i className='search-icon'></i>
    <input
      className='search-input'
      type='text'
      value={query}
      onChange={onChange}
      placeholder='Search'
    />
  </label>
);

export default class Body extends Component {
  state = {
    hasRepl: false, // do not render REPL on the backend
    hasSearch: false, // do not render search on the backend
    bodyPaddingBottom: 0,
    searchQuery: ''
  }

  componentDidMount() {
    // render REPL and search on the frontend
    this.setState({
      hasRepl: true,
      hasSearch: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasRepl !== this.state.hasRepl) {
      this.setBodyPadding();
    }
  }

  // REPL takes some room at the bottom of the page, padding is needed
  // to see bottom of reference
  setBodyPadding() {
    const repl = this.refs.repl;
    const padding = repl ? findDOMNode(repl).offsetHeight : 0;

    if (padding !== this.state.bodyPaddingBottom) {
      this.setState({ bodyPaddingBottom: padding });
    }
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleReplChange() {
    // Timeout to ensure that REPL DOM has been updated
    setTimeout(this.setBodyPadding.bind(this), 0);
  }

  render() {
    const { format, formats, flags } = this.props;
    const { searchQuery, hasSearch, hasRepl, bodyPaddingBottom } = this.state;
    const date = new Date(this.props.date);

    const displayedEntries = searchQuery.length ? searchReference(searchQuery, formats) : formats;
    return (
      <body style={{ paddingBottom: bodyPaddingBottom }}>
        <header className='page-head'>
          <h1 className='page-title'>strftime</h1>
          {' '}
          <p className='credits'>by <a href='http://timpetricola.com'>Tim Petricola</a> on <a href='https://github.com/TimPetricola/strftime'>GitHub</a></p>
          { hasSearch
            ? <Search query={searchQuery} onChange={this.handleSearchChange.bind(this)} />
            : null
          }
        </header>

        { hasRepl
          ? <div className='repl-container' ref='repl'>
              <Repl
                value={format}
                formats={formats.map(format => format.format)}
                flags={flags.map(flag => flag.flag)}
                date={date}
                onChange={this.handleReplChange.bind(this)}
              />
            </div>
          : null
        }

        { displayedEntries.length
          ? <FormatsReferenceTable entries={displayedEntries} date={date} />
          : <p className='reference-table reference-table-empty'>
              No format found.
            </p>
        }

        { formats.length ? <FlagsReferenceTable entries={flags} /> : null }
        <script src='/bundle.js'></script>
      </body>
    );
  }
}