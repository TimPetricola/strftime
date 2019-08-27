import { Component } from "preact"
// import PropTypes from "prop-types"

import ColoredText from "./ColoredText"
import FormattedDate from "./FormattedDate"

function outputRegex(flags, formats) {
  return new RegExp(`(%(?:${flags.join("|")})?(?:${formats.join("|")}))`)
}

const ColoredFormatPart = ({ format, convertToDate: date }) => (
  <ColoredText colorKey={format}>
    {date ? <FormattedDate format={format} date={date} /> : format}
  </ColoredText>
)

const ColoredFormat = ({ format, regex, convertToDate: date, ...props }) => (
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

export default class Repl extends Component {
  // static propTypes = {
  //   value: PropTypes.string,
  //   formats: PropTypes.arrayOf(PropTypes.string),
  //   flags: PropTypes.arrayOf(PropTypes.string),
  //   date: PropTypes.instanceOf(Date).isRequired,
  //   onChange: PropTypes.func
  // }

  // static defaultProps = {
  //   value: "",
  //   formats: [],
  //   flags: [],
  //   onChange: () => {}
  // }

  constructor(props) {
    super(props)

    this.state = {
      format: this.props.value
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // Set focus at the end of input
    this.input.focus()
    this.input.selectionStart = this.input.selectionEnd = this.input.value.length
  }

  handleChange(event) {
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
              ref={input => (this.input = input)}
              value={format}
              id="repl-input"
              className="repl-io repl-input"
              onInput={this.handleChange}
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