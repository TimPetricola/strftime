import strftime from "strftime"
import { ReactChild } from "react"

function formattedDate(format: string, date: Date): ReactChild {
  const formatted = strftime(format, date)

  if (formatted === "\n") return <br />

  return formatted
}

type Props = {
  format: string
  date: Date
}

const FormattedDate = ({ format, date }: Props) => (
  <span>{formattedDate(format, date)}</span>
)

export default FormattedDate
