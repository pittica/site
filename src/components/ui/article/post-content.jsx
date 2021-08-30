import React from "react"

import Renderer from "../../../mdx/renderer"
import Section from "../section"

import "../../../scss/ui/article/_post-content.scss"

export default function PostContent({ children }) {
  return (
    <Section className="post-content">
      <div className="content">
        <Renderer>{children}</Renderer>
      </div>
    </Section>
  )
}
