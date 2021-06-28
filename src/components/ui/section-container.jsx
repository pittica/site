import React from "react"
import classnames from "classnames"

import "../../scss/ui/_section-container.scss"

export default function SectionContainer({ children, left }) {
  return (
    <div
      className={classnames("section-container", {
        "section-right": !left,
        "section-left": left,
      })}
    >
      {children}
    </div>
  )
}
