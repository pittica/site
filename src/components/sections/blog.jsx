import React from "react"
import classnames from "classnames"

import ArticleGrid from "../ui/article/article-grid"
import Section from "../ui/section"

export default function Blog({ posts }) {
  if (posts.length > 0) {
    return (
      <Section title="Blog" subtitle="Pittica says" link="/blog">
        <div className={classnames("columns", "is-multiline")}>
          {posts.map((node) => {
            return (
              <div
                className={classnames("column", "is-one-third")}
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
