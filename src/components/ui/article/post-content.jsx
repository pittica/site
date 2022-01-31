import React from "react"
import PropTypes from "prop-types"

import Section from "../section"

import "../../../scss/ui/article/_post-content.scss"

export default function PostContent({ content, title, subtitle }) {
  if (content && content.html) {
    return (
      <Section className="post-content" title={title} subtitle={subtitle}>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
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
