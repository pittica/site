import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Switcher from "@pittica/gatsby-plugin-video"

export default function Videos({ nodes, title }) {
  if (nodes && nodes.length > 0) {
    return (
      <div className="columns">
        {nodes.map((node, i) => {
          if (node) {
            return (
              <div className={classNames("column", "is-6")} key={`video-${i}`}>
                <Switcher title={title} url={node} />
              </div>
            )
          } else {
            return null
          }
        })}
      </div>
    )
  } else {
    return null
  }
}

Videos.propTypes = {
  nodes: PropTypes.array,
  title: PropTypes.string,
}

Videos.defaultProps = {
  nodes: [],
}
