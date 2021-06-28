import React from "react"

import Renderer from "../../../mdx/renderer"
import Section from "../section"

import "../../../scss/ui/article/_post-content.scss"

export default function PostContent({ children }) {
  return (
    <Section className="post-content">
      <Renderer>{children}</Renderer>
    </Section>
  )
}
