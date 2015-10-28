import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { searchReference } from '../utils';

import FormattedDate from './FormattedDate';
import Repl from './Repl';
import FormatsReferenceTable from './FormatsReferenceTable';
import FlagsReferenceTable from './FlagsReferenceTable';

import '../styles/index.css';

import reference from 'json!../reference.json';

const { formats, flags } = reference;

export default class App extends Component {
  state = {
    hasRepl: false,
    hasSearch: false,
    bodyPaddingBottom: 0,
    searchQuery: ''
  }

  componentDidMount() {
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

  setBodyPadding() {
    const repl = this.refs.repl;
    const padding = repl ? findDOMNode(repl).offsetHeight : 0;

    if (padding !== this.state.bodyPaddingBottom) {
      this.setState({ bodyPaddingBottom: padding });
    }
  }

  handleSearchChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleReplChange() {
    // Timeout to ensure that REPL DOM has been updated
    setTimeout(this.setBodyPadding.bind(this), 0);
  }

  render() {
    // Do not include props generated by static-site-generator-webpack-plugin
    const { path, assets, webpackStats, ...otherProps } = this.props;
    const initialProps = JSON.stringify(otherProps);

    const date = new Date(this.props.date);

    const searchQuery = this.state.searchQuery;
    const displayedEntries = searchQuery.length ? searchReference(searchQuery, formats) : formats;

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Quick strftime reference and REPL</title>
          <link type='text/css' rel='stylesheet' href='/bundle.css' />
          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400' rel='stylesheet' type='text/css' />
          <link href='https://fonts.googleapis.com/css?family=Roboto+Mono' rel='stylesheet' type='text/css' />
          <meta name='keywords' content='strftime, date, time, format, reference, repl, tool' />
          <meta name='description' content='A quick reference for the strftime formatting directive, accompanied by a tool to easily format your dates and times.' />
          {
            this.props.isProduction ? null :
              <script src="http://localhost:8080/webpack-dev-server.js"></script>
          }
          <script
            id='props'
            type='application/json'
            dangerouslySetInnerHTML={{__html: initialProps}}
          />
        </head>
        <body style={{ paddingBottom: this.state.bodyPaddingBottom }}>
          <header className='page-head'>
            <h1 className='page-title'>strftime</h1>
            {' '}
            <p className='credits'>by <a href='http://timpetricola.com'>Tim Petricola</a> on <a href='https://github.com/TimPetricola/strftime'>GitHub</a></p>
            {
              this.state.hasSearch ?
                <label className='search-field'>
                  <i className='search-icon'></i>
                  <input
                    className='search-input'
                    type='text'
                    value={searchQuery}
                    onChange={this.handleSearchChange.bind(this)}
                    placeholder='Search'
                  />
                </label>
                : null
            }
          </header>
          {
            this.state.hasRepl ?
              <div className='repl-container' ref='repl'>
                <Repl
                  value={this.props.format}
                  formats={formats.map(format => format.format)}
                  flags={flags.map(flag => flag.flag)}
                  date={date}
                  onChange={this.handleReplChange.bind(this)}
                />
              </div>
              : null
          }
          {
            displayedEntries.length ?
              <FormatsReferenceTable entries={displayedEntries} date={date} /> :
              <p className='reference-table reference-table-empty'>
                No format found.
              </p>
          }
          {
            formats.length ?
              <FlagsReferenceTable entries={flags} />
              : null
          }
          <script src='/bundle.js'></script>
        </body>
      </html>
    );
  }
}
