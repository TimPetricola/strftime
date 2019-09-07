import { Component } from "react"

import { searchReference } from "../utils"

import Icon from "./Icon"
import Repl from "./Repl"
import FormatsReferenceTable from "./FormatsReferenceTable"
import FlagsReferenceTable from "./FlagsReferenceTable"

const Search = ({ query, onChange }) => (
  <label className="search-field">
    <Icon icon="search" className="search-icon" />
    <input
      className="search-input"
      type="text"
      value={query}
      onChange={onChange}
      placeholder="Search"
      aria-label="Search"
    />
  </label>
)

export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasRepl: false, // do not render REPL on the backend
      hasSearch: false, // do not render search on the backend
      bodyPaddingBottom: 0,
      searchQuery: "",
      date: new Date(this.props.date)
    }

    this.resetDate = this.resetDate.bind(this)
    this.setBodyPadding = this.setBodyPadding.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleReplChange = this.handleReplChange.bind(this)
  }

  componentDidMount() {
    // render REPL and search on the frontend
    this.setState({
      hasRepl: true,
      hasSearch: true
    })

    // use real date instead of the one defined by the server
    this.resetDate()

    // keep date in real time
    this.timeInterval = setInterval(this.resetDate, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasRepl !== this.state.hasRepl) {
      this.setBodyPadding()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  resetDate() {
    this.setState({ date: new Date() })
  }

  // REPL takes some room at the bottom of the page, padding is needed
  // to see bottom of reference
  setBodyPadding() {
    const padding = this.repl ? this.repl.offsetHeight : 0

    if (padding !== this.state.bodyPaddingBottom) {
      this.setState({ bodyPaddingBottom: padding })
    }
  }

  handleSearchChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleReplChange() {
    // Timeout to ensure that REPL DOM has been updated
    setTimeout(this.setBodyPadding, 0)
  }

  render() {
    const { format, formats, flags } = this.props
    const {
      searchQuery,
      hasSearch,
      hasRepl,
      bodyPaddingBottom,
      date
    } = this.state

    const displayedEntries = searchQuery.length
      ? searchReference(searchQuery, formats)
      : formats
    return (
      <div style={{ paddingBottom: bodyPaddingBottom }}>
        <header className="page-head">
          <div className="page-title-credits">
            <h1 className="page-title">strftime</h1>{" "}
            <p className="credits">
              by <a href="http://timpetricola.com">Tim Petricola</a> on{" "}
              <a href="https://github.com/TimPetricola/strftime">GitHub</a>
            </p>
          </div>
          {hasSearch ? (
            <Search query={searchQuery} onChange={this.handleSearchChange} />
          ) : null}
        </header>

        {hasRepl ? (
          <div className="repl-container" ref={repl => (this.repl = repl)}>
            <Repl
              value={format}
              formats={formats.map(format => format.format)}
              flags={flags.map(flag => flag.flag)}
              date={date}
              onChange={this.handleReplChange}
            />
          </div>
        ) : null}

        {displayedEntries.length ? (
          <FormatsReferenceTable entries={displayedEntries} date={date} />
        ) : (
          <p className="reference-table reference-table-empty">
            No format found.
          </p>
        )}

        {formats.length ? <FlagsReferenceTable entries={flags} /> : null}
      </div>
    )
  }
}
