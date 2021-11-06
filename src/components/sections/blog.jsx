import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import ArticleGrid from "../ui/article/article-grid"
import Section from "../ui/section"

export default function Blog({ posts }) {
  if (posts.length > 0) {
    return (
      <Section title="Blog" subtitle="Pittica says" link="/blog">
        <div className={classNames("columns", "is-multiline")}>
          {posts.map((node) => {
            return (
              <div
                className={classNames("column", "is-one-third")}
                key={node.slug}
              >
                <ArticleGrid node={node} />
              </div>
            )
          })}
        </div>
      </Section>
    )
  } else {
    return null
  }
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
}

Blog.defaultProps = {
  posts: [],
}
