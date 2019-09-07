import Head from "next/head"

import App from "../src/components/App"

import manifest from "../src/manifest.json"

import "../src/styles/index.css"

function Home() {
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
        {/* <link
      rel="manifest"
      href="<%= htmlWebpackPlugin.files.publicPath %>manifest.json"
    /> */}
        <meta name="theme-color" content={manifest.theme_color} />
      </Head>
      <App />
    </>
  )
}

export default Home
