import FormattedDate from "./FormattedDate"
import { FormatConfig } from "../types"

const Row = ({
  date,
  entry: { format, label }
}: {
  date: Date
  entry: FormatConfig
}) => (
  <tr>
    <td>
      <code>%{format}</code>
    </td>
    <td dangerouslySetInnerHTML={{ __html: label }} />
    <td>
      <FormattedDate format={`%${format}`} date={date} />
    </td>
  </tr>
)

type Props = {
  entries: FormatConfig[]
  date: Date
}

const Table = ({ entries, date }: Props) => (
  <table className="reference-table">
    <thead>
      <tr>
        <th>Format</th>
        <th className="full-width">Meaning</th>
        <th>Output</th>
      </tr>
    </thead>
    <tbody>
      {entries.map(e => (
        <Row key={e.format} entry={e} date={date} />
      ))}
    </tbody>
  </table>
)

export default Table
