import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Image from "../ui/image/image"
import InnerLink from "../ui/link/inner-link"

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
            <InnerLink link={link} title={name}>
              {list ? (
                name
              ) : (
                <Image
                  src={logo.url || logo.asset?.localFile?.publicURL}
                  title={name}
                />
              )}
            </InnerLink>
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
