import React, { Component } from "react"

import Head from "./head"
import Body from "./body"

import "../styles/index.css"

import { formats, flags } from "json!../reference.json"

// exclude props generated by static-site-generator-webpack-plugin
export default ({ path, assets, webpackStats, ...props }) => (
  <html>
    <Head {...props} />
    <Body {...props} formats={formats} flags={flags} />
  </html>
)
