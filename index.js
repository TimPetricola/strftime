import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { hydrate } from "react-dom"

import App from "./components/app"

if (typeof document !== "undefined") {
  const props = JSON.parse(document.getElementById("props").innerHTML)
  props.date = new Date(props.date)
  hydrate(createElement(App, props), document)
}

export default function render(locals, callback) {
  const html = renderToString(createElement(App, locals))
  callback(null, `<!doctype>${html}`)
}
