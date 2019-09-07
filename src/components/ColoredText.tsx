import { color } from "../utils"
import { ReactNode } from "react"

type Props = {
  colorKey: string
  children: ReactNode
}

const ColoredText = ({ colorKey, children }: Props) => (
  <span style={{ backgroundColor: color(colorKey) }}>{children}</span>
)

export default ColoredText
