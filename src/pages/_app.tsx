import App from "next/app"
import Head from "next/head"
import React from "react"

import manifest from "../../public/manifest.json"

import "../styles/index.css"

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>{manifest.name}</title>
          <meta
            name="keywords"
            content="strftime, date, time, format, reference, repl, tool"
          />
          <meta
            name="description"
            content="A quick reference for the strftime formatting directive, accompanied by a tool to easily format your dates and times."
          />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content={manifest.theme_color} />
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </>
    )
  }
}

export default MyApp
