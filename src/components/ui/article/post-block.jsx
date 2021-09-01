import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Section from "../section"
import StaticGrid from "./static-grid"

export default function PostBlock({ title, subtitle, group, posts }) {
  if (posts.length > 0) {
    return (
      <Section title={title} subtitle={subtitle}>
        <div className={classNames("columns", "is-multiline")}>
          {posts.map((post) => {
            return (
              <div
                className={classNames(
                  "column",
                  "is-12-mobile",
                  "is-6-tablet",
                  "is-3-desktop"
                )}
                key={post.slug}
              >
                <StaticGrid node={post} group={group} />
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

PostBlock.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  group: PropTypes.string,
  posts: PropTypes.array.isRequired,
}

PostBlock.defaultProps = {
  featured: [],
}
