import { FlagConfig } from "../types"

const Row = ({ entry: { flag, label } }: { entry: FlagConfig }) => (
  <tr key={flag}>
    <td>
      <code>{flag}</code>
    </td>
    <td dangerouslySetInnerHTML={{ __html: label }} />
  </tr>
)

type Props = { entries: FlagConfig[] }

const Table = ({ entries }: Props) => (
  <table className="reference-table">
    <thead>
      <tr>
        <th>Flag</th>
        <th className="full-width">Meaning</th>
      </tr>
    </thead>
    <tbody>
      {entries.map(e => (
        <Row key={e.flag} entry={e} />
      ))}
    </tbody>
  </table>
)

export default Table
