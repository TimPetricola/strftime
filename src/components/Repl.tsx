import { HTMLProps, ChangeEvent, useState, useRef, useEffect } from "react"

import ColoredText from "./ColoredText"
import FormattedDate from "./FormattedDate"

function outputRegex(flags: string[], formats: string[]) {
  return new RegExp(`(%(?:${flags.join("|")})?(?:${formats.join("|")}))`)
}

const ColoredFormatPart = ({
  format,
  convertToDate: date
}: {
  format: string
  convertToDate?: Date
}) => (
  <ColoredText colorKey={format}>
    {date ? <FormattedDate format={format} date={date} /> : format}
  </ColoredText>
)

const ColoredFormat = ({
  format,
  regex,
  convertToDate: date,
  ...props
}: {
  format: string
  regex: RegExp
  convertToDate?: Date
} & HTMLProps<HTMLSpanElement>) => (
  <span {...props}>
    {format
      .split(regex)
      .map((part, i) =>
        part.match(regex) ? (
          <ColoredFormatPart key={i} format={part} convertToDate={date} />
        ) : (
          <span key={i}>{part}</span>
        )
      )}
  </span>
)

type Props = {
  value: string
  formats: string[]
  flags: string[]
  date: Date
  onChange: (format: string) => void
}

const Repl = ({
  date,
  flags,
  formats,
  onChange,
  value: initialFormat
}: Props) => {
  const [format, setFormat] = useState(initialFormat)
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus()
      inputEl.current.selectionStart = inputEl.current.selectionEnd =
        inputEl.current.value.length
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const format = event.target.value
    setFormat(format)
    onChange(format)
  }

  const regex = outputRegex(flags, formats)

  return (
    <div className="repl">
      <div className="repl-row">
        <label className="repl-label" htmlFor="repl-input">
          Input
        </label>
        <div className="repl-field">
          <ColoredFormat
            regex={regex}
            format={format}
            className="repl-io repl-highlight"
          />
          <input
            type="text"
            ref={inputEl}
            value={format}
            id="repl-input"
            className="repl-io repl-input"
            onChange={handleChange}
            placeholder={`Type a format string here, .e.g ${format}`}
          />
        </div>
      </div>
      <div className="repl-row">
        <span className="repl-label">Output</span>
        <div className="repl-field">
          <code className="repl-io">
            <ColoredFormat regex={regex} format={format} convertToDate={date} />
          </code>
        </div>
      </div>
    </div>
  )
}

export default Repl
