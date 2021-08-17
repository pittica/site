import React from "react"
import Shortcodes from "@pittica/gatsby-plugin-mdx-shortcodes"
import { MDXProvider } from "@mdx-js/react"

import "./src/scss/style.scss"

const wrapRootElement = ({ element }) => (
  <MDXProvider components={Shortcodes}>{element}</MDXProvider>
)

export { wrapRootElement }
