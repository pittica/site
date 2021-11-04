import React from "react"
import classNames from "classnames"

import ImageLink from "../ui/image/image-link"

export default function Partners({ nodes }) {
  if (nodes.length > 0) {
    return (
      <div className={classNames("columns", "is-multiline")}>
        {nodes.map(({ link, name, logo }, i) => (
          <div
            className={classNames("column", "is-one-third", "p-6")}
            key={`partner-${i}`}
          >
            <ImageLink link={link} title={name} image={logo} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}
