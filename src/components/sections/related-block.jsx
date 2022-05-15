import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import PostList from "../ui/article/post-list"
import StaticGrid from "../ui/article/static-grid"

export default function RelatedBlock({ nodes, group, list }) {
  if (nodes.length > 0) {
    if (list) {
      return <PostList nodes={nodes} group={group} />
    } else {
      return (
        <div className={classNames("columns", "is-multiline")}>
          {nodes.map((node, i) => {
            return (
              <div
                className={classNames(
                  "column",
                  "is-12-mobile",
                  "is-6-tablet",
                  "is-3-desktop"
                )}
                key={`${group}-${i}-${node.id}`}
              >
                <StaticGrid node={node} group={group} />
              </div>
            )
          })}
        </div>
      )
    }
  } else {
    return null
  }
}

RelatedBlock.propTypes = {
  nodes: PropTypes.array.isRequired,
  group: PropTypes.string.isRequired,
  list: PropTypes.bool,
}

RelatedBlock.defaultProps = {
  nodes: [],
  list: false,
}
