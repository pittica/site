import React from "react"
import Shortcodes from "@pittica/gatsby-plugin-mdx-shortcodes"
import { MDXProvider } from "@mdx-js/react"

import "./src/scss/style.scss"

export function wrapRootElement({ element }) {
  return <MDXProvider components={Shortcodes}>{element}</MDXProvider>
}

export function onServiceWorkerUpdateReady() {
  window.location.reload()
}
