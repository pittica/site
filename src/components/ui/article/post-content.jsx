import React from "react"
import PropTypes from "prop-types"
import { MarkdownRenderer } from "@pittica/gatsby-plugin-mdx-shortcodes"

import Section from "../section"

import "../../../scss/ui/article/_post-content.scss"

export default function PostContent({ content, title, subtitle }) {
  if (content) {
    return (
      <Section className="post-content" title={title} subtitle={subtitle}>
        <div className="content">
          {content.markdownNode ? (
            <MarkdownRenderer>{content}</MarkdownRenderer>
          ) : typeof content === "object" ? (
            Object.values(content)
          ) : (
            content
          )}
        </div>
      </Section>
    )
  } else {
    return null
  }
}

PostContent.propTypes = {
  content: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
