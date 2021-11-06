import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import PostList from "../ui/article/post-list"
import StaticGrid from "../ui/article/static-grid"

export default function Services({ nodes, list }) {
  if (nodes.length > 0) {
    if (list) {
      return <PostList nodes={nodes} group="services" />
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
                key={`services-${i}-${node.id}`}
              >
                <StaticGrid node={node} group="services" />
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

Services.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

Services.defaultProps = {
  nodes: [],
  list: false,
}
