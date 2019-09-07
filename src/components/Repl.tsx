import { Component, createRef, HTMLProps, ChangeEvent } from "react"

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

type State = { format: string }

export default class Repl extends Component<Props, State> {
  private input = createRef<HTMLInputElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      format: this.props.value
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.input.current) {
      // Set focus at the end of input
      this.input.current.focus()
      this.input.current.selectionStart = this.input.current.selectionEnd = this.input.current.value.length
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const format = event.target.value
    this.setState({ format: format })
    this.props.onChange(format)
  }

  render() {
    const {
      props: { date, flags, formats, value },
      state: { format }
    } = this
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
              ref={this.input}
              value={format}
              id="repl-input"
              className="repl-io repl-input"
              onChange={this.handleChange}
              placeholder={`Type a format string here, .e.g ${value}`}
            />
          </div>
        </div>
        <div className="repl-row">
          <span className="repl-label">Output</span>
          <div className="repl-field">
            <code className="repl-io">
              <ColoredFormat
                regex={regex}
                format={format}
                convertToDate={date}
              />
            </code>
          </div>
        </div>
      </div>
    )
  }
}
