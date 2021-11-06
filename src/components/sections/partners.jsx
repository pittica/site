import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import ImageLink from "../ui/image/image-link"

export default function Partners({ nodes, list }) {
  if (nodes.length > 0) {
    return (
      <div className={classNames("columns", "is-multiline")}>
        {nodes.map(({ id, link, name, logo }, i) => (
          <div
            className={classNames(
              "column",
              "is-one-third",
              "has-text-centered",
              "p-6"
            )}
            key={`partners-${i}-${id}`}
          >
            <ImageLink link={link} title={name} image={list ? null : logo} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

Partners.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

Partners.defaultProps = {
  nodes: [],
  list: false,
}
