import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { GatsbyImage } from "gatsby-plugin-image"

import getCover from "../../utils/get-cover"

export default function Screenshots({ nodes, title }) {
  if (nodes && nodes.length > 0) {
    return (
      <div className="columns">
        {nodes.map((node, i) => {
          const image = getCover({ image: node })

          if (image) {
            return (
              <div
                className={classNames("column", "is-6")}
                key={`screenshots-${i}-${node.id}`}
              >
                <GatsbyImage image={image} alt={title} />
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

Screenshots.propTypes = {
  nodes: PropTypes.array,
  title: PropTypes.string,
}

Screenshots.defaultProps = {
  nodes: [],
}
