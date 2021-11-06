import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import PostList from "../ui/article/post-list"
import StaticGrid from "../ui/article/static-grid"

export default function Offers({ nodes, list }) {
  if (nodes.length > 0) {
    if (list) {
      return <PostList nodes={nodes} group="offers" />
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
                key={`offers-${i}-${node.id}`}
              >
                <StaticGrid node={node} group="offers" />
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

Offers.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

Offers.defaultProps = {
  nodes: [],
  list: false,
}
