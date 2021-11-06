import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import PostList from "../ui/article/post-list"
import ArticleGrid from "../ui/article/article-grid"
import Section from "../ui/section"

export default function Blog({ nodes, list }) {
  if (nodes.length > 0) {
    if (list) {
      return <PostList nodes={nodes} />
    } else {
      return (
        <Section
          title="Blog"
          subtitle="Approfondimenti dal mondo digitale"
          link="/blog"
        >
          <div className={classNames("columns", "is-multiline")}>
            {nodes.map((node, i) => {
              return (
                <div
                  className={classNames("column", "is-one-third")}
                  key={`blog-${i}-${node.id}`}
                >
                  <ArticleGrid node={node} />
                </div>
              )
            })}
          </div>
        </Section>
      )
    }
  } else {
    return null
  }
}

Blog.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

Blog.defaultProps = {
  nodes: [],
  list: false,
}
