import React from "react"

export default props => (
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quick strftime reference and REPL</title>
    <link type="text/css" rel="stylesheet" href="/bundle.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400;Roboto+Mono"
      rel="stylesheet"
      type="text/css"
    />
    <meta
      name="keywords"
      content="strftime, date, time, format, reference, repl, tool"
    />
    <meta
      name="description"
      content="A quick reference for the strftime formatting directive, accompanied by a tool to easily format your dates and times."
    />
    {props.isProduction ? null : (
      <script src="http://localhost:8080/webpack-dev-server.js" />
    )}
    {/* save props to reuse after server-side rendering */}
    <script
      id="props"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }}
    />
  </head>
)
