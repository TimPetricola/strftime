import { useState, useEffect, useRef } from "react"

import { searchReference } from "../utils"

import Icon from "./Icon"
import Repl from "./Repl"
import FormatsReferenceTable from "./FormatsReferenceTable"
import FlagsReferenceTable from "./FlagsReferenceTable"
import { FormatConfig, FlagConfig } from "../types"

const Search = ({
  query,
  onChange
}: {
  query: string
  onChange: (value: string) => void
}) => (
  <label className="search-field">
    <Icon icon="search" className="search-icon" />
    <input
      className="search-input"
      type="text"
      value={query}
      onChange={e => onChange(e.target.value)}
      placeholder="Search"
      aria-label="Search"
    />
  </label>
)

type Props = {
  date: Date
  format: string
  formats: FormatConfig[]
  flags: FlagConfig[]
}

const Body = ({ format, formats, flags, date: initialDate }: Props) => {
  const [hasRepl, setHasRepl] = useState(false) // do not render REPL on the backend
  const [hasSearch, setHasSearch] = useState(false) // do not render search on the backend
  const [bodyPaddingBottom, setBodyPaddingBottom] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState(initialDate)
  const repl = useRef<HTMLDivElement>(null)

  const resetDates = () => {
    setDate(new Date())
  }

  const setBodyPadding = () => {
    setBodyPaddingBottom(repl.current ? repl.current.offsetHeight : 0)
  }

  useEffect(() => {
    setHasRepl(true)
    setHasSearch(true)
    resetDates() // use real date instead of the one defined by the server
  }, [])

  useEffect(() => {
    // keep date in real time
    const timeInterval = setInterval(resetDates, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(setBodyPadding, [hasRepl])

  const handleSearchChange = (newValue: string) => {
    setSearchQuery(newValue)
  }

  const handleReplChange = () => {
    // Timeout to ensure that REPL DOM has been updated
    setTimeout(setBodyPadding, 0)
  }

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
          <Search query={searchQuery} onChange={handleSearchChange} />
        ) : null}
      </header>

      {hasRepl ? (
        <div className="repl-container" ref={repl}>
          <Repl
            value={format}
            formats={formats.map(format => format.format)}
            flags={flags.map(flag => flag.flag)}
            date={date}
            onChange={handleReplChange}
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

export default Body
