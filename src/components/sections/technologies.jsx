import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import ImageLink from "../ui/image/image-link"

export default function Technologies({ nodes, list }) {
  if (nodes.length > 0) {
    if (list) {
      return (
        <ul>
          {nodes.map(({ id, name, link }, i) => (
            <li key={`technologies-${i}-${id}`}>
              {link ? <a href={link}>{name}</a> : name}
            </li>
          ))}
        </ul>
      )
    } else {
      return (
        <div className={classNames("columns", "is-multiline", "is-mobile")}>
          {nodes.map(({ id, name, link, logo }, i) => {
            return (
              <div
                className={classNames(
                  "column",
                  "is-6-mobile",
                  "is-3-tablet",
                  "is-2-fullhd"
                )}
                key={`technologies-${i}-${id}`}
              >
                <ImageLink link={link} title={name} image={logo} size={96} />
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

Technologies.propTypes = {
  nodes: PropTypes.array.isRequired,
  list: PropTypes.bool,
}

Technologies.defaultProps = {
  nodes: [],
  list: false,
}
