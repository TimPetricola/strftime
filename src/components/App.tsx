import Body from "./Body"

import { formats, flags } from "../reference.json"

const props = {
  format: "%B %d, %Y - %H:%M:%S",
  date: new Date()
}

export default function App() {
  return <Body formats={formats} flags={flags} {...props} />
}
