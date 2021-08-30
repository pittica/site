import React from "react"
import classNames from "classnames"

import "../../scss/ui/_highlight.scss"

export default function Highlight({ children, className }) {
  return (
    <div className={classNames("highlight", className)}>
      <span className="highlight-body">{children}</span>
    </div>
  )
}
